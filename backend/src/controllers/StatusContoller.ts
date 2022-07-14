import {prisma} from "../database/prismaClient";

class UpdateUser {
    password: any;
    email: string | StringFieldUpdateOperationsInput;
    user: string;
}

export class StatusController {
    createStatus: string;
    Status: string;
}

type UpdateUserInDB = (id: string) => (data: UpdateUser) => Promise<User | null>
export const UpdateUserInDB: UpdateUserInDB = (id) => async (data) => {

    let argon2;
    const password = data.password
        ? (await argon2.hash(data.password))
        : undefined

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
            email: data.email,
            password,
            //user: data.user,
        }
    })
}
    // @ts-ignore
return user;