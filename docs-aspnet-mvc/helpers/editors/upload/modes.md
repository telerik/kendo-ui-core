---
title: Modes of Operation
page_title: Modes of Operation | Telerik UI Upload HtmlHelper for ASP.NET MVC
description: "Learn about the synchronous and the asynchronous modes of operation of the Telerik UI Upload HtmlHelper for ASP.NET MVC."
slug: modesoperation_uploadhelper_aspnetmvc
position: 2
---

# Modes of Operation

The Upload provides the [synchronous](#synchronous-mode) and [asynchronous](#asynchronous-mode) modes of operation.

## Synchronous Mode

In the synchronous mode, the upload is executed synchronously as part of the form submit and the Upload requires no dedicated action methods.

1. Add a `form` declaration and set a `controller` action.

    ```ASPX
        <% using (Html.BeginForm("ProcessSubmit", "Home",
            FormMethod.Post, new { id = "uploadForm", enctype = "multipart/form-data" })) { %>
        <% } %>
    ```
    ```Razor
        @using (Html.BeginForm("ProcessSubmit", "Home",
            FormMethod.Post, new { id = "uploadForm", enctype = "multipart/form-data" })) {
        }
    ```

1. Add the Upload inside the form. The only required setting is `name`.

    ```ASPX
        <%= Html.Kendo().Upload()
            .Name("attachments")
        %>
    ```
    ```Razor
        @(Html.Kendo().Upload()
            .Name("attachments")
        )
    ```

1. Add the **Submit** and **Reset** buttons to the form.

        <input type="submit" value="Send" class="t-button" />
        <input type="reset" value="Reset" class="t-button" />

1. The form looks similar to what the following example demonstrates.

    ```ASPX
        <% using (Html.BeginForm("ProcessSubmit", "Home",
            FormMethod.Post, new { id = "uploadForm", enctype = "multipart/form-data" })) { %>

            <%= Html.Kendo().Upload()
                    .Name("attachments")
            %>

            <input type="submit" value="Send" class="t-button" />
            <input type="reset" value="Reset" class="t-button" />
        <% } %>
    ```
    ```Razor
            @using (Html.BeginForm("ProcessSubmit", "Home",
                FormMethod.Post, new { id = "uploadForm", enctype = "multipart/form-data" })) {

                @(Html.Kendo().Upload()
                        .Name("attachments")
                )

                <input type="submit" value="Send" class="t-button" />
                <input type="reset" value="Reset" class="t-button" />
            }
    ```

1. Process the files in the action. As compared to the regular input, it requires no special server handling.

        [HttpPost]
        public ActionResult ProcessSubmit(IEnumerable<HttpPostedFileBase> attachments)
        {
            // The Name of the Upload component is "attachments".
            if (attachments != null)
            {
                foreach (var file in attachments)
                {
                    // Some browsers send file names with full path but you need to take into account only the file name.
                    var fileName = Path.GetFileName(file.FileName);
                    var destinationPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);

                    file.SaveAs(destinationPath);
                }
            }

            // Redirect to a view that shows the result of the form submission.
            return RedirectToAction("SubmitSummary");
        }

## Asynchronous Mode

In the asynchronous mode of operation, the files are uploaded to a controller action without interrupting the user interaction with the page.

### Setting the Save Handlers

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

### Setting the Remove Handlers

Users can remove files after they are uploaded asynchronously. To enable this feature, set the `Remove` action.

1. Specify a `Remove` action.

    ```ASPX
        <%= Html.Kendo().Upload()
            .Name("attachments")
            .Async(async => async
                .Save("Save", "Home")
                .Remove("Remove", "Home")
            )
        %>
    ```
    ```Razor
        @(Html.Kendo().Upload()
            .Name("attachments")
            .Async(async => async
                .Save("Save", "Home")
                .Remove("Remove", "Home")
            )
        )
    ```

1. Implement the `Remove` action. It takes a `fileNames` parameter of type `string[]`.

  > If implemented poorly, the `Remove` action can be used as an attack vector. Always sanitize the file names and verify that the users have the appropriate permissions before they actually delete any files.

        public ActionResult Remove(string[] fileNames)
        {
            foreach (var fullName in fileNames)
            {
                var fileName = Path.GetFileName(fullName);
                var physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);

                // TODO: Verify user permissions.

                if (System.IO.File.Exists(physicalPath))
                {
                    System.IO.File.Delete(physicalPath);
                }
            }

            // Return an empty string to signify success.
            return Content("");
        }

### Disabling Automatic Uploads

By default, the selected files are uploaded immediately. You can change this behavior by setting `AutoUpload` to `false`.

```ASPX
    <%= Html.Kendo().Upload()
        .Name("attachments")
        .Async(async => async
            .Save("Save", "Home")
            .AutoUpload(false)
        )
    %>
```
```Razor
    @(Html.Kendo().Upload()
        .Name("attachments")
        .Async(async => async
            .Save("Save", "Home")
            .AutoUpload(false)
        )
    )
```

## See Also

* [Asynchronous Mode of Operation by the Upload HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/upload/async)
* [UploadBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/UploadBuilder)
* [Upload Server-Side API](/api/upload)
