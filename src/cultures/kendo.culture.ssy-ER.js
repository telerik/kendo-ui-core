(function( window, undefined ) {
    kendo.cultures["ssy-ER"] = {
        name: "ssy-ER",
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
                name: "Eritrean Nakfa",
                abbr: "ERN",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "Nfk"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Naba Sambat","Sani","Salus","Rabuq","Camus","Jumqata","Qunxa Sambat"],
                    namesAbbr: ["Nab","San","Sal","Rab","Cam","Jum","Qun"],
                    namesShort: ["Nab","San","Sal","Rab","Cam","Jum","Qun"]
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
                firstDay: 1
            }
        }
    }
})(this);
