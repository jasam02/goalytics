const axios = require('axios');

const api = axios.create({
  baseURL: process.env.GAMEFORECAST_BASE_URL,
  timeout: 15000,
  headers: {
    'x-rapidapi-key': process.env.GAMEFORECAST_API_KEY || '',
    'x-rapidapi-host': process.env.GAMEFORECAST_API_HOST || 'game-forecast-api.p.rapidapi.com',
  },
});

async function getSports() {
  const { data } = await api.get('/sports');
  return data;
}

async function getLeagues(params = {}) {
  const { data } = await api.get('/leagues', { params });
  return data;
}

async function getTeams(params = {}) {
  const { data } = await api.get('/teams', { params });
  return data;
}

async function getEvents(params = {}) {
  const { data } = await api.get('/events', { params });
  return data;
}

module.exports = {
  getSports,
  getLeagues,
  getTeams,
  getEvents,
};