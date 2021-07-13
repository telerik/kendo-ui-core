(function( window, undefined ) {
    kendo.cultures["ff-Latn-SL"] = {
        name: "ff-Latn-SL",
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
                name: "Sierra Leonean Leone",
                abbr: "SLL",
                pattern: ["-n $","n $"],
                decimals: 0,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "Le"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["dewo","aaɓnde","mawbaare","njeslaare","naasaande","mawnde","hoore-biir"],
                    namesAbbr: ["dew","aaɓ","maw","nje","naa","mwd","hbi"],
                    namesShort: ["dew","aaɓ","maw","nje","naa","mwd","hbi"]
                },
                months: {
                    names: ["siilo","colte","mbooy","seeɗto","duujal","korse","morso","juko","siilto","yarkomaa","jolal","bowte"],
                    namesAbbr: ["sii","col","mbo","see","duu","kor","mor","juk","slt","yar","jol","bow"]
                },
                AM: ["subaka","subaka","SUBAKA"],
                PM: ["kikiiɗe","kikiiɗe","KIKIIƊE"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "d/M/yyyy HH:mm",
                    G: "d/M/yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
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
