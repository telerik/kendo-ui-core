(function( window, undefined ) {
    kendo.cultures["tig-ER"] = {
        name: "tig-ER",
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
                name: "Eritrean Nakfa",
                abbr: "ERN",
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
                    names: ["ሰንበት ዓባይ","ሰኖ","ታላሸኖ","ኣረርባዓ","ከሚሽ","ጅምዓት","ሰንበት ንኢሽ"],
                    namesAbbr: ["ሰ/ዓ","ሰኖ","ታላሸ","ኣረር","ከሚሽ","ጅምዓ","ሰ/ን"],
                    namesShort: ["ሰ/ዓ","ሰኖ","ታላሸ","ኣረር","ከሚሽ","ጅምዓ","ሰ/ን"]
                },
                months: {
                    names: ["ጃንዩወሪ","ፌብሩወሪ","ማርች","ኤፕረል","ሜይ","ጁን","ጁላይ","ኦገስት","ሴፕቴምበር","ኦክተውበር","ኖቬምበር","ዲሴምበር"],
                    namesAbbr: ["ጃንዩ","ፌብሩ","ማርች","ኤፕረ","ሜይ","ጁን","ጁላይ","ኦገስ","ሴፕቴ","ኦክተ","ኖቬም","ዲሴም"]
                },
                AM: ["ቀደም ሰርምዕል","ቀደም ሰርምዕል","ቀደም ሰርምዕል"],
                PM: ["ሓቆ ስርምዕል","ሓቆ ስርምዕል","ሓቆ ስርምዕል"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd፡ dd MMMM ዮም yyyy gg",
                    F: "dddd፡ dd MMMM ዮም yyyy gg h:mm:ss tt",
                    g: "dd/MM/yyyy h:mm tt",
                    G: "dd/MM/yyyy h:mm:ss tt",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy MMMM",
                    Y: "yyyy MMMM"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
