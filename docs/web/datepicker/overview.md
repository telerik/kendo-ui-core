---
title: Overview
page_title: Overview of DatePicker UI widget
description: Help guide for the basics of Kendo UI DatePicker widget.
---

# DatePicker Overview

The DatePicker widget allows the user to select a date from a
calendar or by direct input. It supports custom templates for the "month"
view, configurable options for min and max date, start view and the
depth of the navigation.


## Getting Started

### DatePicker initialization
    <input id="datePicker" />
    
    <script>
        $(document).ready(function(){
            $("#datePicker").kendoDatePicker();
        });
    </script>

> Widget copies any styles and CSS classes from the input element to the wrapper element.

## Configure DatePicker Behavior


The DatePicker provides configuration options that can be set
during initialization. Some the properties that can be controlled are:


*   Selected date
*   Minimum and/or maximum date
*   Define format
*   Start view
*   Navigation depth (last view to which the user can navigate)

### Create DatePicker with a selected date and a defined minimum and maximum date
    <input id="datePicker" />
    
    <script>
        $(document).ready(function(){
            $("#datePicker").kendoDatePicker({
                value: new Date(),
                min: new Date(1950, 0, 1),
                max: new Date(2049, 11, 31)
            })
        });
    </script>

DatePicker will set the value only if the entered date is valid and
within the defined range.

## Define a Start View and Navigation Depth


The first rendered view can be defined with "start" option.
Navigation depth can be controlled with "depth" option. Predefined
views are:


*   "month" - shows the days from the month
*   "year" - shows the months of the year
*   "decade" - shows the years from the decade
*   "century" - shows the decades from the century

### Create a DatePicker for selecting a month
    <input id="datePicker" />
    
    <script>
        $("#datePicker").kendoDatePicker({
            start: "year",
            depth: "year"
        });
    </script>
