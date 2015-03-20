---
title: Modes
page_title: Upload Modes in Telerik UI for ASP.NET MVC helper for Kendo UI Upload component
description: Explanation about synchronous and asynchronous operation modes of Telerik UI for ASP.NET MVC wrappers for Kendo UI Upload widget.
---
# Upload Modes

The Upload supports two modes of operation - synchronous and asynchronous.

This help topic explains how to use these modes with ASP.NET MVC.
Please review the main [Upload Modes](/web/upload/modes) help topic for general information.

## Synchronous mode

In this mode the upload is executed as part of the form submit (synchronously). No dedicated action methods are required.

1. Add a form declaration and set a controller action.
    - WebForms

            <% using (Html.BeginForm("ProcessSubmit", "Home",
                                     FormMethod.Post, new { id = "uploadForm", enctype = "multipart/form-data" })) { %>

            <% } %>
    - Razor

            @using (Html.BeginForm("ProcessSubmit", "Home",
                                     FormMethod.Post, new { id = "uploadForm", enctype = "multipart/form-data" })) {

            }

2. Add the Upload inside the form. The only required setting is a Name.
    - WebForms

            <%= Html.Kendo().Upload()
                    .Name("attachments")
            %>
    - Razor

            @(Html.Kendo().Upload()
                    .Name("attachments")
            )

3. Add a submit and reset buttons to the form.

        <input type="submit" value="Send" class="t-button" />
        <input type="reset" value="Reset" class="t-button" />

4. The form should look like this:
    - WebForms

            <% using (Html.BeginForm("ProcessSubmit", "Home",
                                     FormMethod.Post, new { id = "uploadForm", enctype = "multipart/form-data" })) { %>

                <%= Html.Kendo().Upload()
                        .Name("attachments")
                %>

                <input type="submit" value="Send" class="t-button" />
                <input type="reset" value="Reset" class="t-button" />
            <% } %>
    - Razor

            @using (Html.BeginForm("ProcessSubmit", "Home",
                                     FormMethod.Post, new { id = "uploadForm", enctype = "multipart/form-data" })) {

                @(Html.Kendo().Upload()
                        .Name("attachments")
                )

                <input type="submit" value="Send" class="t-button" />
                <input type="reset" value="Reset" class="t-button" />
            }

5. Process the files in the action. It requires no special server handling compared to a regular input.

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

## Asynchronous mode

In this mode the files are uploaded to a controller action without interrupting the user interaction with the page.

### Save handler

1.  Add the upload to the view:
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

2. Implement the Save controller action:

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

3. Build and run the application. The uploaded files will appear in the App_Data folder.

### Remove handler

Users can remove files even after they've been uploaded asynchronously. To enable this feature you need a Remove action.

1. Specify a Remove action
    - WebForms

            <%= Html.Kendo().Upload()
                    .Name("attachments")
                    .Async(async => async
                        .Save("Save", "Home")
                        .Remove("Remove", "Home")
                    )
            %>
    - Razor

            @(Html.Kendo().Upload()
                    .Name("attachments")
                    .Async(async => async
                        .Save("Save", "Home")
                        .Remove("Remove", "Home")
                    )
            )

2. Implement the Remove action. It takes a fileNames parameter of type string[]

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

            // Return an empty string to signify success
            return Content("");
        }

> The Remove action can be used as an attack vector if implemented poorly. Always sanitize the file names and verify that the user has the appropriate permissions before actually deleting any files.

### Disabling automatic upload

The selected files will be uploaded immediately by default.
You can change this behavior by setting AutoUpload to false.

- WebForms

        <%= Html.Kendo().Upload()
                .Name("attachments")
                .Async(async => async
                    .Save("Save", "Home")
                    .AutoUpload(false)
                )
        %>
- Razor

        @(Html.Kendo().Upload()
                .Name("attachments")
                .Async(async => async
                    .Save("Save", "Home")
                    .AutoUpload(false)
                )
        )

