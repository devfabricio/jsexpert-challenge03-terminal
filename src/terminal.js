import DraftLog from 'draftlog';
import chalkTable from 'chalk-table';
import readline from 'readline';
import terminalConfig from './config/terminal.js';
import Income from './entity/Income.js';

const TABLE_OPTIONS = terminalConfig.table;

class CustomTerminal {
  constructor() {
    this.print = {};
    this.data = [];
  }

  initialize() {
    console.info('\n🚀 Running...\n');
    DraftLog.into(console).addLineListener(process.stdin)
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    this.initTable()
  }

  initTable() {
    this.print = console.draft
    this.printTable()
  }

  updateTable(income) {
    this.data.push(this.formatIncome(income))
  }

  printTable() {
    this.print(chalkTable(TABLE_OPTIONS, this.data))
  }

  message({ label = '', description }) {
    if(description) console.log(`\n${description}`)
    return new Promise(resolve => this.terminal.question(label, resolve))
  }

  formatIncome(income) {
    return new Income(income).format()
  }

  close() {
    this.terminal.close()
  }
}

export default CustomTerminal;
