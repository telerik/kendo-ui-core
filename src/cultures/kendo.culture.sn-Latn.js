(function( window, undefined ) {
    kendo.cultures["sn-Latn"] = {
        name: "sn-Latn",
        numberFormat: {
            pattern: ["-n"],
            decimals: 0,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 0,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["($n)","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "US$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Svondo","Muvhuro","Chipiri","Chitatu","China","Chishanu","Mugovera"],
                    namesAbbr: ["Svo","Muv","Chip","Chit","Chin","Chis","Mug"],
                    namesShort: ["Svo","Muv","Chip","Chit","Chin","Chis","Mug"]
                },
                months: {
                    names: ["Ndira","Kukadzi","Kurume","Kubvumbi","Chivabvu","Chikumi","Chikunguru","Nyamavhuvhu","Gunyana","Gumiguru","Mbudzi","Zvita"],
                    namesAbbr: ["Ndi","Kuk","Kur","Kub","Chv","Chk","Chg","Nya","Gun","Gum","Mb","Zvi"]
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
