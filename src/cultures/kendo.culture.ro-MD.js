(function( window, undefined ) {
    kendo.cultures["ro-MD"] = {
        name: "ro-MD",
        numberFormat: {
            pattern: ["-n"],
            decimals: 0,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","%n"],
                decimals: 0,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Moldovan Leu",
                abbr: "MDL",
                pattern: ["-n$","n$"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "L"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["duminică","luni","marți","miercuri","joi","vineri","sâmbătă"],
                    namesAbbr: ["Du","Lu","Ma","Mi","Jo","Vi","Sâ"],
                    namesShort: ["Du","Lu","Ma","Mi","Jo","Vi","Sâ"]
                },
                months: {
                    names: ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"],
                    namesAbbr: ["ian.","feb.","mar.","apr.","mai","iun.","iul.","aug.","sept.","oct.","nov.","dec."]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "dddd, d MMMM yyyy",
                    F: "dddd, d MMMM yyyy HH:mm:ss",
                    g: "dd.MM.yyyy HH:mm",
                    G: "dd.MM.yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
