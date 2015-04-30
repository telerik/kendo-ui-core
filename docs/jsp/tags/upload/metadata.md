---
title: Metadata
---

Asynchronous uploading usually means that you lose the association betwen the files and the context that they originate from.

Take an e-mail application for example. The save handler must associate the uploaded files to a particular message.

The message and the file even might be processed on different servers in a load balancing or a cloud-based scenario.

## Sending metadata to the save action

You can add metadata directly on the client. This is useful when the data is not known in advance.

1. Add an input field for description. We will send its value to the save handler.

        <input type="text" id="fileDescription" />

2. Declare a handler for the upload event and attach a data object to the passed event.

        function onUpload(e) {
            e.data = {
                fileDescription: $("#fileDescription").val()
            };
        }

3. Attach the event handler.

        <kendo:upload name="files" upload="onUpload">
            <kendo:upload-async autoUpload="true" saveUrl="${saveUrl}" removeUrl="${removeUrl}"/>
        </kendo:upload>

4. Process the file and the associated description

        @RequestMapping(value = "/events/save", method = RequestMethod.POST)
        public @ResponseBody String save(@RequestParam List<MultipartFile> files,
                                          @RequestParam String fileDescription) {
            // Save the files
            // for (MultipartFile file : files) {
            // }

            // Return an empty string to signify success
            return "";
        }

## Receiving metadata from the save handler

The save handler can sometimes produce a result that needs to be routed back to the page.

The Upload requires the response to be in JSON format with Content-Type set to "text/plain". Any non-empty response that is not JSON will be treated as a server error.

1. Build the response

        // When returning JSON the mime-type must be set to text/plain
        @RequestMapping(value = "/async/save", method = RequestMethod.POST, produces = "text/plain")
        public @ResponseBody String save(@RequestParam List<MultipartFile> files) {
            // The default message converter will set it to "application/json" which
            // will result in a "Save file" dialog in older browsers.
            // Therefore we need to return the JSON as a string.
            return "{ \"status\": \"OK\" }";
        }

2. Declare a handler for the [success event](/api/web/upload#success) and process the response

        function onSuccess(e) {
            alert("Status: " + e.response.status);
        }

3. Attach the event handler

        <kendo:upload name="files" success="onSuccess">
            <kendo:upload-async autoUpload="true" saveUrl="${saveUrl}" removeUrl="${removeUrl}"/>
        </kendo:upload>

The same approach is applicable for the remove handler as well.
