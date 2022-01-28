(function( window, undefined ) {
    kendo.cultures["tn"] = {
        name: "tn",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": " ",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": " ",
                ".": ".",
                groupSize: [3],
                symbol: "R"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Tshipi","Mosopulogo","Labobedi","Laboraro","Labone","Labotlhano","Matlhatso"],
                    namesAbbr: ["Tsh","Mos","Labb","Labr","Labn","Labt","Mat"],
                    namesShort: ["Tsh","Mos","Labb","Labr","Labn","Labt","Mat"]
                },
                months: {
                    names: ["Ferikgong","Tlhakole","Mopitlo","Moranang","Motsheganang","Seetebosigo","Phukwi","Phatwe","Lwetse","Diphalane","Ngwanatsele","Sedimonthole"],
                    namesAbbr: ["Fer","Tlh","Mop","Mor","Mot","See","Phu","Pha","Lwe","Dip","Ngw","Sed"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "yyyy MMMM d, dddd",
                    F: "yyyy MMMM d, dddd HH:mm:ss",
                    g: "yyyy-MM-dd HH:mm",
                    G: "yyyy-MM-dd HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy MMMM",
                    Y: "yyyy MMMM"
                },
                "/": "-",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);
