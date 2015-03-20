---
title: Overview
page_title: How-to for jQuery UI DateTimePicker widget in Kendo UI Web framework
description: Overview of Kendo UI DateTimePicker widget. Get familiar with the configuration options of the control and define the interval between values in the time drop-down list.
---

# DateTimePicker Overview

The DateTimePicker widget allows the user to select a value from a
calendar or a time drop-down list as well as direct input.
It supports configurable options for minimum and maximum value, format, interval between predefined hours in the time view, custom templates for "month" view
of the calendar, start view and the depth of the navigation.


## Getting Started

### DateTimePicker initialization
    
    <input id="dateTimePicker"> 

    <script>
      $(document).ready(function(){
        $("#dateTimePicker").kendoDateTimePicker();
      });
    </script>

> Widget copies any styles and CSS classes from the input element to the wrapper element.

## Configure DateTimePicker Behavior

The DateTimePicker widget provides configuration options that can be set
during initialization. Among the properties that can be controlled:


*   Selected datetime
*   Minimum/Maximum datetime
*   Define format
*   Start view
*   Navigation depth (last view to which the user can navigate)
*   Define interval between predefined values in the time drop-down list

### Create DateTimePicker with a selected value and a defined minimum and maximum datetime
    <input id="dateTimePicker"> 

    <script>
        $(document).ready(function(){
            $("#dateTimePicker").kendoDateTimePicker({
                value: new Date(2000, 10, 10, 10, 0, 0),
                min: new Date(1950, 0, 1, 8, 0, 0),
                max: new Date(2049, 11, 31, 18, 0, 0)
            })
        });
    </script>

DateTimePicker will set the value only if the entered datetime is valid and
within the defined range.

### Define the format
    <input id="dateTimePicker"> 

    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            format: "MM/dd/yyyy hh:mm tt" //format is used to format the value of the widget and to parse the input.
        });
    </script>

The DateTimePicker value is parsed when the user changes the content via typing. This means that if, for example, the format contains only a time portion, the date will be reset to today.
To support such a DateTimePicker format, you should make the widget textbox read-only after the widget is initialized and not via the widget's readonly() method (otherwise the Date and Time pop-ups will be disabled).
    
    <input id="dateTimePicker"> 

    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            /*...*/
        }).attr("readonly", "readonly");
    </script>

### Define the time format
    
    <input id="dateTimePicker"> 
    
    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            timeFormat: "hh:mm:ss tt" //this format will be used to format the predefined values in the time list.
        });
    </script>     

## Define a Start View and Navigation Depth


The first rendered view can be defined with the "start" option.
Navigation depth can be controlled with "depth" option. Predefined
views are:


*   "month" - shows the days from the month
*   "year" - shows the months of the year
*   "decade" - shows the years from the decade
*   "century" - shows the decades from the century

### Create a DateTimePicker for selecting a month
    <input id="dateTimePicker"> 
    
    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            start: "year",
            depth: "year"
        });
    </script>

### Define the interval (in minutes) between values in the time drop-down list
    
    <input id="dateTimePicker"> 
    
    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            interval: 15
        })
    </script>
