---
title: Metadata
page_title: Metadata | Telerik UI Upload HtmlHelper for ASP.NET MVC
description: "Learn how to send and receive metadata when uploading files with the Telerik UI Upload HtmlHelper for ASP.NET MVC."
slug: metadata_uploadhelper_aspnetmvc
position: 4
---

# Metadata

Usually, asynchronous uploading means that you lose the association between the files and the context they originate from.

For example, in an application, the `save` handler must associate the uploaded files with a particular message. The message and the file might be processed on different servers in a load-balancing or cloud-computing scenario.

## Sending Metadata

You can send metadata by [using route values](#forwarding-metadata-through-route-values) or by [using the `upload` event on the client](#adding-metadata-on-the-client).

### Forwarding Metadata through Route Values

The suggested approach is also applicable to the `remove` action and `remove` event.

To forward the metadata that is known during the rendering to the `save` action as route variables:

1. Generate an unique message ID and store it in the `ViewData`.

        public ActionResult Index()
        {
            ViewBag.MessageId = Guid.NewGuid().ToString();

            return View();
        }

1. Add the message ID to the route values.

    ```ASPX
        <%= Html.Kendo().Upload()
            .Name("attachments")
            .Async(async => async
                .Save("Save", "Home",
                        new { messageId = ViewBag.MessageId })
            )
        %>
    ```
    ```Razor
        @(Html.Kendo().Upload()
            .Name("attachments")
            .Async(async => async
                .Save("Save", "Home",
                        new { messageId = ViewBag.MessageId })
            )
        )
    ```

1. Process the file using the message ID.

        [HttpPost]
        public ActionResult Save(IEnumerable<HttpPostedFileBase> attachments, string messageId)
        {
            foreach (var file in attachments)
            {
                // Some browsers send file names with full path but you have to take into account only the file name.
                var fileName = Path.GetFileName(file.FileName);
                var destinationPath = Path.Combine(
                    Server.MapPath("~/App_Data"), messageId, fileName);

                file.SaveAs(destinationPath);
            }

            // Return an empty string to signify success
            return Content("");
        }

### Adding Metadata on the Client

When the data is not known in advance, you can also add the metadata directly on the client:

1. Add an input field for the description. You will then send its value to the `save` handler.

        <input type="text" id="fileDescription" />

1. Declare a handler for the `upload` event and attach a data object to the passed event.

        function onUpload(e) {
            e.data = {
                fileDescription: $("#fileDescription").val()
            };
        }

1. Attach the event handler.

    ```ASPX
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
    ```Razor
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

1. Process the file and the associated description.

        [HttpPost]
        public ActionResult Save(IEnumerable<HttpPostedFileBase> attachments, string fileDescription)
        {
            foreach (var file in attachments)
            {
                // Some browsers send file names with a full path but you need to take into account only the file name.
                var fileName = Path.GetFileName(file.FileName);
                var destinationPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);

                // TODO: Store description.

                file.SaveAs(destinationPath);
            }

            // Return an empty string to signify success.
            return Content("");
        }

## Receiving Metadata

The `save` handler can sometimes produce a result that needs to be routed back to the page. The Upload requires the response to be in JSON format with the `Content-Type` set to `"text/plain"`. Any non-empty response that is not JSON is treated as a server error. The suggested approach is applicable for the `remove` handler as well.

To configure the receiving of metadata from the `save` action in the Upload:

1. Build the response.

        [HttpPost]
        public ActionResult Save(IEnumerable<HttpPostedFileBase> attachments)
        {
            // ...

            // When returning JSON the mime-type must be set to text/plain
            return Json(new { status = "OK" }, "text/plain");
        }

1. Declare a handler for the [`success` event](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload#success) and process the response.

        function onSuccess(e) {
            alert("Status: " + e.response.status);
        }

1. Attach the event handler.

    ```ASPX
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
    ```Razor
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

## See Also

* [UploadBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/UploadBuilder)
* [Upload Server-Side API](/api/upload)
