---
title: date
page_title: API reference for Kendo UI Date
res_type: api
---

# kendo.date

Collection of date related utilities.

## Methods

### setDayOfWeek

Sets the day of a week to a date object.


<div class="meta-api-description">
Change or adjust a date to a specific weekday such as Monday, Tuesday, or any day of the week by setting or moving the date to that weekday, enabling you to shift dates forward or backward to the next, previous, or exact target weekday, control the day of week within date objects, configure or update dates to align with desired weekdays, and manage date adjustments that involve setting, changing, or recalculating the day within a given week.
</div>

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
	
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(targetDate1); // Mon Nov 07 2016 15:25:11 GMT+0200 (FLE Standard Time)
	
	/* The result can be observed in the DevTools(F12) console of the browser. */
		console.log(targetDate2); // Mon Oct 31 2016 15:25:11 GMT+0200 (FLE Standard Time)
    </script>


### dayOfWeek

Returns a new date object that is set with a particular day of the week.


<div class="meta-api-description">
Calculate, adjust, or align dates to a specific weekday by retrieving or setting the day within a week using methods that handle day of week values by name or index. Enable shifting, normalizing, or converting any date to match a target weekday, useful for scheduling tasks, recurring events, weekly summaries, or aligning dates across different contexts. Control date manipulation to find the nearest, previous, or next occurrence of a given weekday, obtain date objects representing specific days like Monday or Friday, and perform date arithmetic related to weekdays efficiently and flexibly.
</div>

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
	
	/* The result can be observed in the DevTools(F12) console of the browser. */
		console.log(kendo.date.dayOfWeek(targetDate, 1, 1)); // Mon Nov 07 2016 15:25:11 GMT+0200 (FLE Standard Time)
	
	/* The result can be observed in the DevTools(F12) console of the browser. */
		console.log(kendo.date.dayOfWeek(targetDate, 1, -1)); // Mon Oct 31 2016 15:25:11 GMT+0200 (FLE Standard Time)
    </script>

### weekInYear

Returns week number of a specific date. According to the ISO-8601 standard, weeks starting on Monday.
The first week of the year is the week that contains that year's first Thursday (='First 4-day week').
The method allows defining diffent start day by using the second parameter.


<div class="meta-api-description">
Calculate the week number of a given date based on standard or custom week definitions, including ISO-8601 weeks that start on Monday with the first week containing January’s first Thursday, or adjust the start day to obtain alternative week numbering schemes; determine which week of the year a specific date falls into by setting different starting weekdays or following internationally recognized week systems, enabling flexible computations of week indices for calendar-based operations, scheduling, or date grouping regardless of region-specific week start preferences.
</div>

#### Parameters

##### date `Date`

The given date.

##### weekStart `Number` *(optional)*

The day number (from 0 (Sunday) to 6 (Saturday)) representing what day of week is considered as a starting point. This parameter is optional because by default Monday (1) is considered as a first day of the week.

#### Returns

`Number` A number resenting the week number of a given date.

#### Example
    <script>
        //no weekStart is passed so Monday will be considered as starting point for week
	
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.date.weekInYear(new Date(2017, 0, 9))); // 2
        //Sunday is passed as week start
	
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.date.weekInYear(new Date(2017, 0, 9), new Date(2017, 0, 8))); // 3
    </script>

### getDate

Gets the date only - that is, removes the time part.


<div class="meta-api-description">
Extract the day of the month as a numeric value from a full date object, isolate just the calendar date without any time components like hours, minutes, or seconds, normalize date-time values to midnight for consistent comparisons, enable grouping or sorting by day only, retrieve the day portion for filtering or display purposes, convert timestamps to date-only formats to remove time-based variations, strip time parts from datetime objects to facilitate date indexing, obtain the numeric day value to compare dates ignoring time differences, handle date-only extraction for date arithmetic or calendar-based operations, and control date granularity by focusing on the day number within a given date.
</div>

#### Parameters

##### date `Date`

The date to remove the time part.

#### Returns

`Date` A new date without the time part.

