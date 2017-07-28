(function( window, undefined ) {
    kendo.cultures["ti"] = {
        name: "ti",
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
                name: "",
                abbr: "",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "Nfk"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ሰንበት","ሰኑይ","ሰሉስ","ረቡዕ","ሓሙስ","ዓርቢ","ቀዳም"],
                    namesAbbr: ["ሰንበት","ሰኑይ","ሰሉስ","ረቡዕ","ሓሙስ","ዓርቢ","ቀዳም"],
                    namesShort: ["ሰንበት","ሰኑይ","ሰሉስ","ረቡዕ","ሓሙስ","ዓርቢ","ቀዳም"]
                },
                months: {
                    names: ["ጥሪ","ለካቲት","መጋቢት","ሚያዝያ","ግንቦት","ሰነ","ሓምለ","ነሓሰ","መስከረም","ጥቅምቲ","ሕዳር","ታሕሳስ"],
                    namesAbbr: ["ጥሪ","ለካቲ","መጋቢ","ሚያዝ","ግንቦ","ሰነ","ሓምለ","ነሓሰ","መስከ","ጥቅም","ሕዳር","ታሕሳ"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd፡ dd MMMM መዓልቲ yyyy gg",
                    F: "dddd፡ dd MMMM መዓልቲ yyyy gg h:mm:ss tt",
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
                firstDay: 1
            }
        }
    }
})(this);
