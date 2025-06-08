const secrets = () => ({
    antifraud: {
        KAFKA_BROKERS: [
            process.env.KAFKA_BROKER_0
        ],
        MAX_AMOUNT_ALERT: process.env.MAX_AMOUNT_ALERT
    },
    transaction: {
        DYNAMO_TABLE_TRANSACTION: process.env.DYNAMO_TABLE_TRANSACTION
    }
});

export default secrets;
