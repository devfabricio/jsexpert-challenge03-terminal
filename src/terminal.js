import DraftLog from 'draftlog';
import chalkTable from 'chalk-table';
import chalk from 'chalk';
import readline from 'readline';
import terminalConfig from './config/terminal.js';
import Income from './entity/Income.js';
import messages from './config/messages.js';
const { success : { registerInserted } } = messages

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

  initTable(database = []) {
    const data = database.map(item => new Income(item).format())
    this.print = console.draft
    this.data = data    
  }

  updateTable(income) {
    this.data.push(new Income(income).format())
    console.log(chalk.green(`\n  ${registerInserted}`))
    
  }

  printTable() {
    this.print(chalkTable(TABLE_OPTIONS, this.data))
  }

  message(description, label = '') {
    if(description) console.log(`\n${description}`)
    return new Promise(resolve => this.terminal.question(label, resolve))
  }

  close() {
    this.terminal.close()
  }

  // TODO: You'll need more methods down here as well, be creative
}

export default CustomTerminal;
