import prismaClient from "../prisma";

interface CreateCostumersProps {
    name: string;
    email: string;
}

class CreateCostumersService {
    async execute({ name, email }: CreateCostumersProps) {

        if (!name || !email) {
            throw new Error("Preencha todos os campos")
        }

        const customer = await prismaClient.customer.create({
            data: {
                name,
                email,
                status: true
            }
        })

        return customer
    }
}

export { CreateCostumersService }