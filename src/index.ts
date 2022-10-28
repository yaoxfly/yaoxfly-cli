#!/usr/bin/env node
import { Command } from 'commander'
import chalk from 'chalk'
import { create } from './create'
import { add } from './add'
import { list } from './list'
import { del } from './delete'
const program = new Command()
program
  .version(require('../version').version)
  .name('yx-cli')

program
  .command('create <project-name>')
  .description('Create a new project')
  .option('-f --force', 'If it exist, overwrite directory')
  .action((projectName: string, options: any) => {
    create(projectName, options)
  })

program
  .command('add')
  .description('Add a new template')
  .action(() => {
    add()
  })

program
  .command('list')
  .description('List all the template')
  .action(() => {
    list()
  })

program
  .command('delete')
  .description('Delete a template')
  .action(() => {
    del()
  })

program.on('--help', () => {
  console.log(`\r\n Run ${chalk.green(`yx-cli <command> --help`,)} to understand the details\r\n `)
})

program.parse(process.argv)
