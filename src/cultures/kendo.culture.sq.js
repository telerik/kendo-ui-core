(function( window, undefined ) {
    kendo.cultures["sq"] = {
        name: "sq",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
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
                decimals: 0,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "Lekë"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["e diel","e hënë","e martë","e mërkurë","e enjte","e premte","e shtunë"],
                    namesAbbr: ["Die","Hën","Mar","Mër","Enj","Pre","Sht"],
                    namesShort: ["die","hën","mar","mër","enj","pre","sht"]
                },
                months: {
                    names: ["janar","shkurt","mars","prill","maj","qershor","korrik","gusht","shtator","tetor","nëntor","dhjetor"],
                    namesAbbr: ["jan","shk","mar","pri","maj","qer","korr","gush","sht","tet","nën","dhj"]
                },
                AM: ["p.d.","p.d.","P.D."],
                PM: ["m.d.","m.d.","M.D."],
                patterns: {
                    d: "d.M.yyyy",
                    D: "dddd, d MMMM yyyy",
                    F: "dddd, d MMMM yyyy h:mm:ss tt",
                    g: "d.M.yyyy h:mm tt",
                    G: "d.M.yyyy h:mm:ss tt",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
