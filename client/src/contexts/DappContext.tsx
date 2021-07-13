import { ReactNode, useState, createContext, useContext, useEffect } from "react";
import { toast } from 'react-toastify';

import { ethers } from "ethers"
import { ExternalProvider, Web3Provider } from "@ethersproject/providers/lib"

import DappInnGanache from "../hardhat-deploy/ganache/DappInn.json"
import DappInnRopsten from "../hardhat-deploy/ropsten/DappInn.json"
import { DappInn as DappInnProps } from "../../../src/types/DappInn"

declare global {
    interface Window {
        ethereum?: ExternalProvider;
    }
}

type DappContextProviderProps = {
    children: ReactNode
}

interface Room {
    id: number;
    name: string;
    price: string; // 0.05 ETH
    status: number;
    guest: string;
    checkoutDate: Date;
    tab: RoomService[]
}

interface RoomService {
    id: number;
    name: string;
    value: string; // wei
    enabled: boolean;
}

type ErrorProps = {
    hasError: boolean;
    message: string;
}

interface DappContextProps {
    accounts: string[]
    // setAccounts: (_accounts: string[]) => void;

    // provider: Web3Provider | undefined
    // setProvider: (_provider: Web3Provider) => void;

    handleConnect: () => void;

    dappInnContract: DappInnProps;

    rooms: Room[];

    roomServices: RoomService[];

    currentTimeStamp: Date;

    dappError: ErrorProps;

}

const DappContext = createContext({} as DappContextProps)

