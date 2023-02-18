const aNestedObject = {
    "a": {},
    "key11": {
        "key11_11": "value11_11",
        "key11_12": "value11_12",
    },
    "key12": {
        "key12_11": "hello",
        "key12_12": [454, 676, "test"]
    },
    x: [],
    "key13": [
        "element13_1",
        {
            "element13_2_11": 123,
            "element13_2_12": true,
            "element13_2_13": 0xABCDEF,
        },
        true,
        "element13_4"
    ],
    "key14": undefined
}
const flat_kv = {
    '["a"]': {},
    '["key11"]["key11_11"]': 'value11_11',
    '["key11"]["key11_12"]': 'value11_12',
    '["key12"]["key12_11"]': 'hello',
    '["key12"]["key12_12"]["0"]': 454,
    '["key12"]["key12_12"]["1"]': 676,
    '["key12"]["key12_12"]["2"]': 'test',
    '["x"]': [],
    '["key13"]["0"]': 'element13_1',
    '["key13"]["1"]["element13_2_11"]': 123,
    '["key13"]["1"]["element13_2_12"]': true,
    '["key13"]["1"]["element13_2_13"]': 11259375,
    '["key13"]["2"]': true,
    '["key13"]["3"]': 'element13_4',
    '["key14"]': undefined
}

describe("Object To Flat KV ::", function () {
    const {objectToFlatKV} = require('../index')

    it(" should return flat key-value pair object",()=>{
        expect(objectToFlatKV(aNestedObject)).toEqual(flat_kv);
    })
})
