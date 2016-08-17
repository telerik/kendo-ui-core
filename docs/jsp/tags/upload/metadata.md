---
title: Handling of Metadata
page_title: Handling of Metadata | Upload JSP Tag
description: "Use the synchronous and asynchronous operational modes of the Upload JSP tag in Kendo UI."
slug: metadata_upload_uiforjsp
position: 3
---

# Handling of Metadata

Asynchronous uploading usually means that you lose the association between the files and the context that they originate from. Take an e-mail application, for example. The save handler must associate the uploaded files to a particular message. The message and the file might even be processed on different servers in a load balancing or a cloud-based scenario.

## Send and Receive Metadata

### Send Metadata to the Save Action

You can add metadata directly on the client. This is useful when the data is not known in advance.

Below are listed the steps for you to follow when configuring the sending of metadata to the `save` action in the Kendo UI Upload.

**Step 1** Add an `input` field for description. Send its value to the `save` handler.

###### Example

        <input type="text" id="fileDescription" />

**Step 2** Declare a handler for the `upload` event and attach a data object to the passed event.

###### Example

        function onUpload(e) {
            e.data = {
                fileDescription: $("#fileDescription").val()
            };
        }

**Step 3** Attach the event handler.

###### Example

        <kendo:upload name="files" upload="onUpload">
            <kendo:upload-async autoUpload="true" saveUrl="${saveUrl}" removeUrl="${removeUrl}"/>
        </kendo:upload>

**Step 4** Process the file and the associated description.

###### Example

        @RequestMapping(value = "/events/save", method = RequestMethod.POST)
        public @ResponseBody String save(@RequestParam List<MultipartFile> files,
                                          @RequestParam String fileDescription) {
            // Save the files
            // for (MultipartFile file : files) {
            // }

            // Return an empty string to signify success
            return "";
        }

### Receive Metadata from the Save Handler

The `save` handler can sometimes produce a result that needs to be routed back to the page. The Upload requires the response to be in JSON format with the Content-Type set to `"text/plain"`. Any non-empty response that is not JSON is treated as a server error.

Below are listed the steps for you to follow when configuring the receiving of metadata from the `save` action in the Kendo UI Upload.

**Step 1** Build the response.

###### Example

        // When returning JSON the mime-type must be set to text/plain
        @RequestMapping(value = "/async/save", method = RequestMethod.POST, produces = "text/plain")
        public @ResponseBody String save(@RequestParam List<MultipartFile> files) {
            // The default message converter will set it to "application/json" which
            // will result in a "Save file" dialog in older browsers.
            // Therefore we need to return the JSON as a string.
            return "{ \"status\": \"OK\" }";
        }

**Step 2** Declare a handler for the [`success` event](/api/javascript/ui/upload#success) and process the response.

###### Example

        function onSuccess(e) {
            alert("Status: " + e.response.status);
        }

**Step 3** Attach the event handler.

###### Example

        <kendo:upload name="files" success="onSuccess">
            <kendo:upload-async autoUpload="true" saveUrl="${saveUrl}" removeUrl="${removeUrl}"/>
        </kendo:upload>

The same approach is applicable for the `remove` handler as well.

## See Also

Other articles on Telerik UI for JSP and on the Upload:

* [Overview of the Upload JSP Tag]({% slug overview_upload_uiforjsp %})
* [Modes of Operation of the Upload JSP Tag]({% slug modesofoperation_upload_uiforjsp %})
* [Overview of the Kendo UI Upload Widget]({% slug overview_kendoui_upload_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
