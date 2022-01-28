(function( window, undefined ) {
    kendo.cultures["ti-ET"] = {
        name: "ti-ET",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Ethiopian Birr",
                abbr: "ETB",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "Br"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ሰንበት","ሰኑይ","ሠሉስ","ረቡዕ","ኃሙስ","ዓርቢ","ቀዳም"],
                    namesAbbr: ["ሰን","ሰኑ","ሰሉ","ረቡ","ሓሙ","ዓር","ቀዳ"],
                    namesShort: ["ሰን","ሰኑ","ሰሉ","ረቡ","ሓሙ","ዓር","ቀዳ"]
                },
                months: {
                    names: ["ጥሪ","ለካቲት","መጋቢት","ሚያዝያ","ግንቦት","ሰነ","ሓምለ","ነሓሰ","መስከረም","ጥቅምቲ","ሕዳር","ታሕሳስ"],
                    namesAbbr: ["ጥሪ","ለካ","መጋ","ሚያ","ግን","ሰነ","ሓም","ነሓ","መስ","ጥቅ","ሕዳ","ታሕ"]
                },
                AM: ["ንጉሆ ሰዓተ","ንጉሆ ሰዓተ","ንጉሆ ሰዓተ"],
                PM: ["ድሕር ሰዓት","ድሕር ሰዓት","ድሕር ሰዓት"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd፣ dd MMMM መዓልቲ yyyy gg",
                    F: "dddd፣ dd MMMM መዓልቲ yyyy gg h:mm:ss tt",
                    g: "dd/MM/yyyy h:mm tt",
                    G: "dd/MM/yyyy h:mm:ss tt",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);
