import { Box, Center, Text, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "../Image/free-convert-icon-3215-thumb.png";

export const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
      setTimeout(() => {
        navigate("/converter");
      }, 3000);
    }, []);
  return (
    <Box
    h="100vh"
    backgroundColor="#17202A"
    color="white"
    display="flex"
    flexDirection={{ base: "column", md: "row" }}
    alignItems="center"
    justifyContent="center"
    fontSize={{ base: "20px", sm: "25px", md: "55px" }}
  >
    <Center flexDirection="column" alignItems="center">
      {/* <Image src={logo} alt="Logo" boxSize="90px" mb="4" /> */}
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Welcome to CodeConverter
      </Text>
      <Text fontSize="lg">
        Converting code made easy and efficient.
      </Text>
    </Center>
  </Box>
  )
}

