---
title: Overview
page_title: Overview | Kendo UI Upload HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Upload widget for ASP.NET MVC."
slug: overview_uploadhelper_aspnetmvc
position: 1
---

# Upload HtmlHelper Overview

The Upload HtmlHelper extension is a server-side wrapper for the [Kendo UI Upload](https://demos.telerik.com/kendo-ui/upload/index) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Upload.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add the Upload to the view.

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

    The name attribute is required and must be unique. It is used as a form field name in the requests to the server.

1. Implement the `Save` controller action.

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

1. Build and run the application. The uploaded files appear in the `App_Data` folder.

## Event Handling

You can subscribe to all Upload [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().Upload()
                .Name("attachments")
                .Events(e => e
                    .Upload("onUpload")
                    .Success("onSuccess")
                )
        %>
        <script>
        function onUpload(e) {
            //Handle the upload event.
        }

        function onSuccess() {
            //Handle the success event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().Upload()
                .Name("attachments")
                .Events(e => e
                    .Upload("onUpload")
                    .Success("onSuccess")
                )
        )
        <script>
        function onUpload(e) {
            //Handle the upload event.
        }

        function onSuccess() {
            //Handle the success event.
        }
        </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

        @(Html.Kendo().Upload()
              .Name("attachments")
              .Events(e => e
                  .Upload(@<text>
                    function() {
                        //Handle the upload event inline.
                    }
                  </text>)
                  .Success(@<text>
                    function() {
                        //Handle the success event inline.
                    }
                    </text>)
              )
        )
```

## Reference

### Existing Instances

To reference an existing Kendo UI Upload instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Upload API](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI Upload for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the Upload is used to get its client-side instance.
            var upload = $("#attachments").data("kendoUpload");
        });
        </script>

## See Also

* [ASP.NET MVC API Reference: UploadBuilder](http://docs.telerik.com/kendo-ui/api/Kendo.Mvc.UI.Fluent/UploadBuilder)
* [Upload HtmlHelper Modes of Operation]({% slug modesoperation_uploadhelper_aspnetmvc %})
* [Chunk Upload]({% slug chunkupload_uploadhelper_aspnetmvc %})
* [Sending and Receiving Metadata with the Upload HtmlHelper]({% slug metadata_uploadhelper_aspnetmvc %})
* [How to Upload Files from Grid Popup Editors in ASP.NET MVC Applications]({% slug howto_uploadfilesgridpopupeditor_uploadaspnetmvc %})
* [How to Upload Files to Databases in ASP.NET MVC Applications]({% slug howto_uploadfilesdatabases_uploadaspnetmvc %})
* [Overview of the Kendo UI Upload Widget](http://docs.telerik.com/kendo-ui/controls/editors/upload/overview)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/kendo-ui/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
* [Upload HtmlHelper Troubleshooting]({% slug troubleshoot_uploadhelper_aspnetmvc %})
