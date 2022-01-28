(function( window, undefined ) {
    kendo.cultures["teo-KE"] = {
        name: "teo-KE",
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
                name: "Kenyan Shilling",
                abbr: "KES",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "Ksh"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Nakaejuma","Nakaebarasa","Nakaare","Nakauni","Nakaung’on","Nakakany","Nakasabiti"],
                    namesAbbr: ["Jum","Bar","Aar","Uni","Ung","Kan","Sab"],
                    namesShort: ["Jum","Bar","Aar","Uni","Ung","Kan","Sab"]
                },
                months: {
                    names: ["Orara","Omuk","Okwamg’","Odung’el","Omaruk","Omodok’king’ol","Ojola","Opedel","Osokosokoma","Otibar","Olabor","Opoo"],
                    namesAbbr: ["Rar","Muk","Kwa","Dun","Mar","Mod","Jol","Ped","Sok","Tib","Lab","Poo"]
                },
                AM: ["Taparachu","taparachu","TAPARACHU"],
                PM: ["Ebongi","ebongi","EBONGI"],
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
                firstDay: 0
            }
        }
    }
})(this);
