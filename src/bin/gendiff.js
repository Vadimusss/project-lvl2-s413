#!/usr/bin/env node
import commander from 'commander';

commander
  .version('1.1.9')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);
