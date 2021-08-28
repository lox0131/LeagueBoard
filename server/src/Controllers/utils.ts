require("dotenv").config();
const { RIOT_API_TOKEN } = process.env;
const axios = require("axios");
import { setupCache } from "axios-cache-adapter";

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

const header = {
  "X-Riot-Token": RIOT_API_TOKEN,
  Origin: `https://developer.riotgames.com`,
};

export const getSummonerByNameAndRegion = async (
  summoner_name: string,
  region: string
) => {
  const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_name}`;
  return await axios.get(url, {
    headers: header,
  });
};

export const getSummonerByPuuid = async (puuid: string, region: string) => {
  return api({
    headers: header,
    url: `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    method: "get",
  }).then((res: any) => res.data);
};

export const getSummonerEntriesByAccountIdAndRegion = async (
  id: string,
  region: string
) => {
  return api({
    headers: header,
    url: `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
    method: "get",
  })
};

export const getMatchesByPuuid = async (puuid: string, region: string) => {
  return api({
    headers: header,
    url: `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`,
    method: "get",
  }).then((res: any) => res.data);
};

export const getMatchInfoByMatchId = async (
  matchid: string,
  region: string
) => {
  const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchid}`;
  return await axios.get(url, {
    headers: header,
  });
};
export const getMatchInfoByMatchId2 = async (
  matchid: string,
  region: string
) => {
  const obj = await api({
      headers: header,
      url: `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchid}`,
      method: "get",
    })
  return obj.data.info;
};

// return api({
//   headers: header,
//   url: `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
//   method: "get",
// })