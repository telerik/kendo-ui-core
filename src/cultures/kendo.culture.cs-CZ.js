(function( window, undefined ) {
    kendo.cultures["cs-CZ"] = {
        name: "cs-CZ",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "Kč"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["neděle","pondělí","úterý","středa","čtvrtek","pátek","sobota"],
                    namesAbbr: ["ne","po","út","st","čt","pá","so"],
                    namesShort: ["ne","po","út","st","čt","pá","so"]
                },
                months: {
                    names: ["leden","únor","březen","duben","květen","červen","červenec","srpen","září","říjen","listopad","prosinec",""],
                    namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
                },
                AM: ["dop.","dop.","DOP."],
                PM: ["odp.","odp.","ODP."],
                patterns: {
                    d: "d.M.yyyy",
                    D: "d. MMMM yyyy",
                    F: "d. MMMM yyyy H:mm:ss",
                    g: "d.M.yyyy H:mm",
                    G: "d.M.yyyy H:mm:ss",
                    m: "dd MMMM",
                    M: "dd MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
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
