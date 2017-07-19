(function( window, undefined ) {
    kendo.cultures["ps"] = {
        name: "ps",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
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
                decimals: 0,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "؋"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["یکشنبه","دوشنبه","سه‌شنبه","چارشنبه","پنجشنبه","جمعه","شنبه"],
                    namesAbbr: ["یکشنبه","دوشنبه","سه‌شنبه","چارشنبه","پنجشنبه","جمعه","شنبه"],
                    namesShort: ["ی","د","س","چ","پ","ج","ش"]
                },
                months: {
                    names: ["وری","غويی","غبرګولی","چنګاښ","زمری","وږی","تله","لړم","ليندۍ","مرغومی","سلواغه","كب"],
                    namesAbbr: ["وری","غويی","غبرګولی","چنګاښ","زمری","وږی","تله","لړم","ليندۍ","مرغومی","سلواغه","كب"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "yyyy/M/d",
                    D: "d MMMM yyyy",
                    F: "d MMMM yyyy H:mm:ss",
                    g: "yyyy/M/d H:mm",
                    G: "yyyy/M/d H:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 6
            }
        }
    }
})(this);
