(function( window, undefined ) {
    kendo.cultures["shi-Tfng-MA"] = {
        name: "shi-Tfng-MA",
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
                name: "Moroccan Dirham",
                abbr: "MAD",
                pattern: ["-n$","n$"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "MAD"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ⴰⵙⴰⵎⴰⵙ","ⴰⵢⵏⴰⵙ","ⴰⵙⵉⵏⴰⵙ","ⴰⴽⵕⴰⵙ","ⴰⴽⵡⴰⵙ","ⵙⵉⵎⵡⴰⵙ","ⴰⵙⵉⴹⵢⴰⵙ"],
                    namesAbbr: ["ⴰⵙⴰ","ⴰⵢⵏ","ⴰⵙⵉ","ⴰⴽⵕ","ⴰⴽⵡ","ⴰⵙⵉⵎ","ⴰⵙⵉⴹ"],
                    namesShort: ["ⴰⵙⴰ","ⴰⵢⵏ","ⴰⵙⵉ","ⴰⴽⵕ","ⴰⴽⵡ","ⴰⵙⵉⵎ","ⴰⵙⵉⴹ"]
                },
                months: {
                    names: ["ⵉⵏⵏⴰⵢⵔ","ⴱⵕⴰⵢⵕ","ⵎⴰⵕⵚ","ⵉⴱⵔⵉⵔ","ⵎⴰⵢⵢⵓ","ⵢⵓⵏⵢⵓ","ⵢⵓⵍⵢⵓⵣ","ⵖⵓⵛⵜ","ⵛⵓⵜⴰⵏⴱⵉⵔ","ⴽⵜⵓⴱⵔ","ⵏⵓⵡⴰⵏⴱⵉⵔ","ⴷⵓⵊⴰⵏⴱⵉⵔ"],
                    namesAbbr: ["ⵉⵏⵏ","ⴱⵕⴰ","ⵎⴰⵕ","ⵉⴱⵔ","ⵎⴰⵢ","ⵢⵓⵏ","ⵢⵓⵍ","ⵖⵓⵛ","ⵛⵓⵜ","ⴽⵜⵓ","ⵏⵓⵡ","ⴷⵓⵊ"]
                },
                AM: ["ⵜⵉⴼⴰⵡⵜ","ⵜⵉⴼⴰⵡⵜ","ⵜⵉⴼⴰⵡⵜ"],
                PM: ["ⵜⴰⴷⴳⴳⵯⴰⵜ","ⵜⴰⴷⴳⴳⵯⴰⵜ","ⵜⴰⴷⴳⴳⵯⴰⵜ"],
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
