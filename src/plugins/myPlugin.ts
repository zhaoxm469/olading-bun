import { plugin, type BunPlugin } from "bun";
import { existsSync,mkdirSync } from "fs"

const myPlugin: BunPlugin = {
  name: "Custom loader",
  async setup(build) {
    const isExistFilesDemo = existsSync(process.cwd() + '/files')
    if (!isExistFilesDemo) {
        console.log('不存在创建目录')
        mkdirSync(process.cwd() + '/files/boss',{ recursive: true })
        mkdirSync(process.cwd() + '/files/admin',{ recursive: true })
        mkdirSync(process.cwd() + '/files/demo',{ recursive: true })
    } 
  },
};

plugin(myPlugin);