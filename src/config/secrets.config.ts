const secrets = () => ({
    antifraud: {
        KAFKA_BROKERS: process.env.KAFKA_BROKERS
    },
    transaction: {
        DYNAMO_TABLE_TRANSACTION: process.env.DYNAMO_TABLE_TRANSACTION
    }
});

export default secrets;
