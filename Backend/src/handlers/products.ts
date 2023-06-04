import prisma from "../db"
import Message from "../message"

export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique(
        {
            where: {
                id: req.user.id
            },
            include: {
                products: true
            }
        }
    );

    res.json(new Message(user.products, []));
}

export const getProduct = async (req, res) => {
    const id = req.params.id;
    const product = await prisma.product.findFirst(
        {
            where: {
                id,
                belongsToId: req.user.id
            }
        }
    );

    res.json(new Message(product, []));
}

export const postProduct = async (req, res) => {
    const { name } = req.body;
    const product = await prisma.product.create(
        {
            data: {
                name,
                belongsToId: req.user.id
            }
        }
    );

    res.json(new Message(product, []));
}

export const putProduct = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const product = await prisma.product.update(
        {
            where: {
                id,
                id_belongsToId: req.user.id
            },
            data: {
                name
            }
        }
    );

    res.json(new Message(product, []));
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await prisma.product.delete(
        {
            where: {
                id_belongsToId:{
                    id,
                    belongsToId: req.user.id
                }
            }
        }
    );

    res.json(new Message(product, []));
}