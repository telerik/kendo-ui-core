---
title: Overview
---

# Upload

The Upload HtmlHelper extension is a server-side wrapper for the [Kendo UI Upload](/web/upload/overview) widget.

## Getting Started

The following example shows how to setup an asynchronous upload using the Spring MVC framework:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method which renders the view:

	    @RequestMapping(value = "/async", method = RequestMethod.GET)
	    public String index() {
	        return "web/upload/async";
	    }

3.  Add the upload to the view:

	    <kendo:upload name="files">
	        <kendo:upload-async autoUpload="true" saveUrl="${saveUrl}" removeUrl="${removeUrl}"/>
	    </kendo:upload>
3
    The name attribute is required and must be unique.
	It will be used as a form field name in the requests to the server.

4. Implement the Save controller action:

	    @RequestMapping(value = "/async/save", method = RequestMethod.POST)
	    public @ResponseBody String save(@RequestParam List<MultipartFile> files) {
	        // Save the files
	        // for (MultipartFile file : files) {
	        // }
	        
	        // Return an empty string to signify success
	        return "";
	    }

## Accessing an Existing Upload

You can reference an existing Upload instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/upload#methods) to control its behavior.

### Accessing an existing Upload instance

    // Put this after your Kendo Upload for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the Name() of the Upload is used to get its client-side instance
        var upload = $("#attachments").data("kendoUpload");
    });
    </script>


## Handling Kendo UI Upload events

You can subscribe to all [events](/api/web/upload#events) exposed by Kendo UI Upload:

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
