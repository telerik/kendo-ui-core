(function( window, undefined ) {
    kendo.cultures["aa"] = {
        name: "aa",
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
                symbol: "Br"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Acaada","Etleeni","Talaata","Arbaqa","Kamiisi","Gumqata","Sabti"],
                    namesAbbr: ["Aca","Etl","Tal","Arb","Kam","Gum","Sab"],
                    namesShort: ["Aca","Etl","Tal","Arb","Kam","Gum","Sab"]
                },
                months: {
                    names: ["Qunxa Garablu","Kudo","Ciggilta Kudo","Agda Baxis","Caxah Alsa","Qasa Dirri","Qado Dirri","Liiqen","Waysu","Diteli","Ximoli","Kaxxa Garablu"],
                    namesAbbr: ["Qun","Nah","Cig","Agd","Cax","Qas","Qad","Leq","Way","Dit","Xim","Kax"]
                },
                AM: ["saaku","saaku","SAAKU"],
                PM: ["carra","carra","CARRA"],
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
                    y: "yyyy MMMM",
                    Y: "yyyy MMMM"
                },
                "/": "/",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);
