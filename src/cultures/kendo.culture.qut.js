(function( window, undefined ) {
    kendo.cultures["qut"] = {
        name: "qut",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                pattern: ["($n)","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "Q"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["juq\u0027ij","kaq\u0027ij","oxq\u0027ij","kajq\u0027ij","joq\u0027ij","waqq\u0027ij","wuqq\u0027ij"],
                    namesAbbr: ["juq","kaq","oxq","kajq","joq","waqq","wuqq"],
                    namesShort: ["ju","ka","ox","ka","jo","wa","wu"]
                },
                months: {
                    names: ["nab\u0027e ik\u0027","ukab\u0027 ik\u0027","rox ik\u0027","ukaj ik\u0027","uro\u0027 ik\u0027","uwaq ik\u0027","uwuq ik\u0027","uwajxaq ik\u0027","ub\u0027elej ik\u0027","ulaj ik\u0027","ujulaj ik\u0027","ukab\u0027laj ik\u0027",""],
                    namesAbbr: ["nab\u0027e","ukab","rox","ukaj","uro","uwaq","uwuq","uwajxaq","ub\u0027elej","ulaj","ujulaj","ukab\u0027laj",""]
                },
                AM: ["a.m.","a.m.","A.M."],
                PM: ["p.m.","p.m.","P.M."],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, dd' de 'MMMM' de 'yyyy",
                    F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
                    g: "dd/MM/yyyy hh:mm tt",
                    G: "dd/MM/yyyy hh:mm:ss tt",
                    m: "dd MMMM",
                    M: "dd MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM' de 'yyyy",
                    Y: "MMMM' de 'yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);
