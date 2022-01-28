(function( window, undefined ) {
    kendo.cultures["es-VE"] = {
        name: "es-VE",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Venezuelan Bolívar",
                abbr: "VES",
                pattern: ["$-n","$n"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "Bs.S"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
                    namesAbbr: ["dom.","lun.","mar.","mié.","jue.","vie.","sáb."],
                    namesShort: ["Do","Lu","Ma","Mi","Ju","Vi","Sa"]
                },
                months: {
                    names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
                    namesAbbr: ["ene.","feb.","mar.","abr.","may.","jun.","jul.","ago.","sept.","oct.","nov.","dic."]
                },
                AM: ["a. m.","a. m.","A. M."],
                PM: ["p. m.","p. m.","P. M."],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd, d 'de' MMMM 'de' yyyy",
                    F: "dddd, d 'de' MMMM 'de' yyyy h:mm:ss tt",
                    g: "d/M/yyyy h:mm tt",
                    G: "d/M/yyyy h:mm:ss tt",
                    m: "d 'de' MMMM",
                    M: "d 'de' MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM 'de' yyyy",
                    Y: "MMMM 'de' yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);
