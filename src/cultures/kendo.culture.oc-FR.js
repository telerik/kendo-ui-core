(function( window, undefined ) {
    kendo.cultures["oc-FR"] = {
        name: "oc-FR",
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
                name: "Euro",
                abbr: "EUR",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "€"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["dimenge","diluns","dimarts","dimècres","dijòus","divendres","dissabte"],
                    namesAbbr: ["dg.","dl.","dma.","dmc.","dj.","dv.","ds."],
                    namesShort: ["dg","dl","da","dc","dj","dv","ds"]
                },
                months: {
                    names: ["genièr","febrièr","març","abril","mai","junh","julhet","agost","setembre","octobre","novembre","decembre"],
                    namesAbbr: ["gen.","feb.","març","abr.","mai","junh","julh","ag.","set.","oct.","nov.","dec."]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd d MMMM' de 'yyyy",
                    F: "dddd d MMMM' de 'yyyy HH.mm.ss",
                    g: "dd/MM/yyyy HH' h 'mm",
                    G: "dd/MM/yyyy HH.mm.ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH' h 'mm",
                    T: "HH.mm.ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM' de 'yyyy",
                    Y: "MMMM' de 'yyyy"
                },
                "/": "/",
                ":": ".",
                firstDay: 1
            }
        }
    }
})(this);
