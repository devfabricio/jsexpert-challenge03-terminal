import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import readline from 'readline';
import sinon from 'sinon'
import CustomTerminal from '../../src/terminal.js';

describe('Terminal Suite Tests', () => {
    let terminal = {};
  
    beforeEach(() => {
      terminal = new CustomTerminal();
    });

    it('should terminal starts with empty values on data, print and terminal properties before initialize', () => {
        expect(terminal.data).to.be.deep.equal([]);
        expect(terminal.print).to.be.deep.equal({});
        expect(terminal.terminal).to.be.deep.equal(undefined);
      })
    
    it('should terminal set values on data, print and terminal properties after initialize', () => {
        terminal.initialize()
        expect(typeof terminal.print).to.be.deep.equal("function");
        expect(terminal.print.name).to.be.deep.equal("draft");
        expect(terminal.terminal instanceof readline.Interface).to.be.true;
        terminal.close()
    })

    it('should call printTable method once on init table', () => {
      const spy = sinon.spy(terminal, terminal.printTable.name)
      terminal.initTable()
      expect(spy.callCount).to.be.deep.equal(1)
    })

    it('should call formatIncome method once on update table', () => {
      const income = {
        position: 'Senior Developer',
        expectation: { currency: 'BRL', language: 'pt-BR', value: 12000 },
        conversion01: { currency: 'USD', language: 'en-US', value: 2088.696 },
        conversion02: { currency: 'EUR', language: 'en-GB', value: 1852.104 },
        conversion03: { currency: 'RUB', language: 'ru-RU', value: 154441.356 }
      }
      const spy = sinon.spy(terminal, terminal.formatIncome.name)
      terminal.updateTable(income)
      expect(spy.callCount).to.be.deep.equal(1)
    })

    it('should push a new income with correct data after update table', () => {
        const income = {
          position: 'Senior Developer',
          expectation: { currency: 'BRL', language: 'pt-BR', value: 12000 },
          conversion01: { currency: 'USD', language: 'en-US', value: 2088.696 },
          conversion02: { currency: 'EUR', language: 'en-GB', value: 1852.104 },
          conversion03: { currency: 'RUB', language: 'ru-RU', value: 154441.356 }
        }
        terminal.updateTable(income)
        expect(terminal.data).to.be.deep.equal([
            {
              id: undefined,
              position: 'Senior Developer',
              expectation: 'R$ 12.000,00',
              conversion01: '$2,088.70',
              conversion02: '€1,852.10',
              conversion03: '154 441,36 ₽'
            }
        ]);
    })
  });