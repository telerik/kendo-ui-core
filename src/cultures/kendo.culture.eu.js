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
                pattern: ["% -n","% n"],
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
                    namesAbbr: ["ig.","al.","as.","az.","og.","or.","lr."],
                    namesShort: ["ig","al","as","az","og","or","lr"]
                },
                months: {
                    names: ["urtarrila","otsaila","martxoa","apirila","maiatza","ekaina","uztaila","abuztua","iraila","urria","azaroa","abendua"],
                    namesAbbr: ["urt.","ots.","mar.","api.","mai.","eka.","uzt.","abu.","ira.","urr.","aza.","abe."]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "dddd, yyyy'(e)ko' MMMM'ren' d'a'",
                    F: "dddd, yyyy'(e)ko' MMMM'ren' d'a' H:mm:ss",
                    g: "yyyy/MM/dd H:mm",
                    G: "yyyy/MM/dd H:mm:ss",
                    m: "MMMM'ren' d'a'",
                    M: "MMMM'ren' d'a'",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy'(e)ko' MMMM",
                    Y: "yyyy'(e)ko' MMMM"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
