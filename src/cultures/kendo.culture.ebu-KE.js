(function( window, undefined ) {
    kendo.cultures["ebu-KE"] = {
        name: "ebu-KE",
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
                name: "Kenyan Shilling",
                abbr: "KES",
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
                    names: ["Kiumia","Njumatatu","Njumaine","Njumatano","Aramithi","Njumaa","NJumamothii"],
                    namesAbbr: ["Kma","Tat","Ine","Tan","Arm","Maa","NMM"],
                    namesShort: ["Kma","Tat","Ine","Tan","Arm","Maa","NMM"]
                },
                months: {
                    names: ["Mweri wa mbere","Mweri wa kaĩri","Mweri wa kathatũ","Mweri wa kana","Mweri wa gatano","Mweri wa gatantatũ","Mweri wa mũgwanja","Mweri wa kanana","Mweri wa kenda","Mweri wa ikũmi","Mweri wa ikũmi na ũmwe","Mweri wa ikũmi na Kaĩrĩ"],
                    namesAbbr: ["Mbe","Kai","Kat","Kan","Gat","Gan","Mug","Knn","Ken","Iku","Imw","Igi"]
                },
                AM: ["KI","ki","KI"],
                PM: ["UT","ut","UT"],
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
