(function( window, undefined ) {
    kendo.cultures["prs-AF"] = {
        name: "prs-AF",
        numberFormat: {
            pattern: ["n-"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Afghan Afghani",
                abbr: "AFN",
                pattern: ["$n-","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "؋"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["یکشنبه","دوشنبه","سه‌ شنبه","چهار شنبه","پنجشنبه","جمعه","شنبه"],
                    namesAbbr: ["یکشنبه","دوشنبه","سه‌ شنبه","چهار شنبه","پنجشنبه","جمعه","شنبه"],
                    namesShort: ["ی","د","س","چ","پ","ج","ش"]
                },
                months: {
                    names: ["حمل","ثور","جوزا","سرطان","اسد","سنبله","میزان","عقرب","قوس","جدی","دلو","حوت"],
                    namesAbbr: ["حمل","ثور","جوزا","سرطان","اسد","سنبله","میزان","عقرب","قوس","جدی","دلو","حوت"]
                },
                AM: ["غ.م","غ.م","غ.م"],
                PM: ["غ.و","غ.و","غ.و"],
                patterns: {
                    d: "yyyy/M/d",
                    D: "dddd, d MMMM yyyy",
                    F: "dddd, d MMMM yyyy h:mm:ss tt",
                    g: "yyyy/M/d h:mm tt",
                    G: "yyyy/M/d h:mm:ss tt",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 6
            }
        }
    }
})(this);
