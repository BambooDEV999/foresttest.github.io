import React from "react";
import 'styles/Home.module.css';
import { ConnectWallet, MediaRenderer, useAddress, useContract, useContractRead, useOwnedNFTs } from "@thirdweb-dev/react";
import { FARMER_ADDRESS, REWARDS_ADDRESS, STAKING_ADDRESS, TOOLS_ADDRESS } from "../const/addresses";
import { ClaimFarmer } from "../components/ClaimFarmer";
import { Inventory } from "../components/Inventory";
import { Equipped } from "../components/Equipped";
import { BigNumber, ethers } from "ethers";
import { Text, Box, Card, Container, Flex, Heading, SimpleGrid, Spinner, Skeleton } from "@chakra-ui/react";

const Home: React.FC = () => {
  const address = useAddress();

  const { contract: farmercontract } = useContract(FARMER_ADDRESS);
  const { contract: toolsContract } = useContract(TOOLS_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);
  const { contract: rewardContract } = useContract(REWARDS_ADDRESS);

  const { data: ownedFarmers, isLoading: loadingOwnedFarmers } = useOwnedNFTs(farmercontract, address);
  const { data: ownedTools, isLoading: loadingOwnedTools } = useOwnedNFTs(toolsContract, address);

  const { data: equippedTools } = useContractRead(
    stakingContract, 
    "getStakeInfo",
    [address]
  );

  const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [address]);

  if (!address) {
    return (
      <Container maxW={"1200px"}>
        <Flex direction={"column"} h={"100vh"} justifyContent={"center"} alignItems={"center"}>
          <Heading my={"40px"}>Foresty World</Heading>
          <ConnectWallet />
        </Flex>
      </Container>
      
    );
  }

  if (loadingOwnedFarmers) {
    return(
      <Container maxW={"1200px"}>
        <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
          <Spinner />
        </Flex>
      </Container>
    );
  }

  if (ownedFarmers?.length === 0) {
    return (
      <Container maxW={"1200px"}>
        <ClaimFarmer />
      </Container>
    );
  }

  return (
    <Container
      maxW={"1200px"}
      style={{
        backgroundImage: `ipfs://QmZcAofr4VLbQwEavLXGnZKKmyKJbsEgFmmSopbhuERgpK/Im%C3%A1genes%20vectoriales%20del%20bosque%20durante%20el%20d%C3%ADa_%20_%20Vector%20Premium.jpg`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <SimpleGrid columns={2} spacing={10}>
        <Card p={5}>
          <Heading>Land:</Heading>
          <SimpleGrid columns={2} spacing={10}>
            <Box>
              {ownedFarmers?.map((nft) => (
                <div key={nft.metadata.id}>
                  <MediaRenderer 
                    src={nft.metadata.image} 
                    height="100%"
                    width="100%"
                  />
                </div>
              ))}
            </Box>
            <Box>
              <Text fontSize={"small"} fontWeight={"bold"}>$SEEDY BALANCE:</Text>
                {rewardBalance && (
                    <p>{ethers.utils.formatUnits(rewardBalance, 18)}</p>
                  )}
              </Box>
          </SimpleGrid>
        </Card>
        <Card p={5}>
          <Heading>Inventory:</Heading>
          <Skeleton isLoaded={!loadingOwnedTools}>
            <Inventory
              nft={ownedTools}
            />     
          </Skeleton>
        </Card>
      </SimpleGrid>
      <Card p={5} my={10}>
        <Heading mb={"30px"}>Equiped Trees:</Heading>
        <SimpleGrid columns={3} spacing={10}>
            {equippedTools &&
              equippedTools[0].map((nft: BigNumber) => (
                <Equipped
                  key={nft.toNumber()}
                  tokenId={nft.toNumber()}
                />
              ))}
        </SimpleGrid>
      </Card>
    </Container>
  );
};

export default Home;