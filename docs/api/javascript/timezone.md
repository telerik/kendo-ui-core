---
title: timezone
page_title: API reference for Kendo UI Timezone
---

# kendo.timezone

Collection of timezone related utilities.

## Methods

### offset

Returns the timezone difference between UTC and the passed timezone.

#### Parameters

##### utcTime `Date|Number`

The utcTime, represented as a date object or milliseconds.

##### timezone `String`

The timezone.

#### Returns

`Number` A number, representing the time difference between UTC and the passed timezone, in minutes.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var timeZoneOffset = kendo.timezone.offset(targetDate,"Europe/Sofia");
        console.log(timeZoneOffset); //-120
    </script>

### convert

Adds the time difference between two timezones to a new date object.

#### Parameters

##### targetDate `Date`

The date that will be converted with the time difference between two timezones.

##### fromOffset `Number|String`

The `'from'` offset represented as minutes (that is, the `Number` type) or timezone (that is, `String`).

##### toOffset `Number|String`

The `'to'` offset represented as minutes (that is, the `Number` type) or timezone (that is, `String`).

#### Returns

`Date` A new date object that includes the time difference between two timezones.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var convertedDate1 = kendo.timezone.convert(targetDate, "Etc/GMT+2", "Etc/GMT-6");
		var convertedDate2 = kendo.timezone.convert(targetDate, 120, -360);
        console.log(convertedDate1); // Sat Nov 05 2016 23:25:11 GMT+0200 (FLE Standard Time)
		console.log(convertedDate2); // Sat Nov 05 2016 23:25:11 GMT+0200 (FLE Standard Time)
    </script>

### apply

Adds the time difference between the current and the passed timezones to a new date object.

#### Parameters

##### targetDate `Date`

The date that will be converted with the time difference between the current and passed timezones.

##### offset `Number|String`

The offset represented as minutes (that is, the `Number` type) or timezone (that is, `String`).

#### Returns

`Date` A new date object that includes the time difference between the current and the passed timezones.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var convertedDate1 = kendo.timezone.apply(targetDate, "Etc/GMT-6");
		var convertedDate2 = kendo.timezone.apply(targetDate, -360);
        console.log(convertedDate1); // Sat Nov 05 2016 23:25:11 GMT+0200 (FLE Standard Time)
		console.log(convertedDate2); // Sat Nov 05 2016 23:25:11 GMT+0200 (FLE Standard Time)
    </script>

### remove

Removes the time difference between the current and the passed timezones to a new date object.

#### Parameters

##### targetDate `Date`

The date that will be converted with the time difference between the current and passed timezones.

##### offset `Number|String`

The offset represented as minutes (that is, the `Number` type) or timezone (that is, `String`).

#### Returns

`Date` A new date object that includes the time difference between the current and the passed timezones.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var convertedDate1 = kendo.timezone.remove(targetDate, "Etc/GMT-6");
		var convertedDate2 = kendo.timezone.remove(targetDate, -360);
        console.log(convertedDate1); // Sat Nov 05 2016 11:25:11 GMT+0200 (FLE Standard Time)
		console.log(convertedDate2); // Sat Nov 05 2016 11:25:11 GMT+0200 (FLE Standard Time)
    </script>

### abbr

Returns the timezone abbreviation.

#### Parameters

##### targetDate `Date`

The date that will be used to get the timezone abbreviation of.

##### timezone `String`

The name of the particular timezone that will be used to get the abbreviation of.

#### Returns

`String` Returns the timezone abbreviation.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var abbr = kendo.timezone.abbr(targetDate, "Europe/Sofia");
        console.log(abbr); // EET
    </script>

### toLocalDate

Converts a date to the `"Etc/UTC"` timezone.

#### Parameters

##### targetDate `Date|Number`

The date, represented as a date object or milliseconds, that will be converted to the `"Etc/UTC"` timezone.

#### Returns

`Date` The converted date to the `"Etc/UTC"` timezone.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
		var targetMilliseconds = 1478352311000;
        var localeDateFromDate = kendo.timezone.toLocalDate(targetDate);
		var localeDateFromMs = kendo.timezone.toLocalDate(targetMilliseconds);
        console.log(localeDateFromDate); // Sat Nov 05 2016 13:25:11 GMT+0200 (FLE Standard Time)
		console.log(localeDateFromMs); // Sat Nov 05 2016 13:25:11 GMT+0200 (FLE Standard Time)
    </script>
