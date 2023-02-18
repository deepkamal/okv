module.exports = (data, option) => {
    /* Defaults */
    const {
        enclose_keys = true,
        root_key = '',
        flat_kv = {}
    } = option || {};

    return {
        'string': function (k, v) {
            flat_kv[k] = v;
        },
        'object': function (k, v) {
            const p = this;
            if (!v || Object.keys(v).length < 1) {
                flat_kv[k] = v;
                return flat_kv;
            }
            Object.keys(v)
                .map(function (e) {
                    try {
                        enclose_keys ? p[typeof v[e]](`${k}["${e}"]`, v[e]) : p[typeof v[e]](`${k}.${e}`, v[e]);
                    } catch (er) {
                        flat_kv[enclose_keys ? `${k}["${e}"]` : `"${k}.${e}`] = v[e]
                        console.error(`Type processor not found for ${typeof v[e]}`, er)
                    }
                });

            return flat_kv;
        },
        'undefined': function (k, v) {
            flat_kv[k] = v;
        },
        'boolean': function (k, v) {
            flat_kv[k] = v;
        },
        'number': function (k, v) {
            flat_kv[k] = v;
        },
    }[typeof data](root_key, data);
}
