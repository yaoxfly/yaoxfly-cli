import {PathOrFileDescriptor,readFileSync} from 'fs'
import ora from 'ora'
import { exec } from 'child_process'
import path  from 'path'
/**@description 读取文件,并解析JSON。
 * @author yx
 * @param  {String}  filePath 文件路径
 */
export const readFile = (filePath: PathOrFileDescriptor) => {
  const file = readFileSync(filePath)
  return JSON.parse(file.toString())
}

type Config = {
  directive?: string
  cwd?: string
  loading?: string
  log?: string
}

/**@description 执行shell指令，添加了提示，并返回promise。
 * @author yx
 * @param  {Object}  config 配置
 * @example 
 * shellExec({
          directive: 'npm i',
          cwd: 'test',
          loading: 'loading...',
          log: `npm i`
   })
 */
export const shellExec = (config: Config) => {
  const { directive, cwd, loading, log } = config || {}
  return new Promise((resolve, reject) => {
    console.log(`\n ${log} \n`)
    const spinner = ora(loading);
    spinner.start();
    exec(directive, { cwd }, (error, stdout) => {
      if (error) {
        spinner.fail();
        console.error(error);
        reject(error)
        return;
      }
      resolve(stdout)
      spinner.succeed();
    });
  })
}


/**@description 将路径或路径片段的序列解析为绝对路径。
 * @author yx
 * @param  {string}  file 可多个路径
 */
export const resolve = (...file) => path.resolve(__dirname, ...file)
