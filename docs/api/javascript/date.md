---
title: date
page_title: API reference for Kendo UI Date
---

# kendo.date

Collection of date related utilities.

## Methods

### setDayOfWeek

Sets the day of a week to a date object.

#### Parameters

##### targetDate `Date`

The date to set the day of the week to.

##### dayOfWeek `Number`

The day of the week to be set.

##### direction `Number`

The direction that determines the day of the week to be set.

One (`1`) indicates the day after the current one (default value). Minus one (`-1`) indicates the day before the current one.

#### Example

    <script>
        var targetDate1 = new Date(2016,10,5,15,25,11);
			targetDate2 = new Date(2016,10,5,15,25,11);
		kendo.date.setDayOfWeek(targetDate1, 1, 1);
		kendo.date.setDayOfWeek(targetDate2, 1, -1);
        console.log(targetDate1); // Mon Nov 07 2016 15:25:11 GMT+0200 (FLE Standard Time)
		console.log(targetDate2); // Mon Oct 31 2016 15:25:11 GMT+0200 (FLE Standard Time)
    </script>


### dayOfWeek

Returns a new date object that is set with a particular day of the week.

#### Parameters

##### targetDate `Date`

The date to set the day of the week to.

##### dayOfWeek `Number`

The day of the week to be set.

##### direction `Number`

The direction that determines the day of the week to be set.

One (`1`) indicates the day after the current one (default value). Minus one (`-1`) indicates the day before the current one.

#### Returns

`Date` A new date object that is set with a particular day of the week.

#### Example
    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
		console.log(kendo.date.dayOfWeek(targetDate, 1, 1)); // Mon Nov 07 2016 15:25:11 GMT+0200 (FLE Standard Time)
		console.log(kendo.date.dayOfWeek(targetDate, 1, -1)); // Mon Oct 31 2016 15:25:11 GMT+0200 (FLE Standard Time)
    </script>

### weekInYear

Returns week number of a specific date. According to the ISO-8601 standard, weeks starting on Monday. 
The first week of the year is the week that contains that year's first Thursday (='First 4-day week').
The method allows defining diffent start day by using the second parameter. 

#### Parameters

##### date `Date`

The given date.

##### weekStart `Date` *(optional)*

The date representing what day of week is considered as a starting point. This parameter is optional because by default Monday is considered as a first day of the week.  

#### Returns

`Number` A number resenting the week number of a given date.

#### Example
    <script>
        //no weekStart is passed so Monday will be considered as starting point for week
        console.log(kendo.date.weekInYear(new Date(2017, 0, 9))); // 2 
        //Sunday is passed as week start
        console.log(kendo.date.weekInYear(new Date(2017, 0, 9), new Date(2017, 0, 8))); // 3
    </script>

### getDate

Gets the date only - that is, removes the time part.

#### Parameters

##### date `Date`

The date to remove the time part.

#### Returns

`Date` A new date without the time part.

#### Example

    <script>
        var myDate = new Date(2016,10,5,14,25,11);
        console.log(myDate); // Sat Nov 05 2016 14:25:11 GMT+0200 (FLE Standard Time)
        var newDate = kendo.date.getDate(myDate);
        console.log(newDate); // Sat Nov 05 2016 00:00:00 GMT+0200 (FLE Standard Time)
    </script>


### isInDateRange

Determines whether a date spans over a certain date range.

#### Parameters

##### targetDate `Date`

The date to be checked.

##### lowerLimitDate `Date`

The lower limit date of the range.

##### upperLimitDate `Date`

The upper limit date of the range.

#### Returns

`Boolean` Returns `true` if the target date is within the date range.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,14,25,11);
        var lowerLimitDate = new Date(2016,9,5,14,25,11);
        var upperLimitDate = new Date(2016,11,5,14,25,11);

        var isInDateRange = kendo.date.isInDateRange(targetDate,lowerLimitDate,upperLimitDate);
        console.log(isInDateRange); //true
    </script>

### isInTimeRange

Determines whether the time part of a date is within the time span of a specific date range.

#### Parameters

##### targetDate `Date`

The date to be checked.

##### lowerLimitDate `Date`

The lower limit date of the range.

##### upperLimitDate `Date`

The upper limit date of the range.

#### Returns

`Boolean` Returns `true` if the time part of a date is within the time span of a certain date range.

#### Example

    <script>
        var targetDate = new Date(2016,5,5,15,25,11);
        var lowerLimitDate = new Date(2016,9,5,14,25,11);
        var upperLimitDate = new Date(2016,11,5,17,25,11);

        var isInTimeRange = kendo.date.isInTimeRange(targetDate,lowerLimitDate,upperLimitDate);
        console.log(isInTimeRange); //true
    </script>


### isToday

Determines whether the passed date is today's date, ignoring the time part.

#### Parameters

##### targetDate `Date`

The date to be checked.

#### Returns

`Boolean` Returns `true` if the passed date is today's date, ignoring the time part.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var today = new Date();
        console.log(today); //Fri Nov 04 2016 16:58:30 GMT+0200 (FLE Standard Time)
        var isToday = kendo.date.isToday(targetDate);
        console.log(isToday); //false
    </script>


### nextDay

Returns the next day.

#### Parameters

##### targetDate `Date`

