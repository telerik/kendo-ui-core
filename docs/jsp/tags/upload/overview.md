---
title: Overview
page_title: Overview | Upload JSP Tag
description: "Get started with the Upload JSP tag in Kendo UI."
slug: overview_upload_uiforjsp
position: 1
---

# Upload JSP Tag Overview

The Upload JSP tag is a server-side wrapper for the [Kendo UI Upload](/api/javascript/ui/upload) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring an asynchronous upload using the Spring MVC framework.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

###### Example

	    @RequestMapping(value = "/async", method = RequestMethod.GET)
	    public String index() {
	        return "web/upload/async";
	    }

**Step 3** Add the Upload to the view.

###### Example

	    <kendo:upload name="files">
	        <kendo:upload-async autoUpload="true" saveUrl="${saveUrl}" removeUrl="${removeUrl}"/>
	    </kendo:upload>

The name attribute is required and must be unique. It is used as a form field name in the requests to the server.

**Step 4** Implement the **Save** controller action.

###### Example

	    @RequestMapping(value = "/async/save", method = RequestMethod.POST)
	    public @ResponseBody String save(@RequestParam List<MultipartFile> files) {
	        // Save the files
	        // for (MultipartFile file : files) {
	        // }

	        // Return an empty string to signify success
	        return "";
	    }

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI Upload](/api/javascript/ui/upload#events).

###### Example

	    <kendo:upload name="files" upload="onUpload" success="onSuccess">
	        <kendo:upload-async autoUpload="true" saveUrl="${saveUrl}" removeUrl="${removeUrl}"/>
	    </kendo:upload>

	    <script>
	    function onUpload(e) {
	        // Handle the upload event
	    }

	    function onSuccess() {
	        // Handle the success event
	    }
	    </script>

## Reference

### Existing Instances

You are able to reference an existing Upload instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Upload API](/api/javascript/ui/upload#methods) to control its behavior.

###### Example

	    // Put this after your Kendo Upload for ASP.NET MVC declaration
	    <script>
	    $(function() {
	        // Notice that the Name() of the Upload is used to get its client-side instance
	        var upload = $("#attachments").data("kendoUpload");
	    });
	    </script>

## See Also

Other articles on Telerik UI for JSP and on the Upload:

* [Modes of Operation of the Upload JSP Tag]({% slug modesofoperation_upload_uiforjsp %})
* [Sending and Receiving Metadata with the Upload JSP Tag]({% slug metadata_upload_uiforjsp %})
* [Overview of the Kendo UI Upload Widget]({% slug overview_kendoui_upload_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
