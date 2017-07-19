(function( window, undefined ) {
    kendo.cultures["ff-MR"] = {
        name: "ff-MR",
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
                name: "Mauritanian Ouguiya",
                abbr: "MRO",
                pattern: ["-n $","n $"],
                decimals: 0,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "UM"
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
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy h:mm:ss tt",
                    g: "d/M/yyyy h:mm tt",
                    G: "d/M/yyyy h:mm:ss tt",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
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
