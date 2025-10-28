const { normalizeCep } = require('../utils/validateCep');
const { fetchCep } = require('../services/viaCepService');
const cache = require('../config/cache');

const CACHE = cache.client;
const CACHE_TTL = cache.ttl;

async function handleCep (req, res, next) {
  try {
    const { cep: rawCep } = req.body || {};
    const cep = normalizeCep(String(rawCep || ''));

    if (!cep) {
      return res.status(400).json({ error: 'CEP inválido. Use 00000000 ou 00000-000' });
    }

    const cacheKey = `cep:${cep}`;

    // tenta obter do cache
    const cached = await CACHE.get(cacheKey);
    if (cached) {
      return res.json({
        fromCache: true,
        data: cached
      });
    }

    // busca no ViaCEP
    const data = await fetchCep(cep);

    // salva no cache
    await CACHE.set(cacheKey, data, CACHE_TTL);

    return res.json({
      fromCache: false,
      data
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  handleCep
};
