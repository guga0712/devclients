import MainApplication from "@/components/MainApplication";
import Title from "@/components/Title";
import Head from "next/head";
import React, { useEffect } from "react";

export default function Home() {

    return (
        <>
            <Head>
                <title>Cadastro de Cliente</title>
            </Head>
            <MainApplication />
        </>

    )
}