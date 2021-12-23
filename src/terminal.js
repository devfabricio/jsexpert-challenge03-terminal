import DraftLog from 'draftlog';
import chalkTable from 'chalk-table';
import chalk from 'chalk';
import readline from 'readline';
import terminalConfig from './config/terminal.js';

const TABLE_OPTIONS = terminalConfig.table;

class CustomTerminal {
  constructor() {
    this.print = {};
    this.data = [];
  }

  initialize() {
    DraftLog(console).addLineListener(process.stdin)
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  message(text = '') {
    return new Promise(resolve => this.terminal.question(text, resolve))
  }

  close() {
    this.terminal.close()
  }

  // TODO: You'll need more methods down here as well, be creative
}

export default CustomTerminal;