The base date for returning the next day.

#### Returns

`Date` Returns the next day.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var nextDay = kendo.date.nextDay(targetDate);
        console.log(nextDay); //Sun Nov 06 2016 15:25:11 GMT+0200 (FLE Standard Time)
    </script>

### previousDay

Returns the previous day.

#### Parameters

##### targetDate `Date`

The base date for returning the previous day.

#### Returns

`Date` Returns the previous day.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var previousDay = kendo.date.previousDay(targetDate);
        console.log(previousDay); //Fri Nov 04 2016 15:25:11 GMT+0200 (FLE Standard Time)
    </script>


### toUtcTime

Returns the UTC time of a date in milliseconds.

#### Parameters

##### targetDate `Date`

The date to return the UTC time of.

#### Returns

`Number` Returns the UTC time of a date in milliseconds.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var utcTime = kendo.date.toUtcTime(targetDate);
        console.log(utcTime); //1478359511000
    </script>

### setTime

Adds milliseconds to a date.

#### Parameters

##### targetDate `Date`

The date to add the milliseconds to.

##### millisecondsToAdd `Number`

The milliseconds that will be added to the date.

##### ignoreDST `Boolean`

A Boolean value that indicates whether the DST will be ignored. The default value is `false`.

#### Example
    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        console.log(targetDate); // Sat Nov 05 2016 15:25:11 GMT+0200 (FLE Standard Time)
        var ignoreDST = false;
        kendo.date.setTime(targetDate, 999888777, ignoreDST);
        console.log(targetDate); // Thu Nov 17 2016 05:09:59 GMT+0200 (FLE Standard Time)
    </script>

### setHours

Returns a new date object with replaced time part from another date object.

#### Parameters

##### targetDate `Date`

The date object to replace the time part of.

##### sourceDate `Number`

The date object that will be used for obtaining the time part.

#### Returns

`Date` Returns a new date object with a replaced time part from another date object.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var sourceDateWithTime = new Date(2016,10,15,17,27,17);
        var dateWithNewTime = kendo.date.setHours(targetDate, sourceDateWithTime);
        console.log(dateWithNewTime); // Sat Nov 05 2016 17:27:17 GMT+0200 (FLE Standard Time)
    </script>


### addDays

Add days to a date object.

#### Parameters

##### targetDate `Date`

The date object to add days to.

##### numberOfDaysToAdd `Number`

The number of days to be added to the target date.

#### Returns

`Date` Returns a new date object with added days.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var newDate = kendo.date.addDays(targetDate, 4);
        console.log(newDate); // Wed Nov 09 2016 15:25:11 GMT+0200 (FLE Standard Time)
    </script>

### today

Returns the current day without the time part.

#### Returns

`Date` Returns the current day without the time part.

#### Example

    <script>
        var currDay = kendo.date.today();
        console.log(currDay); //Mon Nov 07 2016 00:00:00 GMT+0200 (FLE Standard Time)
    </script>

### toInvariantTime

Returns the invariant time, that is, the time added to the 1980th year of a date object.

#### Parameters

##### targetDate `Date`

The date object to get the invariant time of.

#### Returns

`Date` Returns the invariant time, that is, the time added to 1980th year of a date object.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
		var invariantTime = kendo.date.toInvariantTime(targetDate);
        console.log(invariantTime); //Fri Feb 01 1980 15:25:11 GMT+0200 (FLE Standard Time)
    </script>

### firstDayOfMonth

Returns the first day of a month without the time part out of a date object.

#### Parameters

##### targetDate `Date`

The date object to get the first day of the month of.

#### Returns

`Date` Returns the first day of a month without the time part out of a date object.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
		var firstDayOfMonth = kendo.date.firstDayOfMonth(targetDate);
        console.log(firstDayOfMonth); //Tue Nov 01 2016 00:00:00 GMT+0200 (FLE Standard Time)
    </script>

### lastDayOfMonth

Returns the last day of a month without the time part out of a date object.

#### Parameters

##### targetDate `Date`

The date object to get the last day of the month of.

#### Returns

`Date` Returns the last day of a month without the time part out of a date object.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
		var lastDayOfMonth = kendo.date.lastDayOfMonth(targetDate);
        console.log(lastDayOfMonth); //Wed Nov 30 2016 00:00:00 GMT+0200 (FLE Standard Time)
    </script>

### getMilliseconds

Returns the milliseconds of a date object.

#### Parameters

##### targetDate `Date`

The date object to get the milliseconds of.

#### Returns

`Date` Returns the milliseconds of a date object.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
		var milliseconds = kendo.date.getMilliseconds(targetDate);
        console.log(milliseconds); //55511000
    </script>

## Fields

### MS_PER_DAY `Number`

Returns the milliseconds per day of a date object.

#### Example

    <script>
        console.log(kendo.date.MS_PER_DAY); //86400000
    </script>

### MS_PER_HOUR `Number`

Returns the milliseconds per hour of a date object.

#### Example

    <script>
        console.log(kendo.date.MS_PER_HOUR); //3600000
    </script>

### MS_PER_MINUTE `Number`

Returns the milliseconds per minute of a date object.

#### Example

    <script>
        console.log(kendo.date.MS_PER_MINUTE); //60000
    </script>
