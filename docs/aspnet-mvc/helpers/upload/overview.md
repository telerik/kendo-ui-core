---
title: Overview
page_title: Upload HtmlHelper extension | Kendo UI Upload widget documentation
description: Get familiar with Upload HtmlHelper server-side wrapper, learn how to setup an asynchronous upload and handle Kendo UI Upload events.
---

# Upload

The Upload HtmlHelper extension is a server-side wrapper for the [Kendo UI Upload](/web/upload/overview) widget.

## Getting Started

The following example shows how to setup an asynchronous upload that saves the uploaded files in the App_Data folder.:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }

3.  Add the upload to the view:
    - WebForms

            <%: Html.Kendo().Upload()
                    .Name("attachments")
                    .Async(async => async
                        .Save("Save", "Home")
                    )
            %>
    - Razor

            @(Html.Kendo().Upload()
                    .Name("attachments")
                    .Async(async => async
                        .Save("Save", "Home")
                    )
            )

    The name attribute is required and must be unique.
	It will be used as a form field name in the requests to the server.

4. Implement the Save controller action:

        public ActionResult Save(IEnumerable<HttpPostedFileBase> attachments)
        {
            // The Name of the Upload component is "attachments"
            foreach (var file in attachments)
            {
                // Some browsers send file names with full path. We only care about the file name.
                var fileName = Path.GetFileName(file.FileName);
                var destinationPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);

                file.SaveAs(destinationPath);
            }

            // Return an empty string to signify success
            return Content("");
        }

5. Build and run the application. The uploaded files will appear in the App_Data folder.

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

You can subscribe to all [events](/api/web/upload) exposed by Kendo UI Upload:

### WebForms - subscribe by handler name

    <%: Html.Kendo().Upload()
            .Name("attachments")
            .Events(e => e
                .Upload("onUpload")
                .Success("onSuccess")
            )
    %>
    <script>
    function onUpload(e) {
        // Handle the upload event
    }

    function onSuccess() {
        // Handle the success event
    }
    </script>


### Razor - subscribe by handler name

    @(Html.Kendo().Upload()
            .Name("attachments")
            .Events(e => e
                .Upload("onUpload")
                .Success("onSuccess")
            )
    )
    <script>
    function onUpload(e) {
        // Handle the upload event
    }

    function onSuccess() {
        // Handle the success event
    }
    </script>


### Razor - subscribe by template delegate

    @(Html.Kendo().Upload()
          .Name("attachments")
          .Events(e => e
              .Upload(@<text>
                function() {
                    // Handle the upload event inline
                }
              </text>)
              .Success(@<text>
                function() {
                    // Handle the success event inline
                }
                </text>)
          )
    )
