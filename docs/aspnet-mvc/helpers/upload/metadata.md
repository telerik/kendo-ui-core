---
title: Handling of Metadata
page_title: Handling of Metadata | Kendo UI Upload HtmlHelper
description: "Get started with the asynchronous uploading of metadata in Telerik UI for ASP.NET MVC helpers."
slug: metadata_uploadhelper_aspnetmvc
position: 3
---

# Handling of Metadata

Asynchronous uploading usually means that you lose the association between the files and the context that they originate from. Take an e-mail application, for example. The save handler must associate the uploaded files to a particular message. The message and the file might even be processed on different servers in a load balancing or a cloud-computing scenario.

## Send Metadata to Save Actions

### Use Route Values

The metadata known during the rendering can be forwarded to the `save` action as route variables.

Below are listed the steps for you to follow when configuring the sending of metadata to the `save` action by using route values in the Kendo UI Upload.

**Step 1** Generate an unique message ID and store it in the `ViewData`.

###### Example

        public ActionResult Index()
        {
            ViewBag.MessageId = Guid.NewGuid().ToString();

            return View();
        }

**Step 2** Add the message ID to the route values.

###### Example

```tab-ASPX

        <%= Html.Kendo().Upload()
                .Name("attachments")
                .Async(async => async
                    .Save("Save", "Home",
                          new { messageId = ViewBag.MessageId })
                )
        %>
```
```tab-Razor

        @(Html.Kendo().Upload()
                .Name("attachments")
                .Async(async => async
                    .Save("Save", "Home",
                          new { messageId = ViewBag.MessageId })
                )
        )
```

**Step 3** Process the file using the message ID.

###### Example

        [HttpPost]
        public ActionResult Save(IEnumerable<HttpPostedFileBase> attachments, string messageId)
        {
            foreach (var file in attachments)
            {
                // Some browsers send file names with full path. We only care about the file name.
                var fileName = Path.GetFileName(file.FileName);
                var destinationPath = Path.Combine(
                    Server.MapPath("~/App_Data"), messageId, fileName);

                file.SaveAs(destinationPath);
            }

            // Return an empty string to signify success
            return Content("");
        }

The same technique is applicable with the `remove` action and `remove` event.

### Use Upload Client-Side Event

You can also add metadata directly on the client, which is useful when the data is not known in advance.

Below are listed the steps for you to follow to do that.

**Step 1** Add an input field for description. We will send its value to the save handler.

###### Example

        <input type="text" id="fileDescription" />

**Step 2** Declare a handler for the upload event and attach a data object to the passed event.

###### Example

        function onUpload(e) {
            e.data = {
                fileDescription: $("#fileDescription").val()
            };
        }

**Step 3** Attach the event handler.

###### Example

```tab-ASPX

        <%= Html.Kendo().Upload()
            .Name("attachments")
            .Async(async => async
                .Save("Save", "Home")
            )
            .Events(c => c
                .Upload("onUpload")
            )
        %>
```
```tab-Razor

        @(Html.Kendo().Upload()
            .Name("attachments")
            .Async(async => async
                .Save("Save", "Home")
            )
            .Events(c => c
                .Upload("onUpload")
            )
        )
```

**Step 4** Process the file and the associated description.

###### Example

        [HttpPost]
        public ActionResult Save(IEnumerable<HttpPostedFileBase> attachments, string fileDescription)
        {
            foreach (var file in attachments)
            {
                // Some browsers send file names with full path. We only care about the file name.
                var fileName = Path.GetFileName(file.FileName);
                var destinationPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);

                // TODO: Store description...

                file.SaveAs(destinationPath);
            }

            // Return an empty string to signify success
            return Content("");
        }

## Receive Metadata from Save Handlers

The `save` handler can sometimes produce a result that needs to be routed back to the page. The Upload requires the response to be in JSON format with the Content-Type set to `"text/plain"`. Any non-empty response that is not JSON is treated as a server error.

Below are listed the steps for you to follow when configuring the receiving of metadata from the `save` action in the Kendo UI Upload.

**Step 1** Build the response.

###### Example

        [HttpPost]
        public ActionResult Save(IEnumerable<HttpPostedFileBase> attachments)
        {
            // ...

            // When returning JSON the mime-type must be set to text/plain
            return Json(new { status = "OK" }, "text/plain");
        }

**Step 2** Declare a handler for the [`success` event](/api/javascript/ui/upload#success) and process the response.

###### Example

        function onSuccess(e) {
            alert("Status: " + e.response.status);
        }

**Step 3** Attach the event handler.

###### Example

```tab-ASPX

        <%= Html.Kendo().Upload()
            .Name("attachments")
            .Async(async => async
                .Save("Save", "Home")
            )
            .Events(c => c
                .Success("onSuccess")
            )
        %>
```
```tab-Razor

        @(Html.Kendo().Upload()
            .Name("attachments")
            .Async(async => async
                .Save("Save", "Home")
            )
            .Events(c => c
                .Success("onSuccess")
            )
        )
```

The same approach is applicable for the `remove` handler as well.

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Upload:

* [Overview of the Upload HtmlHelper]({% slug overview_uploadhelper_aspnetmvc %})
* [Upload HtmlHelper Modes of Operation]({% slug modesoperation_uploadhelper_aspnetmvc %})
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