#### Example

    <script>
        var myDate = new Date(2016,10,5,14,25,11);
	
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(myDate); // Sat Nov 05 2016 14:25:11 GMT+0200 (FLE Standard Time)
        var newDate = kendo.date.getDate(myDate);
	
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(newDate); // Sat Nov 05 2016 00:00:00 GMT+0200 (FLE Standard Time)
    </script>


### isInDateRange

Determines whether a date spans over a certain date range.


<div class="meta-api-description">
Check if a specific date falls within or overlaps a defined start and end date interval by comparing one date against range limits, enabling date filtering, range validation, scheduling overlaps, date queries, or interval comparisons using terms like between, inside, inclusive, bounds, overlapping, contained, start-end limits, or within a time window.
</div>

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
	
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(isInDateRange); //true
    </script>

### isInTimeRange

Determines whether the time part of a date is within the time span of a specific date range.


<div class="meta-api-description">
Check if a given date’s time portion falls within a specific start and end time range regardless of the calendar date, enabling time-of-day comparisons that ignore the actual day, month, and year. Determine whether a timestamp’s hours, minutes, seconds, and milliseconds lie inside a defined time span for scheduling, filtering, or validation purposes without considering the full date context. Enable time-only range checks on datetime objects to confirm if a particular moment’s clock time fits between configured start and end boundaries, supporting use cases like time-based access controls, daily window constraints, or time segment matching through precise time component comparison.
</div>

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
	
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(isInTimeRange); //true
    </script>


### isToday

Determines whether the passed date is today's date, ignoring the time part.


<div class="meta-api-description">
Determine if a given date corresponds to the current calendar day by comparing only the year, month, and day while ignoring the time portion; use this check to enable conditional behavior such as highlighting today’s entries, filtering data for today’s events, validating if a date is today, or triggering logic based on whether a date matches the present date, returning a true or false result to support date comparison, date equality, and date-based decision-making in applications.
</div>

#### Parameters

##### targetDate `Date`

The date to be checked.

#### Returns

`Boolean` Returns `true` if the passed date is today's date, ignoring the time part.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var today = new Date();
	
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(today); //Fri Nov 04 2016 16:58:30 GMT+0200 (FLE Standard Time)
        var isToday = kendo.date.isToday(targetDate);
	
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(isToday); //false
    </script>


### nextDay

Returns the next day.


<div class="meta-api-description">
Calculate or retrieve the date immediately following a given date, advancing by one full calendar day while automatically managing transitions across months and years; this functionality supports scenarios like incrementing dates for scheduling, computing future dates in date arithmetic, finding the next day for comparison operations, determining the following calendar day, or moving forward by one day in time-based calculations, ensuring seamless handling of date boundaries and rollovers in various programming contexts.
</div>

#### Parameters

##### targetDate `Date`

The base date for returning the next day.

#### Returns

`Date` Returns the next day.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var nextDay = kendo.date.nextDay(targetDate);
	
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(nextDay); //Sun Nov 06 2016 15:25:11 GMT+0200 (FLE Standard Time)
    </script>

### previousDay

Returns the previous day.


<div class="meta-api-description">
Retrieve the date representing the day immediately before a given date by obtaining the previous calendar day for scheduling adjustments, date arithmetic, or validation purposes. This method helps calculate yesterday’s date, decrement a date by one day, move dates backward by one day unit, or find the prior day in time-based operations, enabling developers to control, shift, or navigate dates day-by-day in workflows, comparisons, or event handling.
</div>

#### Parameters

##### targetDate `Date`

The base date for returning the previous day.

#### Returns

`Date` Returns the previous day.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var previousDay = kendo.date.previousDay(targetDate);
	
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(previousDay); //Fri Nov 04 2016 15:25:11 GMT+0200 (FLE Standard Time)
    </script>


### toUtcTime

Returns the UTC time of a date in milliseconds.


