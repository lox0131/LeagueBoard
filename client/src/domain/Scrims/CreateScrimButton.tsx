import { Button, Input, useColorModeValue, Icon } from "@chakra-ui/react";
import { IoMdCreate } from "react-icons/io";
import { useHistory } from "react-router";

const CreateScrimButton: React.FC = () => {

  let history = useHistory();

  return (
    <Button
      size="lg"
      boxShadow="lg"
      colorScheme={useColorModeValue("#F0F8FF", "black")}
      onClick={() => history.push("/scrims/create")}
      mb={4}
      padding="30px"
      w="70%"
    >
      <Icon
        as={IoMdCreate}
        color={useColorModeValue("Black", "white")}
        marginRight="10px"
      />
      <Input
        size="sm"
        backgroundColor={useColorModeValue("#F0F8FF", "gray.900")}
        borderRadius="10px"
        type="tel"
        placeholder="Orgainze Scrim"
      />
    </Button>
  );
};

export default CreateScrimButton;