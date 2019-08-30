---
title: Overview
page_title: Upload Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Upload HtmlHelper for ASP.NET MVC."
slug: overview_uploadhelper_aspnetmvc
position: 1
---

# Upload HtmlHelper Overview

The Telerik UI Upload HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Upload widget.

The Upload uses progressive enhancement to deliver the best possible uploading experience to users, without requiring extra developer effort.

* [Demo page for the Upload](https://demos.telerik.com/aspnet-mvc/upload)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add the Upload to the view. The `name` attribute is required and must be unique. It is used as a form field name in the requests to the server.

    ```ASPX
        <%: Html.Kendo().Upload()
            .Name("attachments")
            .Async(async => async
                .Save("Save", "Home")
            )
        %>
    ```
    ```Razor
        @(Html.Kendo().Upload()
            .Name("attachments")
            .Async(async => async
                .Save("Save", "Home")
            )
        )
    ```

1. Implement the `Save` controller action.

        public ActionResult Save(IEnumerable<HttpPostedFileBase> attachments)
        {
            // The name of the Upload component is "attachments".
            foreach (var file in attachments)
            {
                //Some browsers send file names with a full path. You only care about the file name.
                var fileName = Path.GetFileName(file.FileName);
                var destinationPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);

                file.SaveAs(destinationPath);
            }

            // Return an empty string to signify success.
            return Content("");
        }

1. Build and run the application. The uploaded files appear in the `App_Data` folder.

## Functionality and Features

* [Modes of operation]({% slug modesoperation_uploadhelper_aspnetmvc %})
* [Chunk upload of files]({% slug chunkupload_uploadhelper_aspnetmvc %})
* [Sending and receiving metadata]({% slug metadata_uploadhelper_aspnetmvc %})

## Events

You can subscribe to all Upload [events](/api/upload). For a complete example on basic Upload events, refer to the [demo on using the events of the Upload](https://demos.telerik.com/aspnet-mvc/upload/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().Upload()
        .Name("attachments")
        .Events(e => e
            .Upload("onUpload")
            .Success("onSuccess")
        )
    %>
    <script>
        function onUpload(e) {
            // Handle the upload event.
        }

        function onSuccess() {
            // Handle the success event.
        }
    </script>
```
```Razor
    @(Html.Kendo().Upload()
        .Name("attachments")
        .Events(e => e
            .Upload("onUpload")
            .Success("onSuccess")
        )
    )
    <script>
        function onUpload(e) {
            // Handle the upload event.
        }

        function onSuccess() {
            // Handle the success event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().Upload()
        .Name("attachments")
        .Events(e => e
            .Upload(@<text>
            function() {
                // Handle the upload event inline.
            }
            </text>)
            .Success(@<text>
            function() {
                // Handle the success event inline.
            }
            </text>)
        )
    )

## Referencing Existing Instances

To reference an existing Upload instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Upload client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload#methods) to control its behavior.

    // Place the following after the Upload for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the Upload is used to get its client-side instance.
            var upload = $("#attachments").data("kendoUpload");
        });
    </script>

## See Also

* [Basic Usage by the Upload HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/upload)
* [Using the API of the Upload HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/upload/api)
* [UploadBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/UploadBuilder)
* [Upload Server-Side API](/api/upload)
