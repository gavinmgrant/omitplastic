/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.wasm$/,
      type: "javascript/auto",
      loader: "file-loader",
      options: {
        publicPath: "static/wasm/",
        outputPath: "static/wasm/",
      },
    })
    return config
  },
}

module.exports = nextConfig
