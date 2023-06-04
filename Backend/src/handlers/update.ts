import prisma from "../db";
import Message from "../message";

export const getUpdates = async (req, res) => {
    const product = await prisma.product.findMany(
        {
            where: {
                belongsToId: req.user.id
            },
            include: {
                updates: true
            }
        },
    );

    const updates = product.reduce((acc, curr) => {
        return [...acc, ...curr.updates]
    }, []);

    res.json(new Message(updates, []));
};

export const postUpdate = async (req, res) => {
    const { productId} = req.body;
    console.log(req.body)
    const product = await prisma.product.findUnique(
        {
            where: {
                id: productId
            }
        }
    );

    if (!product) {
        res.status(404).json(new Message(null, ['Product not found']));
    }

    const update = await prisma.update.create(
        {
            data: {
                title: req.body.title,
                body: req.body.body,
                product: { connect: { id: productId } },
                status: req.body.status,
                updateAt: new Date()
            }
        }
    );

    res.json(new Message(update, []));
}