(function( window, undefined ) {
    kendo.cultures["kde"] = {
        name: "kde",
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
                name: "",
                abbr: "",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "TSh"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Liduva lyapili","Liduva lyatatu","Liduva lyanchechi","Liduva lyannyano","Liduva lyannyano na linji","Liduva lyannyano na mavili","Liduva litandi"],
                    namesAbbr: ["Ll2","Ll3","Ll4","Ll5","Ll6","Ll7","Ll1"],
                    namesShort: ["Ll2","Ll3","Ll4","Ll5","Ll6","Ll7","Ll1"]
                },
                months: {
                    names: ["Mwedi Ntandi","Mwedi wa Pili","Mwedi wa Tatu","Mwedi wa Nchechi","Mwedi wa Nnyano","Mwedi wa Nnyano na Umo","Mwedi wa Nnyano na Mivili","Mwedi wa Nnyano na Mitatu","Mwedi wa Nnyano na Nchechi","Mwedi wa Nnyano na Nnyano","Mwedi wa Nnyano na Nnyano na U","Mwedi wa Nnyano na Nnyano na M"],
                    namesAbbr: ["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ago","Sep","Okt","Nov","Des"]
                },
                AM: ["Muhi","muhi","MUHI"],
                PM: ["Chilo","chilo","CHILO"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d MMMM yyyy",
                    F: "dddd, d MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
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