<div class="meta-api-description">
Convert local date and time values to a universal millisecond timestamp based on Coordinated Universal Time (UTC) since the Unix epoch starting January 1, 1970, enabling consistent time comparisons, sorting, synchronization across servers, API communication, database storage, and handling timestamps in formats like epoch time, Unix time, or UTC milliseconds, suitable for developers needing to standardize dates regardless of time zone, perform timezone-agnostic calculations, generate accurate time-based keys, or convert date objects to integer timestamps for logging and data processing.
</div>

#### Parameters

##### targetDate `Date`

The date to return the UTC time of.

#### Returns

`Number` Returns the UTC time of a date in milliseconds.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var utcTime = kendo.date.toUtcTime(targetDate);
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(utcTime); //1478359511000
    </script>

### setTime

Adds milliseconds to a date.


<div class="meta-api-description">
Update or overwrite a date’s exact moment by setting its internal timestamp using milliseconds since the Unix epoch, enabling precise control to set, adjust, add, or modify the absolute time value for tasks like date arithmetic, comparisons, serialization, synchronization, and timestamp manipulation within date objects or time-based calculations.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(targetDate); // Sat Nov 05 2016 15:25:11 GMT+0200 (FLE Standard Time)
        var ignoreDST = false;
        kendo.date.setTime(targetDate, 999888777, ignoreDST);
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(targetDate); // Thu Nov 17 2016 05:09:59 GMT+0200 (FLE Standard Time)
    </script>

### setHours

Returns a new date object with replaced time part from another date object.


<div class="meta-api-description">
Adjust or update the time portion of a date object by setting specific hours, minutes, seconds, and milliseconds values while keeping the original calendar date (year, month, day) intact; create a new date instance with modified time from another date or time source without altering the original date variable, enabling merging or combining date and time parts efficiently, useful in date-time manipulation, scheduling, time zone adjustments, timestamp updates, or aligning dates with different times without mutating existing dates.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(dateWithNewTime); // Sat Nov 05 2016 17:27:17 GMT+0200 (FLE Standard Time)
    </script>


### addDays

Add days to a date object.


<div class="meta-api-description">
Add or subtract days from a date by specifying a positive or negative number to shift the date forward or backward, enabling calculations for scheduling, deadline adjustments, date range modifications, due date computations, and general date arithmetic on date objects. This method supports scenarios like incrementing dates for reminders, decrementing for past date calculations, moving dates within time ranges, adjusting calendar entries, or setting time spans relative to a given date, allowing flexible control over date manipulation in various development contexts.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(newDate); // Wed Nov 09 2016 15:25:11 GMT+0200 (FLE Standard Time)
    </script>

### today

Returns the current day without the time part.


<div class="meta-api-description">
Retrieve the current calendar date stripped of time components such as hours, minutes, seconds, and milliseconds to ensure date-only values for precise comparison, normalization, date range checks, setting default or initial dates, and consistent date calculations across applications. This method provides a date instance fixed at the start of the day, useful for scenarios where time should be ignored or reset, enabling developers to control, set, or compare just the day portion without time fluctuations or timezone inconsistencies, ideal for initializing date pickers, filtering by date, or managing date boundaries in user interfaces and data processing.
</div>

#### Returns

`Date` Returns the current day without the time part.

#### Example

    <script>
        var currDay = kendo.date.today();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(currDay); //Mon Nov 07 2016 00:00:00 GMT+0200 (FLE Standard Time)
    </script>

### toInvariantTime

Returns the invariant time, that is, the time added to the 1980th year of a date object.


<div class="meta-api-description">
Extracting or converting the time portion from a date object to a standardized, normalized time format for consistent comparison, sorting, serialization, or storage independent of calendar date, enabling operations like time-of-day matching, time normalization across different dates, or isolating time components from full datetime values.
</div>

#### Parameters

##### targetDate `Date`

The date object to get the invariant time of.

#### Returns

`Date` Returns the invariant time, that is, the time added to 1980th year of a date object.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
		var invariantTime = kendo.date.toInvariantTime(targetDate);
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(invariantTime); //Fri Feb 01 1980 15:25:11 GMT+0200 (FLE Standard Time)
    </script>

