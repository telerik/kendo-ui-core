(function( window, undefined ) {
    kendo.cultures["es-UY"] = {
        name: "es-UY",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Uruguayan Peso",
                abbr: "UYU",
                pattern: ["-$ n","$ n"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
                    namesAbbr: ["dom.","lun.","mar.","mié.","jue.","vie.","sáb."],
                    namesShort: ["DO","LU","MA","MI","JU","VI","SA"]
                },
                months: {
                    names: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"],
                    namesAbbr: ["Ene.","Feb.","Mar.","Abr.","May.","Jun.","Jul.","Ago.","Set.","Oct.","Nov.","Dic."]
                },
                AM: ["a.m.","a.m.","A.M."],
                PM: ["p.m.","p.m.","P.M."],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd, d 'de' MMMM 'de' yyyy",
                    F: "dddd, d 'de' MMMM 'de' yyyy H:mm:ss",
                    g: "d/M/yyyy H:mm",
                    G: "d/M/yyyy H:mm:ss",
                    m: "d 'de' MMMM",
                    M: "d 'de' MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM 'de' yyyy",
                    Y: "MMMM 'de' yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
