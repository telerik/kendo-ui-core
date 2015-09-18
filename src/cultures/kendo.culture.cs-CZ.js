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
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Czech Koruna",
                abbr: "CZK",
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
                    names: ["leden","únor","březen","duben","květen","červen","červenec","srpen","září","říjen","listopad","prosinec"],
                    namesAbbr: ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"]
                },
                AM: ["dop.","dop.","DOP."],
                PM: ["odp.","odp.","ODP."],
                patterns: {
                    d: "d. M. yyyy",
                    D: "d. MMMM yyyy",
                    F: "d. MMMM yyyy H:mm:ss",
                    g: "d. M. yyyy H:mm",
                    G: "d. M. yyyy H:mm:ss",
                    m: "d. MMMM",
                    M: "d. MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": ". ",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
