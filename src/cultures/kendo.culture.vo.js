(function( window, undefined ) {
    kendo.cultures["vo"] = {
        name: "vo",
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
                symbol: "XDR"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["sudel","mudel","tudel","vedel","dödel","fridel","zädel"],
                    namesAbbr: ["su.","mu.","tu.","ve.","dö.","fr.","zä."],
                    namesShort: ["su.","mu.","tu.","ve.","dö.","fr.","zä."]
                },
                months: {
                    names: ["yanul","febul","mäzul","prilul","mayul","yunul","yulul","gustul","setul","tobul","novul","dekul"],
                    namesAbbr: ["yan","feb","mäz","prl","may","yun","yul","gst","set","tob","nov","dek"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "yyyy MMMM'a' 'd'. d'id'",
                    F: "yyyy MMMM'a' 'd'. d'id' HH:mm:ss",
                    g: "yyyy-MM-dd HH:mm",
                    G: "yyyy-MM-dd HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy MMMM",
                    Y: "yyyy MMMM"
                },
                "/": "-",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
