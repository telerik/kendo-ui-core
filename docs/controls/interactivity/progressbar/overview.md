---
title: Overview
page_title: jQuery ProgressBar Documentation | ProgressBar Overview
description: "Get started with the jQuery ProgressBar by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_progressbar_widget
position: 1
---

# ProgressBar Overview

The ProgressBar delivers rich functionality for displaying and tracking the progress of a task.

The widget provides the following types:

* `value`&mdash;Represents a regular ProgressBar which displays the progress status as an absolute value.
* `percent`&mdash;Represents a regular ProgressBar which displays the progress status in percentage.
* `chunk`&mdash;Represents a ProgressBar which is divided in chunks and displays the progress status in steps.

The ProgressBar also supports horizontal and vertical orientation, reversed direction, minimum and maximum values, and animation duration.

* [Demo page for the ProgressBar](https://demos.telerik.com/kendo-ui/progressbar/index)

## Basic Configuration

The following example demonstrates how to create the ProgressBar by using a `<div>` element.

	<div id="progressbar"></div>

The following example demonstrates how to initialize the ProgressBar by using a jQuery selector.

	$(document).ready(function(){
      $("#progressbar").kendoProgressBar();
	});

The following example demonstrates how to initialize a chunk ProgressBar.

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    type: "chunk",
		chunkCount: 10
	  });
	</script>

The following example demonstrates how to configure the basic properties of the ProgressBar.

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

## Functionality and Features

You can [set the appearance]({% slug appearance_kendoui_progressbar %}) of the ProgressBar.

## Events

The ProgressBar supports the `change` and `complete` events. `change` fires each time a new value is set. `complete` fires when the progress of the task is completed, that is, each time the ProgressBar reaches its maximum value.

To handle these events, you can specify the JavaScript function which will handle the event during the initialization of the widget or use the `bind` method of the widget after its initialization.

For a runnable example, refer to the [demo on using the events of the ProgressBar](https://demos.telerik.com/kendo-ui/progressbar/events).

## Referencing Existing Instances

Make a reference to an existing ProgressBar instance through [`jQuery.data()`](https://api.jquery.com/jQuery.data/) and use the [ProgressBar API](/api/web/progressbar) to control its behavior.

The following example demonstrates how to access an existing ProgressBar instance.

	var progressbar = $("#progressbar").data("kendoProgressBar");

## See Also

* [Basic Usage of the ProgressBar (Demo)](https://demos.telerik.com/kendo-ui/progressbar/index)
* [Using the API of the ProgressBar (Demo)](https://demos.telerik.com/kendo-ui/progressbar/api)
* [JavaScript API Reference of the ProgressBar](/api/javascript/ui/progressbar)
