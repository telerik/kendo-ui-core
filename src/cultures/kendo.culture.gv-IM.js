(function( window, undefined ) {
    kendo.cultures["gv-IM"] = {
        name: "gv-IM",
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
                name: "British Pound",
                abbr: "GBP",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "£"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Jedoonee","Jelhein","Jemayrt","Jercean","Jerdein","Jeheiney","Jesarn"],
                    namesAbbr: ["Jed","Jel","Jem","Jerc","Jerd","Jeh","Jes"],
                    namesShort: ["Jed","Jel","Jem","Jerc","Jerd","Jeh","Jes"]
                },
                months: {
                    names: ["Jerrey-geuree","Toshiaght-arree","Mayrnt","Averil","Boaldyn","Mean-souree","Jerrey-souree","Luanistyn","Mean-fouyir","Jerrey-fouyir","Mee Houney","Mee ny Nollick"],
                    namesAbbr: ["J-guer","T-arree","Mayrnt","Avrril","Boaldyn","M-souree","J-souree","Luanistyn","M-fouyir","J-fouyir","M-Houney","M-Nollick"]
                },
                AM: ["a.m.","a.m.","A.M."],
                PM: ["p.m.","p.m.","P.M."],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd dd MMMM yyyy",
                    F: "dddd dd MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
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
