export const SensorData = {
    name: 'sensorData',
    properties: {
        _id: 'objectId',
        code: 'int',
        data: 'data',
        id: 'string',
        acknowledged: 'bool',
        notes: 'string?',
        acknowledgedBy: 'string?',
        ts: 'date',
        _partition: 'string',
    },
    primaryKey: '_id',
};
