(function( window, undefined ) {
    kendo.cultures["to"] = {
        name: "to",
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
                pattern: ["-$ n","$ n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "T$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sāpate","Mōnite","Tūsite","Pulelulu","Tuʻapulelulu","Falaite","Tokonaki"],
                    namesAbbr: ["Sāp","Mōn","Tūs","Pul","Tuʻa","Fal","Tok"],
                    namesShort: ["Sāp","Mōn","Tūs","Pul","Tuʻa","Fal","Tok"]
                },
                months: {
                    names: ["Sānuali","Fēpueli","Maʻasi","ʻEpeleli","Mē","Sune","Siulai","ʻAokosi","Sepitema","ʻOkatopa","Nōvema","Tīsema"],
                    namesAbbr: ["Sān","Fēp","Maʻa","ʻEpe","Mē","Sun","Siu","ʻAok","Sep","ʻOka","Nōv","Tīs"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy h:mm:ss tt",
                    g: "d/M/yyyy h:mm tt",
                    G: "d/M/yyyy h:mm:ss tt",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
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
