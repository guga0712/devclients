import { Box, Flex } from "@chakra-ui/react";
import Title from "../Title";
import Form from "../Form";
import Users from "../Users";
import { useEffect, useState } from "react";
import { api } from "@/services/api";


export default function MainApplication() {


    return (
        <Flex justifyContent="center" alignItems="center" w="auto" py="10px">
            <Flex maxWidth="42rem" flexDirection="column" alignItems="center">
                <Title text={"Cadastro de clientes"} />
                <Form />
            </Flex>
        </Flex>
    )
}
