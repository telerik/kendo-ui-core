(function( window, undefined ) {
    kendo.cultures["yav-CM"] = {
        name: "yav-CM",
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
                name: "Central African CFA Franc",
                abbr: "XAF",
                pattern: ["-n $","n $"],
                decimals: 0,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "FCFA"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["sɔ́ndiɛ","móndie","muányáŋmóndie","metúkpíápɛ","kúpélimetúkpiapɛ","feléte","séselé"],
                    namesAbbr: ["sd","md","mw","et","kl","fl","ss"],
                    namesShort: ["sd","md","mw","et","kl","fl","ss"]
                },
                months: {
                    names: ["pikítíkítie, oólí ú kutúan","siɛyɛ́, oóli ú kándíɛ","ɔnsúmbɔl, oóli ú kátátúɛ","mesiŋ, oóli ú kénie","ensil, oóli ú kátánuɛ","ɔsɔn","efute","pisuyú","imɛŋ i puɔs","imɛŋ i putúk,oóli ú kátíɛ","makandikɛ","pilɔndɔ́"],
                    namesAbbr: ["o.1","o.2","o.3","o.4","o.5","o.6","o.7","o.8","o.9","o.10","o.11","o.12"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "d/M/yyyy HH:mm",
                    G: "d/M/yyyy HH:mm:ss",
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
