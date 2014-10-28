(function(){
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

test("parse should use calendar.patterns if no format is provided", function() {
    var result = parse("10/12/2000 10:10:10 AM");

    equal(+result, +(new Date(2000,9,12,10,10,10)));
});

test("parse should pasrse time iso string if no format is provided", function() {
    var result = parse("10:10:10");
    var today = kendo.date.today();
    today.setHours(10, 10, 10);

    deepEqual(result, today);
});

test("parse method returns null if not value", function() {
    var result = parse();

    equal(result, null);
});

test('parse d date format', function () { // ISO format

    var result = parse("12/23/2000");
    ok(isValidDate(2000, 12, 23, result));
});

test('parse G date format', function () { // ISO format

    var dateFormat = "G";
    var result = parse("12/23/2000 1:30:30 AM", dateFormat);
    ok(isValidDateTime(result, 2000, 12, 23, 1, 30, 30));
});

test('parse short year 11 should return year 2011', function () { // ISO format

    var result = parse("12/23/11", "M/d/yy");
    equal(result.getFullYear(), 2011);
});

test('parse short year 31 should return year 1931', function () { // ISO format

    var result = parse("12/23/31 1:30:30 AM", "M/d/yy");
    equal(result.getFullYear(), 1931);
});

test('parse short year 29 should return year 2029', function () { // ISO format

    var result = parse("12/23/29", "M/d/yy");
    equal(result.getFullYear(), 2029);
});

test('parse gets shortYearCutOff from culture', function () { // ISO format
    var culture = kendo.culture();
    culture.calendars.standard.twoDigitYearMax = 2020;

    var result = parse("12/23/21", "M/d/yy");
    equal(result.getFullYear(), 1921);

    culture.calendars.standard.twoDigitYearMax = 2029;
});

test('parse supports shortYearCutOff as string', function () { // ISO format
    var culture = kendo.culture();
    culture.calendars.standard.twoDigitYearMax = '+19';

    var year = (new Date()).getFullYear() + 19,
        result = parse("12/23/" + (year - 2000), "M/d/yy");

    equal(result.getFullYear(), year);

    culture.calendars.standard.twoDigitYearMax = 2029;
});

test('parse G date format time parsing', function () { // ISO format

    var dateFormat = "G";
    var result = parse("12/23/2000 8:12:22 pm", dateFormat);
    ok(isValidDateTime(result, 2000, 12, 23, 20, 12, 22));
});

test('parse G date time at midnight', function () { // ISO format

    var dateFormat = "G";
    var result = parse("10/23/2000 12:00:00 pm", dateFormat);
    ok(isValidDateTime(result, 2000, 10, 23, 12, 0, 0));
});

test('parse G date time at noon', function () { // ISO format

    var dateFormat = "G";
    var result = parse("10/23/2000 12:00:00 am", dateFormat);
    ok(isValidDateTime(result, 2000, 10, 23, 0, 0, 0), result.toString());
});

test('parse ISO date format', function () { // ISO format

    var dateFormat = "MM-dd-yyyy";
    var result = parse("12-23-2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});
test('parse Invariant Language date format', function () { // Also: Persian

    var dateFormat = "MM/dd/yyyy";
    var result = parse("12/23/2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Arabic date format', function () { // Also : Galician, Divehi

    var dateFormat = "dd/MM/yy";
    var result = parse("10/10/99", dateFormat);
    ok(isValidDate(1999, 10, 10, result));
});

test('parse Bulgarian Language date format', function () { //

    var dateFormat = "d.M.yyyy '?.'";
    var result = parse("23.12.2000 '?.'", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Bulgarian Language with literal date format', function () {

    var dateFormat = "d.M.yyyy '?.'";
    var result = parse("23.12.2000 ?.", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Catalan Language date format', function () { // Also : Vietnamese, Arabic

    var dateFormat = "dd/MM/yyyy";
    var result = parse("23/12/2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Chinese Language date format', function () {

    var dateFormat = "yyyy/M/d";
    var result = parse("2000/12/23", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Czech Language date format', function () {

    var dateFormat = "d.M.yyyy";
    var result = parse("23.12.2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Danish Language date format', function () { // Also : Faroese, Hindi, Tamil, Marathi
    //Sanskrit, Konkani, Portuguese

    var dateFormat = "dd-MM-yyyy";
    var result = parse("23-12-2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse German Language date format', function () { //also : Norwegian, Romanian, Russian, Turkish
    // Ukrainian, Belarusian, Armenian, Azeri, Macedonian, Georgian, Kazakh, Tatar, Italian,Norwegian
    //Azeri, Uzbek, Austria

    var dateFormat = "dd.MM.yyyy";
    var result = parse("23.12.2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Greek Language date format', function () { // also : Portuguese, Thai, Hong Kong

    var dateFormat = "d/M/yyyy";
    var result = parse("23/12/2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse English Language date format', function () { // Also : Kiswahili

    var dateFormat = "M/d/yyyy";
    var result = parse("12/23/2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Finnish Language date format', function () { // also : Icelandic, Croatian, Slovenian
    // Serbian, Swedish,

    var dateFormat = "d.M.yyyy";
    var result = parse("23.12.2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse French Language date format', function () { // also : Hebrew, Italian, Urdu, Indonesian
    //Malay, Syriac, (United Kingdom), Spanish (Mexico), ms-BN, Arabic

    var dateFormat = "dd/MM/yyyy";
    var result = parse("23/12/2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Hungarian Language date format', function () {

    var dateFormat = "yyyy. MM. dd.";
    var result = parse("2000. 12. 23.", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Japanese Language date format', function () { // Also : Basque, Afrikaans

    var dateFormat = "yyyy/MM/dd";
    var result = parse("2000/12/23", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Korean Language date format', function () { // also : Polish, Albanian, Swedish

    var dateFormat = "yyyy-MM-dd";
    var result = parse("2000-12-23", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Dutch Language date format', function () {

    var dateFormat = "d-M-yyyy";
    var result = parse("23-2-2008", dateFormat);
    ok(isValidDate(2008, 2, 23, result));
});

test('parse Norwegian Language date format', function () {

    var dateFormat = "d-M-yyyy";
    var result = parse("23-2-2008", dateFormat);
    ok(isValidDate(2008, 2, 23, result));
});

test('parse Slovak Language date format', function () {

    var dateFormat = "d. M. yyyy";
    var result = parse("23. 2. 2008", dateFormat);
    ok(isValidDate(2008, 2, 23, result));
});

test('parse Estonian Language date format', function () {

    var dateFormat = "d.MM.yyyy";
    var result = parse("23.12.2008", dateFormat);
    ok(isValidDate(2008, 12, 23, result));
});

test('parse Latvian Language date format', function () {

    var dateFormat = "yyyy.MM.dd.";
    var result = parse("2008.12.23.", dateFormat);
    ok(isValidDate(2008, 12, 23, result));
});

test('parse Lithuanian Language date format', function () {

    var dateFormat = "yyyy.MM.dd";
    var result = parse("2008.12.23", dateFormat);
    ok(isValidDate(2008, 12, 23, result));
});

test('parse Kyrgyz Language date format', function () {
    var dateFormat = "dd.MM.yy";
    var result = parse("5.3.08", dateFormat);
    ok(isValidDate(2008, 3, 5, result));
});

test('parse Uzbek Language date format', function () {
    var dateFormat = "dd/MM yyyy";
    var result = parse("5/3 2008", dateFormat);
    ok(isValidDate(2008, 3, 5, result));
});

test('parse Punjabi Language date format', function () { // Also : Gujarati, Telugu, Kannada
    var dateFormat = "dd-MM-yy";
    var result = parse("5-3-08", dateFormat);
    ok(isValidDate(2008, 3, 5, result));
});

test('parse Mongolian Language date format', function () {
    var dateFormat = "yy.MM.dd";
    var result = parse("99.12.25", dateFormat);
    ok(isValidDate(1999, 12, 25, result));
});

test('parse Belgium Language date format', function () { // Also Dutch(Belgium ), English (Australia)
    var dateFormat = "d/MM/yyyy";
    var result = parse("05/10/2009", dateFormat);
    ok(isValidDate(2009, 10, 5, result));
});

test('parse Yakut Language date format', function () {
    var dateFormat = "MM.dd.yyyy";
    var result = parse("3.5.2008", dateFormat);
    ok(isValidDate(2008, 3, 5, result));
});

test('parse Croatian Language date format', function () {
    var dateFormat = "d.M.yyyy.";
    var result = parse("5.3.2008.", dateFormat);
    ok(isValidDate(2008, 3, 5, result));
});
test('parse Invariant Language long date format', function () { // Also: Persian

    var dateFormat = "dddd, dd MMMM yyyy";
    var result = parse("Saturday, 23 December 2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Arabic long date format', function () {

    var dateFormat = "dd/MMMM/yyyy";
    var result = parse("10/September/2009", dateFormat);
    ok(isValidDate(2009, 9, 10, result));
});

test('parse Bulgarian long date format', function () {

    var dateFormat = "dd MMMM yyyy '?.'";
    var result = parse("10 September 2009 '?.'", dateFormat);
    ok(isValidDate(2009, 9, 10, result));
});

test('parse Catalan long date format', function () {

    var dateFormat = "dddd, d' / 'MMMM' / 'yyyy";
    var result = parse("Saturday, 23 / December / 2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Chinese long date format', function () {

    var dateFormat = "yyyy'?'M'?'d'?'";
    var result = parse("2009?9?10?", dateFormat);
    ok(isValidDate(2009, 9, 10, result));
});

test('parse Czech long date format', function () { // also: Danish, Norwegian

    var dateFormat = "d. MMMM yyyy";
    var result = parse("10. September 2009", dateFormat);
    ok(isValidDate(2009, 9, 10, result));
});

test('parse German long date format', function () {

    var dateFormat = "dddd, d. MMMM yyyy";
    var result = parse("Saturday, 23. December 2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Greek long date format', function () {

    var dateFormat = "dddd, d MMMM yyyy";
    var result = parse("Saturday, 3 December 2000", dateFormat);
    ok(isValidDate(2000, 12, 3, result));
});

test('parse English long date format', function () {

    var dateFormat = "dddd, MMMM dd, yyyy";
    var result = parse("Saturday, December 3, 2000", dateFormat);
    ok(isValidDate(2000, 12, 3, result));
});

test('parse Finnish long date format', function () {

    var dateFormat = "d. MMMM'ta 'yyyy";
    var result = parse("23. Decemberta 2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse France long date format', function () {

    var dateFormat = "dddd d MMMM yyyy";
    var result = parse("Saturday 3 December 2000", dateFormat);
    ok(isValidDate(2000, 12, 3, result));
});

test('parse Hebrew long date format', function () {

    var dateFormat = "dddd dd MMMM yyyy";
    var result = parse("Saturday 3 December 2000", dateFormat);
    ok(isValidDate(2000, 12, 3, result));
});

test('parse Hungarian long date format', function () {

    var dateFormat = "yyyy. MMMM d.";
    var result = parse("2000. December 23.", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Icelandic long date format', function () {

    var dateFormat = "d. MMMM yyyy";
    var result = parse("23. December 2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Italian long date format', function () { // Also Dutch

    var dateFormat = "dddd d MMMM yyyy";
    var result = parse("Saturday 3 December 2000", dateFormat);
    ok(isValidDate(2000, 12, 3, result));
});

test('parse Japanese long date format', function () {

    var dateFormat = "yyyy'?'M'?'d'?'";
    var result = parse("2000?12?3?", dateFormat);
    ok(isValidDate(2000, 12, 3, result));
});

test('parse Norwegian long date format', function () {

    var dateFormat = "dddd d MMMM yyyy";
    var result = parse("Saturday 3 December 2000", dateFormat);
    ok(isValidDate(2000, 12, 3, result));
});

test('parse Brazil long date format', function () {

    var dateFormat = "dddd, d' de 'MMMM' de 'yyyy";
    var result = parse("Saturday, 3 de December de 2000", dateFormat);
    ok(isValidDate(2000, 12, 3, result));
});

test('parse Polish long date format', function () { //Also Romanian, Thailand, Belarusian

    var dateFormat = "d MMMM yyyy";
    var result = parse("3 December 2000", dateFormat);
    ok(isValidDate(2000, 12, 3, result));
});

test('parse Russian long date format', function () {

    var dateFormat = "d MMMM yyyy '?.'";
    var result = parse("3 December 2000 '?.'", dateFormat);
    ok(isValidDate(2000, 12, 3, result));
});

test('parse Croatian long date format', function () { //Also Slovak

    var dateFormat = "d. MMMM yyyy";
    var result = parse("3. December 2000", dateFormat);
    ok(isValidDate(2000, 12, 3, result));
});

test('parse Albanian long date format', function () {

    var dateFormat = "yyyy-MM-dd";
    var result = parse("2000-12-23", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Swedish long date format', function () {

    var dateFormat = "'den 'd MMMM yyyy";
    var result = parse("den 23 December 2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Ukrainian long date format', function () {

    var dateFormat = "'den 'd MMMM yyyy' ?.'";
    var result = parse("den 23 December 2000", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Estonian long date format', function () {

    var dateFormat = "d. MMMM yyyy'. a.'";
    var result = parse("3. December 2000. a.", dateFormat);
    ok(isValidDate(2000, 12, 3, result));
});

test('parse Latvian long date format', function () {

    var dateFormat = "dddd, yyyy'. gada 'd. MMMM";
    var result = parse("Saturday, 2000. gada 3. December", dateFormat);
    ok(isValidDate(2000, 12, 3, result));
});

test('parse Lithuanian long date format', function () {

    var dateFormat = "yyyy 'm.' MMMM d 'd.'";
    var result = parse("2000 m. December 23 d.", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse Basque long date format', function () {

    var dateFormat = "dddd, yyyy.'eko' MMMM'k 'd";
    var result = parse("Saturday, 2000.eko Decemberk 3", dateFormat);
    ok(isValidDate(2000, 12, 3, result));
});

test('parse Tibetian long date format', function () {
    var dateFormat = "yyyy'???????' M'???' d";
    var result = parse("2000??????? 12??? 23", dateFormat);
    ok(isValidDate(2000, 12, 23, result));
});

test('parse date time format', function () { // ISO format
    var dateFormat = "dd/MMM/yyyy HH:mm:ss";
    var result = parse("22/Aug/2006 06:30:07", dateFormat);
    ok(new Date(2006, 7, 22, 6, 30, 7) - result == 0);
});

test('parse invalid date should return null', function () {
    var dateFormat = "MM/dd/yyyy";

    var result = parse("1//2100", dateFormat);
    equal(result, null);
});

test('parse MMMM yyyy date format', function () {
    var dateFormat = "MMMM yyyy";
    var result = parse("January 2000", dateFormat);
    ok(isValidDate(2000, 1, 1, result));
});

test('parse should return null if only year is passed', function () {
    var dateFormat = "M/dd/yyyy";

    var result = parse("2010", dateFormat);

    equal(result, null);
});

test("parse should be able to parse using multiple formats", function() {
    var formats = ["G", "M/dd/yyyy"];
    var result = parse("2/2/2000", formats);

    notEqual(result, null);
});

test("parse() should parse string using predefined patters", function() {
    var result = parse("2/2/2000");
    var result1 = parse("Thu Nov 24 2011 18:06:53 GMT+0200 (FLE Standard Time)");

    notEqual(result, null);
    notEqual(result1, null);
});

test("parseExact method does not parse if time does not have AM designator", function() {
    equal(parse("10:00", "hh:mm tt"), null);
});

test("parseExact method supports single 't' format specifier (P)", function() {
    equal(+parse("10/10/2000 10:00 p", "MM/dd/yyyy hh:mm t"), +new Date(2000, 9, 10, 22, 0, 0));
});

test("parseExact method supports single 't' format specifier (A)", function() {
    equal(+parse("10/10/2000 10:00 a", "MM/dd/yyyy hh:mm t"), +new Date(2000, 9, 10, 10, 0, 0));
});

test("parseExact method parses UTC iso8601", function() {
    var utcDate = new Date(Date.UTC(2000, 9, 10, 14, 30, 0));
    equal(+parse("2000-10-10T14:30Z", "yyyy-MM-ddTHH:mmzz"), +utcDate);
});

test("parseExact method returns if string is not valid ISO8601", function() {
    var utcDate = new Date(Date.UTC(2000, 9, 10, 14, 30, 0));
    equal(parse("2000-10-1014:30Z", "yyyy-MM-ddTHH:mmzz"), null);
});

test("parseExact method parses UTC iso8601", function() {
    var utcDate = new Date(Date.UTC(2000, 9, 10, 14, 30, 0));
    equal(+parse("2000-10-10T14:30Z", "yyyy-MM-ddTHH:mmzz"), +utcDate);
});

test("parseExact method parses UTC milliseconds correctly", function() {
    var utcDate = new Date(Date.UTC(2000, 9, 10, 14, 30, 0, 450));
    equal(parse("2000-10-10T14:30:0.45Z", "yyyy-MM-ddTHH:mm:ss.fffzzz").getMilliseconds(), utcDate.getMilliseconds());
});

test("parseExact method parses UTC milliseconds correctly (no specific format)", function() {
    var utcDate = new Date(Date.UTC(2000, 9, 10, 14, 30, 0, 450));
    equal(kendo.parseDate("2000-10-10T14:30:0.45Z").getMilliseconds(), utcDate.getMilliseconds());
});

test("parseExact method parses  iso8601 with timezone", function() {
    equal(+parse("2000-10-10T14:30+03:30", "yyyy-MM-ddTHH:mmzzz"), Date.parse("2000-10-10T14:30+03:30"));
});

test("parseExact method parses datetime with timezone offset (hours)", function() {
    equal(+parse("2000-10-10 14:30 +1", "yyyy-MM-dd HH:mm z"), Date.parse("2000-10-10T14:30+01:00"));
});

test("parseExact method parses datetime with timezone offset (hours and minutes)", function() {
    equal(+parse("2000-10-10 14:30 +03:30", "yyyy-MM-dd HH:mm zzz"), Date.parse("2000-10-10T14:30+03:30"));
});

test("parseExact method parses datetime with timezone hours and minutes offset wihout colon", function() {
    equal(+parse("2000-10-10 14:30 +0330", "yyyy-MM-dd HH:mm zzz"), Date.parse("2000-10-10T14:30+03:30"));
});

test("parseExact method returns null if short timezone is incorrect", function() {
    equal(parse("2000-10-10 14:30 +14:30", "yyyy-MM-dd HH:mm zz"), null);
});

test("parseExact method returns null if long timezone is incorrect", function() {
    equal(parse("2000-10-10 14:30 +3:60", "yyyy-MM-dd HH:mm zzz"), null);
});

test("parseExact method returns null if not valid timezone", function() {
    equal(parse("2000-10-10 14:30", "yyyy-MM-dd HH:mm zzz"), null);
});

test("parseExact method honors DST start date", function() {
    //DST in Bulgaria 2012-3-25
    equal(+parse("2012-3-25 3:30 +2", "yyyy-MM-dd HH:mm zz"), +new Date("2012-03-25T03:30+02:00"));
    equal(+parse("2012-3-25 3:30 +3", "yyyy-MM-dd HH:mm zz"), +new Date("2012-03-25T03:30+03:00"));
});

test("parseExact method honors DST end date", function() {
    //DST in Bulgaria 2012-10-28
    equal(+parse("2012-10-28 2:00 +2", "yyyy-MM-dd HH:mm zz"), +new Date("2012-10-28T02:00+02:00"));
    equal(+parse("2012-10-28 3:00 +2", "yyyy-MM-dd HH:mm zz"), +new Date("2012-10-28T03:00+02:00"));
});

test("parseDate parses result from kendo.stringify", function() {
    var date = kendo.stringify(new Date(2000, 10, 10, 14, 15, 30, 333));
    date = date.substr(1, date.length - 2);

    equal(+parse(date, "yyyy-MM-ddTHH:mm:ss.fffzz"), Date.parse(date));
});

test("parseDate parses result from kendo.stringify 'Z'", function() {
    var date = kendo.stringify(new Date(2000, 10, 10, 14, 15, 30, 333));
    date = date.substr(1, date.length - 2);

    equal(+parse(date), Date.parse(date));
});

test("parseDate parses ISO format without need of format", function() {
    equal(+parse("2012-3-25T3:30+2"), +new Date("2012-03-25T03:30+02:00"));
    equal(+parse("2012-3-25T3:30+3:30"), +new Date("2012-03-25T03:30+03:30"));
});

test("parseDate parses /Date(milliseconds)/ string", function() {
    var date = new Date();
    var dateString = "/Date(" + +date + ")/";

    equal(+parse(dateString), +date);
});

test("parseDate parses /Date(-milliseconds)/ string", function() {
    var result = new Date(1965, 0, 1);
    var dateString = "/Date(" + result.getTime() + ")/";

    deepEqual(parse(dateString), result);
});

test("parseDate parses /Date(milliseconds+offset)/ string", function() {
    var date = new Date();
    var utcDate = kendo.timezone.apply(date, 0);
    var adjustedDate = kendo.timezone.convert(utcDate, 0, -150);

    var dateString = "/Date(" + date.getTime() + "+0230)/";

    deepEqual(parse(dateString), adjustedDate);
});

test("parseDate parses /Date(milliseconds+offset)/ string (2)", function() {
    var utcTime = 1376949210000;
    var tzoffset = new Date(utcTime).getTimezoneOffset();

    var sign = tzoffset > 0 ? "-" : "+";
    tzoffset = Math.abs(tzoffset);

    var minutes = tzoffset % 60;
    var hours = (tzoffset - minutes) / 60;

    var msoffset = sign + kendo.toString(hours, "00") + kendo.toString(minutes, "00");
    var dateString = "/Date(" + utcTime + msoffset + ")/";

    deepEqual(parse(dateString), new Date(utcTime));
});

test("parseDate does not parse ISO8601 with format dd.MM.yyyy", function() {
    var dateString = "2012-08-16T21:00:00Z";

    equal(kendo.parseDate(dateString, "dd.MM.yyyy"), null);
});

test("parseDate returns null if input does not meet format", function() {
    equal(parse("10/10/2000", "yyyy/MM/dd"), null);
});

test("parseDate parses yyy date", function() {
    equal(+parse("900/10/10", "yyy/MM/dd"), +new Date(900, 9, 10));
});

test("parseDate does not expand date if yyy format", function() {
    var date = new Date(90, 9, 10);
    date.setFullYear(90);

    equal(+parse("090/10/10", "yyy/MM/dd"), +date);
});

test("parseDate parses yy date", function() {
    equal(+parse("09/10/10", "yy/MM/dd"), +new Date(2009, 9, 10));
});

test("parseDate returns null if 'yyy' and four digit year", function() {
    equal(parse("201/10/10", "yyyy/MM/dd"), null);
});

test("parseDate returns null if 'yyyy' and three digit year", function() {
    equal(parse("2011/10/10", "yyy/MM/dd"), null);
});

test("parseDate uses current year if no 'y'", function() {
    var year = (new Date()).getFullYear();
    equal(parse("10/10", "MM/dd").getFullYear(), year);
});

test("parseDate does not expand year if digits are 4", function() {
    var date = new Date(1, 9, 10);
    date.setFullYear(1);

    equal(+parse("0001/10/10", "yyyy/MM/dd"), +date);
});

test("parseDate returns null if yyyy and bigger date", function() {
    equal(parse("10000/10/10", "yyyy/MM/dd"), null);
});

test("parseDate returns null if year is negative", function() {
    equal(parse("-9000/10/10", "yyyy/MM/dd"), null);
});

test("parseDate supports 5 digit year", function() {
    equal(+parse("11111/10/10", "yyyyy/MM/dd"), +new Date(11111, 9, 10));
});

test("parseDate expands year if digits are 2", function() {
    equal(+parse("01/10/10", "yy/MM/dd"), +new Date(2001, 9, 10));
});

test("parseDate supports milliseconds length depending on the 'f' count", function() {
    var result = parse("2012-03-25T03:30:10.1234567-10:00", "yyyy-MM-ddTHH:mm:ss.fffffffzzz");
    equal(+result, Date.parse("2012-03-25T03:30:10.1234567-10:00"));
});

test("parseDate supports JSON.NET format", function() {
    var result = parse("2012-03-25T03:30:10.1234567-10:00");
    equal(+result, Date.parse("2012-03-25T03:30:10.1234567-10:00"));
});

test("parseDate ISO8601 using local time if no time zone specified", function() {
    var result = parse("2012-03-25T03:30:10", "yyyy-MM-ddTHH:mm:ss");
    equal(+result, +new Date(2012, 2, 25, 3, 30, 10));
});

test("adjustDate adjusts Brasil date with DST", function() {
    var date = new Date(2012, 9, 20, 23, 0, 0);

    kendo.date.adjustDST(date, 0);

    equal(+date, +new Date(2012, 9, 21, 1, 0, 0));
});

test("parseDate return null if entered day is bigger then the possible in the current month", function() {
    equal(parse("09/31/2012"), null);
});

test("parseDate parses correctly ISO8601 with negative timezone", function() {
    var result = parse("2013-01-16T16:00:00-10:00", "yyyy-MM-ddTHH:mm:sszzz");
    equal(+result, +new Date("2013-01-16T16:00:00-10:00"));
});

test("parseDate returns null if format expects milliseconds", function() {
    var result = parse("2013-01-16T16:00:00-10:00", "yyyy-MM-ddTHH:mm:ss.ffffffzzz");
    equal(result, null);
});

test("parseDate parses correctly ISO8601 with Z", function() {
    var result = parse("2013-01-17T22:00:00Z");

    equal(+result, +new Date("2013-01-17T22:00:00Z"));
});

test("parseDate parses month names case insensitive", function() {
    var format = "MMMM, dd-MMM-yyyy",
        controlDate = new Date(2000, 2, 10),
        result1 = parse("march, 10-mar-2000", format),
        result2 = parse("MARCH, 10-MAR-2000", format),
        result3 = parse("March, 10-Mar-2000", format);

    equal(+controlDate, +result1);
    equal(+controlDate, +result2);
    equal(+controlDate, +result3);
});

test("parseDate parses 'yyyy-MM-dd HH:mm:ss' format", function() {
    var result = parse("2013-01-17 22:00:02");
    deepEqual(result, new Date("2013/01/17 22:00:02"));
});

test("parseDate parses 'yyyy-MM-dd HH:mm' format", function() {
    var result = parse("2013-01-17 22:02");
    deepEqual(result, new Date("2013/01/17 22:02:00"));
});

test("parseDate parses 'yyyy-MM-dd' format", function() {
    var result = parse("2013-01-17");
    deepEqual(result, new Date("2013/01/17 00:00:00"));
});

test("parseDate parses 'yyyy/MM/dd HH:mm:ss' format", function() {
    var result = parse("2013/01/17 22:00:02");
    deepEqual(result, new Date("2013/01/17 22:00:02"));
});

test("parseDate parses 'yyyy/MM/dd HH:mm' format", function() {
    var result = parse("2013/01/17 22:02");
    deepEqual(result, new Date("2013/01/17 22:02:00"));
});

test("parseDate parses 'yyyy/MM/dd' format", function() {
    var result = parse("2013/01/17");
    deepEqual(result, new Date("2013/01/17 00:00:00"));
});

test("parseDate uses today's date when parse only time portion", function() {
    var today = new Date();
    var result = parse("10:00 AM", "hh:mm tt");

    today.setHours(10, 0, 0, 0);

    deepEqual(result, today);
});

test("parseDate supports UTC date without a timezone offset", function() {
    var result = parse("2012-03-25T04:30:10.1234567");
    deepEqual(result, new Date(2012, 2, 25, 4, 30, 10, 123));
});

test("parseExact method parses date string with UTC 'Z' zone designator", function() {
    var utcDate = new Date(Date.UTC(2014, 4, 21, 0, 0, 0));
    var result = kendo.parseDate("2014-05-21 00:00:00Z", "yyyy-MM-dd HH:mm:sszz")

    deepEqual(result, utcDate);
});


}());
