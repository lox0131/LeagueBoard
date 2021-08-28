import {
  Flex,
  Text,
} from "@chakra-ui/react";

interface Props {
 scrim : any
}

const Teams: React.FC<Props> = ({ scrim }) => {
    return (
        <Flex justifyContent="center" alignItems="center">
           <Text>{scrim.team1Name} </Text>
           <Text padding="20px"> VS </Text>
           <Text>{scrim.team2Name} </Text>
        </Flex>
    )
}

export default Teams
