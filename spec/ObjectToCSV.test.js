describe("Object To CSV::", function () {
    const aNestedObject = {
        "key11": {
            "key11_11": "value11_11",
            "key11_12": "value11_12",
        },
        "key12": {
            "key12_11": "hello",
            "key12_12": [454, 676, "test"]
        },
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
    const barekey_output = `.key11.key11_11,"value11_11"
.key11.key11_12,"value11_12"
.key12.key12_11,"hello"
.key12.key12_12.0,454
.key12.key12_12.1,676
.key12.key12_12.2,"test"
.key13.0,"element13_1"
.key13.1.element13_2_11,123
.key13.1.element13_2_12,true
.key13.1.element13_2_13,11259375
.key13.2,true
.key13.3,"element13_4"
.key14,""`
    const enclosed_output = `["key11"]["key11_11"],"value11_11"
["key11"]["key11_12"],"value11_12"
["key12"]["key12_11"],"hello"
["key12"]["key12_12"]["0"],454
["key12"]["key12_12"]["1"],676
["key12"]["key12_12"]["2"],"test"
["key13"]["0"],"element13_1"
["key13"]["1"]["element13_2_11"],123
["key13"]["1"]["element13_2_12"],true
["key13"]["1"]["element13_2_13"],11259375
["key13"]["2"],true
["key13"]["3"],"element13_4"
["key14"],""`

    const rootkey_enclosed_and_tsv_output = `OBJ["key11"]["key11_11"]|"value11_11"
OBJ["key11"]["key11_12"]|"value11_12"
OBJ["key12"]["key12_11"]|"hello"
OBJ["key12"]["key12_12"]["0"]|454
OBJ["key12"]["key12_12"]["1"]|676
OBJ["key12"]["key12_12"]["2"]|"test"
OBJ["key13"]["0"]|"element13_1"
OBJ["key13"]["1"]["element13_2_11"]|123
OBJ["key13"]["1"]["element13_2_12"]|true
OBJ["key13"]["1"]["element13_2_13"]|11259375
OBJ["key13"]["2"]|true
OBJ["key13"]["3"]|"element13_4"
OBJ["key14"]|""`
    const {objectToCSV} = require('../index')
    it("should convert Nested Object to Character Separated Values", function () {
        expect(objectToCSV(aNestedObject)).toEqual(enclosed_output);
    });

    it("should convert Nested Object to KV pair with bare keys", function () {
        expect(objectToCSV(aNestedObject, {enclose_keys: false})).toEqual(barekey_output);
    });

    it("should convert Nested Object to KV pair with Root object and Pipe Separated output", function () {
        expect(objectToCSV(aNestedObject, {
            separation_char: '|',
            root_key: 'OBJ'
        }).trim()).toEqual(rootkey_enclosed_and_tsv_output.trim());
    });
});
