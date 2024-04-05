import type { NextPage } from "next";
import { Box, Button, Container, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { MediaRenderer } from "@thirdweb-dev/react";
import { FEATURES_IMAGE_URL, HERO_IMAGE_URL } from "../const/addressesTransfer";
import FeatureCard from "../components/FeatureCard";
import Link from "next/link";
import Events from "../components/Events";

const Home: NextPage = () => {
  return (
    <Container maxW={"1440px"}>
      <Flex h={"75vh"} px={20} borderRadius={20} >
        <Flex flexDirection={"row"}>
          <Flex flexDirection={"column"} justifyContent={"center"} w={"60%"}>
            <Stack spacing={4}>
              <Heading fontSize={"xl"}>FORESTY WORLD</Heading>
              <Heading fontSize={"6xl"}>
                WITHDRAW SEEDY COIN
              </Heading>
              <Text fontSize={"xl"}>
              Make sure you send the funds to the SEEDY COIN wallet WE ARE NOT RESPONSIBLE FOR LOST FUNDS.
              Withdrawals have a 15% tax for water and fertilizer service
              </Text>
              <Link href={"/transfer"}>
                <Button w={"80%"}>Make a Withdrawal</Button>
              </Link>
            </Stack>
          </Flex>
          <Box>
            <MediaRenderer
              src={HERO_IMAGE_URL}
              height="100%"
              width="100%"
            />
          </Box>
        </Flex>
      </Flex>
      <SimpleGrid columns={2} spacing={4} mt={4}>
        <Flex>
          <MediaRenderer
            src={FEATURES_IMAGE_URL}
            height="100%"
            width="80%"
          />
        </Flex>
        <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
          <Stack spacing={4}>
            <FeatureCard
              step={""}
              title={"Select SEEDY COIN"}
              description={"Select SEEDY COIN to make your withdrawal"}
            />
            <FeatureCard
              step={""}
              title={"Put the SEEDY COIN contract"}
              description={"Make sure you enter the correct contract as we are not responsible for losses."}
            />
            <FeatureCard
              step={""}
              title={"Write a Message"}
              description={"This is optional but we would like you to leave a message regarding the project"}
            />
          </Stack>
        </Flex>
      </SimpleGrid>
      <Events />
    </Container>
  );
};

export default Home;
