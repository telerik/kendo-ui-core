---
title: Metadata
page_title: Asynchronous uploading of metadata | Kendo UI Helpers for ASP.NET MVC
description: Explanatory notes about asynchronous uploading of metadata in Telerik UI for ASP.NET MVC Helpers.
---

Asynchronous uploading usually means that you lose the association between the files and the context that they originate from.

Take an e-mail application for example. The save handler must associate the uploaded files to a particular message.

The message and the file even might be processed on different servers in a load balancing or cloud computing scenario.

## Sending metadata to the save action

### Using route values

Any metadata that is known during rendering can be forwarded to the save action as route variables.

1. Generate an unique message ID and store it in the ViewData.

        public ActionResult Index()
        {
            ViewBag.MessageId = Guid.NewGuid().ToString();

            return View();
        }

2. Add the message ID to the route values.
    - WebForms

            <%= Html.Kendo().Upload()
                    .Name("attachments")
                    .Async(async => async
                        .Save("Save", "Home",
                              new { messageId = ViewBag.MessageId })
                    )
            %>
    - Razor

            @(Html.Kendo().Upload()
                    .Name("attachments")
                    .Async(async => async
                        .Save("Save", "Home",
                              new { messageId = ViewBag.MessageId })
                    )
            )
3. Process the file using the message ID

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

The same technique is applicable with the Remove action and remove event.

### Using the Upload client-side event

You can also add metadata directly on the client. This is useful when the data is not known in advance.

1. Add an input field for description. We will send its value to the save handler.

        <input type="text" id="fileDescription" />

2. Declare a handler for the upload event and attach a data object to the passed event.

        function onUpload(e) {
            e.data = {
                fileDescription: $("#fileDescription").val()
            };
        }

3. Attach the event handler.
    - WebForms

            <%= Html.Kendo().Upload()
                .Name("attachments")
                .Async(async => async
                    .Save("Save", "Home")
                )
                .Events(c => c
                    .Upload("onUpload")
                )
            %>
    - Razor

            @(Html.Kendo().Upload()
                .Name("attachments")
                .Async(async => async
                    .Save("Save", "Home")
                )
                .Events(c => c
                    .Upload("onUpload")
                )
            )

4. Process the file and the associated description

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

## Receiving metadata from the save handler

The save handler can sometimes produce a result that needs to be routed back to the page.

The Upload requires the response to be in JSON format with Content-Type set to "text/plain". Any non-empty response that is not JSON will be treated as a server error.

1. Build the response

        [HttpPost]
        public ActionResult Save(IEnumerable<HttpPostedFileBase> attachments)
        {
            // ...

            // When returning JSON the mime-type must be set to text/plain
            return Json(new { status = "OK" }, "text/plain");
        }

2. Declare a handler for the [success event](/api/web/upload#success) and process the response

        function onSuccess(e) {
            alert("Status: " + e.response.status);
        }

3. Attach the event handler
    - WebForms

            <%= Html.Kendo().Upload()
                .Name("attachments")
                .Async(async => async
                    .Save("Save", "Home")
                )
                .Events(c => c
                    .Success("onSuccess")
                )
            %>
    - Razor

            @(Html.Kendo().Upload()
                .Name("attachments")
                .Async(async => async
                    .Save("Save", "Home")
                )
                .Events(c => c
                    .Success("onSuccess")
                )
            )

The same approach is applicable for the remove handler as well.
