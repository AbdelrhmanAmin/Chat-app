import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Button,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { useAuth } from "lib";

const Index = () => {
  const { user, signInWithGitHub, signInWithGoogle, signOut } = useAuth();
  return (
    <>
      <Button onClick={signInWithGitHub}>Github</Button>
      <Button onClick={signInWithGoogle}>Google</Button>
      <Button onClick={signOut}>Sign Out</Button>
    </>
  );
};

export default Index;
