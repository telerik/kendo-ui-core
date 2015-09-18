(function( window, undefined ) {
    kendo.cultures["rm"] = {
        name: "rm",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": "'",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": "'",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["$-n","$ n"],
                decimals: 2,
                ",": "'",
                ".": ".",
                groupSize: [3],
                symbol: "fr."
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["dumengia","glindesdi","mardi","mesemna","gievgia","venderdi","sonda"],
                    namesAbbr: ["du","gli","ma","me","gie","ve","so"],
                    namesShort: ["du","gli","ma","me","gie","ve","so"]
                },
                months: {
                    names: ["schaner","favrer","mars","avrigl","matg","zercladur","fanadur","avust","settember","october","november","december"],
                    namesAbbr: ["schan.","favr.","mars","avr.","matg","zercl.","fan.","avust","sett.","oct.","nov.","dec."]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dddd, 'ils’' d. MMMM, yyyy",
                    F: "dddd, 'ils’' d. MMMM, yyyy HH:mm:ss",
                    g: "dd-MM-yyyy HH:mm",
                    G: "dd-MM-yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "-",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
