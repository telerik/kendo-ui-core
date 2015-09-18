(function( window, undefined ) {
    kendo.cultures["xh"] = {
        name: "xh",
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
                    names: ["iCawa","uMvulo","uLwesibini","uLwesithathu","uLwesine","uLwesihlanu","uMgqibelo"],
                    namesAbbr: ["iCa.","uMv.","uLwesib.","uLwesith.","uLwesin.","uLwesihl.","uMgq."],
                    namesShort: ["Ca","Mv","Lb","Lt","Ln","Lh","Mg"]
                },
                months: {
                    names: ["uJanuwari","uFebuwari","uMatshi","uAprili","uMeyi","uJuni","uJulayi","uAgasti","uSeptemba","uOktobha","uNovemba","uDisemba"],
                    namesAbbr: ["uJan.","uFeb.","uMat.","uEpr.","uMey.","uJun.","uJul.","uAg.","uSep.","uOkt.","uNov.","uDis."]
                },
                AM: ["Ekuseni","ekuseni","EKUSENI"],
                PM: ["Emva Kwemini","emva kwemini","EMVA KWEMINI"],
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "dd MMMM yyyy",
                    F: "dd MMMM yyyy hh:mm:ss tt",
                    g: "yyyy/MM/dd hh:mm tt",
                    G: "yyyy/MM/dd hh:mm:ss tt",
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
                firstDay: 0
            }
        }
    }
})(this);
