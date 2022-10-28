#!/usr/bin/env node
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'
import symbols from 'log-symbols';
import { resolve } from './utils'
export const del = async () => {
  const template = import(resolve('../template'))
  let templateObj = await template
  templateObj = templateObj.default
  const question = [
    {
      name: "name",
      message: "请输入要删除的模板名称",
      validate(val) {
        if (val === '') {
          return 'Name is required!'
        } else if (!templateObj[val]) {
          return 'Template does not exist!'
        } else {
          return true
        }
      }
    }
  ]
  const answers = await inquirer.prompt(question)
  const { name } = answers ||{};
  delete templateObj[name]
  fs.writeFile(resolve('../template.json'), JSON.stringify(templateObj,null,2), 'utf-8', err => {
    if (err) console.log(err)
    console.log('\n')
    console.log(symbols.success, chalk.green('Deleted successfully!\n'))
    console.log(chalk.grey('The latest template list is: \n'))
    console.log(templateObj)
    console.log('\n')
  })
}

