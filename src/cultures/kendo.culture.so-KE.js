(function( window, undefined ) {
    kendo.cultures["so-KE"] = {
        name: "so-KE",
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
                name: "Kenyan Shilling",
                abbr: "KES",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "Ksh"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Axad","Isniin","Talaado","Arbaco","Khamiis","Jimco","Sabti"],
                    namesAbbr: ["Axd","Isn","Tal","Arb","Kha","Jim","Sab"],
                    namesShort: ["Axd","Isn","Tal","Arb","Kha","Jim","Sab"]
                },
                months: {
                    names: ["Bisha Koobaad","Bisha Labaad","Bisha Saddexaad","Bisha Afraad","Bisha Shanaad","Bisha Lixaad","Bisha Todobaad","Bisha Sideedaad","Bisha Sagaalaad","Bisha Tobnaad","Bisha Kow iyo Tobnaad","Bisha Laba iyo Tobnaad"],
                    namesAbbr: ["Kob","Lab","Sad","Afr","Sha","Lix","Tod","Sid","Sag","Tob","KIT","LIT"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    F: "dddd, MMMM dd, yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
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
