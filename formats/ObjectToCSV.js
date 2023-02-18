module.exports = (data, option) => {
    /* Defaults */
    const {
        separation_char = ",",
        enclose_keys = true,
        root_key = '',
    } = option || {};

    return {
        'string': function (k, v) {
            return `${k}${separation_char}"${v}"\n`
        },
        'object': function (k, v) {
            const p = this;
            let ret = '';
            if (!v) {
                return '';
            }
            Object.keys(v)
                .forEach((e) => {
                    try {
                        ret += {
                            false: p[typeof v[e]](`${k}.${e}`, v[e]),
                            true: p[typeof v[e]](`${k}["${e}"]`, v[e])
                        }[enclose_keys];
                    } catch (er) {
                        ret += {
                            false: `"${k}.${e}"${separation_char}${v[e]}\n`,
                            true: `${k}["${e}"]${separation_char}${v[e]}\n`
                        }[enclose_keys];
                        console.error(`Type processor not found for ${typeof v[e]}`)
                    }
                });
            return ret;
        },
        'undefined': function (k, v) {
            return `${k}${separation_char}""`
        },
        'boolean': function (k, v) {
            return `${k}${separation_char}${v}\n`
        },
        'number': function (k, v) {
            return `${k}${separation_char}${v}\n`
        },
    }[typeof data](root_key, data);
}
