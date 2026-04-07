const express = require('express');
const { getCompetitionMatches } = require('../services/footballData.service');

const router = express.Router();

function formatKickoff(utcDate) {
  return utcDate || '';
}

function mapMatch(match) {
  return {
    id: match.id,
    stage: match.stage || 'Match',
    kickoff: formatKickoff(match.utcDate),
    stadium: match.venue || 'TBD',
    city: '',
    homeTeam: match.homeTeam?.name || 'TBD',
    awayTeam: match.awayTeam?.name || 'TBD',
    homeLogo: match.homeTeam?.crest || '',
    awayLogo: match.awayTeam?.crest || '',
    homeFlag: '',
    awayFlag: '',
    homeScore: match.score?.fullTime?.home ?? null,
    awayScore: match.score?.fullTime?.away ?? null,
    status: match.status || '',
    group: match.group || '',
    matchday: match.matchday || null,
    homeWinProbability: null,
    awayWinProbability: null,
    drawProbability: null,
    homeForm: '',
    awayForm: '',
    headline: '',
  };
}

router.get('/matches', async (req, res) => {
  try {
    const raw = await getCompetitionMatches({
      season: req.query.season || process.env.SEASON,
      stage: req.query.stage,
      status: req.query.status,
      matchday: req.query.matchday,
      group: req.query.group,
    });

    const matches = (raw.matches || []).map(mapMatch);
    res.json(matches);
  } catch (error) {
    console.error('FOOTBALL-DATA MATCHES ERROR');
    console.error(error.response?.status);
    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: 'Failed to fetch World Cup matches',
      details: error.response?.data || error.message,
    });
  }
});

router.get('/debug/raw-matches', async (req, res) => {
  try {
    const raw = await getCompetitionMatches({
      season: req.query.season || process.env.SEASON,
    });

    res.json(raw);
  } catch (error) {
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;