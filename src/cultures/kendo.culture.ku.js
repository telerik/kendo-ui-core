(function( window, undefined ) {
    kendo.cultures["ku"] = {
        name: "ku",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-%n","%n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "٪"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["$-n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "د.ع.‏"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["یەکشەممە","دووشەممە","سێشەممە","چوارشەممە","پێنجشەممە","ھەینی","شەممە"],
                    namesAbbr: ["یەکشەممە","دووشەممە","سێشەممە","چوارشەممە","پێنجشەممە","ھەینی","شەممە"],
                    namesShort: ["ی","د","س","چ","پ","ھ","ش"]
                },
                months: {
                    names: ["کانوونی دووەم","شوبات","ئازار","نیسان","ئایار","حوزەیران","تەمووز","ئاب","ئەیلوول","تشرینی یەکەم","تشرینی دووەم","کانونی یەکەم"],
                    namesAbbr: ["کانوونی دووەم","شوبات","ئازار","نیسان","ئایار","حوزەیران","تەمووز","ئاب","ئەیلوول","تشرینی یەکەم","تشرینی دووەم","کانونی یەکەم"]
                },
                AM: ["پ.ن","پ.ن","پ.ن"],
                PM: ["د.ن","د.ن","د.ن"],
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "dddd, dd MMMM, yyyy",
                    F: "dddd, dd MMMM, yyyy hh:mm:ss tt",
                    g: "yyyy/MM/dd hh:mm tt",
                    G: "yyyy/MM/dd hh:mm:ss tt",
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
                firstDay: 0
            }
        }
    }
})(this);
