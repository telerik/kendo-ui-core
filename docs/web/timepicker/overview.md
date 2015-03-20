---
title: Overview
page_title: Overview of TimePicker UI widget
description: How to create, initialize and use TimePicker UI widget.
---

# TimePicker Overview

The Kendo UI TimePicker widget allows the user to select a time value from a list of predefined values or
to enter a new one. It supports configurable options for the format, minimum/maximum time, and interval between predefined values in the list.


## Getting Started

### Initialize the PanelBar via an ID selector
    <input id="timePicker" />
    
    <script>
        $(document).ready(function(){
            $("#timePicker").kendoTimePicker();
        });
    </script>

> Widget copies any styles and CSS classes from the input element to the wrapper element.

## Configuring TimePicker Behaviors

The TimePicker provides configuration options that can be easily set during initialization.
Some of the properties that can be controlled are:

*   Selected time
*   Minimum/Maximum time
*   Define format
*   Define interval between predefined values in the list

### Create TimePicker with selected time and defined min and max time
    <input id="timePicker" />
    
    <script>
        $("#timePicker").kendoTimePicker({
            value: new Date(2000, 10, 10, 10, 0, 0),
            min: new Date(1950, 0, 1, 8, 0, 0),
            max: new Date(2049, 11, 31, 18, 0, 0)
        });
    </script>

The TimePicker will set the value only if the entered time is valid and it is in the defined range.

### Define time format
    <input id="timePicker" />
    
    <script>
        $("#timePicker").kendoTimePicker({
            format: "hh:mm:ss tt"
        });
    </script>

### Define the interval (in minutes) between values in the list
    <input id="timePicker" />
    
    <script>
        $("#timePicker").kendoTimePicker({
            interval: 15
        });
    </script>