(function( window, undefined ) {
    kendo.cultures["mg-MG"] = {
        name: "mg-MG",
        numberFormat: {
            pattern: ["-n"],
            decimals: 0,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n%","%n"],
                decimals: 0,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Malagasy Ariary",
                abbr: "MGA",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "Ar"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Alahady","Alatsinainy","Talata","Alarobia","Alakamisy","Zoma","Asabotsy"],
                    namesAbbr: ["Alah","Alats","Tal","Alar","Alak","Zom","Asab"],
                    namesShort: ["Alah","Alats","Tal","Alar","Alak","Zom","Asab"]
                },
                months: {
                    names: ["Janoary","Febroary","Martsa","Aprily","Mey","Jona","Jolay","Aogositra","Septambra","Oktobra","Novambra","Desambra"],
                    namesAbbr: ["Jan","Feb","Mar","Apr","Mey","Jon","Jol","Aog","Sep","Okt","Nov","Des"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "d/M/yyyy HH:mm",
                    G: "d/M/yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
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
