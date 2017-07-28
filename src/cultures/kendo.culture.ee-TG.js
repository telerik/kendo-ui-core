(function( window, undefined ) {
    kendo.cultures["ee-TG"] = {
        name: "ee-TG",
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
                name: "West African CFA Franc",
                abbr: "XOF",
                pattern: ["-$n","$n"],
                decimals: 0,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "CFA"
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
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "M/d/yyyy",
                    D: "dddd, MMMM d 'lia' yyyy",
                    F: "dddd, MMMM d 'lia' yyyy HH:mm:ss",
                    g: "M/d/yyyy HH:mm",
                    G: "M/d/yyyy HH:mm:ss",
                    m: "MMMM d 'lia'",
                    M: "MMMM d 'lia'",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
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
