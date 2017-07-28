(function( window, undefined ) {
    kendo.cultures["br"] = {
        name: "br",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "€"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sul","Lun","Meurzh","Mercʼher","Yaou","Gwener","Sadorn"],
                    namesAbbr: ["Sul","Lun","Meu.","Mer.","Yaou","Gwe.","Sad."],
                    namesShort: ["Sul","Lun","Meu.","Mer.","Yaou","Gwe.","Sad."]
                },
                months: {
                    names: ["Genver","Cʼhwevrer","Meurzh","Ebrel","Mae","Mezheven","Gouere","Eost","Gwengolo","Here","Du","Kerzu"],
                    namesAbbr: ["Gen.","Cʼhwe.","Meur.","Ebr.","Mae","Mezh.","Goue.","Eost","Gwen.","Here","Du","Ker."]
                },
                AM: ["A.M.","a.m.","A.M."],
                PM: ["G.M.","g.m.","G.M."],
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
                firstDay: 1
            }
        }
    }
})(this);
