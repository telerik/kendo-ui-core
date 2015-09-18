(function( window, undefined ) {
    kendo.cultures["tzm-Tfng"] = {
        name: "tzm-Tfng",
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
                name: "",
                abbr: "",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "ⴷⵔ"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ⴰⵙⴰⵎⴰⵙ","ⴰⵢⵏⴰⵙ","ⴰⵙⵉⵏⴰⵙ","ⴰⴽⵕⴰⵙ","ⴰⴽⵡⴰⵙ","ⴰⵙⵉⵎⵡⴰⵙ","ⴰⵙⵉⴹⵢⴰⵙ"],
                    namesAbbr: ["ⵙⵎⵙ","ⵢⵏⵙ","ⵙⵏⵙ","ⴽⵕⵙ","ⴽⵡⵙ","ⵙⵎⵡ","ⵙⴹⵙ"],
                    namesShort: ["ⵙⵎ","ⵢⵏ","ⵙⵏ","ⴽⵕ","ⴽⵡ","ⵙⵡ","ⵙⴹ"]
                },
                months: {
                    names: ["ⵉⵏⵏⴰⵢⵔ","ⴱⵕⴰⵢⵕ","ⵎⴰⵕⵚ","ⵉⴱⵔⵉⵔ","ⵎⴰⵢⵢⵓ","ⵢⵓⵏⵢⵓ","ⵢⵓⵍⵢⵓⵣ","ⵖⵓⵛⵜ","ⵛⵓⵜⴰⵏⴱⵉⵔ","ⴽⵜⵓⴱⵕ","ⵏⵓⵡⴰⵏⴱⵉⵔ","ⴷⵓⵊⴰⵏⴱⵉⵔ"],
                    namesAbbr: ["ⵏⵢⵔ","ⴱⵕⵢ","ⵎⵕⵚ","ⴱⵔⵔ","ⵎⵢⵢ","ⵢⵏⵢ","ⵢⵍⵢ","ⵖⵛⵜ","ⵛⵜⵏ","ⴽⵜⴱ","ⵏⵡⴱ","ⴷⵊⵏ"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dddd, dd MMMM, yyyy",
                    F: "dddd, dd MMMM, yyyy H:mm:ss",
                    g: "dd-MM-yyyy H:mm",
                    G: "dd-MM-yyyy H:mm:ss",
                    m: "dd MMMM",
                    M: "dd MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },
                "/": "-",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
