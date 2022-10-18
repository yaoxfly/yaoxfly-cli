#!/usr/bin/env node
import { Command } from 'commander'
import chalk from 'chalk'
import { create } from './create'
const program = new Command()
program
  .version(require('../package').version)
  .name('yx-cli')

program
  .command('create <project-name>')
  .description('create a new project')
  .option('-f --force', 'if it exist, overwrite directory')
  .action((projectName: string, options: any) => {
    create(projectName, options)
  })


program.on('--help', () => {
  console.log(`\r\n Run ${chalk.green(`yx-cli <command> --help`,)} to understand the details\r\n `)
})

program.parse(process.argv)
