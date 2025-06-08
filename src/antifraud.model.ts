export class TransactionPayload {
    id: string;
    amount: number;
};

export type TransactionResult = void;

// === INTERNAL ===

export type AntifraudArgs = TransactionPayload;
export type AntifraudReturn = TransactionResult;
