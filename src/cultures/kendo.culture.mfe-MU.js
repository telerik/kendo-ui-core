(function( window, undefined ) {
    kendo.cultures["mfe-MU"] = {
        name: "mfe-MU",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": " ",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Mauritian Rupee",
                abbr: "MUR",
                pattern: ["-$ n","$ n"],
                decimals: 0,
                ",": " ",
                ".": ".",
                groupSize: [3],
                symbol: "Rs"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["dimans","lindi","mardi","merkredi","zedi","vandredi","samdi"],
                    namesAbbr: ["dim","lin","mar","mer","ze","van","sam"],
                    namesShort: ["dim","lin","mar","mer","ze","van","sam"]
                },
                months: {
                    names: ["zanvie","fevriye","mars","avril","me","zin","zilye","out","septam","oktob","novam","desam"],
                    namesAbbr: ["zan","fev","mar","avr","me","zin","zil","out","sep","okt","nov","des"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "d/M/yyyy HH:mm",
                    G: "d/M/yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
