---
title: Modes of Operation
page_title: Modes of Operation | Kendo UI Upload HtmlHelper
description: "Get started with the synchronous and asynchronous operation modes of Telerik UI for ASP.NET MVC wrappers for the Kendo UI Upload widget."
slug: modesoperation_uploadhelper_aspnetmvc
position: 2
---

# Modes of Operation

The Kendo UI Upload supports two modes of operation&mdash;synchronous and asynchronous. This article explains how to use these modes with ASP.NET MVC.

For general information, refer to the article on the [widget's modes of operation]({% slug overview_kendoui_upload_widget %}).

## Synchronous Mode

In the synchronous mode, the upload is executed synchronously, as part of the form submit. No dedicated action methods are required.

### Configuration

Below are listed the steps for you to follow when configuring the synchronous mode of operation for the Kendo UI Upload.

**Step 1** Add a `form` declaration and set a `controller` action.

###### Example

```tab-ASPX

        <% using (Html.BeginForm("ProcessSubmit", "Home",
                                 FormMethod.Post, new { id = "uploadForm", enctype = "multipart/form-data" })) { %>

        <% } %>
```
```tab-Razor

        @using (Html.BeginForm("ProcessSubmit", "Home",
                                 FormMethod.Post, new { id = "uploadForm", enctype = "multipart/form-data" })) {

        }
```

**Step 2** Add the Upload inside the form. The only required setting is `name`.

###### Example

```tab-ASPX

        <%= Html.Kendo().Upload()
                .Name("attachments")
        %>
```
```tab-Razor

        @(Html.Kendo().Upload()
                .Name("attachments")
        )
```

**Step 3** Add **Submit** and **Reset** buttons to the form.

###### Example

        <input type="submit" value="Send" class="t-button" />
        <input type="reset" value="Reset" class="t-button" />

**Step 4** The form should look like the one demonstrated in the example below.

###### Example

```tab-ASPX

        <% using (Html.BeginForm("ProcessSubmit", "Home",
                                 FormMethod.Post, new { id = "uploadForm", enctype = "multipart/form-data" })) { %>

            <%= Html.Kendo().Upload()
                    .Name("attachments")
            %>

            <input type="submit" value="Send" class="t-button" />
            <input type="reset" value="Reset" class="t-button" />
        <% } %>
```
```tab-Razor

        @using (Html.BeginForm("ProcessSubmit", "Home",
                                 FormMethod.Post, new { id = "uploadForm", enctype = "multipart/form-data" })) {

            @(Html.Kendo().Upload()
                    .Name("attachments")
            )

            <input type="submit" value="Send" class="t-button" />
            <input type="reset" value="Reset" class="t-button" />
        }
```

**Step 5** Process the files in the action. It requires no special server handling as compared to a regular input.

###### Example

        [HttpPost]
        public ActionResult ProcessSubmit(IEnumerable<HttpPostedFileBase> attachments)
        {
            // The Name of the Upload component is "attachments"
            if (attachments != null)
            {
                foreach (var file in attachments)
                {
                    // Some browsers send file names with full path. We only care about the file name.
                    var fileName = Path.GetFileName(file.FileName);
                    var destinationPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);

                    file.SaveAs(destinationPath);
                }
            }

            // Redirect to a view showing the result of the form submission.
            return RedirectToAction("SubmitSummary");
        }

## Asynchronous Mode

In this mode the files are uploaded to a controller action without interrupting the user interaction with the page.

### Save Handlers

Below are listed the steps for you to follow when configuring the saving of the handler in the asynchronous mode of operation of the Kendo UI Upload.

**Step 1** Add the Upload to the view.

###### Example

```tab-ASPX

        <%: Html.Kendo().Upload()
                .Name("attachments")
                .Async(async => async
                    .Save("Save", "Home")
                )
        %>
```
```tab-Razor

        @(Html.Kendo().Upload()
                .Name("attachments")
                .Async(async => async
                    .Save("Save", "Home")
                )
        )
```

The `name` attribute is required and must be unique. It is used as a form field name in the requests to the server.

**Step 2** Implement the `Save` controller action.

###### Example

        public ActionResult Save(IEnumerable<HttpPostedFileBase> attachments)
        {
            //The Name of the Upload component is "attachments".
            foreach (var file in attachments)
            {
                //Some browsers send file names with a full path. You only care about the file name.
                var fileName = Path.GetFileName(file.FileName);
                var destinationPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);

                file.SaveAs(destinationPath);
            }

            //Return an empty string to signify success.
            return Content("");
        }

**Step 3** Build and run the application. The uploaded files appear in the `App_Data` folder.

### Remove Handlers

Users can remove files after they are uploaded asynchronously. To enable this feature, a `Remove` action is needed.

Below are listed the steps for you to follow when configuring the removing of the handler in the asynchronous mode of operation of the Kendo UI Upload.

**Step 1** Specify a `Remove` action.

###### Example

```tab-ASPX

        <%= Html.Kendo().Upload()
                .Name("attachments")
                .Async(async => async
                    .Save("Save", "Home")
                    .Remove("Remove", "Home")
                )
        %>
```
```tab-Razor

        @(Html.Kendo().Upload()
                .Name("attachments")
                .Async(async => async
                    .Save("Save", "Home")
                    .Remove("Remove", "Home")
                )
        )
```

**Step 2** Implement the `Remove` action. It takes a `fileNames` parameter of type `string[]`.

###### Example

        public ActionResult Remove(string[] fileNames)
        {
            foreach (var fullName in fileNames)
            {
                var fileName = Path.GetFileName(fullName);
                var physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);

                // TODO: Verify user permissions

                if (System.IO.File.Exists(physicalPath))
                {
                    System.IO.File.Delete(physicalPath);
                }
            }

            //Return an empty string to signify success
            return Content("");
        }

> **Important**
>
> The `Remove` action can be used as an attack vector if implemented poorly. Always sanitize the file names and verify that the user has the appropriate permissions before actually deleting any files.

### Disable Automatic Uploads

The selected files are uploaded immediately by default. You can change this behavior by setting `AutoUpload` to `false`.

###### Example

```tab-ASPX

        <%= Html.Kendo().Upload()
                .Name("attachments")
                .Async(async => async
                    .Save("Save", "Home")
                    .AutoUpload(false)
                )
        %>
```
```tab-Razor

        @(Html.Kendo().Upload()
                .Name("attachments")
                .Async(async => async
                    .Save("Save", "Home")
                    .AutoUpload(false)
                )
        )
```

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Upload:

* [Overview of the Upload HtmlHelper]({% slug overview_uploadhelper_aspnetmvc %})
* [Sending and Receiving Metadata with the Upload HtmlHelper]({% slug metadata_uploadhelper_aspnetmvc %})
* [How to Upload Files from Grid Popup Editors in ASP.NET MVC Applications]({% slug howto_uploadfilesgridpopupeditor_uploadaspnetmvc %})
* [How to Upload Files to Databases in ASP.NET MVC Applications]({% slug howto_uploadfilesdatabases_uploadaspnetmvc %})
* [Overview of the Kendo UI Upload Widget]({% slug overview_kendoui_upload_widget %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
* [Upload HtmlHelper Troubleshooting]({% slug troubleshoot_uploadhelper_aspnetmvc %})
