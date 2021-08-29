import { Props } from "framer-motion/types/types";
import { Box, Flex, Heading, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import ScrimTable from "./ScrimTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router";
import { useEffect } from "react";
import { fetchScrimmageById } from "../../redux/slices/scrimmageSlice";

type urlParams = {
  id: string;
};

const ScrimCard: React.FC<Props> = ({ scrim }) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const red = useColorModeValue("red.200", "red.900");
  const blue = useColorModeValue("blue.200", "blue.900");
  const scrims:any = useAppSelector((state) => state.scrimmageSlice.scrimmages);

  const { id } = useParams<urlParams>();
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchScrimmageById(+id));
  }, [dispatch, id]);

  return (
    <>
      <Box borderRadius="1px" rounded="md" direction="row" justify="center" align="center" mb={2}>
        <Heading>{scrims?.team1} vs {scrims?.team2}</Heading>
        <Heading as="h2" size="sm">Date: {scrims?.date}</Heading>
        <Heading as="h2" size="sm"> Length: {scrims?.time}</Heading>
      </Box>
      <Flex
        flexDirection={isLargerThan800 ? "row" : "column"}
        align="center"
        justify="center"
      >
        <Box
          width={isLargerThan800 ? "40%" : "70%"}
          backgroundColor={blue}
          pl={1}
          mt={1}
          pt={1}
          rounded="md"
        >
          {scrims && <ScrimTable scrimData={scrims.team1data} />}
        </Box>
        <Box
          width={isLargerThan800 ? "40%" : "70%"}
          backgroundColor={red}
          ml={2}
          mt={1}
          pl={1}
          pt={1}
          rounded="md"
        >
          {scrims && <ScrimTable scrimData={scrims.team2data}/>}
        </Box>
      </Flex>
    </>
  );
};

export default ScrimCard;