(function( window, undefined ) {
    kendo.cultures["kln"] = {
        name: "kln",
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
                name: "",
                abbr: "",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "Ksh"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Kotisap","Kotaai","Koaeng’","Kosomok","Koang’wan","Komuut","Kolo"],
                    namesAbbr: ["Kts","Kot","Koo","Kos","Koa","Kom","Kol"],
                    namesShort: ["Kts","Kot","Koo","Kos","Koa","Kom","Kol"]
                },
                months: {
                    names: ["Mulgul","Ng’atyaato","Kiptaamo","Iwootkuut","Mamuut","Paagi","Ng’eiyeet","Rooptui","Bureet","Epeeso","Kipsuunde ne taai","Kipsuunde nebo aeng’"],
                    namesAbbr: ["Mul","Ngat","Taa","Iwo","Mam","Paa","Nge","Roo","Bur","Epe","Kpt","Kpa"]
                },
                AM: ["krn","krn","KRN"],
                PM: ["koosk","koosk","KOOSK"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d MMMM yyyy",
                    F: "dddd, d MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
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