export const DappContextProvider = ({ children }: DappContextProviderProps) => {

    const [accounts, setAccounts] = useState<string[]>([])
    const [provider, setProvider] = useState<Web3Provider>()
    const [dappInnContract, setDappInnContract] = useState<DappInnProps>()
    const [rooms, setRooms] = useState<Room[]>([])
    const [roomServices, setRoomServices] = useState<RoomService[]>([])
    const [dappError, setDappError] = useState<ErrorProps>({ hasError: false, message: "" })
    const [currentTimeStamp, setCurrentTimeStamp] = useState<Date>(new Date())

    const validNetworks = {
        "1337": "Ganache",
        "3": "Ropsten"
    }

    const isMetamaskLogged = async () => {

        if (window.ethereum) {

            const _provider = new ethers.providers.Web3Provider(window.ethereum);
            const _accounts = await _provider.listAccounts();
            return !!_accounts.length;
        } 

        return false;

    }

    const checkPreviousConnected = async () => {

        if (window.ethereum && window.ethereum.request) {

            if (await isMetamaskLogged()) {
                const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
                if (_accounts.length) {
                    handleConnect();
                }
            }
        } else {
            setDappError({
                hasError: true,
                message: "Metamask not detected, Please install metamask to use this App"
            })
        }
    }

    const handleConnect = async () => {

        if (window.ethereum && window.ethereum.request) {

            try {

                if (!provider) {
                    const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];

                    const _provider = new ethers.providers.Web3Provider(window.ethereum)

                    const blockNumber = await _provider.getBlockNumber()

                    const signer = _provider.getSigner();

                    const network = await _provider.getNetwork()

                    if (!Object.keys(validNetworks).includes(network.chainId.toString())) {

                        alert(
                            "Wrong network, change your network to " +
                            Object.values(validNetworks).join(" or ")
                        )

                        return;

                    }

                    const currentNetwork = validNetworks[network.chainId.toString()]

                    const DappInnArtifact = currentNetwork == "Ganache" ? DappInnGanache : DappInnRopsten

                    const _dappInnContract = new ethers.Contract(DappInnArtifact.address, DappInnArtifact.abi, signer) as DappInnProps

                    !!dappInnContract && dappInnContract.removeAllListeners();

                    dappInListeners(_dappInnContract, _accounts[0], blockNumber);
                    setAccounts(_accounts)
                    setProvider(_provider)
                    setDappInnContract(_dappInnContract)

                    loadRooms(_dappInnContract, _accounts[0])

                    loadRoomServices(_dappInnContract)

                } else {
                    // TODO disconnect change account
                }

            } catch (e) {

            }

        }


    }

    const dappInListeners = (_dappInnContract: DappInnProps, _account: string, fromBlock: number) => {

        const checkInEventFromUser = _dappInnContract.filters.checkInEvent(_account);

        _dappInnContract.on(checkInEventFromUser, (...args: any[]) => {
            // only future events
            const currentBlock = args[args.length - 1].blockNumber as number;

            if (currentBlock > fromBlock) {
                loadRooms(_dappInnContract, _account)
                toast.info("Check In confirmed")
            }
        })

        const checkOutEventFromUser = _dappInnContract.filters.checkOutEvent(_account);

        _dappInnContract.on(checkOutEventFromUser, (...args: any[]) => {
            // only future events
            const currentBlock = args[args.length - 1].blockNumber as number;

            if (currentBlock > fromBlock) {
                loadRooms(_dappInnContract, _account)
                toast.info("It was a pleasure to have you, now pack your stuffs and leave")
            }
        })

        const buyServiceEventFromUser = _dappInnContract.filters.buyRoomServiceEvent(_account);

        _dappInnContract.on(buyServiceEventFromUser, (...args: any[]) => {
            // only future events
            const currentBlock = args[args.length - 1].blockNumber as number;

            if (currentBlock > fromBlock) {
                loadRooms(_dappInnContract, _account)
                toast.info("Enjoy your service !")
            }
        })

    }

    const loadRoomServices = async (_dappInnContract: DappInnProps) => {

        let _roomServices : RoomService[] = [];

        const numberOfServices = await _dappInnContract.numberOfServices();

        for (let i = 0; i < numberOfServices; i++) {
            const _roomService = await _dappInnContract.roomService(i);
            _roomServices.push({
                id: i,
                name: _roomService.name,
                value: _roomService.price.toString(),
                enabled: _roomService.enabled
            })
        }

        setRoomServices(_roomServices);

    }

    const loadRooms = async (_dappInnContract: DappInnProps, _account: string) => {

        let _rooms: Room[] = []

        const numberOfRooms = await _dappInnContract.numberOfRooms();
        const roomDefaultValue = await _dappInnContract.defaultRoomPriceInWei()
        const currentTimeStamp = (await _dappInnContract.getTimeStamp()).toNumber() * 1000;

        setCurrentTimeStamp(new Date(currentTimeStamp))

        for (let i = 0; i < numberOfRooms; i++) {
            const _room = await _dappInnContract.rooms(i);

            let roomValue = _room.price;

            if (ethers.BigNumber.from(roomValue).toNumber() == 0) {
                roomValue = ethers.BigNumber.from(roomDefaultValue);
            }

            let tab : RoomService[] = []

            if(_room.guest?.toLowerCase() === _account.toLowerCase()){

                const _tab = await _dappInnContract.getRoomTab(i);

                tab = _tab.map( t => {
                    return {
                        name: t.name,
                        value: String(t.price),
                        enabled: t.enabled
                    } as RoomService
                })
            }


            const checkoutDate = _room.checkoutDate.toNumber() > 0 ? 
                new Date(_room.checkoutDate.toNumber() * 1000) :
                new Date(currentTimeStamp)

            _rooms.push({
                id: i,
                name: `Room ${i.toString().padStart(3, '0')}`,
                price: roomValue.toString(),
                status: checkoutDate >= new Date(currentTimeStamp) ? _room.status : 0,
                guest: _room.guest,
                checkoutDate: checkoutDate,
                tab
            })
        }

        setRooms(_rooms)
    }

    useEffect(() => {
        checkPreviousConnected()
    }, [])

    const value = {
        accounts, 
        // setAccounts,
        // provider, setProvider,
        handleConnect,
        dappInnContract,
        rooms,
        roomServices,
        currentTimeStamp,
        dappError
    } as DappContextProps

    return (
        <DappContext.Provider value={value}>
            {children}
        </DappContext.Provider>
    )
}

export const useDappContext = () => useContext(DappContext)

