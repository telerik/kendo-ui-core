(function( window, undefined ) {
    kendo.cultures["tk"] = {
        name: "tk",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["-n$","n$"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "m."
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Ýekşenbe","Duşenbe","Sişenbe","Çarşenbe","Penşenbe","Anna","Şenbe"],
                    namesAbbr: ["Ýb","Db","Sb","Çb","Pb","An","Şb"],
                    namesShort: ["Ý","D","S","Ç","P","A","Ş"]
                },
                months: {
                    names: ["Ýanwar","Fewral","Mart","Aprel","Maý","lýun","lýul","Awgust","Sentýabr","Oktýabr","Noýabr","Dekabr"],
                    namesAbbr: ["Ýan","Few","Mart","Apr","Maý","lýun","lýul","Awg","Sen","Okt","Noý","Dek"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd.MM.yy 'ý.'",
                    D: "yyyy'-nji ýylyň 'd'-nji 'MMMM",
                    F: "yyyy'-nji ýylyň 'd'-nji 'MMMM HH:mm:ss",
                    g: "dd.MM.yy 'ý.' HH:mm",
                    G: "dd.MM.yy 'ý.' HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy 'ý.' MMMM",
                    Y: "yyyy 'ý.' MMMM"
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
