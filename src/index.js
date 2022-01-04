import CustomTerminal from './terminal.js';
import IncomeService from './service/IncomeService.js';
import chalk from 'chalk';
import messages from './config/messages.js';
const { success : { registerInserted } } = messages

const VOCABULARY = {
  STOP: ':q',
};

const terminal = new CustomTerminal();
terminal.initialize();

const service = new IncomeService();

async function mainLoop() {
  try {
    const message = await terminal.message({ label: '> Insira: ', description: 'Qual o seu cargo e pretensão salarial em BRL?' })
    if(message === VOCABULARY.STOP) {
      terminal.close()
      return
    }
    const income = await service.generateIncomeFromString(message)
    terminal.updateTable(income)
    console.log(chalk.green(`\n  ${registerInserted}`))
  } catch (error) {
    console.log(chalk.red(`\n  Error@mainLoop: ${error.message}`))
  }
  terminal.printTable()
  return mainLoop()
}

await mainLoop();
