---
title: timezone
page_title: API reference for Kendo UI Timezone
res_type: api
---

# kendo.timezone

Collection of timezone related utilities. List of all time zones is available [here](https://runner.telerik.io/fullscreen/unOWiyIG).

## Methods

### offset

Returns the timezone difference between UTC and the passed timezone.


<div class="meta-api-description">
How do I calculate the timezone offset in JavaScript using Kendo UI? Calculate or retrieve the time difference between Coordinated Universal Time (UTC) and any specified timezone to convert local times to UTC or vice versa, determine timezone offsets for scheduling or event planning, handle daylight saving adjustments, display accurate timezone-aware timestamps, configure timezone differences for applications, determine hour and minute offsets relative to UTC, obtain numeric or string representations of timezone shifts, compute time differences for internationalization tasks, and perform conversions needed for date-time calculations involving multiple regions and global time coordination.
</div>

#### Parameters

##### utcTime `Date|Number`

The utcTime, represented as a date object or milliseconds.

##### timezone `String`

The timezone.

#### Returns

`Number` A number, representing the time difference between UTC and the passed timezone, in minutes.

#### Example

    <script>
      var version = kendo.version;

      $.getScript(
        "https://kendo.cdn.telerik.com/" +
          version +
          "/js/kendo.timezones.min.js",
        loadExample,
      );

      function loadExample() {
        var targetDate = new Date(2016, 10, 5, 15, 25, 11);
        var timeZoneOffset = kendo.timezone.offset(targetDate, "Europe/Sofia");

        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(timeZoneOffset); //-120
      }
    </script>

### convert

Adds the time difference between two timezones to a new date object.


<div class="meta-api-description">
How do I convert a date from UTC to local time using Kendo UI's Timezone.convert method? Convert dates and times between different time zones by calculating the offset or difference, adjusting timestamps, shifting or translating a Date object’s time from one zone to another, handling conversions from UTC to local time or vice versa, enabling timezone normalization, adjusting for daylight saving time, working with timezone-aware date objects, synchronizing times across regions, and performing accurate date adjustments when dealing with multiple geographic locations or server/client time differences.
</div>

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
      var version = kendo.version;

      $.getScript(
        "https://kendo.cdn.telerik.com/" +
          version +
          "/js/kendo.timezones.min.js",
        loadExample,
      );

      function loadExample() {
        var targetDate = new Date(2016, 10, 5, 15, 25, 11);
        var convertedDate1 = kendo.timezone.convert(
          targetDate,
          "Etc/GMT+2",
          "Etc/GMT-6",
        );
        var convertedDate2 = kendo.timezone.convert(targetDate, 120, -360);

        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(convertedDate1); // Sat Nov 05 2016 23:25:11 GMT+0200 (FLE Standard Time);
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(convertedDate2); // Sat Nov 05 2016 23:25:11 GMT+0200 (FLE Standard Time);
      }
    </script>

### apply

Adds the time difference between the current and the passed timezones to a new date object.


<div class="meta-api-description">
How to convert date objects from one timezone to another in Kendo UI for jQuery? Convert, normalize, or adjust timestamps and dates to different time zones or offsets by adding time differences between source and target zones without altering the original date object. Enable timezone conversion, handle daylight saving time shifts, apply UTC offsets, and generate new date instances reflecting the correct local or target time. Use this method to calculate adjusted timestamps, reconcile date and time discrepancies across zones, set or transform datetime values dynamically, and normalize date objects for consistent timezone-aware processing across various regions and scenarios.
</div>

#### Parameters

##### targetDate `Date`

The date that will be converted with the time difference between the current and passed timezones.

##### offset `Number|String`

The offset represented as minutes (that is, the `Number` type) or timezone (that is, `String`).

#### Returns

`Date` A new date object that includes the time difference between the current and the passed timezones.

#### Example

    <script>
      var version = kendo.version;

      $.getScript(
        "https://kendo.cdn.telerik.com/" +
          version +
          "/js/kendo.timezones.min.js",
        loadExample,
      );

      function loadExample() {
        var targetDate = new Date(2016, 10, 5, 15, 25, 11);
        var convertedDate1 = kendo.timezone.apply(targetDate, "Etc/GMT-6");
        var convertedDate2 = kendo.timezone.apply(targetDate, -360);

        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(convertedDate1); // Sat Nov 05 2016 23:25:11 GMT+0200 (FLE Standard Time);
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(convertedDate2); // Sat Nov 05 2016 23:25:11 GMT+0200 (FLE Standard Time);
      }
    </script>

### remove

Removes the time difference between the current and the passed timezones to a new date object.


<div class="meta-api-description">
How do I remove a timezone offset from a JavaScript Date object in Kendo UI for jQuery? Convert dates across time zones, normalize timestamps, adjust or shift JavaScript Date objects by subtracting or removing timezone offsets, handle cross-zone date calculations, align dates by eliminating time differences, convert local time to another zone by offset removal, manage date adjustments when working with multiple time zones, synchronize or standardize dates by compensating for timezone discrepancies, and transform date objects to reflect accurate universal or target zone times.
</div>

#### Parameters

##### targetDate `Date`

The date that will be converted with the time difference between the current and passed timezones.

##### offset `Number|String`

The offset represented as minutes (that is, the `Number` type) or timezone (that is, `String`).

#### Returns

`Date` A new date object that includes the time difference between the current and the passed timezones.

#### Example

    <script>
      var version = kendo.version;

      $.getScript(
        "https://kendo.cdn.telerik.com/" +
          version +
          "/js/kendo.timezones.min.js",
        loadExample,
      );

      function loadExample() {
        var targetDate = new Date(2016, 10, 5, 15, 25, 11);
        var convertedDate1 = kendo.timezone.remove(targetDate, "Etc/GMT-6");
        var convertedDate2 = kendo.timezone.remove(targetDate, -360);

        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(convertedDate1); // Sat Nov 05 2016 11:25:11 GMT+0200 (FLE Standard Time);
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(convertedDate2); // Sat Nov 05 2016 11:25:11 GMT+0200 (FLE Standard Time);
      }
    </script>

### abbr

Returns the timezone abbreviation.


<div class="meta-api-description">
How can I get short timezone abbreviations for my Kendo UI date picker? Retrieve or generate short timezone abbreviations such as PST, UTC, or EST for display purposes, logging timestamps, formatting dates, or comparing time zones in user interfaces. Obtain concise, standardized zone codes to configure time displays, enable quick timezone identification, set labels in date outputs, or control timestamp formatting with abbreviated timezone strings used in logs, reports, or scheduling applications. This supports use cases involving timezone short codes, abbreviation retrieval, and converting full time zones into compact, recognizable formats for UI, data processing, or event tracking.
</div>

#### Parameters

##### targetDate `Date`

The date that will be used to get the timezone abbreviation of.

##### timezone `String`

The name of the particular timezone that will be used to get the abbreviation of.

#### Returns

`String` Returns the timezone abbreviation.

#### Example

     <script>
      var version = kendo.version;

      $.getScript(
        "https://kendo.cdn.telerik.com/" +
          version +
          "/js/kendo.timezones.min.js",
        loadExample,
      );

      function loadExample() {
        var targetDate = new Date(2016, 10, 5, 15, 25, 11);
        var abbr = kendo.timezone.abbr(targetDate, "Europe/Rome");
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(abbr); // EET
      }
    </script>

### toLocalDate

Converts a date to the `"Etc/UTC"` timezone.


<div class="meta-api-description">
How do I convert dates to UTC using the `toLocalDate` method in Kendo UI for jQuery? Convert date and time values to Coordinated Universal Time by adjusting timestamps to the UTC timezone, enabling accurate normalization, consistent comparison of different time zones, reliable synchronization of dates across systems, and standardizing date formats for storage or transmission; configure date conversion to universal time, set time offsets to zero, handle timezone normalization for global applications, and control how local or regional date values map to UTC equivalents for interoperability and timestamp consistency.
</div>

#### Parameters

##### targetDate `Date|Number`

The date, represented as a date object or milliseconds, that will be converted to the `"Etc/UTC"` timezone.

#### Returns

`Date` The converted date to the `"Etc/UTC"` timezone.

#### Example

    <script>
        // include kendo.timezones.js
        var version = kendo.version;
      
        $('<script/>', { 
            type:'text/javascript', 
            src:'https://kendo.cdn.telerik.com/'+version+'/js/kendo.timezones.min.js'
        }).appendTo('head');
    </script>

    <script>
        var targetDate = new Date(2016,10,5,15,25,11);
        var targetMilliseconds = 1478352311000;
        var localeDateFromDate = kendo.timezone.toLocalDate(targetDate);
        var localeDateFromMs = kendo.timezone.toLocalDate(targetMilliseconds);
        
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(localeDateFromDate); // Sat Nov 05 2016 13:25:11 GMT+0200 (FLE Standard Time);
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(localeDateFromMs); // Sat Nov 05 2016 13:25:11 GMT+0200 (FLE Standard Time);
    </script>
