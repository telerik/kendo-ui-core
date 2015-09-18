(function( window, undefined ) {
    kendo.cultures["fil-PH"] = {
        name: "fil-PH",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Philippine Peso",
                abbr: "PHP",
                pattern: ["($n)","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "₱"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Linggo","Lunes","Martes","Miyerkules","Huwebes","Biyernes","Sabado"],
                    namesAbbr: ["Lin","Lun","Mar","Miy","Huw","Biy","Sab"],
                    namesShort: ["Li","Lu","Ma","Mi","H","B","S"]
                },
                months: {
                    names: ["Enero","Pebrero","Marso","Abril","Mayo","Hunyo","Hulyo","Agosto","Setyembre","Oktubre","Nobyembre","Disyembre"],
                    namesAbbr: ["Ene","Peb","Mar","Abr","Mayo","Hun","Hul","Ago","Set","Okt","Nob","Dis"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "M/d/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    g: "M/d/yyyy h:mm tt",
                    G: "M/d/yyyy h:mm:ss tt",
                    m: "MM/dd",
                    M: "MM/dd",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
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
