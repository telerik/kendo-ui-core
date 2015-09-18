(function( window, undefined ) {
    kendo.cultures["nso-ZA"] = {
        name: "nso-ZA",
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
                name: "South African Rand",
                abbr: "ZAR",
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
                    names: ["Lamorena","Mošupologo","Labobedi","Laboraro","Labone","Labohlano","Mokibelo"],
                    namesAbbr: ["Lam","Moš","Lbb","Lbr","Lbn","Lbh","Mok"],
                    namesShort: ["La","Mo","Lb","Lr","Ln","Lh","Mk"]
                },
                months: {
                    names: ["Janaware","Feberware","Matšhe","Aprele","Mei","June","Julae","Agostose","Setemere","Oktoboro","Nofemere","Disemere"],
                    namesAbbr: ["Jan","Feb","Matš","Apr","Mei","June","Julae","Agost","Set","Oky","Nof","Dis"]
                },
                AM: ["MS","ms","MS"],
                PM: ["TP","tp","TP"],
                patterns: {
                    d: "dd/MM/yy",
                    D: "dd MMMM yyyy",
                    F: "dd MMMM yyyy hh:mm:ss tt",
                    g: "dd/MM/yy hh:mm tt",
                    G: "dd/MM/yy hh:mm:ss tt",
                    m: "MMMM d",
                    M: "MMMM d",
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
