---
title: Overview
page_title: Overview | Kendo UI ProgressBar
description: "Learn how to initialize the Kendo UI ProgressBar widget and configure its behaviors."
slug: overview_kendoui_progressbar_widget
position: 1
---

# ProgressBar Overview

The [Kendo UI ProgressBar widget](http://demos.telerik.com/kendo-ui/progressbar/index) offers rich functionalities for displaying and tracking the progress of a task. It supports multiple types, horizontal and vertical orientation, and also different directions.

## Types

Kendo UI ProgressBar supports three different types:

* `value` - this is a regular ProgressBar which displays the progress status as an absolute value.
* `percent` - a regular ProgressBar that displays the progress status in percentage.
* `chunk` - a ProgressBar divided in chunks, in this way displaying the progress status in steps.

## Getting Started

### Create the ProgressBar

Create the ProgressBar by using a `<div>` element as demonstrated in the example below.

###### Example

	<div id="progressbar"></div>

### Initialize the ProgressBar

Initialize the ProgressBar by using a jQuery selector as shown in the example below.

###### Example

	$(document).ready(function(){
      $("#progressbar").kendoProgressBar();
	});

### Initialize a chunk ProgressBar

Initialize a chunk ProgressBar in the way displayed in the example below.

###### Example

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    type: "chunk",
		chunkCount: 10
	  });
	</script>

## Configuration

### Properties

Many of the options delivered by the ProgressBar can be configured through its properties, which include:

* Horizontal or vertical orientation
* Reversed direction
* Minimum and maximum value
* Animation duration

The example below demonstrates how to configure the properties of the ProgressBar.

###### Example

	$("#progressbar").kendoProgressBar({
      min: 100,
      max: 500,
      value: 100,
      type: "percent",
	  orientation: "vertical",
      reverse: true,
      complete: function(e) {
        console.log("Progress completed");
      },
      animation: {
        duration: 600
      }
    });

### Display

#### Set a 100% Width and Auto-Resize

By default, the ProgressBar is a `27em` wide `inline-block` element. The easiest cross-browser technique to make it expand and resize automatically is to apply a couple of CSS styles to the originating element.

The example below demonstrates how to make the ProgressBar 100% wide and automatically resizable.

###### Example

    <style>

    #progressbar
    {
        width: auto;
        display: block;
    }

    </style>

    <div id="progressbar"></div>

    <script>

    $(function(){
        $("#progressbar").kendoProgressBar();
    });

    </script>

## ProgressBar API

### Events

Kendo UI ProgressBar supports the following [events](/api/web/progressbar#events):

* `change` - the event us fired each time a new value is set.
* `complete` - fired when progress is completed, i.e. each time it reaches the maximum value.

There are two ways to handle events:

* Specify the JavaScript function which will handle the event during the initialization of the widget.
* Use the `bind` method of the widget after initialization.

For examples demonstrating these two approaches, refer to the [ProgressBar API reference](/api/web/progressbar#events).

## Reference

### Existing Instances

Make a reference to an existing ProgressBar instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once done, use the [ProgressBar API](/api/web/progressbar) to control its behavior.

The example below denmonstrates how to access an existing ProgressBer instance.

###### Example

	var progressbar = $("#progressbar").data("kendoProgressBar");

## See Also

Other articles on Kendo UI ProgressBar:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the ProgressBar Widget](/aspnet-mvc/helpers/progressbar/overview)
* [Overview of the ProgressBar JSP Tag]({% slug overview_progressbar_uiforjsp %})
* [Overview of the ProgressBar PHP Class](/php/widgets/progressbar/overview)
* [ProgressBar JavaScript API Reference](/api/javascript/ui/progressbar)
