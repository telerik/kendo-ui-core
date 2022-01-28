(function( window, undefined ) {
    kendo.cultures["am"] = {
        name: "am",
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
                symbol: "ብር"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["እሑድ","ሰኞ","ማክሰኞ","ረቡዕ","ሐሙስ","ዓርብ","ቅዳሜ"],
                    namesAbbr: ["እሑድ","ሰኞ","ማክሰ","ረቡዕ","ሐሙስ","ዓርብ","ቅዳሜ"],
                    namesShort: ["እ","ሰ","ማ","ረ","ሐ","ዓ","ቅ"]
                },
                months: {
                    names: ["ጃንዩወሪ","ፌብሩወሪ","ማርች","ኤፕሪል","ሜይ","ጁን","ጁላይ","ኦገስት","ሴፕቴምበር","ኦክቶበር","ኖቬምበር","ዲሴምበር"],
                    namesAbbr: ["ጃንዩ","ፌብሩ","ማርች","ኤፕሪ","ሜይ","ጁን","ጁላይ","ኦገስ","ሴፕቴ","ኦክቶ","ኖቬም","ዲሴም"]
                },
                AM: ["ጥዋት","ጥዋት","ጥዋት"],
                PM: ["ከሰዓት","ከሰዓት","ከሰዓት"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "yyyy MMMM d, dddd",
                    F: "yyyy MMMM d, dddd h:mm:ss tt",
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
