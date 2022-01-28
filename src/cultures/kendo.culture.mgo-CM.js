(function( window, undefined ) {
    kendo.cultures["mgo-CM"] = {
        name: "mgo-CM",
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
                name: "Central African CFA Franc",
                abbr: "XAF",
                pattern: ["-$ n","$ n"],
                decimals: 0,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "FCFA"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Aneg 1","Aneg 2","Aneg 3","Aneg 4","Aneg 5","Aneg 6","Aneg 7"],
                    namesAbbr: ["Aneg 1","Aneg 2","Aneg 3","Aneg 4","Aneg 5","Aneg 6","Aneg 7"],
                    namesShort: ["1","2","3","4","5","6","7"]
                },
                months: {
                    names: ["iməg mbegtug","imeg àbùbì","imeg mbəŋchubi","iməg ngwə̀t","iməg fog","iməg ichiibɔd","iməg àdùmbə̀ŋ","iməg ichika","iməg kud","iməg tèsiʼe","iməg zò","iməg krizmed"],
                    namesAbbr: ["mbegtug","imeg àbùbì","imeg mbəŋchubi","iməg ngwə̀t","iməg fog","iməg ichiibɔd","iməg àdùmbə̀ŋ","iməg ichika","iməg kud","iməg tèsiʼe","iməg zò","iməg krizmed"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "dddd, yyyy MMMM dd",
                    F: "dddd, yyyy MMMM dd HH:mm:ss",
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
