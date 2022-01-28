(function( window, undefined ) {
    kendo.cultures["ki-KE"] = {
        name: "ki-KE",
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
                    names: ["Kiumia","Njumatatũ","Njumaine","Njumatana","Aramithi","Njumaa","Njumamothi"],
                    namesAbbr: ["KMA","NTT","NMN","NMT","ART","NMA","NMM"],
                    namesShort: ["KMA","NTT","NMN","NMT","ART","NMA","NMM"]
                },
                months: {
                    names: ["Njenuarĩ","Mwere wa kerĩ","Mwere wa gatatũ","Mwere wa kana","Mwere wa gatano","Mwere wa gatandatũ","Mwere wa mũgwanja","Mwere wa kanana","Mwere wa kenda","Mwere wa ikũmi","Mwere wa ikũmi na ũmwe","Ndithemba"],
                    namesAbbr: ["JEN","WKR","WGT","WKN","WTN","WTD","WMJ","WNN","WKD","WIK","WMW","DIT"]
                },
                AM: ["Kiroko","kiroko","KIROKO"],
                PM: ["Hwaĩ-inĩ","hwaĩ-inĩ","HWAĨ-INĨ"],
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
