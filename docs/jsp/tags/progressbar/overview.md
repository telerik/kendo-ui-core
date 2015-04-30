---
title: Overview
---

# ProgressBar

The ProgressBar tag is a server-side wrapper for the [Kendo UI ProgressBar](/api/web/progressbar) widget.

## Getting Started

Here is how to configure the Kendo ProgressBar in Spring MVC:

1. Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.
2. Create a new action method:

		@RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
	    public String index() {       
	        return "web/progressbar/index";
	    }  

3. Add kendo taglib mapping to the page:

		<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4. Add a progressbar:

		<kendo:progressBar name="progressBar" type="percent"></kendo:progressBar>

## Accessing an Existing ProgressBar

You can reference the client-side Kendo ProgressBar instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/progressbar#methods) to control its behavior.

### Example

	// Put this after your Kendo ProgressBar tag declaration
    <script>
      $(function() {
        // Notice that the name attribute of the progressbar is used to get its client-side instance
        var progressbar = $("#progressBar").data("kendoProgressBar");
      });
    </script>

## Handling Events

You can subscribe to all ProgressBar [events](/api/web/progressbar#events).

### Subscribe by handler name

	<kendo:progressBar name="progressBar" type="percent" min="0" max="10" change="onChange" complete="onComplete"></kendo:progressBar>

	<script>
      function onChange(e) {
        // Handle the change event
      }

      function onComplete(e) {
        // Handle the complete event
      }
    </script>
