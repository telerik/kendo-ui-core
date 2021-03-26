(function( window, undefined ) {
    kendo.cultures["lu"] = {
        name: "lu",
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
                pattern: ["-n$","n$"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "FC"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Lumingu","Nkodya","Ndàayà","Ndangù","Njòwa","Ngòvya","Lubingu"],
                    namesAbbr: ["Lum","Nko","Ndy","Ndg","Njw","Ngv","Lub"],
                    namesShort: ["Lum","Nko","Ndy","Ndg","Njw","Ngv","Lub"]
                },
                months: {
                    names: ["Ciongo","Lùishi","Lusòlo","Mùuyà","Lumùngùlù","Lufuimi","Kabàlàshìpù","Lùshìkà","Lutongolo","Lungùdi","Kaswèkèsè","Ciswà"],
                    namesAbbr: ["Cio","Lui","Lus","Muu","Lum","Luf","Kab","Lush","Lut","Lun","Kas","Cis"]
                },
                AM: ["Dinda","dinda","DINDA"],
                PM: ["Dilolo","dilolo","DILOLO"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "d/M/yyyy HH:mm",
                    G: "d/M/yyyy HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy MMMM",
                    Y: "yyyy MMMM"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
