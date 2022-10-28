#!/usr/bin/env node
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'
import symbols from 'log-symbols';
import { resolve } from './utils'
export const add = async () => {
  const template = import(resolve('../template'))
  let templateObj = await template
  templateObj = templateObj.default
  const question = [
    {
      name: "name",
      type: 'input',
      message: "请输入模板名称",
      validate: (val) => {
        if (val === '') {
          return 'Name is required!'
        } else if (templateObj[val]) {
          return 'Template has already existed!'
        } else {
          return true
        }
      }
    },

    {
      name: "url",
      type: 'input',
      message: "请输入模板地址",
      validate: (val) => {
        if (val === '') return 'The url is required!'
        return true
      }
    },

    {
      name: "description",
      type: 'input',
      message: "请输入模板描述",
      validate: (val) => {
        if (val.length >= '70') return 'The description is more than 70 characters!'
        return true
      }
    }
  ]

  const answers = await inquirer.prompt(question)
  const { name, url, description } = answers || {};
  templateObj[name] = {
    url,
    description
  }

  fs.writeFile(resolve('../template.json'), JSON.stringify(templateObj, null, 2), 'utf-8', err => {
    if (err) console.log(err)
    console.log('\n')
    console.log(symbols.success, chalk.green('Added successfully!\n'))
    console.log(chalk.grey('The latest template list is: \n'))
    console.log(templateObj)
    console.log('\n')
  })
}
