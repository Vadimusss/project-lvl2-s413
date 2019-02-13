#!/usr/bin/env node
import commander from 'commander';
import gendiff from '../gendiff';

commander
  .version('1.2.1')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .description('Compares two configuration files and shows a difference.')
  .action((firstPath, secondPath) => {
    console.log(gendiff(firstPath, secondPath));
  })
  .parse(process.argv);
