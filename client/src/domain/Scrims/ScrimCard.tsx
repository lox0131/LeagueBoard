import { Props } from "framer-motion/types/types";
import {
  Box,
  Flex,
  Heading,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import ScrimTable from "./ScrimTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchScrimmageById } from "../../redux/slices/scrimmageSlice";

type urlParams = {
  id: string;
};

const ScrimCard: React.FC<Props> = ({ scrim }) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 1200px)");
  const [winner, setWinner] = useState<number>(0);
  const red = useColorModeValue("red.200", "red.900");
  const blue = useColorModeValue("blue.200", "blue.900");

  const scrims: any = useAppSelector(
    (state) => state.scrimmageSlice.scrimmages
  );

  console.log("SCRIMS: ", scrims);

  const { id } = useParams<urlParams>();
  const dispatch = useAppDispatch();

  const winPrediction = () => {
    let localTeam1Ranks: any[] = [];
    let localTeam2Ranks: any[] = [];
    if (scrims?.team1data && scrims?.team2data) {
      for (const [key, value] of Object.entries(scrims.team1data)) {
        if (key.includes("playerranked")) {
          localTeam1Ranks.push(value);
        }
      }
      for (const [key, value] of Object.entries(scrims.team2data)) {
        if (key.includes("playerranked")) {
          localTeam2Ranks.push(value);
        }
      }
    }


    let localTeam1Wins: any[] = [1];
    localTeam1Wins = localTeam1Ranks.map((rankArr) => {
      if (rankArr && rankArr[0]) {
        return rankArr[0].wins;
      }
      return [0];
    });
    let localTeam1Losses: any[] = [0];
    localTeam1Losses = localTeam1Ranks.map((rankArr) => {
      if (rankArr[0]) {
        return rankArr[0].losses;
      }
      return [0];
    });
    let localTeam2Wins: any[] = [0];
    localTeam2Wins = localTeam2Ranks.map((rankArr) => {
      if (rankArr[0]) {
        return rankArr[0].wins;
      }
      return [0];
    });
    let localTeam2Losses: any[] = [0];
    localTeam2Losses = localTeam2Ranks.map((rankArr) => {
      if (rankArr[0]) {
        return rankArr[0].losses;
      }
      return [0];
    });

    const total1Wins = localTeam1Wins.reduce(
      (accumulator, currentValue) => accumulator + currentValue, 0
    );
    const total1Losses = localTeam1Losses.reduce(
      (accumulator, currentValue) => accumulator + currentValue, 0
    );
    const total2Wins = localTeam2Wins.reduce(
      (accumulator, currentValue) => accumulator + currentValue, 0
    );
    const total2Losses = localTeam2Losses.reduce(
      (accumulator, currentValue) => accumulator + currentValue, 0
    );
    const prediction =
      total1Wins / total1Losses > total2Wins / total2Losses ? 1 : 2;

    setWinner(prediction);
  };

  useEffect(() => {
    dispatch(fetchScrimmageById(+id)).then(() => {
      winPrediction();
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  return (
    <>
      <Flex direction="column" align="center" mb={2}>
        <Box
          borderRadius="1px"
          border="1px"
          width={isLargerThan800 ? "45%" : "100%"}
          rounded="md"
          direction="row"
          justify="center"
          align="center"
          mb={2}
          pb={2}
          borderColor="gray.500"
        >
          <Heading>
            {winner === 1 ? scrims?.team1 : scrims?.team2} vs {winner === 1 ? scrims?.team2 : scrims?.team1}
          </Heading>
          <Heading as="h2" size="sm">
            Date: {scrims?.date}
          </Heading>
          <Heading as="h2" size="sm">
            {" "}
            Time: {scrims?.time}
          </Heading>
        </Box>
      </Flex>

      <Flex
        flexDirection={isLargerThan800 ? "row" : "column"}
        align="center"
        justify="center"
      >
        <Box
          width={isLargerThan800 ? "45%" : "100%"}
          backgroundColor={blue}
          mt={1}
          pt={1}
          rounded="md"
        >
          {scrims && <ScrimTable scrimData={winner === 1 ? scrims.team1data : scrims.team2data} />}
        </Box>
        <Box
          width={isLargerThan800 ? "45%" : "100%"}
          backgroundColor={red}
          ml={2}
          mt={1}
          pt={1}
          rounded="md"
        >
          {scrims && <ScrimTable scrimData={winner === 1 ? scrims.team2data : scrims.team1data} />}
        </Box>
      </Flex>
    </>
  );
};

export default ScrimCard;
