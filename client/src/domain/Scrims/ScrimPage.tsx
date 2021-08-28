import {
  Flex,
  Heading,
  useColorModeValue,
  Divider,
  Text
} from "@chakra-ui/react";
import NewSearchBar from "../../components/Searchbar/NewSearchBar"
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchScrimmages } from "../../redux/slices/scrimmageSlice";
import { useEffect } from "react";
import ScrimItem from "./ScrimItem"
import CreateScrimButton from "./CreateScrimButton"
import { v4 as uuidv4 } from "uuid";

interface Props {

}

const ScrimPage: React.FC<Props> = () => {

  const dispatch = useAppDispatch()
  const scrims:any = useAppSelector((state) => state.scrimmageSlice.scrimmages);

  useEffect(() => {
    dispatch(fetchScrimmages());
  }, [dispatch]);

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    return (
        <>
        <Flex w="100%" alignItems="center" justifyContent="center" flexDirection="column" padding="10px">
            <Heading  color={useColorModeValue("#1b2845", "#bdd4e7")}>Upcoming Matches</Heading>
            <CreateScrimButton />
            <NewSearchBar  />
            </Flex>
             <Flex  flexDirection="column">
            {scrims?.map(scrim =>{
            let d = new Date(scrim?.date)
            let dayName = days[d.getDay()]
            let dates = (d.toString().slice(4,10))
            return(<>
            <Flex>
            <Heading as="h4" size="md" textAlign="left" padding="15px" paddingTop="20px">{dayName} - </Heading>
            <Text  paddingTop="20px"> {dates} </Text>
            </Flex>
                <Divider />
                <ScrimItem scrim={scrim} key={uuidv4()}/>
                <Divider  mt={3}/>
            </>)}
            )}
            </Flex>
        </>
    )
}

export default ScrimPage
