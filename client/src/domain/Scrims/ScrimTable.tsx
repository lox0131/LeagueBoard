import { Props } from "framer-motion/types/types";
import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { getUserNameBySummonerName } from "../../api/friendApi";

const ScrimTable: React.FC<Props> = ({ scrimData }) => {
  const [playerArr, setPlayerArr] = useState<any[]>([]);
  const [playerObjArr, setPlayerObjArr] = useState<any[]>([]);

  useEffect(() => {
    let localPlayerArr: any = [];
    if (scrimData) {
      for (const [key, value] of Object.entries(scrimData)) {
        if (key.includes("play")) {
          localPlayerArr = [...localPlayerArr, value];
        }
      }
      setPlayerArr(localPlayerArr);
    }
    let localPlayerObjArr: any = [];
    if (localPlayerArr.length) {
      console.log("HERE");
      localPlayerArr.forEach((player) => {
        getUserNameBySummonerName(player).then((res) => {
          localPlayerObjArr.push(res);
        });
      });
    }
    setPlayerObjArr(localPlayerObjArr);
  }, [scrimData]);

  console.log(playerObjArr, "playerobjarr");

  return (
    <Table>
      <Thead align="left">
        <Tr>
          <Th>Summoner</Th>
          <Th>Rank</Th>
          <Th>Tier</Th>
          <Th>Win/Loss</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          playerObjArr && playerObjArr?.forEach((player) => {
            {console.log("WTF")}
            <Tr>
              <Td>{player.summoner_name}</Td>
              <Td>What</Td>
            </Tr>
          })}
        <Tr>
          {/* {scrimData?.forEach((scrim) => {
            <Td>{scrim?.player.rank}</Td>;
          })} */}
        </Tr>
        <Tr>
          {/* {scrimData?.forEach((scrim) => {
            <Td>{scrim.player.winsloss}</Td>;
          })} */}
        </Tr>
        <Tr>{/* {scrimData?.win} */}</Tr>
      </Tbody>
    </Table>
  );
};

export default ScrimTable;
