(function( window, undefined ) {
    kendo.cultures["af-NA"] = {
        name: "af-NA",
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
                name: "Namibian Dollar",
                abbr: "NAD",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrydag","Saterdag"],
                    namesAbbr: ["So.","Ma.","Di.","Wo.","Do.","Vr.","Sa."],
                    namesShort: ["So.","Ma.","Di.","Wo.","Do.","Vr.","Sa."]
                },
                months: {
                    names: ["Januarie","Februarie","Maart","April","Mei","Junie","Julie","Augustus","September","Oktober","November","Desember"],
                    namesAbbr: ["Jan.","Feb.","Mrt.","Apr.","Mei","Jun.","Jul.","Aug.","Sep.","Okt.","Nov.","Des."]
                },
                AM: ["vm.","vm.","VM."],
                PM: ["nm.","nm.","NM."],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "yyyy-MM-dd HH:mm",
                    G: "yyyy-MM-dd HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "-",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
