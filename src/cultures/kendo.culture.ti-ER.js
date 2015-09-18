(function( window, undefined ) {
    kendo.cultures["ti-ER"] = {
        name: "ti-ER",
        numberFormat: {
            pattern: ["-n"],
            decimals: 1,
            ",": ",",
            ".": ".",
            groupSize: [3,0],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 1,
                ",": ",",
                ".": ".",
                groupSize: [3,0],
                symbol: "%"
            },
            currency: {
                name: "Eritrean Nakfa",
                abbr: "ERN",
                pattern: ["-$n","n$"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "ERN"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ሰንበት","ሰኑይ","ሰሉስ","ሮቡዕ","ሓሙስ","ዓርቢ","ቀዳም"],
                    namesAbbr: ["ሰንበት","ሰኑይ","ሰሉስ","ሮቡዕ","ሓሙስ","ዓርቢ","ቀዳም"],
                    namesShort: ["ሰን","ሰኑ","ሰሉ","ሮቡ","ሓሙ","ዓር","ቀዳ"]
                },
                months: {
                    names: ["ጥሪ","ለካቲት","መጋቢት","ሚያዝያ","ግንቦት","ሰነ","ሓምለ","ነሓሰ","መስከረም","ጥቅምቲ","ሕዳር","ታሕሳስ"],
                    namesAbbr: ["ጥሪ","የካቲት","መጋቢት","ሚያዝያ","ግንቦት","ሰነ","ሓምለ","ነሓሰ","መስከረም","ጥቅምቲ","ሕዳር","ታሕሳስ"]
                },
                AM: ["ንጉሆ","ንጉሆ","ንጉሆ"],
                PM: ["ድሕሪ ቐትሪ","ድሕሪ ቐትሪ","ድሕሪ ቐትሪ"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd '፣' MMMM d 'መዓልቲ' yyyy",
                    F: "dddd '፣' MMMM d 'መዓልቲ' yyyy h:mm:ss tt",
                    g: "d/M/yyyy h:mm tt",
                    G: "d/M/yyyy h:mm:ss tt",
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
                firstDay: 1
            }
        }
    }
})(this);
