import IncomeRepository from './../repository/IncomeRepository.js';
import Income from './../entity/Income.js';

class IncomeService {
  constructor({ incomeRepository } = {}) {
    this.incomeRepository = incomeRepository || new IncomeRepository();
  }

  async generateIncomeFromString(incomeString, delimiter = ';') {
    const [position, expectation] = incomeString.split(delimiter);
    if(!position) {
      throw new Error('Position is a required field. Please make sure you are providing a position.')
    }
    if(Number.isNaN(+expectation)) {
      throw new Error('A valid Expectation is required. Please note that only numbers are allowed.')
    }
    const conversions = await this.incomeRepository.getConversions()
    return {
      position: position,
      expectation: {
        currency: 'BRL',
        language: 'pt-BR',
        value: +expectation,
      },
      conversion01: {
        currency: 'USD',
        language: 'en-US',
        value: conversions['USD'] * expectation,
      },
      conversion02: {
        currency: 'EUR',
        language: 'en-GB',
        value: conversions['EUR'] * expectation,
      }, 
      conversion03: {
        currency: 'RUB',
        language: 'ru-RU',
        value: conversions['RUB'] * expectation,
      },
    };
  }
}

export default IncomeService;
