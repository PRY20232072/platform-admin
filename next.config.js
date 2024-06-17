/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  output: 'standalone',
  env: {
    AZURE_AD_B2C_TENANT_NAME: process.env.AZURE_AD_B2C_TENANT_NAME,
    AZURE_AD_B2C_TENANT_ID: process.env.AZURE_AD_B2C_TENANT_ID,
    AZURE_AD_B2C_CLIENT_ID: process.env.AZURE_AD_B2C_CLIENT_ID,
    EXTENSION_APP_CLIENT_ID: process.env.EXTENSION_APP_CLIENT_ID,
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];  // required to make Konva & react-konva work
    return config;
  },
}

module.exports = nextConfig
