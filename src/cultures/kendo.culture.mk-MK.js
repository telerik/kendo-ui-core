(function( window, undefined ) {
    kendo.cultures["mk-MK"] = {
        name: "mk-MK",
        numberFormat: {
            pattern: ["-n"],
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
                name: "Macedonian Denar",
                abbr: "MKD",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "ден"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["недела","понеделник","вторник","среда","четврток","петок","сабота"],
                    namesAbbr: ["нед.","пон.","вт.","сре.","чет.","пет.","саб."],
                    namesShort: ["не","по","вт","ср","че","пе","са"]
                },
                months: {
                    names: ["јануари","февруари","март","април","мај","јуни","јули","август","септември","октомври","ноември","декември"],
                    namesAbbr: ["јан.","фев.","мар.","апр.","мај","јун.","јул.","авг.","септ.","окт.","ноем.","дек."]
                },
                AM: ["претпл.","претпл.","ПРЕТПЛ."],
                PM: ["попл.","попл.","ПОПЛ."],
                patterns: {
                    d: "dd.M.yyyy",
                    D: "dddd, dd MMMM yyyy",
                    F: "dddd, dd MMMM yyyy HH:mm:ss",
                    g: "dd.M.yyyy HH:mm",
                    G: "dd.M.yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy 'г'.",
                    Y: "MMMM yyyy 'г'."
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
