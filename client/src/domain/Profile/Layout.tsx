import { Flex, useMediaQuery } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import ProfileMatch from "./ProfileMatch";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUserInfo, fetchUserRank } from "../../redux/slices";

interface Props {}

const Layout: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.userReducer.userState);
    const userRank = useAppSelector((state) => state.userReducer.userRank);

    const [userMatches, setUserMatches] = useState<any>([]);
    const [isLargerThan] = useMediaQuery("(min-width:1050px)");

    useEffect(() => {
      dispatch(fetchUserInfo());
      dispatch(fetchUserRank())
    }, [dispatch]);

    console.log(userMatches);
    console.log(user)
    console.log(userRank)

  return (
    <Flex padding="20px" flexDirection={isLargerThan ? "row" : "column"}>
      <Flex minW="20vw" justifyContent="center" alignContent="center">
        <ProfileIcon users={user} />
      </Flex>
      <Flex minW="55vw" justifyContent="center" alignContent="center">

        {userMatches?.map((match:any)=> (
          <ProfileMatch
            match={match}
            key={uuidv4()}
          />
        ))}
        sdfsdfsdf
      </Flex>
    </Flex>
  );
}

export default Layout
