const axios = require('axios');

/**
 * Consulta ViaCEP por CEP (8 dígitos).
 * Retorna o JSON do ViaCEP ou lança erro.
 */
async function fetchCep (cep) {
  try {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const resp = await axios.get(url, { timeout: 5000 });
    if (resp.data && resp.data.erro) {
      const error = new Error('CEP não encontrado no ViaCEP');
      error.status = 404;
      throw error;
    }
    return resp.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      const e = new Error('CEP não encontrado no ViaCEP');
      e.status = 404;
      throw e;
    }
    // other network / timeout errors
    const e = new Error('Erro ao consultar ViaCEP');
    e.details = err.message;
    e.status = 502;
    throw e;
  }
}

module.exports = {
  fetchCep
};
