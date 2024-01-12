import prismaClient from "../prisma"

interface DeleteCostumerProps {
    id: string
}

class DeleteCostumerService {
    async execute({ id }: DeleteCostumerProps) {
        if (!id) {
            throw new Error("Entrada inválida")
        }

        const findCostumer = await prismaClient.customer.findFirst({
            where: {
                id: id
            }
        })

        if (!findCostumer) {
            throw new Error("Não existe")
        }

        await prismaClient.customer.delete({
            where: {
                id: findCostumer.id
            }
        })

        return { message: "Deletado com sucesso." }

    }
}

export { DeleteCostumerService }