import { Divider } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const ScrimTable: React.FC<Props> = ({ scrimData }) => {

  const [loading, setLoading] = useState(true);
  const [teamNames, setTeamNames] = useState<any[]>([]);
  const [teamRanks, setTeamRanks] = useState<any[]>([]);

  useEffect(() => {
    let localTeam: any[] = [];
    let localTeamRanks: any[] = [];
    if (scrimData) {
      setLoading(false);
      for (const [key, value] of Object.entries(scrimData)) {
        if (key.includes("playerinfo")) {
          localTeam.push(value);
        }
        if (key.includes("playerranked")) {
          localTeamRanks.push(value);
        }
      }
      setTeamNames([...localTeam]);
      setTeamRanks([...localTeamRanks]);
    }
  }, [scrimData]);

  const renderTable = () => {
   return teamNames.map((member, i) => {
      return (
        <Tr align="center">
          <Td>{member.name}</Td>
          <Td>{teamRanks[i][0] ? teamRanks[i][0].rank : "Unavailable"}</Td>
          <Td>{member.summonerLevel}</Td>
          <Td>{teamRanks[i][0] ? teamRanks[i][0].tier : "Unavailable"}</Td>
          <Td>{teamRanks[i][0] ? (teamRanks[i][0].wins / teamRanks[i][0].losses).toFixed(2) : "Unavailable"}</Td>
        </Tr>
      );
    });
  };

  if (!loading) {
    return (
      <Table>
        <Thead align="center">
          <Tr>
            <Th>Summoner <Divider /></Th>
            <Th>Rank <Divider /></Th>
            <Th>Level <Divider /></Th>
            <Th>Tier <Divider /></Th>
            <Th>Win/Loss <Divider /></Th>
          </Tr>
        </Thead>
        <Tbody>
          {renderTable()}
        </Tbody>
      </Table>
    );
  } else return <p>Loading...</p>;
};

export default ScrimTable;
