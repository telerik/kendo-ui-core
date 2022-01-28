(function( window, undefined ) {
    kendo.cultures["ee-GH"] = {
        name: "ee-GH",
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
                name: "Ghanaian Cedi",
                abbr: "GHS",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "GH₵"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["kɔsiɖa","dzoɖa","blaɖa","kuɖa","yawoɖa","fiɖa","memleɖa"],
                    namesAbbr: ["kɔs","dzo","bla","kuɖ","yaw","fiɖ","mem"],
                    namesShort: ["kɔs","dzo","bla","kuɖ","yaw","fiɖ","mem"]
                },
                months: {
                    names: ["dzove","dzodze","tedoxe","afɔfĩe","dama","masa","siamlɔm","deasiamime","anyɔnyɔ","kele","adeɛmekpɔxe","dzome"],
                    namesAbbr: ["dzv","dzd","ted","afɔ","dam","mas","sia","dea","any","kel","ade","dzm"]
                },
                AM: ["ŋdi","ŋdi","ŊDI"],
                PM: ["ɣetrɔ","ɣetrɔ","ƔETRƆ"],
                patterns: {
                    d: "M/d/yyyy",
                    D: "dddd, MMMM d 'lia' yyyy",
                    F: "dddd, MMMM d 'lia' yyyy tt 'ga' h:mm:ss",
                    g: "M/d/yyyy tt 'ga' h:mm",
                    G: "M/d/yyyy tt 'ga' h:mm:ss",
                    m: "MMMM d 'lia'",
                    M: "MMMM d 'lia'",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "tt 'ga' h:mm",
                    T: "tt 'ga' h:mm:ss",
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
