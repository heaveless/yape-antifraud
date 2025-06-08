export type TransactionArgs = {
    id: string;
    statusId: number;
};

export type TransactionReturn = void;

export type TransactionKey = Pick<TransactionArgs, "id">;

export type Transaction = Pick<TransactionArgs, "statusId">;