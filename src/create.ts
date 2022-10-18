const template = import(`${__dirname}/../template`)
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'
import ora from 'ora'
import download from 'download-git-repo'
import symbols from 'log-symbols';
const readFileSync = (filePath) => {
  const file = fs.readFileSync(filePath)
  return JSON.parse(file.toString())
}
export const create = async (projectName: string, options: any) => {
  const { force } = options || {}
  if (!force && fs.existsSync(projectName)) {
    console.log(chalk.red("项目已存在"))
    return
  }

  const templateObj = await template
  const choices = []
  Object.keys(templateObj.default).forEach(key => { choices.push(key) })
  const param = [
    {
      type: 'list',
      message: '请选择一个模板',
      name: 'templateName',
      choices: choices,
    }
  ]
  const answers = await inquirer.prompt(param)
  const { templateName } = answers || {}
  const url= templateObj[templateName]
  const direct=  url.split(':')[0]==='direct'
  
  if(direct  && fs.existsSync(projectName)){
    console.log(chalk.red("项目已存在，direct方式不可强制覆盖"))
    return
  }

  console.log(chalk.white('\n Start generating... \n'))
  const spinner = ora("Downloading...");
  spinner.start();

  download(
   url,
    projectName,
    { clone:  direct },
    err => {
      if (err) {
        spinner.fail();
        console.log(chalk.red(`Generation failed. ${err}`))
        return
      }
      spinner.succeed();
      console.log(symbols.success, chalk.green('项目初始化完毕'));
      console.log('\n To get started')
      console.log(`\n cd ${templateName}`)
      console.log(`\n npm i `)
      console.log(`\n npm run serve`)
    }
  )
}
