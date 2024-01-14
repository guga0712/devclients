import { FiTrash } from "react-icons/fi";
import { useEffect, useState, useRef, FormEvent } from "react";
import { api } from './services/api'

export default function App() {

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
        setCustomers(allCustomers => [...allCustomers, response.data])
        nameRef.current.value = ""
        emailRef.current.value = ""
    }

    async function handleDelete(id: string) {
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


    return (
        <div className="w-full min-h-screen bg-rose-900 flex justify-center px-4">
            <main className="my-10 w-full max-w-2xl">
                <h1 className="text-4xl font-medium text-gray-50">Clientes</h1>

                <form className="flex flex-col my-6" onSubmit={handleSubmit}>
                    <label className="font-medium text-gray-50">Nome:</label>
                    <input type="text"
                        placeholder="Digite seu nome"
                        className="w-full mb-5 p-2 rounded"
                        ref={nameRef}
                    />

                    <label className="font-medium text-gray-50">Email:</label>
                    <input type="text"
                        placeholder="Digite seu email"
                        className="w-full mb-5 p-2 rounded"
                        ref={emailRef}
                    />
                    <input type="submit" value="Cadastrar"
                        className="cursor-pointer w-full p-2 bg-rose-300 hover:bg-rose-500 duration-200 rounded font-medium" />
                </form>

                <section className="flex flex-col gap-4">
                    {customers.map((customer) => (
                        <article
                            key={customer.id}
                            className="w-full bg-gray-50 rounded p-2 relative hover:scale-105 duration-200">
                            <p><span className="font-medium">Nome:</span> {customer.name} </p>
                            <p><span className="font-medium">Email:</span> {customer.email} </p>
                            <p><span className="font-medium">Status:</span> {customer.status ? "ATIVO" : "INATIVO"} </p>

                            <button
                                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded absolute -top-2 right-0"
                                onClick={() => handleDelete(customer.id)}>

                                <FiTrash size={18} color="#FFF" />
                            </button>
                        </article>
                    ))}
                </section>
            </main>

            <h1>
                1+1=
            </h1>
        </div>
    )

}