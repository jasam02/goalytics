const axios = require('axios');

const api = axios.create({
  baseURL: process.env.FOOTBALL_DATA_BASE_URL || 'https://api.football-data.org/v4',
  headers: {
    'X-Auth-Token': process.env.FOOTBALL_DATA_TOKEN || '',
  },
  timeout: 15000,
});

async function getCompetitionMatches({ season, stage, status, matchday, group } = {}) {
  const params = {};

  if (season) params.season = season;
  if (stage) params.stage = stage;
  if (status) params.status = status;
  if (matchday) params.matchday = matchday;
  if (group) params.group = group;

  const competitionCode = process.env.COMPETITION_CODE || 'WC';

  const { data } = await api.get(`/competitions/${competitionCode}/matches`, {
    params,
  });

  return data;
}

module.exports = {
  getCompetitionMatches,
};