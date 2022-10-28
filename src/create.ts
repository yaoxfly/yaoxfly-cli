#!/usr/bin/env node
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'
import ora from 'ora'
import download from 'download-git-repo'
import symbols from 'log-symbols';
import fse from 'fs-extra'
import { readFile, shellExec, resolve } from './utils'

type Tips = {
  projectName?: string
  install?: boolean,
  installMode?: string
}

const tips = (param: Tips) => {
  const { install, installMode = 'pnpm', projectName } = param || {}
  console.log(symbols.success, chalk.green('The project is initialized'));
  console.log('\n To get started')
  console.log(`\n cd ${projectName}`)
  !install && console.log(`\n ${installMode} install`)
  console.log(`\n ${installMode === 'yarn' ? 'yarn dev' : `${installMode} run dev`} `)
}

export const create = async (projectName: string, options: any) => {
  const { force } = options || {}
  if (!force && fs.existsSync(projectName)) {
    console.log(chalk.red("Error, In this directory, the project name already exsits !"))
    console.log(chalk.green('You can use option -f to force delete the directory except for direct mode !'));
    return
  }
  const template = import(resolve('../template'))
  const templateObj = await template
  const choices = []
  Object.keys(templateObj.default).forEach(key => {
    choices.push(`${key} (${templateObj.default[key].description})`)
  })
  const param = [
    {
      type: 'list',
      message: '请选择一个预设',
      name: 'templateName',
      choices: choices,
      filter: (val) => val.split(' ')[0]
    },
    {
      type: 'input',
      message: '请输入项目描述',
      name: 'description',
    },
    {
      type: 'input',
      message: '请输入作者名称',
      name: 'author',
    },
    {
      type: 'confirm',
      message: '请确认是否安装npm包?',
      name: 'install',

    },
    {
      type: 'list',
      message: '请选择一个安装方式',
      name: 'installMode',
      default: 'pnpm',
      choices: ['pnpm', 'npm', 'yarn'],
      when: (answers) => {
        const { install } = answers
        return install
      }
    },
  ]
  const answers = await inquirer.prompt(param)
  if (fs.existsSync(projectName)) {
    console.log(chalk.white('\n Start Delete original item... \n'))
    const spinner = ora("Delete...");
    spinner.start();
    await fse.remove(projectName)
    spinner.succeed();
  }
  const { templateName, description, author, install, installMode } = answers || {}
  const url = templateObj[templateName].url
  const direct = url.split(':')[0] === 'direct'
  console.log(chalk.white('\n Start generating... \n'))
  const spinner = ora("Downloading...");
  spinner.start();

  download(
    url,
    projectName,
    { clone: direct },
    async err => {
      if (err) {
        spinner.fail();
        console.log(chalk.red(`Generation failed. ${err}`))
        return
      }

      const meta = {
        description: description,
        name: projectName.replace(/\/|\\/g, '-'),
        author: author
      }
      const filePath = `${projectName}/package.json`;
      const packageJsonData = readFile(filePath)
      Object.assign(packageJsonData, meta)
      fs.writeFileSync(filePath, JSON.stringify(packageJsonData, null, 2))
      spinner.succeed()

      if (install) {
        const stdout = await shellExec({
          directive: `${installMode} install --force`,
          cwd: projectName,
          loading: 'Install...',
          log: `${installMode} install`
        })
        console.log(stdout);
        tips({ projectName, install, installMode })
        return
      }
      tips({ projectName, install, installMode })
    }
  )
}
