import CustomTerminal from './terminal.js';
import IncomeService from './service/IncomeService.js';

const VOCABULARY = {
  STOP: ':q',
};

const terminal = new CustomTerminal();
terminal.initialize();

const service = new IncomeService();

async function mainLoop() {
  try {
    const message = await terminal.message('> ')
    if(message === VOCABULARY.STOP) {
      terminal.close()
      return
    }
    const income = service.generateIncomeFromString(message)
    terminal.updateTable(income)
  } catch (error) {
    console.log('Error:', error)
  }
  return mainLoop()
}

await mainLoop();
