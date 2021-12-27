import CustomTerminal from './terminal.js';
import IncomeService from './service/IncomeService.js';
import chalk from 'chalk';

const VOCABULARY = {
  STOP: ':q',
};

const terminal = new CustomTerminal();
terminal.initialize();

const service = new IncomeService();

async function mainLoop() {
  try {
    terminal.printTable()
    const message = await terminal.message('Qual o seu cargo e pretensão salarial em BRL?', '> Insira: ')
    if(message === VOCABULARY.STOP) {
      terminal.close()
      return
    }
    const income = await service.generateIncomeFromString(message)
    terminal.updateTable(income)
    return mainLoop()
  } catch (error) {
    console.log(chalk.red(`\n  Error@mainLoop: ${error.message}`))
    return mainLoop()
  }
}

await mainLoop();
