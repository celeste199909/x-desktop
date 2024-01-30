// 加载 ../../../../assets/apps/ 下的应用
const { readdirSync } = require('fs')

const iconImagesPath = 'src/assets/apps'
const result = readdirSync(iconImagesPath)
    .map(item => item.replace(/\.png$/, ''))

// 拼接成字符串并写入src/data/iconImagesInfo.js
const fs = require('fs')
const path = require('path')
const filePath = path.resolve(__dirname, './src/data/iconImagesInfo.js')
const fileContent = `export default ${JSON.stringify(result)}`
fs.writeFileSync(filePath, fileContent)


console.log('%c [ result ]-6', 'font-size:13px; background:pink; color:#bf2c9f;', result)
