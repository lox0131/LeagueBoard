import { Response, Request } from "express";
const { Scrimmages } = require("../Models/scrimmage.model");
import { sequelize } from "../Models/index";
import {
  getSummonerByPuuid,
  getSummonerEntriesByAccountIdAndRegion,
} from "./utils";

export const getAllScrimmages = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const scrimmages =
      await sequelize.query(`SELECT S.id as id, U.id as userid, date as date,
    "bestOf", team_name1 as "team1Name", team_name2 as "team2Name", player1, player2, player3, player4, player5,
    player6, player7, player8, player9, player10, date, time
    FROM public."Scrimmages" as S
    LEFT JOIN
    public."Users" as U
    on S.userid_posted = U.id`);

    res.json(scrimmages[0]).status(200);
  } catch (err) {
    next(err);
  }
};

export const getScrimmage = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { id } = req.params;

    let scrimmages: any =
      await sequelize.query(`SELECT S.id as scrimmageid, U.id as userid, R.code as region, date as date,
      "bestOf", team_name1 as team1, team_name2 as team2, player1,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player1))) as PUUID1,
      player2,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player2))) as PUUID2,
      player3,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player3))) as PUUID3,
      player4,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player4))) as PUUID4,
      player5,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player5))) as PUUID5,
      player6,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player6))) as PUUID6,
      player7,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player7))) as PUUID7,
      player8,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player8))) as PUUID8,
      player9,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player9))) as PUUID9,
      player10,
      (SELECT BTRIM(P.PUUID) FROM public."Users" as P WHERE BTRIM(LOWER(summoner_name)) = BTRIM(LOWER(player10))) as PUUID10, date, time
      FROM public."Scrimmages" as S
      LEFT JOIN
        public."Users" as U
          on S.userid_posted = U.id
      LEFT JOIN
        public."Regions" as R
	        on R.id = U.regionid
      WHERE S.id = ${id}`);

    scrimmages = scrimmages[0][0];
    console.log("TYPEOF ", typeof scrimmages);
    let team1obj: any = {};
    let team2obj: any = {};
    for (const [key, value] of Object.entries(scrimmages)) {
      if (
        (key.includes("player") || key.includes("puuid")) &&
        Number(key.slice(-1)) <= 5 &&
        Number(key.slice(-1)) !== 0
      ) {
        team1obj[key] = value;
        delete scrimmages[key];
      } else if (
        (key.includes("player") || key.includes("puuid")) &&
        (Number(key.slice(-1)) > 5 || Number(key.slice(-2)) === 10)
      ) {
        team2obj[key] = value;
        delete scrimmages[key];
      }
    }
    scrimmages.team1data = team1obj;
    scrimmages.team2data = team2obj;

    console.log("SCRIMMAGES: ", scrimmages);

    console.time("time");
    await retrieveAndSetRankInfoOfPlayers(scrimmages);
    console.timeEnd("timeend");

    res.json(scrimmages).status(200);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const postScrimmage = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const {
      userid,
      date,
      time,
      bestOf,
      team1Name,
      team2Name,
      player1,
      player2,
      player3,
      player4,
      player5,
      player6,
      player7,
      player8,
      player9,
      player10,
    } = req.body;

    const scrimmage = await Scrimmages.create({
      userid_posted: userid,
      date: date,
      time: time,
      bestOf: bestOf,
      team_name1: team1Name,
      team_name2: team2Name,
      player1: player1,
      player2: player2,
      player3: player3,
      player4: player4,
      player5: player5,
      player6: player6,
      player7: player7,
      player8: player8,
      player9: player9,
      player10: player10,
    });

    res.status(201);
    res.json(scrimmage);
  } catch (err) {
    next(err);
  }
};

const retrieveAndSetRankInfoOfPlayers = async (scrimmages: any) => {

  try {
  //player1
  let player = await getSummonerByPuuid(
    scrimmages.team1data.puuid1,
    scrimmages.region
  );
  scrimmages.team1data.playerinfo1 = player;
  let ranked = await getSummonerEntriesByAccountIdAndRegion(
    player.id,
    scrimmages.region
  );
  scrimmages.team1data.playerranked1 = ranked.data;

  //player2
  player = await getSummonerByPuuid(
    scrimmages.team1data.puuid2,
    scrimmages.region
  );
  scrimmages.team1data.playerinfo2 = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(
    player.id,
    scrimmages.region
  );
  scrimmages.team1data.playerranked2 = ranked.data;

  //player3
  player = await getSummonerByPuuid(
    scrimmages.team1data.puuid3,
    scrimmages.region
  );
  scrimmages.team1data.playerinfo3 = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(
    player.id,
    scrimmages.region
  );
  scrimmages.team1data.playerranked3 = ranked.data;

  //player4
  player = await getSummonerByPuuid(
    scrimmages.team1data.puuid4,
    scrimmages.region
  );
  scrimmages.team1data.playerinfo4 = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(
    player.id,
    scrimmages.region
  );
  scrimmages.team1data.playerranked4 = ranked.data;

  //player5
  player = await getSummonerByPuuid(
    scrimmages.team1data.puuid5,
    scrimmages.region
  );
  scrimmages.team1data.playerinfo5 = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(
    player.id,
    scrimmages.region
  );
  scrimmages.team1data.playerranked5 = ranked.data;

  //player6
  player = await getSummonerByPuuid(
    scrimmages.team2data.puuid6,
    scrimmages.region
  );
  scrimmages.team2data.playerinfo6 = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(
    player.id,
    scrimmages.region
  );
  scrimmages.team2data.playerranked6 = ranked.data;

  //player7
  player = await getSummonerByPuuid(
    scrimmages.team2data.puuid7,
    scrimmages.region
  );
  scrimmages.team2data.playerinfo7 = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(
    player.id,
    scrimmages.region
  );
  scrimmages.team2data.playerranked7 = ranked.data;

  //player8
  player = await getSummonerByPuuid(
    scrimmages.team2data.puuid8,
    scrimmages.region
  );
  scrimmages.team2data.playerinfo8 = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(
    player.id,
    scrimmages.region
  );
  scrimmages.team2data.playerranked8 = ranked.data;

  //player9
  player = await getSummonerByPuuid(
    scrimmages.team2data.puuid9,
    scrimmages.region
  );
  scrimmages.team2data.playerinfo9 = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(
    player.id,
    scrimmages.region
  );
  scrimmages.team2data.playerranked9 = ranked.data;

  //player10
  player = await getSummonerByPuuid(
    scrimmages.team2data.puuid10,
    scrimmages.region
  );
  scrimmages.team2data.playerinfo10 = player;
  ranked = await getSummonerEntriesByAccountIdAndRegion(
    player.id,
    scrimmages.region
  );
  scrimmages.team2data.playerranked10 = ranked.data;
  }catch(err){
    console.log("ERROR: ", err);
    return err;
  }
};
