// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";

import { Box } from "@chakra-ui/react";
import CodeEditor from "./CodeEditor";
import { ChakraProvider } from "@chakra-ui/react";
const Editor = () => {
  return (
    <ChakraProvider>
      <Box minH="100vh" bg="#1E1E1E" color="gray.500" px={6} py={8}>
        <CodeEditor />
      </Box>
    </ChakraProvider>
  );
};

export default Editor;
