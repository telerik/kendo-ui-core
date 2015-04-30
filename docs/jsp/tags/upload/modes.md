---
title: Modes
---
# Upload Modes

The Upload supports two modes of operation - synchronous and asynchronous.

This help topic explains how to use these modes with the Spring MVC framework.
Please review the main [Upload Modes](/web/upload/modes) help topic for general information.

## Synchronous mode

In this mode the upload is executed as part of the form submit (synchronously). No dedicated action methods are required.

1. Add a form declaration and set a controller action.

        <form method="post" action="<c:url value='/web/upload/' />">
        </form>

2. Add the Upload inside the form. The only required setting is a Name.

        <kendo:upload name="files" />

3. Add a submit and reset buttons to the form.

        <input type="submit" value="Send" class="t-button" />
        <input type="reset" value="Reset" class="t-button" />

4. The form should look like this:

        <form method="post" action="<c:url value='/web/upload/' />">
            <kendo:upload name="files" />
            <input type="submit" value="Send" class="t-button" />
            <input type="reset" value="Reset" class="t-button" />
        </form>

5. Process the files in the action. It requires no special server handling compared to a regular input.

        @RequestMapping(value = {"/", "/index"}, method = RequestMethod.POST)
        public String save(@RequestParam List<MultipartFile> files, Model model) {
            model.addAttribute("files", files);

            return "web/upload/results";
        }

## Asynchronous mode

In this mode the files are uploaded to a controller action without interrupting the user interaction with the page.

### Save handler

1.  Add the upload to the view:

        <kendo:upload name="files">
            <kendo:upload-async saveUrl="${saveUrl}"/>
        </kendo:upload>

    The name attribute is required and must be unique.
    It will be used as a form field name in the requests to the server.

2. Implement the Save controller action:

        @RequestMapping(value = "/async/save", method = RequestMethod.POST)
        public @ResponseBody String save(@RequestParam List<MultipartFile> files) {
            // Save the files
            // for (MultipartFile file : files) {
            // }

            // Return an empty string to signify success
            return "";
        }

### Remove handler

Users can remove files even after they've been uploaded asynchronously. To enable this feature you need a Remove action.

1. Specify a Remove action

        <kendo:upload name="files">
            <kendo:upload-async saveUrl="${saveUrl}" removeUrl="${removeUrl}"/>
        </kendo:upload>

2. Implement the Remove action. It takes a fileNames parameter of type string[]

        @RequestMapping(value = "/async/remove", method = RequestMethod.POST)
        public @ResponseBody String remove(@RequestParam String[] fileNames) {
            // Remove the files
            // for (String fileName : fileNames) {
            // }
            // Return an empty string to signify success
            return "";
        }

> The Remove action can be used as an attack vector if implemented poorly. Always sanitize the file names and verify that the user has the appropriate permissions before actually deleting any files.

### Disabling automatic upload

The selected files will be uploaded immediately by default.
You can change this behavior by setting AutoUpload to false.

        <kendo:upload name="files">
            <kendo:upload-async autoUpload="false" saveUrl="${saveUrl}" removeUrl="${removeUrl}"/>
        </kendo:upload>

