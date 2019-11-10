const express = require('express');
const redis = require('async-redis');

const app = express();

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

client.set('visits', 0);

app.get('/', async (req, res) => {
  const visits = await client.get('visits');
  res.send(`No of visits: ${visits}`);
  
  client.set('visits', parseInt(visits) + 1);
})


async function initiate() {
  app.listen('8080', () => {
    console.log('listening on port 8080');
  })
}

initiate();
