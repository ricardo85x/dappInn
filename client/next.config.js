const withImages = require('next-images')
const withSass = require('sass')

const withPlugins = require('next-compose-plugins');
const isDev = process.env.NODE_ENV !== "production";


module.exports = withPlugins([
    [withImages, {
      assetPrefix: isDev ? "": "/dappInn/",
      basePath: isDev ? "": "/dappInn"
    }],
    withSass,
    {
        trailingSlash: true,
        basePath: isDev ? "": "/dappInn",
        assetPrefix: isDev ? "": "/dappInn/"    }
])