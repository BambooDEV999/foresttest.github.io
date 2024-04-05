import { Container, Flex, Heading, Link } from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import 'styles/Home.module.css';
export default function NavBar() {
    return (
        <Container maxW={"12000px"} py={4}>
            <Flex direction={"row"} justifyContent={"space-between"}>
                <Heading>Foresty World</Heading>
                <Flex alignItems={"center"}>
                    <Link href={"/"} mx={2}>Land</Link>
                    <Link href={"/store"} mx={2}>Store</Link>
                    <Link href={"/Withdrawal"} mx={2}>Withdrawal</Link>
                    <Link target="blank" href={"https://bamboodev.gitbook.io/whitepaper-foresty-world-en/"} mx={2}>Withepaper</Link>
                </Flex>
                <ConnectWallet/>
            </Flex>
        </Container>
    )
};