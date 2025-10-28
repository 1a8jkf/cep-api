const NodeCache = require('node-cache');
const Redis = require('ioredis');

const CACHE_TTL = Number(process.env.CACHE_TTL) || 300;
const REDIS_URL = process.env.REDIS_URL || '';

let cacheClient = null;
let type = 'memory';

if (REDIS_URL) {
  try {
    const redis = new Redis(REDIS_URL);
    // test connection
    redis.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.error('Redis error, falling back to memory cache:', err.message);
    });
    cacheClient = {
      async get (key) {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
      },
      async set (key, value, ttl = CACHE_TTL) {
        await redis.set(key, JSON.stringify(value), 'EX', ttl);
      }
    };
    type = 'redis';
    // eslint-disable-next-line no-console
    console.log('Using Redis cache');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to initialize Redis, using memory cache:', err.message);
    cacheClient = null;
  }
}

if (!cacheClient) {
  const nodeCache = new NodeCache({ stdTTL: CACHE_TTL });
  cacheClient = {
    async get (key) {
      return nodeCache.get(key) || null;
    },
    async set (key, value, ttl = CACHE_TTL) {
      nodeCache.set(key, value, ttl);
    }
  };
  type = 'memory';
  // eslint-disable-next-line no-console
  console.log('Using in-memory cache');
}

module.exports = {
  client: cacheClient,
  type,
  ttl: CACHE_TTL
};
