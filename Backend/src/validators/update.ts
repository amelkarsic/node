import {
    Schema,
} from 'express-validator'

export const putUpdateSchema: Schema = {
    title: {
        optional: true
    },
    body: {
        optional: true,
    },
    status: {
        isIn: { options: [['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']] },
        errorMessage: 'Status must be one of IN_PROGRESS, SHIPPED, DEPRECATED'
    },
    version: {
        optional: true,
    }
};

export const postUpdateSchema: Schema = {
    title: {
        exists: true,
        errorMessage: 'Title must be provided',
    },
    body: {
        exists: true,
        errorMessage: 'Body must be provided'
    },
    status: {
        isIn: { options: [['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']] },
        errorMessage: 'Status must be one of IN_PROGRESS, SHIPPED, DEPRECATED'
    }
}