(function( window, undefined ) {
    kendo.cultures["tzm-Latn-DZ"] = {
        name: "tzm-Latn-DZ",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Algerian Dinar",
                abbr: "DZD",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "DA"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["lh\u0027ed","letnayen","ttlata","larebâa","lexmis","ldjemâa","ssebt"],
                    namesAbbr: ["lh\u0027d","let","ttl","lar","lex","ldj","sse"],
                    namesShort: ["lh","lt","tt","la","lx","ld","ss"]
                },
                months: {
                    names: ["Yennayer","Furar","Meghres","Yebrir","Magu","Yunyu","Yulyu","Ghuct","Cutenber","Tuber","Nunember","Dujanbir"],
                    namesAbbr: ["Yen","Fur","Megh","Yeb","May","Yun","Yul","Ghu","Cut","Tub","Nun","Duj"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dd MMMM, yyyy",
                    F: "dd MMMM, yyyy H:mm:ss",
                    g: "dd-MM-yyyy H:mm",
                    G: "dd-MM-yyyy H:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },
                "/": "-",
                ":": ":",
                firstDay: 6
            }
        }
    }
})(this);
