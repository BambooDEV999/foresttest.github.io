import 'styles/Home.module.css';
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { TOOLS_ADDRESS } from "../const/addresses";
import Link from "next/link";
import { Text, Button, Container, Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import NFT from "../components/NFT";
import { Box } from "@chakra-ui/react";
export default function Shop()  {
    const { contract } = useContract(TOOLS_ADDRESS);
    const { data: nfts } = useNFTs(contract);
    console.log(nfts);

    return (
        <Box bgImage="ipfs://QmZcAofr4VLbQwEavLXGnZKKmyKJbsEgFmmSopbhuERgpK/Im%C3%A1genes%20vectoriales%20del%20bosque%20durante%20el%20d%C3%ADa_%20_%20Vector%20Premium.jpg)">
        <Container maxW={"1200px"}>
            <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Link
                    href="/"
                >
                    <Button>Back</Button>
                </Link>
            </Flex>
            <Heading mt={"40px"}>Store</Heading>
            <Text>Purchase Trees</Text>
            {!nfts ? (
                <Flex h={"50vh"} justifyContent={"center"} alignItems={"center"}>
                    <Spinner />
                </Flex>
            ) : (
                <SimpleGrid columns={3} spacing={10}>
                    {nfts?.map((nftItem) => (
                        <NFT 
                            key={nftItem.metadata.id}
                            nft={nftItem}
                        />
                    ))}
                </SimpleGrid>
            )}
        </Container>
        </Box>
    )
};