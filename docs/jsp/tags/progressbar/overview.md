---
title: Overview
page_title: Overview | ProgressBar JSP Tag
description: "Get started with the ProgressBar JSP tag in Kendo UI."
slug: overview_progressbar_uiforjsp
position: 1
---

# ProgressBar JSP Tag Overview

The ProgressBar JSP tag is a server-side wrapper for the [Kendo UI ProgressBar](/api/javascript/ui/progressbar) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ProgressBar in the Spring MVC framework.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method.

###### Example

		@RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
		  public String index() {       
		      return "web/progressbar/index";
		  }  

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

		<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a `progressbar` tag.

###### Example

		<kendo:progressBar name="progressBar" type="percent"></kendo:progressBar>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI ProgressBar](/api/javascript/ui/progressbar#events) by the handler name.

###### Example

		<kendo:progressBar name="progressBar" type="percent" min="0" max="10" change="onChange" complete="onComplete"></kendo:progressBar>

		<script>
		    function onChange(e) {
		      // Handle the change event
		    }

		    function onComplete(e) {
		      // Handle the complete event
		    }
		  </script>

## Reference

### Existing Instances

You are able to reference an existing ProgressBar instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [ProgressBar API](/api/javascript/ui/progressbar#methods) to control its behavior.

###### Example

			// Put this after your Kendo ProgressBar tag declaration
			  <script>
			    $(function() {
			      // Notice that the name attribute of the progressbar is used to get its client-side instance
			      var progressbar = $("#progressBar").data("kendoProgressBar");
			    });
			  </script>

## See Also

Other articles on Telerik UI for JSP and on the ProgressBar:

* [Overview of the Kendo UI ProgressBar Widget]({% slug overview_kendoui_progressbar_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
