---
title: Overview
page_title: Calendar UI widget for web app development | Kendo UI Documentation
description: Initialize Calendar UI widget, configure the behaviour of the control and use a custom template.
---

# Calendar Overview

The Kendo UI Calendar widget renders a graphical calendar that supports
navigation and selection. It also supports custom templates for its
"month" view and configuration options for minimum and maximum date,
start view and the depth of the navigation.

## Getting Started


### Initialize the Calendar via a jQuery ID selector
    
    <div id="calendar"></div>
    
    <script>
        $(document).ready(function(){
            $("#calendar").kendoCalendar();
        });
    </script>

## Configuring Calendar Behaviors


The Calendar provides many configuration options that can be
set during initialization. Among the properties that can be
controlled are:


*   Selected date
*   Minimum and/or maximum date
*   Start view
*   Define the navigation depth (last view to which the user can
navigate)
*   Day template
*   Footer template
    
### Create Calendar with selected date and a defined minimum and maximum date
    
    <div id="calendar"></div>
    
    <script>
        $("#calendar").kendoCalendar({
            value: new Date(),
            min: new Date(1950, 0, 1),
            max: new Date(2049, 11, 31)
        });
    </script>

The Calendar will not navigate before the specified minimum
date. It will also restrict the navigation to the maximum date
specified.

## Define start view and navigation depth


The first view rendered can be defined with the "start" option.
Navigation depth can be controlled with the "depth" option. Predefined
views are:


*   "month" - shows the days from the month
*   "year" - shows the months of the year
*   "decade" - shows the years from the decade
*   "century" - shows the decades from the century

### Create a Calendar, which allows a user to select a month
    
    <div id="calendar"></div>
    
    <script>
        $("#calendar").kendoCalendar({
            start: "year",
            depth: "year"
        });
    </script>

## Customize day template


The Calendar allows rendered day customization for the "month" view.

### Create a Calendar with custom template
    
    <div id="calendar"></div>
    
    <script>
        $("#calendar").kendoCalendar({
            month: {
                content: '<div class="custom"><#=data.value#></div>'
            }
        });
    </script>

The template wraps the "value" in a div HTML element. Here is an
example of the object passed to the template function:

**Structure of the data object passed to the template**

    data = {
        date: date, // Date object corresponding to the current cell
        title: kendo.toString(date, "D"),
        value: date.getDate(),
        dateString: "2011/0/1" // formatted date using yyyy/MM/dd format and month is zero-based
    };
