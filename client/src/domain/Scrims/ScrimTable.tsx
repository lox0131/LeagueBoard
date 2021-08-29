import { Props } from "framer-motion/types/types";
import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const ScrimTable: React.FC<Props> = ({ scrimData }) => {
  console.log("SCRIMDATA: ", scrimData);

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
      console.log(localTeamRanks);
      setTeamNames([...localTeam]);
      setTeamRanks([...localTeamRanks]);
    }
  }, [scrimData]);

  const renderTable = () => {
    console.log("TEAMRANKS: ", teamRanks)
   return teamNames.map((member, i) => {
      return (
        <Tr>
          <Td>{member.name}</Td>
          <Td>{teamRanks[i][0] ? teamRanks[i][0].rank : "Unranked"}</Td>
          <Td>{teamRanks[i][0] ? teamRanks[i][0].tier : "Unranked"}</Td>
          <Td>{teamRanks[i][0] ? (teamRanks[i][0].wins / teamRanks[i][0].losses).toFixed(2) : "Unranked"}</Td>
        </Tr>
      );
    });
  };

  console.log(teamRanks, "team1names");

  if (!loading) {
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
          {renderTable()}
        </Tbody>
      </Table>
    );
  } else return <p>Loading...</p>;
};

export default ScrimTable;
