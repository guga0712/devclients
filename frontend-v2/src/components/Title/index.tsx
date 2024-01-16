import { Heading } from '@chakra-ui/react'

interface TitleProps{
    text: string
}


export default function Title({text}:TitleProps){
    return(
        <Heading>{text}</Heading>
    )
}