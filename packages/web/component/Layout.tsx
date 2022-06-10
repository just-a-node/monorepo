import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import React from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex minHeight={"100vh"} direction={"column"}>
      <Header />
      <Box flex={1}>
        <Container maxW={"7xl"}>
          <Stack>{children}</Stack>
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
};
