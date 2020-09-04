(function( window, undefined ) {
    kendo.cultures["so-SO"] = {
        name: "so-SO",
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
                name: "Somali Shilling",
                abbr: "SOS",
                pattern: ["-$n","$n"],
                decimals: 0,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "S"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Axad","Isniin","Talaado","Arbaco","Khamiis","Jimco","Sabti"],
                    namesAbbr: ["Axd","Isn","Tal","Arb","Kha","Jim","Sab"],
                    namesShort: ["Axd","Isn","Tal","Arb","Kha","Jim","Sab"]
                },
                months: {
                    names: ["Jannaayo","Febraayo","Maarso","Abriil","May","Juun","Luuliyo","Ogost","Sebtembar","Oktoobar","Nofembar","Desembar"],
                    namesAbbr: ["Jan","Feb","Mar","Abr","May","Juun","Luuliyo","Og","Seb","Okt","Nof","Des"]
                },
                AM: ["sn.","sn.","SN."],
                PM: ["gn.","gn.","GN."],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    g: "dd/MM/yyyy h:mm tt",
                    G: "dd/MM/yyyy h:mm:ss tt",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
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