### firstDayOfMonth

Returns the first day of a month without the time part out of a date object.


<div class="meta-api-description">
Retrieve or calculate the starting date of any given month by converting or adjusting a Date value to represent the first calendar day at midnight, enabling developers to extract the beginning of the month from timestamps, normalize dates to month starts, reset date times to zero hours, handle monthly intervals, generate month-based filters, or align dates for monthly summaries and reports.
</div>

#### Parameters

##### targetDate `Date`

The date object to get the first day of the month of.

#### Returns

`Date` Returns the first day of a month without the time part out of a date object.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
		var firstDayOfMonth = kendo.date.firstDayOfMonth(targetDate);
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(firstDayOfMonth); //Tue Nov 01 2016 00:00:00 GMT+0200 (FLE Standard Time)
    </script>

### lastDayOfMonth

Returns the last day of a month without the time part out of a date object.


<div class="meta-api-description">
Find or calculate the last calendar day of any month, retrieve the month’s final date with time reset to midnight for precise date-only comparisons, extract the end-of-month date without time components, determine month-end boundaries for grouping or display, get the final day in a date range, set or identify the last date of a month in scheduling, enable month-end cutoff logic, obtain month’s closing date for reports or filters, convert any date to its month’s last day with time zeroed for accurate comparisons and sorting.
</div>

#### Parameters

##### targetDate `Date`

The date object to get the last day of the month of.

#### Returns

`Date` Returns the last day of a month without the time part out of a date object.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
		var lastDayOfMonth = kendo.date.lastDayOfMonth(targetDate);
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(lastDayOfMonth); //Wed Nov 30 2016 00:00:00 GMT+0200 (FLE Standard Time)
    </script>

### getMilliseconds

Returns the milliseconds of a date object.


<div class="meta-api-description">
Extract the milliseconds portion of a date or timestamp, obtain the fractional seconds from 0 to 999 in local time, retrieve subsecond precision for scheduling, logging, or time calculations, access the millisecond value within a Date object without altering it, get the exact milliseconds component in the local timezone for time comparisons or delays, and differentiate between local milliseconds and UTC milliseconds for precise time handling.
</div>

#### Parameters

##### targetDate `Date`

The date object to get the milliseconds of.

#### Returns

`Number` Returns the milliseconds of a date object.

#### Example

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
		var milliseconds = kendo.date.getMilliseconds(targetDate);
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(milliseconds); //55511000
    </script>

## Fields

### MS_PER_DAY `Number`

Returns the milliseconds per day of a date object.


<div class="meta-api-description">
Calculate the duration of one day in milliseconds, convert day counts to exact millisecond values, normalize or align timestamps to day boundaries, measure differences in days by multiplying or dividing time values by the standard 86,400,000 milliseconds per day, and perform date interval calculations or time span conversions that rely on precise day-length units for time-based computations and scheduling tasks.
</div>

#### Example

    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.date.MS_PER_DAY); //86400000
    </script>

### MS_PER_HOUR `Number`

Returns the milliseconds per hour of a date object.


<div class="meta-api-description">
Milliseconds per hour constant used for converting hours to milliseconds, calculating time intervals, managing durations in code, normalizing or adjusting timestamps, performing time-based computations, handling date and time conversions, enabling precise time measurement, controlling time calculations in hours, setting time units for scheduling or timeout logic, and supporting operations involving hourly time units in JavaScript or date-related programming contexts.
</div>

#### Example

    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.date.MS_PER_HOUR); //3600000
    </script>

### MS_PER_MINUTE `Number`

Returns the milliseconds per minute of a date object.


<div class="meta-api-description">
Convert minutes to milliseconds, calculate time intervals, perform time conversions, or compute durations by using the constant value representing the number of milliseconds in one minute (60000). This fixed numeric value supports operations like time arithmetic, interval calculations, time unit transformations, and duration measurements involving minutes or milliseconds for date and time processing, scheduling, timer implementations, and temporal data manipulation.
</div>

#### Example

    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.date.MS_PER_MINUTE); //60000
    </script>
