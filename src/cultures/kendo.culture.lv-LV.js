(function( window, undefined ) {
    kendo.cultures["lv-LV"] = {
        name: "lv-LV",
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
                    names: ["svētdiena","pirmdiena","otrdiena","trešdiena","ceturtdiena","piektdiena","sestdiena"],
                    namesAbbr: ["svētd.","pirmd.","otrd.","trešd.","ceturtd.","piektd.","sestd."],
                    namesShort: ["Sv","Pr","Ot","Tr","Ce","Pk","Se"]
                },
                months: {
                    names: ["janvāris","februāris","marts","aprīlis","maijs","jūnijs","jūlijs","augusts","septembris","oktobris","novembris","decembris"],
                    namesAbbr: ["janv.","febr.","marts","apr.","maijs","jūn.","jūl.","aug.","sept.","okt.","nov.","dec."]
                },
                AM: ["priekšp.","priekšp.","PRIEKŠP."],
                PM: ["pēcp.","pēcp.","PĒCP."],
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "dddd, yyyy. 'gada' d. MMMM",
                    F: "dddd, yyyy. 'gada' d. MMMM HH:mm:ss",
                    g: "dd.MM.yyyy HH:mm",
                    G: "dd.MM.yyyy HH:mm:ss",
                    m: "d. MMMM",
                    M: "d. MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy. 'g'. MMMM",
                    Y: "yyyy. 'g'. MMMM"
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
