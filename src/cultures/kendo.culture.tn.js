(function( window, undefined ) {
    kendo.cultures["tn"] = {
        name: "tn",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-%n","%n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["$-n","$ n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "R"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sontaga","Mosupologo","Labobedi","Laboraro","Labone","Labotlhano","Matlhatso"],
                    namesAbbr: ["Sont.","Mos.","Lab.","Labr.","Labn.","Labt.","Matlh."],
                    namesShort: ["So","Ms","Lb","Lr","Ln","Lt","Ma"]
                },
                months: {
                    names: ["Ferikgong","Tlhakole","Mopitlwe","Moranang","Motsheganong","Seetebosigo","Phukwi","Phatwe","Lwetse","Diphalane","Ngwanatsele","Sedimothole"],
                    namesAbbr: ["Fer.","Tlh.","Mop.","Mor.","Motsh.","Seet.","Phk.","Pht.","Lwetse.","Diph.","Ngwn.","Sed."]
                },
                AM: ["Mo Mosong","mo mosong","MO MOSONG"],
                PM: ["Mo Maitseboeng","mo maitseboeng","MO MAITSEBOENG"],
                patterns: {
                    d: "dd/MM/yy",
                    D: "dd MMMM yyyy",
                    F: "dd MMMM yyyy hh:mm:ss tt",
                    g: "dd/MM/yy hh:mm tt",
                    G: "dd/MM/yy hh:mm:ss tt",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
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
