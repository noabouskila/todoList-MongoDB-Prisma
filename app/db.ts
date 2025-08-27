import { PrismaClient } from "@prisma/client";

const PrismaClientSingleton = ()=> {

    return new PrismaClient()
}

declare global {
    var prismaGlobal : undefined | ReturnType<typeof PrismaClientSingleton>;

}

const prisma = global.prismaGlobal ?? PrismaClientSingleton()

export default prisma;

if(process.env.NODE_ENV !== 'production') global.prismaGlobal = prisma