(function( window, undefined ) {
    kendo.cultures["ta-LK"] = {
        name: "ta-LK",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3,2],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3,2],
                symbol: "%"
            },
            currency: {
                name: "Sri Lanka Rupee",
                abbr: "LKR",
                pattern: ["$ -n","$ n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3,2],
                symbol: "Rs"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ஞாயிற்றுக்கிழமை","திங்கட்கிழமை","செவ்வாய்க்கிழமை","புதன்கிழமை","வியாழக்கிழமை","வெள்ளிக்கிழமை","சனிக்கிழமை"],
                    namesAbbr: ["ஞாயிறு","திங்கள்","செவ்வாய்","புதன்","வியாழன்","வெள்ளி","சனி"],
                    namesShort: ["ஞா","தி","செ","பு","வி","வெ","ச"]
                },
                months: {
                    names: ["ஜனவரி","பெப்ரவரி","மார்ச்","ஏப்ரல்","மே","ஜூன்","ஜூலை","ஓகஸ்ட்","செப்ரம்பர்","ஒக்ரோபர்","நவம்பர்","டிசம்பர்"],
                    namesAbbr: ["ஜன.","பெப்.","மார்.","ஏப்","மே","ஜூன்","ஜூலை","ஓக.","செப்.","ஒக்.","நவ.","டிச."]
                },
                AM: ["காலை","காலை","காலை"],
                PM: ["மாலை","மாலை","மாலை"],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dd MMMM yyyy",
                    F: "dd MMMM yyyy HH:mm:ss",
                    g: "dd-MM-yyyy HH:mm",
                    G: "dd-MM-yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "-",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
