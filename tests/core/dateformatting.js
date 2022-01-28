(function() {
    var toString = kendo.toString;
    var zeros = ["", "0", "00", "000", "0000"];

    function pad(number, digits, end) {
        number = number + "";
        digits = digits || 2;
        end = digits - number.length;

        if (end) {
            return zeros[digits].substring(0, end) + number;
        }

        return number;
    }

    function date(year, month, day, hour, minute, second, millisecond) {
        var d = new Date();

        d.setFullYear(year);
        d.setMonth(month - 1);
        d.setDate(day);
        d.setHours(hour ? hour : 0, minute ? minute : 0, second ? second : 0, millisecond ? millisecond : 0);

        return d;
    }

    describe("date formatting", function() {

        it('supports short date toString', function() {
            var d = date(2000, 1, 30);
            assert.equal(toString(d, "d"), '1/30/2000');
        });

        it('supports long time pattern', function() {
            var d = date(2000, 1, 30);

            assert.equal(toString(d, "T"), '12:00:00 AM');
        });

        it('supports short time pattern', function() {
            var d = date(2000, 1, 30);

            assert.equal(toString(d, "t"), '12:00 AM');
        });

        it('supports long date toString', function() {
            var d = date(2000, 1, 30);

            assert.equal(toString(d, "D"), 'Sunday, January 30, 2000');
        });

        it('supports full date long time toString', function() {
            var d = date(2000, 1, 30, 13, 9, 9);

            assert.equal(toString(d, "F"), 'Sunday, January 30, 2000 1:09:09 PM');
        });

        it('supports zero padded days', function() {
            var d = date(2000, 1, 1);

            assert.equal(toString(d, "M/dd/yyyy"), '1/01/2000');
        });

        it('supports zero padded months', function() {
            var d = date(2000, 1, 1);

            assert.equal(toString(d, "MM/dd/yyyy"), '01/01/2000');
        });

        it('supports abbr day names', function() {
            var d = date(2000, 1, 1);

            assert.equal(toString(d, "MM/ddd/yyyy"), '01/Sat/2000');
        });

        it('supports day names', function() {
            var d = date(2000, 1, 1);

            assert.equal(toString(d, "MM/dddd/yyyy"), '01/Saturday/2000')
        });

        it('supports abbr month names', function() {
            var d = date(2000, 1, 1);
            assert.equal(toString(d, "MMM/dddd/yyyy"), 'Jan/Saturday/2000');
        });

        it('supports month names', function() {
            var d = date(2000, 1, 1);
            assert.equal(toString(d, "MMMM/dddd/yyyy"), 'January/Saturday/2000');
        });

        it('supports yy', function() {
            var d = date(2000, 1, 1);
            assert.equal(toString(d, "MMMM/dddd/yy"), 'January/Saturday/00');
        });

        it('supports h before 12', function() {
            var d = date(2000, 1, 1, 1);
            assert.equal(toString(d, "h"), '1');
        });

        it('supports h after 12', function() {
            var d = date(2000, 1, 1, 13);
            assert.equal(toString(d, "h"), '1')
        });

        it('supports hh before 12', function() {
            var d = date(2000, 1, 1, 1);
            assert.equal(toString(d, "hh"), '01');
        });

        it('supports hh after 12', function() {
            var d = date(2000, 1, 1, 13);
            assert.equal(toString(d, "hh"), '01');
        });

        it('supports minutes', function() {
            var d = date(2000, 1, 1, 1);
            assert.equal(toString(d, "hh:m"), '01:0');
        });

        it('supports zero padded minutes', function() {
            var d = date(2000, 1, 1, 1, 1);
            assert.equal(toString(d, "hh:mm"), '01:01');
        });

        it('supports seconds', function() {
            var d = date(2000, 1, 1, 1, 1, 1);
            assert.equal(toString(d, "hh:mm:s"), '01:01:1');
        });

        it('supports zero padded seconds', function() {
            var d = date(2000, 1, 1, 1, 1, 1);
            assert.equal(toString(d, "hh:mm:ss"), '01:01:01');
        });

        it('supports tt before 12', function() {
            var d = date(2000, 1, 1, 1, 1, 1);
            assert.equal(toString(d, "tt"), 'AM');
        });

        it('supports tt after 12', function() {
            var d = date(2000, 1, 1, 13, 1, 1);
            assert.equal(toString(d, "tt"), 'PM');
        });

        it('supports f more than 99', function() {
            var d = date(2000, 1, 1, 1, 1, 1, 100);
            assert.equal(toString(d, "hh:mm:f"), '01:01:1');
        });

        it('supports f less than 100', function() {
            var d = date(2000, 1, 1, 1, 1, 1, 99);
            assert.equal(toString(d, "hh:mm:f"), '01:01:0');
        });

        it('supports ff', function() {
            var d = date(2000, 1, 1, 1, 1, 1, 129);
            assert.equal(toString(d, "hh:mm:ff"), '01:01:12');
        });

        it('supports fff', function() {
            var d = date(2000, 1, 1, 1, 1, 1, 129);
            assert.equal(toString(d, "fff"), '129');
        });

        it('supports padded ff', function() {
            var d = date(2000, 1, 1, 1, 1, 1, 1);
            assert.equal(toString(d, "ff"), '01');
        });

        it('supports padded fff', function() {
            var d = date(2000, 1, 1, 1, 1, 1, 1);
            assert.equal(toString(d, "fff"), '001');
        });

        it('supports H', function() {
            var d = date(2000, 1, 1, 1);
            assert.equal(toString(d, "H"), '1')
        });

        it('supports HH less than 10', function() {
            var d = date(2000, 1, 1, 9)
            assert.equal(toString(d, "HH"), '09');
        });

        it('supports single quote literals', function() {
            var d = date(2000, 1, 1, 9);
            assert.equal(toString(d, "'literal'"), 'literal');
        });

        it('supports quote literals', function() {
            var d = date(2000, 1, 1, 9)
            assert.equal(toString(d, "\"literal\""), 'literal');
        });

        it('supports g toString', function() {
            var d = date(2000, 12, 30, 9, 1);
            assert.equal(toString(d, "g"), '12/30/2000 9:01 AM');
        });

        it('supports G toString', function() {
            var d = date(2000, 12, 30, 9, 1);
            assert.equal(toString(d, "G"), '12/30/2000 9:01:00 AM');
        });

        it('supports m toString', function() {
            var d = date(2000, 12, 30, 9, 1);
            assert.equal(toString(d, "m"), 'December 30')
        });

        it('supports M toString', function() {
            var d = date(2000, 12, 30, 9, 1)
            assert.equal(toString(d, "M"), 'December 30');
        });

        it('supports s toString', function() {
            var d = date(2000, 12, 30, 9, 1)
            assert.equal(toString(d, "s"), '2000-12-30T09:01:00');
        });

        it('supports u toString', function() {
            var d = date(2000, 12, 30, 9, 1);
            assert.equal(toString(d, "u"), '2000-12-30 09:01:00Z')
        });

        it('supports y toString', function() {
            var d = date(2000, 12, 30, 9, 1)
            assert.equal(toString(d, "y"), 'December, 2000')
        });

        it('supports Y toString', function() {
            var d = date(2000, 12, 30, 9, 1)
            assert.equal(toString(d, "Y"), 'December, 2000');
        });

        it('honors specific culture', function() {
            var d = date(2000, 5, 30, 9, 1)
            assert.equal(toString(d, "Y", "de-DE"), 'Mai 2000');
        });

        it('supports small year with four digits', function() {
            var d = date(2000, 0, 1);
            d.setFullYear(1, 0, 1);

            assert.equal(toString(d, "s"), '0001-01-01T00:00:00');
        });

        tzTest("Sofia", "supports 'z' timezone offset specifier", function() {
            var d = date(2000, 0, 1);
            assert.equal(toString(d, "z"), "+2");
        });

        tzTest("Sofia", "supports padded timezone offset specifier", function() {
            var d = date(2000, 0, 1);
            assert.equal(toString(d, "zz"), "+02");
        });

        tzTest("Sofia", "supports full timezone offset", function() {
            var d = date(2000, 0, 1);
            assert.equal(toString(d, "zzz"), "+02:00");
        });

    });
}());
