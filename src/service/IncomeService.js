import IncomeRepository from './../repository/IncomeRepository.js';
import messages from '../config/messages.js';
const { error : { invalidExpectation, invalidPosition } } = messages

class IncomeService {
  constructor({ incomeRepository } = {}) {
    this.incomeRepository = incomeRepository || new IncomeRepository();
  }

  async generateIncomeFromString(incomeString, delimiter = ';') {
    const [position, expectation] = incomeString.split(delimiter);
    if(this.isValidData(position, expectation)) {
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

  isValidData(position, expectation) {
    if(!position) {
      throw new Error(invalidPosition)
    }
    if(Number.isNaN(+expectation)) {
      throw new Error(invalidExpectation)
    }
    return true
  }
}

export default IncomeService;
