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
                name: "",
                abbr: "",
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
                    namesAbbr: ["juq\u0027","kaq\u0027","oxq\u0027","kajq\u0027","joq\u0027","waqq\u0027","wuqq\u0027"],
                    namesShort: ["ju","ka","ox","kj","jo","wa","wu"]
                },
                months: {
                    names: ["nab\u0027e ik\u0027","ukab\u0027 ik\u0027","urox ik\u0027","ukaj ik\u0027","uro ik\u0027","uwaq ik\u0027","uwuq ik\u0027","uwajxaq ik\u0027","ub\u0027elej ik\u0027","ulaj ik\u0027","ujulaj ik\u0027","ukab\u0027laj ik\u0027"],
                    namesAbbr: ["nab\u0027e","ukab\u0027","urox","ukaj","uro","uwaq","uwuq","uwajxaq","ub\u0027elej","ulaj","ujulaj","ukab\u0027laj"]
                },
                AM: ["a.m.","a.m.","A.M."],
                PM: ["p.m.","p.m.","P.M."],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, dd' rech 'MMMM' rech 'yyyy",
                    F: "dddd, dd' rech 'MMMM' rech 'yyyy h:mm:ss tt",
                    g: "dd/MM/yyyy h:mm tt",
                    G: "dd/MM/yyyy h:mm:ss tt",
                    m: "d' rech 'MMMM",
                    M: "d' rech 'MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM' rech 'yyyy",
                    Y: "MMMM' rech 'yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
