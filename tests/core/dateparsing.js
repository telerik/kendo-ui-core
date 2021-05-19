(function() {
    var parse = kendo.parseDate;
    var date;

    function isValidDate(year, month, day, date) {
        var isValid = true;

        if (year != date.getFullYear())
            isValid = false;
        else if (month != date.getMonth() + 1)
            isValid = false;
        else if (day != date.getDate())
            isValid = false;

        return isValid;
    }

    function isValidDateTime(date, year, month, day, hours, minutes, seconds, milliseconds) {
        var isValid = true;

        if (year != date.getFullYear())
            isValid = false;
        else if (month != date.getMonth() + 1)
            isValid = false;
        else if (day != date.getDate())
            isValid = false;
        else if (hours && hours != date.getHours())
            isValid = false;
        else if (minutes && minutes != date.getMinutes())
            isValid = false;
        else if (seconds && seconds != date.getSeconds())
            isValid = false;
        else if (milliseconds && milliseconds != date.getMilliseconds())
            isValid = false;

        return isValid;
    }

    describe("date parsing", function() {

        it("parse should use calendar.patterns if no format is provided", function() {
            var result = parse("10/12/2000 10:10:10 AM");

            assert.equal(+result, +(new Date(2000, 9, 12, 10, 10, 10)));
        });

        it("parse should use calendars.standard.patterns if culture is provided and no format is provided", function() {
            var result = parse("12.10.2000", null, "de-DE");

            assert.equal(+result, +(new Date(2000, 9, 12)));
        });

        it("parse should pasrse time iso string if no format is provided", function() {
            var result = parse("10:10:10");
            var today = kendo.date.today();
            today.setHours(10, 10, 10);

            assert.deepEqual(result, today);
        });

        it("parse method returns null if not value", function() {
            var result = parse();

            assert.equal(result, null);
        });

        it('parse d date format', function() { // ISO format

            var result = parse("12/23/2000");
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse G date format', function() { // ISO format

            var dateFormat = "G";
            var result = parse("12/23/2000 1:30:30 AM", dateFormat);
            assert.isOk(isValidDateTime(result, 2000, 12, 23, 1, 30, 30));
        });

        it('parse short year 11 should return year 2011', function() { // ISO format

            var result = parse("12/23/11", "M/d/yy");
            assert.equal(result.getFullYear(), 2011);
        });

        it('parse short year 31 should return year 1931', function() { // ISO format

            var result = parse("12/23/31 1:30:30 AM", "M/d/yy");
            assert.equal(result.getFullYear(), 1931);
        });

        it('parse short year 29 should return year 2029', function() { // ISO format

            var result = parse("12/23/29", "M/d/yy");
            assert.equal(result.getFullYear(), 2029);
        });

        it('parse gets shortYearCutOff from culture', function() { // ISO format
            var culture = kendo.culture();
            culture.calendars.standard.twoDigitYearMax = 2020;

            var result = parse("12/23/21", "M/d/yy");
            assert.equal(result.getFullYear(), 1921);

            culture.calendars.standard.twoDigitYearMax = 2029;
        });

        it('parse supports shortYearCutOff as string', function() { // ISO format
            var culture = kendo.culture();
            culture.calendars.standard.twoDigitYearMax = '+19';

            var year = (new Date()).getFullYear() + 19,
                result = parse("12/23/" + (year - 2000), "M/d/yy");

            assert.equal(result.getFullYear(), year);

            culture.calendars.standard.twoDigitYearMax = 2029;
        });

        it('parse G date format time parsing', function() { // ISO format

            var dateFormat = "G";
            var result = parse("12/23/2000 8:12:22 pm", dateFormat);
            assert.isOk(isValidDateTime(result, 2000, 12, 23, 20, 12, 22));
        });

        it('parse G date time at midnight', function() { // ISO format

            var dateFormat = "G";
            var result = parse("10/23/2000 12:00:00 pm", dateFormat);
            assert.isOk(isValidDateTime(result, 2000, 10, 23, 12, 0, 0));
        });

        it('parse G date time at noon', function() { // ISO format

            var dateFormat = "G";
            var result = parse("10/23/2000 12:00:00 am", dateFormat);
            assert.isOk(isValidDateTime(result, 2000, 10, 23, 0, 0, 0), result.toString());
        });

        it('parse ISO date format', function() { // ISO format

            var dateFormat = "MM-dd-yyyy";
            var result = parse("12-23-2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });
        it('parse Invariant Language date format', function() { // Also: Persian

            var dateFormat = "MM/dd/yyyy";
            var result = parse("12/23/2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Arabic date format', function() { // Also : Galician, Divehi

            var dateFormat = "dd/MM/yy";
            var result = parse("10/10/99", dateFormat);
            assert.isOk(isValidDate(1999, 10, 10, result));
        });

        it('parse Bulgarian Language date format', function() { //

            var dateFormat = "d.M.yyyy '?.'";
            var result = parse("23.12.2000 '?.'", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Bulgarian Language with literal date format', function() {

            var dateFormat = "d.M.yyyy '?.'";
            var result = parse("23.12.2000 ?.", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Catalan Language date format', function() { // Also : Vietnamese, Arabic

            var dateFormat = "dd/MM/yyyy";
            var result = parse("23/12/2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Chinese Language date format', function() {

            var dateFormat = "yyyy/M/d";
            var result = parse("2000/12/23", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Czech Language date format', function() {

            var dateFormat = "d.M.yyyy";
            var result = parse("23.12.2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Danish Language date format', function() { // Also : Faroese, Hindi, Tamil, Marathi
            //Sanskrit, Konkani, Portuguese

            var dateFormat = "dd-MM-yyyy";
            var result = parse("23-12-2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse German Language date format', function() { //also : Norwegian, Romanian, Russian, Turkish
            // Ukrainian, Belarusian, Armenian, Azeri, Macedonian, Georgian, Kazakh, Tatar, Italian,Norwegian
            //Azeri, Uzbek, Austria

            var dateFormat = "dd.MM.yyyy";
            var result = parse("23.12.2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Greek Language date format', function() { // also : Portuguese, Thai, Hong Kong

            var dateFormat = "d/M/yyyy";
            var result = parse("23/12/2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse English Language date format', function() { // Also : Kiswahili

            var dateFormat = "M/d/yyyy";
            var result = parse("12/23/2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Finnish Language date format', function() { // also : Icelandic, Croatian, Slovenian
            // Serbian, Swedish,

            var dateFormat = "d.M.yyyy";
            var result = parse("23.12.2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse French Language date format', function() { // also : Hebrew, Italian, Urdu, Indonesian
            //Malay, Syriac, (United Kingdom), Spanish (Mexico), ms-BN, Arabic

            var dateFormat = "dd/MM/yyyy";
            var result = parse("23/12/2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Hungarian Language date format', function() {

            var dateFormat = "yyyy. MM. dd.";
            var result = parse("2000. 12. 23.", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Japanese Language date format', function() { // Also : Basque, Afrikaans

            var dateFormat = "yyyy/MM/dd";
            var result = parse("2000/12/23", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Korean Language date format', function() { // also : Polish, Albanian, Swedish

            var dateFormat = "yyyy-MM-dd";
            var result = parse("2000-12-23", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Dutch Language date format', function() {

            var dateFormat = "d-M-yyyy";
            var result = parse("23-2-2008", dateFormat);
            assert.isOk(isValidDate(2008, 2, 23, result));
        });

        it('parse Norwegian Language date format', function() {

            var dateFormat = "d-M-yyyy";
            var result = parse("23-2-2008", dateFormat);
            assert.isOk(isValidDate(2008, 2, 23, result));
        });

        it('parse Slovak Language date format', function() {

            var dateFormat = "d. M. yyyy";
            var result = parse("23. 2. 2008", dateFormat);
            assert.isOk(isValidDate(2008, 2, 23, result));
        });

        it('parse Estonian Language date format', function() {

            var dateFormat = "d.MM.yyyy";
            var result = parse("23.12.2008", dateFormat);
            assert.isOk(isValidDate(2008, 12, 23, result));
        });

        it('parse Latvian Language date format', function() {

            var dateFormat = "yyyy.MM.dd.";
            var result = parse("2008.12.23.", dateFormat);
            assert.isOk(isValidDate(2008, 12, 23, result));
        });

        it('parse Lithuanian Language date format', function() {

            var dateFormat = "yyyy.MM.dd";
            var result = parse("2008.12.23", dateFormat);
            assert.isOk(isValidDate(2008, 12, 23, result));
        });

        it('parse Kyrgyz Language date format', function() {
            var dateFormat = "dd.MM.yy";
            var result = parse("5.3.08", dateFormat);
            assert.isOk(isValidDate(2008, 3, 5, result));
        });

        it('parse Uzbek Language date format', function() {
            var dateFormat = "dd/MM yyyy";
            var result = parse("5/3 2008", dateFormat);
            assert.isOk(isValidDate(2008, 3, 5, result));
        });

        it('parse Punjabi Language date format', function() { // Also : Gujarati, Telugu, Kannada
            var dateFormat = "dd-MM-yy";
            var result = parse("5-3-08", dateFormat);
            assert.isOk(isValidDate(2008, 3, 5, result));
        });

        it('parse Mongolian Language date format', function() {
            var dateFormat = "yy.MM.dd";
            var result = parse("99.12.25", dateFormat);
            assert.isOk(isValidDate(1999, 12, 25, result));
        });

        it('parse Belgium Language date format', function() { // Also Dutch(Belgium ), English (Australia)
            var dateFormat = "d/MM/yyyy";
            var result = parse("05/10/2009", dateFormat);
            assert.isOk(isValidDate(2009, 10, 5, result));
        });

        it('parse Yakut Language date format', function() {
            var dateFormat = "MM.dd.yyyy";
            var result = parse("3.5.2008", dateFormat);
            assert.isOk(isValidDate(2008, 3, 5, result));
        });

        it('parse Croatian Language date format', function() {
            var dateFormat = "d.M.yyyy.";
            var result = parse("5.3.2008.", dateFormat);
            assert.isOk(isValidDate(2008, 3, 5, result));
        });

        it('parse Invariant Language long date format', function() { // Also: Persian
            var dateFormat = "dddd, dd MMMM yyyy";
            var result = parse("Saturday, 23 December 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse method skips dddd in favor of dd value', function() { // Also: Persian
            var dateFormat = "dd MMMM yyyy, dddd";
            var result = parse("23 December 2000, Saturday", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Arabic long date format', function() {

            var dateFormat = "dd/MMMM/yyyy";
            var result = parse("10/September/2009", dateFormat);
            assert.isOk(isValidDate(2009, 9, 10, result));
        });

        it('parse Bulgarian long date format', function() {

            var dateFormat = "dd MMMM yyyy '?.'";
            var result = parse("10 September 2009 '?.'", dateFormat);
            assert.isOk(isValidDate(2009, 9, 10, result));
        });

        it('parse Catalan long date format', function() {

            var dateFormat = "dddd, d' / 'MMMM' / 'yyyy";
            var result = parse("Saturday, 23 / December / 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Chinese long date format', function() {

            var dateFormat = "yyyy'?'M'?'d'?'";
            var result = parse("2009?9?10?", dateFormat);
            assert.isOk(isValidDate(2009, 9, 10, result));
        });

        it('parse Czech long date format', function() { // also: Danish, Norwegian

            var dateFormat = "d. MMMM yyyy";
            var result = parse("10. September 2009", dateFormat);
            assert.isOk(isValidDate(2009, 9, 10, result));
        });

        it('parse German long date format', function() {

            var dateFormat = "dddd, d. MMMM yyyy";
            var result = parse("Saturday, 23. December 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Greek long date format', function() {

            var dateFormat = "dddd, d MMMM yyyy";
            var result = parse("Saturday, 3 December 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 3, result));
        });

        it('parse English long date format', function() {

            var dateFormat = "dddd, MMMM dd, yyyy";
            var result = parse("Saturday, December 3, 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 3, result));
        });

        it('parse Finnish long date format', function() {

            var dateFormat = "d. MMMM'ta 'yyyy";
            var result = parse("23. Decemberta 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse France long date format', function() {

            var dateFormat = "dddd d MMMM yyyy";
            var result = parse("Saturday 3 December 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 3, result));
        });

        it('parse Hebrew long date format', function() {

            var dateFormat = "dddd dd MMMM yyyy";
            var result = parse("Saturday 3 December 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 3, result));
        });

        it('parse Hungarian long date format', function() {

            var dateFormat = "yyyy. MMMM d.";
            var result = parse("2000. December 23.", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Icelandic long date format', function() {

            var dateFormat = "d. MMMM yyyy";
            var result = parse("23. December 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Italian long date format', function() { // Also Dutch

            var dateFormat = "dddd d MMMM yyyy";
            var result = parse("Saturday 3 December 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 3, result));
        });

        it('parse Japanese long date format', function() {

            var dateFormat = "yyyy'?'M'?'d'?'";
            var result = parse("2000?12?3?", dateFormat);
            assert.isOk(isValidDate(2000, 12, 3, result));
        });

        it('parse Norwegian long date format', function() {

            var dateFormat = "dddd d MMMM yyyy";
            var result = parse("Saturday 3 December 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 3, result));
        });

        it('parse Brazil long date format', function() {

            var dateFormat = "dddd, d' de 'MMMM' de 'yyyy";
            var result = parse("Saturday, 3 de December de 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 3, result));
        });

        it('parse Polish long date format', function() { //Also Romanian, Thailand, Belarusian

            var dateFormat = "d MMMM yyyy";
            var result = parse("3 December 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 3, result));
        });

        it('parse Russian long date format', function() {

            var dateFormat = "d MMMM yyyy '?.'";
            var result = parse("3 December 2000 '?.'", dateFormat);
            assert.isOk(isValidDate(2000, 12, 3, result));
        });

        it('parse Croatian long date format', function() { //Also Slovak

            var dateFormat = "d. MMMM yyyy";
            var result = parse("3. December 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 3, result));
        });

        it('parse Albanian long date format', function() {

            var dateFormat = "yyyy-MM-dd";
            var result = parse("2000-12-23", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Swedish long date format', function() {

            var dateFormat = "'den 'd MMMM yyyy";
            var result = parse("den 23 December 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Ukrainian long date format', function() {

            var dateFormat = "'den 'd MMMM yyyy' ?.'";
            var result = parse("den 23 December 2000", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Estonian long date format', function() {

            var dateFormat = "d. MMMM yyyy'. a.'";
            var result = parse("3. December 2000. a.", dateFormat);
            assert.isOk(isValidDate(2000, 12, 3, result));
        });

        it('parse Latvian long date format', function() {

            var dateFormat = "dddd, yyyy'. gada 'd. MMMM";
            var result = parse("Saturday, 2000. gada 3. December", dateFormat);
            assert.isOk(isValidDate(2000, 12, 3, result));
        });

        it('parse Lithuanian long date format', function() {

            var dateFormat = "yyyy 'm.' MMMM d 'd.'";
            var result = parse("2000 m. December 23 d.", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse Basque long date format', function() {

            var dateFormat = "dddd, yyyy.'eko' MMMM'k 'd";
            var result = parse("Saturday, 2000.eko Decemberk 3", dateFormat);
            assert.isOk(isValidDate(2000, 12, 3, result));
        });

        it('parse Tibetian long date format', function() {
            var dateFormat = "yyyy'???????' M'???' d";
            var result = parse("2000??????? 12??? 23", dateFormat);
            assert.isOk(isValidDate(2000, 12, 23, result));
        });

        it('parse date time format', function() { // ISO format
            var dateFormat = "dd/MMM/yyyy HH:mm:ss";
            var result = parse("22/Aug/2006 06:30:07", dateFormat);
            assert.isOk(new Date(2006, 7, 22, 6, 30, 7) - result == 0);
        });

        it('parse invalid date should return null', function() {
            var dateFormat = "MM/dd/yyyy";

            var result = parse("1//2100", dateFormat);
            assert.equal(result, null);
        });

        it('parse MMMM yyyy date format', function() {
            var dateFormat = "MMMM yyyy";
            var result = parse("January 2000", dateFormat);
            assert.isOk(isValidDate(2000, 1, 1, result));
        });

        it('parse MMMM yyyy date format if the current culture contains months with names that start with the same letters', function() {
            var dateFormat = "MMMM yyyy";
            var calendar = kendo.culture().calendar;
            var monthNames = (calendar._lowerMonths || calendar.months).names;
            var originalMonthName = monthNames[5];
            try {
                monthNames[5] = monthNames[6].substr(0, monthNames[6].length - 1);
                var result = parse(monthNames[6] + " 2000", dateFormat);
                assert.isOk(isValidDate(2000, 7, 1, result));
            }
            finally {
                monthNames[5] = originalMonthName;
            }
        });

        it('parse G format of ko-KR culture', function() {
            var dateFormat = "MMMM yyyy";
            var calendar = kendo.culture().calendar;

            var oldAM = calendar.AM;
            var oldPM = calendar.PM;
            var oldPatterns = calendar.patterns;

            //ko-KR culture
            calendar.AM = ["오전", "오전", "오전"];
            calendar.PM = ["오후", "오후", "오후"];
            calendar.patterns = {
                d: "yyyy-MM-dd",
                D: "yyyy'년' M'월' d'일' dddd",
                F: "yyyy'년' M'월' d'일' dddd tt h:mm:ss",
                g: "yyyy-MM-dd tt h:mm",
                G: "yyyy-MM-dd tt h:mm:ss",
                m: "M'월' d'일'",
                M: "M'월' d'일'",
                s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                t: "tt h:mm",
                T: "tt h:mm:ss",
                u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                y: "yyyy'년' M'월'",
                Y: "yyyy'년' M'월'"
            };

            try {
                var result = parse("2016-05-27 오전 11:00");
                assert.isOk(isValidDateTime(result, 2016, 5, 27, 11, 0, 0, 0, 0), result);

            } finally {
                calendar.patterns = oldPatterns;
                calendar.AM = oldAM;
                calendar.PM = oldPM;
            }
        });

        tzTest('Sofia', 'parses more specific standard formats before culture date formats', function() {
            var calendar = kendo.culture().calendar;
            var shortDatePattern = calendar.patterns.d;

            try {
                calendar.patterns.d = "yyyy-MM-dd";
                var result = parse("2016-02-29T15:22:46+01:00");
                assert.isOk(isValidDateTime(result, 2016, 2, 29, 16, 22, 46));
            } finally {
                calendar.patterns.d = shortDatePattern;
            }
        });

        it('parse should return null if only year is passed', function() {
            var dateFormat = "M/dd/yyyy";

            var result = parse("2010", dateFormat);

            assert.equal(result, null);
        });

        it("parse should be able to parse using multiple formats", function() {
            var formats = ["G", "M/dd/yyyy"];
            var result = parse("2/2/2000", formats);

            assert.notEqual(result, null);
        });

        it("parse() should parse string using predefined patters", function() {
            var result = parse("2/2/2000");
            var result1 = parse("Thu Nov 24 2011 18:06:53 GMT+0200 (FLE Standard Time)");

            assert.notEqual(result, null);
            assert.notEqual(result1, null);
        });

        it("parseExact method does not parse if time does not have AM designator", function() {
            assert.equal(parse("10:00", "hh:mm tt"), null);
        });

        it("parseExact method supports single 't' format specifier (P)", function() {
            assert.equal(+parse("10/10/2000 10:00 p", "MM/dd/yyyy hh:mm t"), +new Date(2000, 9, 10, 22, 0, 0));
        });

        it("parseExact method supports single 't' format specifier (A)", function() {
            assert.equal(+parse("10/10/2000 10:00 a", "MM/dd/yyyy hh:mm t"), +new Date(2000, 9, 10, 10, 0, 0));
        });

        it("parseExact method parses UTC iso8601", function() {
            var utcDate = new Date(Date.UTC(2000, 9, 10, 14, 30, 0));
            assert.equal(+parse("2000-10-10T14:30Z", "yyyy-MM-ddTHH:mmzz"), +utcDate);
        });

        it("parseExact method returns if string is not valid ISO8601", function() {
            var utcDate = new Date(Date.UTC(2000, 9, 10, 14, 30, 0));
            assert.equal(parse("2000-10-1014:30Z", "yyyy-MM-ddTHH:mmzz"), null);
        });

        it("parseExact method parses UTC iso8601", function() {
            var utcDate = new Date(Date.UTC(2000, 9, 10, 14, 30, 0));
            assert.equal(+parse("2000-10-10T14:30Z", "yyyy-MM-ddTHH:mmzz"), +utcDate);
        });

        it("parseExact method parses UTC milliseconds correctly", function() {
            var utcDate = new Date(Date.UTC(2000, 9, 10, 14, 30, 0, 450));
            assert.equal(parse("2000-10-10T14:30:0.45Z", "yyyy-MM-ddTHH:mm:ss.fffzzz").getMilliseconds(), utcDate.getMilliseconds());
        });

        it("parseExact method parses milliseconds with leading zeros", function() {
            assert.equal(parse("2000-10-10T14:30:0.0400000Z", "yyyy-MM-ddTHH:mm:ss.fffffffzzz").getMilliseconds(), 40);
        });

        it("parseExact method parses UTC milliseconds correctly (no specific format)", function() {
            var utcDate = new Date(Date.UTC(2000, 9, 10, 14, 30, 0, 450));
            assert.equal(kendo.parseDate("2000-10-10T14:30:0.45Z").getMilliseconds(), utcDate.getMilliseconds());
        });

        it("parseExact method parses  iso8601 with timezone", function() {
            assert.equal(+parse("2000-10-10T14:30+03:30", "yyyy-MM-ddTHH:mmzzz"), Date.parse("2000-10-10T14:30+03:30"));
        });

        it("parseExact method parses datetime with timezone offset (hours)", function() {
            assert.equal(+parse("2000-10-10 14:30 +1", "yyyy-MM-dd HH:mm z"), Date.parse("2000-10-10T14:30+01:00"));
        });

        it("parseExact method parses datetime with timezone offset (hours and minutes)", function() {
            assert.equal(+parse("2000-10-10 14:30 +03:30", "yyyy-MM-dd HH:mm zzz"), Date.parse("2000-10-10T14:30+03:30"));
        });

        it("parseExact method parses datetime with timezone hours and minutes offset wihout colon", function() {
            assert.equal(+parse("2000-10-10 14:30 +0330", "yyyy-MM-dd HH:mm zzz"), Date.parse("2000-10-10T14:30+03:30"));
        });

        it("parseExact method returns null if short timezone is incorrect", function() {
            assert.equal(parse("2000-10-10 14:30 +14:30", "yyyy-MM-dd HH:mm zz"), null);
        });

        it("parseExact method returns null if long timezone is incorrect", function() {
            assert.equal(parse("2000-10-10 14:30 +3:60", "yyyy-MM-dd HH:mm zzz"), null);
        });

        it("parseExact method returns null if not valid timezone", function() {
            assert.equal(parse("2000-10-10 14:30", "yyyy-MM-dd HH:mm zzz"), null);
        });

        it("parseExact method honors DST start date", function() {
            //DST in Bulgaria 2012-3-25
            assert.equal(+parse("2012-3-25 3:30 +2", "yyyy-MM-dd HH:mm zz"), +new Date("2012-03-25T03:30+02:00"));
            assert.equal(+parse("2012-3-25 3:30 +3", "yyyy-MM-dd HH:mm zz"), +new Date("2012-03-25T03:30+03:00"));
        });

        it("parseExact method honors DST end date", function() {
            //DST in Bulgaria 2012-10-28
            assert.equal(+parse("2012-10-28 2:00 +2", "yyyy-MM-dd HH:mm zz"), +new Date("2012-10-28T02:00+02:00"));
            assert.equal(+parse("2012-10-28 3:00 +2", "yyyy-MM-dd HH:mm zz"), +new Date("2012-10-28T03:00+02:00"));
        });

        it("parseDate parses result from kendo.stringify", function() {
            var date = kendo.stringify(new Date(2000, 10, 10, 14, 15, 30, 333));
            date = date.substr(1, date.length - 2);

            assert.equal(+parse(date, "yyyy-MM-ddTHH:mm:ss.fffzz"), Date.parse(date));
        });

        it("parseDate parses result from kendo.stringify 'Z'", function() {
            var date = kendo.stringify(new Date(2000, 10, 10, 14, 15, 30, 333));
            date = date.substr(1, date.length - 2);

            assert.equal(+parse(date), Date.parse(date));
        });

        it("parseDate parses ISO format without need of format", function() {
            assert.equal(+parse("2012-3-25T3:30+2"), +new Date("2012-03-25T03:30+02:00"));
            assert.equal(+parse("2012-3-25T3:30+3:30"), +new Date("2012-03-25T03:30+03:30"));
        });

        it("parseDate parses /Date(milliseconds)/ string", function() {
            var date = new Date();
            var dateString = "/Date(" + +date + ")/";

            assert.equal(+parse(dateString), +date);
        });

        it("parseDate parses /Date(-milliseconds)/ string", function() {
            var result = new Date(1965, 0, 1);
            var dateString = "/Date(" + result.getTime() + ")/";

            assert.deepEqual(parse(dateString), result);
        });

        it("parseDate parses /Date(milliseconds+offset)/ string", function() {
            var date = new Date();
            var utcDate = kendo.timezone.apply(date, 0);
            var adjustedDate = kendo.timezone.convert(utcDate, 0, -150);

            var dateString = "/Date(" + date.getTime() + "+0230)/";

            assert.deepEqual(parse(dateString), adjustedDate);
        });

        it("parseDate parses /Date(milliseconds+offset)/ string (2)", function() {
            var utcTime = 1376949210000;
            var tzoffset = new Date(utcTime).getTimezoneOffset();

            var sign = tzoffset > 0 ? "-" : "+";
            tzoffset = Math.abs(tzoffset);

            var minutes = tzoffset % 60;
            var hours = (tzoffset - minutes) / 60;

            var msoffset = sign + kendo.toString(hours, "00") + kendo.toString(minutes, "00");
            var dateString = "/Date(" + utcTime + msoffset + ")/";

            assert.deepEqual(parse(dateString), new Date(utcTime));
        });

        it("parseDate does not parse ISO8601 with format dd.MM.yyyy", function() {
            var dateString = "2012-08-16T21:00:00Z";

            assert.equal(kendo.parseDate(dateString, "dd.MM.yyyy"), null);
        });

        it("parseDate returns null if input does not meet format", function() {
            assert.equal(parse("10/10/2000", "yyyy/MM/dd"), null);
        });

        it("parseDate parses yyy date", function() {
            assert.equal(+parse("900/10/10", "yyy/MM/dd"), +new Date(900, 9, 10));
        });

        it("parseDate does not expand date if yyy format", function() {
            var date = new Date(90, 9, 10);
            date.setFullYear(90);

            assert.equal(+parse("090/10/10", "yyy/MM/dd"), +date);
        });

        it("parseDate parses yy date", function() {
            assert.equal(+parse("09/10/10", "yy/MM/dd"), +new Date(2009, 9, 10));
        });

        it("parseDate returns null if 'yyy' and four digit year", function() {
            assert.equal(parse("201/10/10", "yyyy/MM/dd"), null);
        });

        it("parseDate returns null if 'yyyy' and three digit year", function() {
            assert.equal(parse("2011/10/10", "yyy/MM/dd"), null);
        });

        it("parseDate uses current year if no 'y'", function() {
            var year = (new Date()).getFullYear();
            assert.equal(parse("10/10", "MM/dd").getFullYear(), year);
        });

        it("parseDate does not expand year if digits are 4", function() {
            var date = new Date(1, 9, 10);
            date.setFullYear(1);

            assert.equal(+parse("0001/10/10", "yyyy/MM/dd"), +date);
        });

        it("parseDate returns null if yyyy and bigger date", function() {
            assert.equal(parse("10000/10/10", "yyyy/MM/dd"), null);
        });

        it("parseDate returns null if year is negative", function() {
            assert.equal(parse("-9000/10/10", "yyyy/MM/dd"), null);
        });

        it("parseDate supports 5 digit year", function() {
            assert.equal(+parse("11111/10/10", "yyyyy/MM/dd"), +new Date(11111, 9, 10));
        });

        it("parseDate expands year if digits are 2", function() {
            assert.equal(+parse("01/10/10", "yy/MM/dd"), +new Date(2001, 9, 10));
        });

        it("parseDate supports milliseconds length depending on the 'f' count", function() {
            var result = parse("2012-03-25T03:30:10.1234567-10:00", "yyyy-MM-ddTHH:mm:ss.fffffffzzz");
            assert.equal(+result, Date.parse("2012-03-25T03:30:10.1234567-10:00"));
        });

        it("parseDate supports JSON.NET format", function() {
            var result = parse("2012-03-25T03:30:10.1234567-10:00");
            assert.equal(+result, Date.parse("2012-03-25T03:30:10.1234567-10:00"));
        });

        it("parseDate ISO8601 using local time if no time zone specified", function() {
            var result = parse("2012-03-25T03:30:10", "yyyy-MM-ddTHH:mm:ss");
            assert.equal(+result, +new Date(2012, 2, 25, 3, 30, 10));
        });

        it("adjustDate adjusts Brasil date with DST", function() {
            var date = new Date(2012, 9, 20, 23, 0, 0);

            kendo.date.adjustDST(date, 0);

            assert.equal(+date, +new Date(2012, 9, 21, 1, 0, 0));
        });

        it("parseDate return null if entered day is bigger then the possible in the current month", function() {
            assert.equal(parse("09/31/2012"), null);
        });

        it("parseDate parses correctly ISO8601 with negative timezone", function() {
            var result = parse("2013-01-16T16:00:00-10:00", "yyyy-MM-ddTHH:mm:sszzz");
            assert.equal(+result, +new Date("2013-01-16T16:00:00-10:00"));
        });

        it("parseDate returns null if format expects milliseconds", function() {
            var result = parse("2013-01-16T16:00:00-10:00", "yyyy-MM-ddTHH:mm:ss.ffffffzzz");
            assert.equal(result, null);
        });

        it("parseDate parses correctly ISO8601 with Z", function() {
            var result = parse("2013-01-17T22:00:00Z");

            assert.equal(+result, +new Date("2013-01-17T22:00:00Z"));
        });

        it("parseDate parses month names case insensitive", function() {
            var format = "MMMM, dd-MMM-yyyy",
                controlDate = new Date(2000, 2, 10),
                result1 = parse("march, 10-mar-2000", format),
                result2 = parse("MARCH, 10-MAR-2000", format),
                result3 = parse("March, 10-Mar-2000", format);

            assert.equal(+controlDate, +result1);
            assert.equal(+controlDate, +result2);
            assert.equal(+controlDate, +result3);
        });

        it("parseDate parses 'yyyy-MM-dd HH:mm:ss' format", function() {
            var result = parse("2013-01-17 22:00:02");
            assert.deepEqual(result, new Date("2013/01/17 22:00:02"));
        });

        it("parseDate parses 'yyyy-MM-dd HH:mm' format", function() {
            var result = parse("2013-01-17 22:02");
            assert.deepEqual(result, new Date("2013/01/17 22:02:00"));
        });

        it("parseDate parses 'yyyy-MM-dd' format", function() {
            var result = parse("2013-01-17");
            assert.deepEqual(result, new Date("2013/01/17 00:00:00"));
        });

        it("parseDate parses 'yyyy/MM/dd HH:mm:ss' format", function() {
            var result = parse("2013/01/17 22:00:02");
            assert.deepEqual(result, new Date("2013/01/17 22:00:02"));
        });

        it("parseDate parses 'yyyy/MM/dd HH:mm' format", function() {
            var result = parse("2013/01/17 22:02");
            assert.deepEqual(result, new Date("2013/01/17 22:02:00"));
        });

        it("parseDate parses 'yyyy/MM/dd' format", function() {
            var result = parse("2013/01/17");
            assert.deepEqual(result, new Date("2013/01/17 00:00:00"));
        });

        it("parseDate uses today's date when parse only time portion", function() {
            var today = new Date();
            var result = parse("10:00 AM", "hh:mm tt");

            today.setHours(10, 0, 0, 0);

            assert.deepEqual(result, today);
        });

        it("parseDate supports UTC date without a timezone offset", function() {
            var result = parse("2012-03-25T04:30:10.1234567");
            assert.deepEqual(result, new Date(2012, 2, 25, 4, 30, 10, 123));
        });

        it("parseExact method parses date string with UTC 'Z' zone designator", function() {
            var utcDate = new Date(Date.UTC(2014, 4, 21, 0, 0, 0));
            var result = kendo.parseDate("2014-05-21 00:00:00Z", "yyyy-MM-dd HH:mm:sszz")

            assert.deepEqual(result, utcDate);
        });

        it('time portion is copied to new date', function() {
            var time = new Date(2016, 0, 1, 12, 15, 0);
            var date = new Date(2016, 0, 15, 14, 0, 0);
            var result = kendo.date.setHours(date, time);
            assert.deepEqual(result, new Date("2016/01/15 12:15:00"));
        });

        it('negative sign for minutes is taken into account when parsing', function() {
            var date = new Date(2017, 1, 23, 10, 0, 0);
            assert.deepEqual(parse('2017-02-23T10:00:00-00:30'), new Date(2017, 1, 23, 10 + date.getTimezoneOffset() * (-1) / 60, 30, 0));
        });

        it('positive sign for minutes is taken into account when parsing', function() {
            var date = new Date(2017, 1, 23, 10, 0, 0);
            assert.deepEqual(parse('2017-02-23T10:00:00+00:30'), new Date(2017, 1, 23, 10 + date.getTimezoneOffset() * (-1) / 60, -30, 0));
        });

        it('setHours should work correctly when daylight saving time change occurs', function () {
            var initialDate = new Date(2019, 2, 30, 23, 59, 0);
            var newDate = new Date(2019, 2, 31, 0, 0, 0);
            var expectedDate = new Date(2019, 2, 31, 23, 59, 0)

            assert.deepEqual(kendo.date.setHours(newDate, initialDate), expectedDate)
        });

    });
}());
