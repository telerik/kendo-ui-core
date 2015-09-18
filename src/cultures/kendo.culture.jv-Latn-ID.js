(function( window, undefined ) {
    kendo.cultures["jv-Latn-ID"] = {
        name: "jv-Latn-ID",
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
                name: "Indonesian Rupiah",
                abbr: "IDR",
                pattern: ["-$n","$n"],
                decimals: 0,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "Rp"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Minggu","Senèn","Selasa","Rebo","Kemis","Jemuwah","Setu"],
                    namesAbbr: ["Min","Sen","Sel","Reb","Kem","Jem","Set"],
                    namesShort: ["Mi","Sn","Sl","Re","Ke","Je","St"]
                },
                months: {
                    names: ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
                    namesAbbr: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agust","Sep","Okt","Nov","Des"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dd MMMM yyyy",
                    F: "dd MMMM yyyy HH.mm.ss",
                    g: "dd/MM/yyyy HH.mm",
                    G: "dd/MM/yyyy HH.mm.ss",
                    m: "dd MMMM",
                    M: "dd MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH.mm",
                    T: "HH.mm.ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "/",
                ":": ".",
                firstDay: 0
            }
        }
    }
})(this);
