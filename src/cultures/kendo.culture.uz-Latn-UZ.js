(function( window, undefined ) {
    kendo.cultures["uz-Latn-UZ"] = {
        name: "uz-Latn-UZ",
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
                name: "Uzbekistani Som",
                abbr: "UZS",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "soʻm"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["yakshanba","dushanba","seshanba","chorshanba","payshanba","juma","shanba"],
                    namesAbbr: ["Yak","Dush","Sesh","Chor","Pay","Jum","Shan"],
                    namesShort: ["Ya","Du","Se","Ch","Pa","Ju","Sh"]
                },
                months: {
                    names: ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"],
                    namesAbbr: ["Yan","Fev","Mar","Apr","May","Iyn","Iyl","Avg","Sen","Okt","Noy","Dek"]
                },
                AM: ["TO","to","TO"],
                PM: ["TK","tk","TK"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d-MMMM, yyyy",
                    F: "dddd, d-MMMM, yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "d-MMMM",
                    M: "d-MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
