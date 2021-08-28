import {
  Flex,
  Heading
} from "@chakra-ui/react";
import { getHours } from "../../utils/romanToNum";

interface Props {
 scrim : any
}

const Time: React.FC<Props> = ({ scrim }) => {
    const times = (getHours(scrim.time))
    return (
        <Flex justifyContent="center" h="100%" mt={8} paddingLeft="20px">
           <Heading>{times[0]}</Heading>
            <Heading as="h6" size="xs" mt={2}>{times[1]}</Heading>
        </Flex>
    )
}

export default Time
