(function( window, undefined ) {
    kendo.cultures["kam"] = {
        name: "kam",
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
                    names: ["Wa kyumwa","Wa kwambĩlĩlya","Wa kelĩ","Wa katatũ","Wa kana","Wa katano","Wa thanthatũ"],
                    namesAbbr: ["Wky","Wkw","Wkl","Wtũ","Wkn","Wtn","Wth"],
                    namesShort: ["Wky","Wkw","Wkl","Wtũ","Wkn","Wtn","Wth"]
                },
                months: {
                    names: ["Mwai wa mbee","Mwai wa kelĩ","Mwai wa katatũ","Mwai wa kana","Mwai wa katano","Mwai wa thanthatũ","Mwai wa muonza","Mwai wa nyaanya","Mwai wa kenda","Mwai wa ĩkumi","Mwai wa ĩkumi na ĩmwe","Mwai wa ĩkumi na ilĩ"],
                    namesAbbr: ["Mbe","Kel","Ktũ","Kan","Ktn","Tha","Moo","Nya","Knd","Ĩku","Ĩkm","Ĩkl"]
                },
                AM: ["Ĩyakwakya","ĩyakwakya","ĨYAKWAKYA"],
                PM: ["Ĩyawĩoo","ĩyawĩoo","ĨYAWĨOO"],
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
