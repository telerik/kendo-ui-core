(function( window, undefined ) {
    kendo.cultures["vai-Latn-LR"] = {
        name: "vai-Latn-LR",
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
                name: "Liberian Dollar",
                abbr: "LRD",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["lahadi","tɛɛnɛɛ","talata","alaba","aimisa","aijima","siɓiti"],
                    namesAbbr: ["lahadi","tɛɛnɛɛ","talata","alaba","aimisa","aijima","siɓiti"],
                    namesShort: ["lahadi","tɛɛnɛɛ","talata","alaba","aimisa","aijima","siɓiti"]
                },
                months: {
                    names: ["luukao kemã","ɓandaɓu","vɔɔ","fulu","goo","6","7","kɔnde","saah","galo","kenpkato ɓololɔ","luukao lɔma"],
                    namesAbbr: ["luukao kemã","ɓandaɓu","vɔɔ","fulu","goo","6","7","kɔnde","saah","galo","kenpkato ɓololɔ","luukao lɔma"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d MMMM yyyy",
                    F: "dddd, d MMMM yyyy h:mm:ss tt",
                    g: "dd/MM/yyyy h:mm tt",
                    G: "dd/MM/yyyy h:mm:ss tt",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy MMMM",
                    Y: "yyyy MMMM"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
