(function( window, undefined ) {
    kendo.cultures["fa"] = {
        name: "fa",
        numberFormat: {
            pattern: ["n-"],
            decimals: 2,
            ",": ",",
            ".": "/",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": ",",
                ".": "/",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["$n-","$n"],
                decimals: 2,
                ",": ",",
                ".": "/",
                groupSize: [3],
                symbol: "ريال"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["يكشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],
                    namesAbbr: ["يكشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],
                    namesShort: ["ی","د","س","چ","پ","ج","ش"]
                },
                months: {
                    names: ["ژانويه","فوريه","مارس","آوريل","مه","ژوئن","ژوئيه","اوت","سپتامبر","اُكتبر","نوامبر","دسامبر"],
                    namesAbbr: ["ژانويه","فوريه","مارس","آوريل","مه","ژوئن","ژوئيه","اوت","سپتامبر","اُكتبر","نوامبر","دسامبر"]
                },
                AM: ["ق.ظ","ق.ظ","ق.ظ"],
                PM: ["ب.ظ","ب.ظ","ب.ظ"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, dd MMMM yyyy",
                    F: "dddd, dd MMMM yyyy hh:mm:ss tt",
                    g: "dd/MM/yyyy hh:mm tt",
                    G: "dd/MM/yyyy hh:mm:ss tt",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 6
            }
        }
    }
})(this);
