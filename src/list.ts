#!/usr/bin/env node
import {resolve } from './utils'
import chalk from 'chalk'
export const list =async ()=>{
  const template = import(resolve('../template'))
  const templateObj = await template
  console.log(chalk.grey('The template list is: \n'))
  console.log(templateObj.default)
}
