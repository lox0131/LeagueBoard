import { Flex, useColorModeValue, Link } from "@chakra-ui/react";
import Time from "../../components/Scrim/Time"
import Teams from "../../components/Scrim/Teams"
import BestOf from "../../components/Scrim/BestOf"

interface Props {
    scrim: any
}

const ScrimItem: React.FC<Props> = ({ scrim }) => {
    const colors = useColorModeValue("gray.200", "gray.900")
    return (
    <Link href={`/wower/${scrim?.id}`}>
       <Flex mt={2} h="7vh"
       w="100%"
       justifyContent="space-between"
       alignItems="center"
        _hover={{
            bg: colors,
            boxShadow: "md",
            transform: "scale(1.01)"
        }}
        borderRadius="10px">
        <Time scrim={scrim}/>
        <Teams  scrim={scrim}/>
        <BestOf  scrim={scrim}/>
       </Flex>
       </Link>
    )
}

export default ScrimItem
