(function( window, undefined ) {
    kendo.cultures["eu"] = {
        name: "eu",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-% n","% n"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "€"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["igandea","astelehena","asteartea","asteazkena","osteguna","ostirala","larunbata"],
                    namesAbbr: ["ig.","al.","ar.","az.","og.","or.","lr."],
                    namesShort: ["ig.","al.","ar.","az.","og.","or.","lr."]
                },
                months: {
                    names: ["urtarrila","otsaila","martxoa","apirila","maiatza","ekaina","uztaila","abuztua","iraila","urria","azaroa","abendua"],
                    namesAbbr: ["urt.","ots.","mar.","api.","mai.","eka.","uzt.","abu.","ira.","urr.","aza.","abe."]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "yyyy/M/d",
                    D: "yyyy('e')'ko' MMMM'ren' d('a'), dddd",
                    F: "yyyy('e')'ko' MMMM'ren' d('a'), dddd HH:mm:ss",
                    g: "yyyy/M/d HH:mm",
                    G: "yyyy/M/d HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy('e')'ko' MMMM",
                    Y: "yyyy('e')'ko' MMMM"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
