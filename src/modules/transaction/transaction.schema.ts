import { Schema } from 'dynamoose';

export const TransactionSchema = new Schema({
    id: String,
    typeId: Number,
    statusId: Number,
    sourceAccountId: String,
    destinationAccountId: String,
    amount: Number,
    createdAt: Number,
    updatedAt: Number
});
