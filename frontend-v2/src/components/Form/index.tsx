import { useEffect, useState, useRef, FormEvent } from "react";
import { FormControl, FormLabel, Input, Button, Flex, Box, Heading, VStack } from "@chakra-ui/react";
import { api } from "@/services/api";

export default function Form() {

    interface CustomerProps {
        id: string;
        name: string;
        email: string;
        status: boolean;
        created_at: string;
    }

    const [customers, setCustomers] = useState<CustomerProps[]>([])
    const nameRef = useRef<HTMLInputElement | null>(null)
    const emailRef = useRef<HTMLInputElement | null>(null)


    useEffect(() => {
        loadCustomers();
    }, [])

    async function loadCustomers() {
        const response = await api.get("/customers")
        setCustomers(response.data)
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!nameRef.current?.value || !emailRef.current?.value) return (alert("Preencha todos os dados"));


        const response = await api.post("/customer", {
            name: nameRef.current?.value,
            email: emailRef.current?.value
        })
        alert(nameRef.current?.value + " cadastrado.")
        setCustomers(allCustomers => [...allCustomers, response.data])
        nameRef.current.value = ""
        emailRef.current.value = ""

    }

    async function handleDelete(id: string) {

        if (confirm("Tem certeza que quer apagar?") == true) {
            try {
                await api.delete("/customer", {
                    params: {
                        id: id,
                    }
                })

                const allCustomers = customers.filter((customer) => customer.id !== id)
                setCustomers(allCustomers)
            } catch (err) {
                console.log(err)
            }
        }
    }


    return (
        <Flex w="100%" flexDirection="column">
            <FormControl as="form" onSubmit={handleSubmit}>
                <Flex flexDirection="column" gap="10px">
                    <Flex flexDirection="column">
                        <FormLabel>Nome</FormLabel>
                        <Input type="string" placeholder="Digite seu nome" ref={nameRef} />
                    </Flex>
                    <Flex flexDirection="column">
                        <FormLabel>E-mail</FormLabel>
                        <Input type="string" placeholder="Digite seu email" ref={emailRef} />
                    </Flex>
                    <Button type="submit" value="cadastrar" cursor="pointer" colorScheme="pink">Cadastrar</Button>
                </Flex>
            </FormControl>
            <Heading size="md">Clientes</Heading>
            {customers.map((customer) => (
                <Box bg="gray" w="100%" h="100%" p="10px" my="10px" borderRadius="10px" key={customer.id}>
                    <p><span>Nome: </span>{customer.name}</p>
                    <p><span>Email: </span>{customer.email}</p>
                    <p><span>Status: </span>{customer.status ? "ATIVO" : "INATIVO"}</p>
                    <Button onClick={() => handleDelete(customer.id)}>Apagar</Button>
                </Box>
            ))}
        </Flex>



    )
}