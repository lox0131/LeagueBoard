import {
  Flex,
  Text,
} from "@chakra-ui/react";

interface Props {
    scrim : any
}

const BestOf: React.FC<Props> = ({ scrim }) => {
    return (
        <Flex justifyContent="flex-end" paddingRight="20px" flexDirection="column">
            <Text textAlign="right">LEC</Text>
            <Text textAlign="right">Best of {scrim.bestOf}</Text>
        </Flex>
    )
}

export default BestOf
