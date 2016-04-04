---
title: Modes of Operation
page_title: Modes of Operation | Upload JSP Tag
description: "Use the synchronous and asynchronous operational modes of the Upload JSP tag in Kendo UI."
slug: modesofoperation_upload_uiforjsp
position: 2
---

# Modes of Operation

The Kendo UI Upload supports two modes of operation&mdash;synchronous and asynchronous. This article explains how to use these modes with the Spring MVC framework.

For general information, refer to the article on the [widget's modes of operation]({% slug modes_upload_widget %}).

## Synchronous Mode

In the synchronous mode, the upload is executed synchronously, as part of the form submit. No dedicated action methods are required.

### Configuration

Below are listed the steps for you to follow when configuring the synchronous mode of operation for the Kendo UI Upload.

**Step 1** Add a `form` declaration and set a `controller` action.

###### Example

        <form method="post" action="<c:url value='/web/upload/' />">
        </form>

**Step 2** Add the Upload inside the form. The only required setting is `name`.

###### Example

        <kendo:upload name="files" />

**Step 3** Add **Submit** and **Reset** buttons to the form.

###### Example

        <input type="submit" value="Send" class="t-button" />
        <input type="reset" value="Reset" class="t-button" />

**Step 4** The form should look like the one demonstrated in the example below.

###### Example

        <form method="post" action="<c:url value='/web/upload/' />">
            <kendo:upload name="files" />
            <input type="submit" value="Send" class="t-button" />
            <input type="reset" value="Reset" class="t-button" />
        </form>

**Step 5** Process the files in the action. It requires no special server handling as compared to a regular input.

###### Example

        @RequestMapping(value = {"/", "/index"}, method = RequestMethod.POST)
        public String save(@RequestParam List<MultipartFile> files, Model model) {
            model.addAttribute("files", files);

            return "web/upload/results";
        }

## Asynchronous Mode

In this mode the files are uploaded to a controller action without interrupting the user interaction with the page.

### Save Handlers

Below are listed the steps for you to follow when configuring the saving of the handler in the asynchronous mode of operation of the Kendo UI Upload.

**Step 1** Add the Upload to the view.

###### Example

        <kendo:upload name="files">
            <kendo:upload-async saveUrl="${saveUrl}"/>
        </kendo:upload>

The `name` attribute is required and must be unique. It is used as a `form` field name in the requests to the server.

**Step 2** Implement the **Save** controller action.

###### Example

        @RequestMapping(value = "/async/save", method = RequestMethod.POST)
        public @ResponseBody String save(@RequestParam List<MultipartFile> files) {
            // Save the files
            // for (MultipartFile file : files) {
            // }

            // Return an empty string to signify success
            return "";
        }

### Remove Handlers

Users can remove files after they are uploaded asynchronously. To enable this feature, a `Remove` action is needed.

Below are listed the steps for you to follow when configuring the removing of the handler in the asynchronous mode of operation of the Kendo UI Upload.

**Step 1** Specify a `Remove` action.

###### Example

        <kendo:upload name="files">
            <kendo:upload-async saveUrl="${saveUrl}" removeUrl="${removeUrl}"/>
        </kendo:upload>

**Step 2** Implement the `Remove` action. It takes a `fileNames` parameter of type `string[]`.

###### Example

        @RequestMapping(value = "/async/remove", method = RequestMethod.POST)
        public @ResponseBody String remove(@RequestParam String[] fileNames) {
            // Remove the files
            // for (String fileName : fileNames) {
            // }
            // Return an empty string to signify success
            return "";
        }

> **Important**
>
> The `Remove` action can be used as an attack vector if implemented poorly. Always sanitize the file names and verify that the user has the appropriate permissions before actually deleting any files.

### Disable Automatic Uploads

The selected files are uploaded immediately by default. You can change this behavior by setting `AutoUpload` to `false`.

###### Example

        <kendo:upload name="files">
            <kendo:upload-async autoUpload="false" saveUrl="${saveUrl}" removeUrl="${removeUrl}"/>
        </kendo:upload>

## See Also

Other articles on Telerik UI for JSP and on the Upload:

* [Overview of the Upload JSP Tag]({% slug overview_upload_uiforjsp %})
* [Sending and Receiving Metadata with the Upload HtmlHelper]({% slug metadata_upload_uiforjsp %})
* [Overview of the Kendo UI Upload Widget]({% slug overview_kendoui_upload_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
