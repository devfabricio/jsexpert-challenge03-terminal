import http from 'http';

const API_BASE_URL = 'http://localhost:3000';

class IncomeRepository {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      http.get(url, (response) => {
        let result = ''
        response.on('data', (chunk) => {
          result += chunk
        })
        response.on('end', () => {
          resolve(JSON.parse(result))
        }).on('error', () => reject)
      })
    })
  }

  async getConversions() {
    const response = await this.makeRequest(`${API_BASE_URL}/convert`);
    return response.results
  }
}

export default IncomeRepository;
