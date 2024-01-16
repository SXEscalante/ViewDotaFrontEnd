import { useContext } from "react";
import FriendsListContext from "../context/FriendsListContext";

const useFriends = () => {
  const { ContextFriendsList } = useContext(FriendsListContext);
  return [ContextFriendsList];
};

export default useFriends;