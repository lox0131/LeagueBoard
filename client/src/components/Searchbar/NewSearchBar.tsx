import {
  InputGroup,
  InputLeftAddon,
  Input,
  Flex,
  useColorModeValue
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface Props {

}

const NewSearchBar: React.FC<Props> = () => {
    return (
         <Flex w="70%" mb={6} >
          <InputGroup size="sm" >
            <InputLeftAddon borderRadius="10px" children={<SearchIcon color="black" />} />
            <Input borderRadius="10px" type="tel" placeholder="Search" backgroundColor={useColorModeValue("#F0F8FF", "gray.900")} />
          </InputGroup>
        </Flex>
    )
}

export default NewSearchBar