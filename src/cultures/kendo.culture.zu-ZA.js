(function( window, undefined ) {
    kendo.cultures["zu-ZA"] = {
        name: "zu-ZA",
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
                name: "South African Rand",
                abbr: "ZAR",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "R"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ISonto","UMsombuluko","ULwesibili","ULwesithathu","ULwesine","ULwesihlanu","UMgqibelo"],
                    namesAbbr: ["Son","Mso","Bil","Tha","Sin","Hla","Mgq"],
                    namesShort: ["Son","Mso","Bil","Tha","Sin","Hla","Mgq"]
                },
                months: {
                    names: ["Januwari","Februwari","Mashi","Ephreli","Meyi","Juni","Julayi","Agasti","Septhemba","Okthoba","Novemba","Disemba"],
                    namesAbbr: ["Jan","Feb","Mas","Eph","Mey","Jun","Jul","Aga","Sep","Okt","Nov","Dis"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "M/d/yyyy",
                    D: "dddd, MMMM d, yyyy",
                    F: "dddd, MMMM d, yyyy HH:mm:ss",
                    g: "M/d/yyyy HH:mm",
                    G: "M/d/yyyy HH:mm:ss",
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
