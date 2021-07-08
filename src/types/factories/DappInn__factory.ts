/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DappInn, DappInnInterface } from "../DappInn";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_roomNumber",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "_timeToStay",
        type: "uint8",
      },
    ],
    name: "checkIn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_roomNumber",
        type: "uint8",
      },
    ],
    name: "checkOut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getTimeStamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numberOfRooms",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "rooms",
    outputs: [
      {
        internalType: "enum DappInn.RoomStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "guest",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "checkoutDate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052600a6000806101000a81548160ff021916908360ff16021790555034801561002b57600080fd5b50610b898061003b6000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80630fb15cc61461005c5780637b5212691461008e57806399d568b3146100aa578063d3c0a6a2146100c8578063da235b22146100e4575b600080fd5b610076600480360381019061007191906106b7565b610102565b604051610085939291906108be565b60405180910390f35b6100a860048036038101906100a391906106b7565b610159565b005b6100b26103c9565b6040516100bf91906109b0565b60405180910390f35b6100e260048036038101906100dd91906106e0565b6103da565b005b6100ec61069a565b6040516100f99190610995565b60405180910390f35b60016020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905083565b3373ffffffffffffffffffffffffffffffffffffffff16600160008360ff1660ff16815260200190815260200160002060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610203576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101fa906108f5565b60405180910390fd5b60018081111561023c577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600160008360ff1660ff16815260200190815260200160002060000160009054906101000a900460ff16600181111561029e577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b146102de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102d590610975565b60405180910390fd5b6000600160008360ff1660ff16815260200190815260200160002060000160006101000a81548160ff02191690836001811115610344577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055506000600160008360ff1660ff16815260200190815260200160002060000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555042600160008360ff1660ff1681526020019081526020016000206001018190555050565b60008054906101000a900460ff1681565b60008054906101000a900460ff1660ff168260ff161061042f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161042690610915565b60405180910390fd5b60008160ff1611610475576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161046c90610935565b60405180910390fd5b600160008360ff1660ff1681526020019081526020016000206001015442111561057657600060018111156104d3577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600160008460ff1660ff16815260200190815260200160002060000160009054906101000a900460ff166001811115610535577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14610575576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161056c90610955565b60405180910390fd5b5b60018060008460ff1660ff16815260200190815260200160002060000160006101000a81548160ff021916908360018111156105db577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b021790555033600160008460ff1660ff16815260200190815260200160002060000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600042905060005b8260ff168160ff16101561067357603c8261065e91906109dc565b9150808061066b90610aa0565b915050610643565b5080600160008560ff1660ff16815260200190815260200160002060010181905550505050565b600042905090565b6000813590506106b181610b3c565b92915050565b6000602082840312156106c957600080fd5b60006106d7848285016106a2565b91505092915050565b600080604083850312156106f357600080fd5b6000610701858286016106a2565b9250506020610712858286016106a2565b9150509250929050565b61072581610a32565b82525050565b61073481610a8e565b82525050565b60006107476017836109cb565b91507f796f7520617265206e6f7420696e2074686520726f6f6d0000000000000000006000830152602082019050919050565b60006107876019836109cb565b91507f5468697320726f6f6d20646f6573206e6f7420657869737473000000000000006000830152602082019050919050565b60006107c76024836109cb565b91507f596f75206861766520746f2073746179206174206c65617374206f6e6520706560008301527f72696f64000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b600061082d6015836109cb565b91507f5468697320726f6f6d206973206f6363757069656400000000000000000000006000830152602082019050919050565b600061086d6019836109cb565b91507f5468697320726f6f6d206973206e6f74206f63637570696564000000000000006000830152602082019050919050565b6108a981610a77565b82525050565b6108b881610a81565b82525050565b60006060820190506108d3600083018661072b565b6108e0602083018561071c565b6108ed60408301846108a0565b949350505050565b6000602082019050818103600083015261090e8161073a565b9050919050565b6000602082019050818103600083015261092e8161077a565b9050919050565b6000602082019050818103600083015261094e816107ba565b9050919050565b6000602082019050818103600083015261096e81610820565b9050919050565b6000602082019050818103600083015261098e81610860565b9050919050565b60006020820190506109aa60008301846108a0565b92915050565b60006020820190506109c560008301846108af565b92915050565b600082825260208201905092915050565b60006109e782610a77565b91506109f283610a77565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610a2757610a26610aca565b5b828201905092915050565b6000610a3d82610a57565b9050919050565b6000819050610a5282610b28565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b6000610a9982610a44565b9050919050565b6000610aab82610a81565b915060ff821415610abf57610abe610aca565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028110610b3957610b38610af9565b5b50565b610b4581610a81565b8114610b5057600080fd5b5056fea264697066735822122063d2dc7a153c3915bde141bdfb42e13f1237a5f88d69d050cbbc0982c429f58b64736f6c63430008000033";

export class DappInn__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DappInn> {
    return super.deploy(overrides || {}) as Promise<DappInn>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DappInn {
    return super.attach(address) as DappInn;
  }
  connect(signer: Signer): DappInn__factory {
    return super.connect(signer) as DappInn__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DappInnInterface {
    return new utils.Interface(_abi) as DappInnInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DappInn {
    return new Contract(address, _abi, signerOrProvider) as DappInn;
  }
}
