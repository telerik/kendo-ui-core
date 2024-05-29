---
title: Form Integration
page_title: Form Integration
description: "Learn how to integrate the Telerik UI for {{ site.framework }} Upload component into a form."
slug: htmlhelpers_upload_form_integration
position: 10
---

# Form Integration

Usually, developers integrate the Upload component into a form, ensuring that uploaded files are submitted and processed together with other form fields like textboxes, dropdowns, and more.

You can define the Upload component as an editor in both a standard HTML form and a [Telerik UI for {{ site.framework }} Form]({% slug htmlhelpers_form_aspnetcore_overview %}).

## Upload in Telerik UI for {{ site.framework }} Form

1. Declare a field in the Form component that binds to a collection of {% if site.core %}[`IFormFile`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.http.iformfile?view=aspnetcore-8.0&viewFallbackFrom=aspnetcore-9.0){% else %}[`HttpPostedFileBase`](https://learn.microsoft.com/en-us/dotnet/api/system.web.httppostedfilebase?view=netframework-4.8.1){% endif %} and specify the Upload component as an editor. For example, you can use the `EditorTemplateId()` option that accepts the name of [an external Kendo UI template](https://docs.telerik.com/kendo-ui/framework/templates/get-started-external).

    {% if site.core %}
    ```Model
        public class FormViewModel
        {
            public string OrderName { get; set; }

            public decimal Freight { get; set; }

            public IEnumerable<IFormFile> Files { get; set; }
        }
    ```
    {% else %}
    ```Model
        using System.Web;

        public class FormViewModel
        {
            public string OrderName { get; set; }

            public decimal Freight { get; set; }

            public IEnumerable<HttpPostedFileBase> Files { get; set; }
        }
    ```
    {% endif %}
    ```HtmlHelper
        @(Html.Kendo().Form<FormViewModel>()
            .Name("exampleForm")
            .HtmlAttributes(new { action = @Url.Action("SubmitForm", "Home"), method = "POST" })
            .Validatable(v =>
            {
                v.ValidateOnBlur(true);
                v.ValidationSummary(vs => vs.Enable(true));
            })
            .Items(items =>
            {
                items.Add()
                    .Field(f => f.OrderName)
                    .Label(l => l.Text("Order name:"));
                items.Add()
                    .Field(f => f.Freight)
                    .Label(l => l.Text("Freight:"))
                    .Editor(x => x.NumericTextBox().Min(10).Max(1000));
                items.Add()
                    .Field(f => f.Files)
                    .EditorTemplateId("uploadEditorTemplate");
            })
        )

        <script type="text/x-kendo-template" id="uploadEditorTemplate">
            @(Html.Kendo().Upload()
                .Name("Files")
            )
        </script>
    ```
    {% if site.core %}
    ```TagHelper
    @addTagHelper *, Kendo.Mvc

    @model FormViewModel

    <kendo-form name="exampleForm" form-data="@Model" method="POST">
        <validatable validate-on-blur="true" validation-summary="true" />
        <form-items>
            <form-item field="OrderName">
                <item-label text="Name:" />
            </form-item>
            <form-item field="Freight">
                <item-label text="Freight:" />
                <numerictextbox-editor min="10" max="1000"></numerictextbox-editor>
            </form-item>
            <form-item field="Files" editor-handler="uploadEditor">
            </form-item>
        </form-items>
    </kendo-form>

    <script type="text/javascript">
        function uploadEditor(container, options) {
            $('<input type="file" name="Files" id="Files"/>')
                .appendTo(container)
                .kendoUpload({}); //set additional Upload configuration if desired
        }
    </script>
    ```
    {% endif %}

1. Handle the `submit` event of the Form, prevent its default action, and gather the uploaded files along with the Form fields. Then, trigger an AJAX request to the server to post the Form data.

    ```Script
    <script type="text/javascript">
        $(document).ready(function () {
            $("#exampleForm").submit(function (e) {
                e.preventDefault(e);
                var formData = new FormData(); // 1. Create a new FormData instance.
                var upload = $("#Files").getKendoUpload(); // 2. Obtain the Upload widget incarnation's object reference.
                var files = upload.getFiles(); // 3. Gather the uploaded files.

                var serializedArray = $("#exampleForm").serializeArray(); // 4. Serialize the form data in to key-value pairs.

                for (var i = 0; i < serializedArray.length; i++) { // 5. Traverse through each of the key-value pairs.
                    var key = serializedArray[i]['name'];
                    var value = serializedArray[i]['value'];
                    formData.append(key, value); // 6. Append current key-value pair to the newly created Form Data from step 1.
                }

                for (var i = 0; i < files.length; i++) { // 7. Iterate through each of the uploaded and append them to the Form data.
                    let file = files[i].rawFile;
                    formData.append("files", file);
                }

                $.ajax({ // 8. Make an AJAX request by posting the form data.
                    type: "POST",
                    url: "@Url.Action("SaveForm", "Home")",
                    data: formData,
                    processData: false,
                    contentType: false,
                    dataType: "json",
                    success: function (response) {
                        if (response.success) { // 9. If the request is completed successfully, clear the Form fields.
                            alert("Files Uploaded!");
                            $("#exampleForm").getKendoForm().clear();
                        }
                    },
                    error: function() {
                        alert("Request failed");
                    }
                });
            });
        });
    </script>
    ```

1. Access the received Form data on the server and process the uploaded files.

    {% if site.core %}
    ```HomeController.cs
        [HttpPost]
        public JsonResult SaveForm(FormViewModel formData)
        {
            if (formData.Files != null)
            {
                foreach (var file in formData.Files)
                {
                    var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
                    var fileName = Path.GetFileName(fileContent.FileName.Trim('"'));
                    var physicalPath = Path.Combine("wwwroot/uploadedFiles", fileName); // Save the files in "wwwroot/uploadedFiles" application directory.
                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
            }
            // Return the respective request response if the files are uploaded successfully.
            return Json(new { success = true });
        }
    ```
    {% else %}
    ```HomeController.cs
        [HttpPost]
        public JsonResult SaveForm(FormViewModel formData)
        {
            if (formData.Files != null)
            {
                foreach (var file in formData.Files)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);
                    file.SaveAs(physicalPath);
                }
            }
            // Return the respective request response if the files are uploaded successfully.
            return Json(new { success = true });
        }
    ```
    {% endif %}

## Upload in an HTML Form

1. Create an HTML form and declare the Upload component as an editor of the `Files` model property.

    {% if site.core %}
    ```Model
        public class FormViewModel
        {
            public string OrderName { get; set; }

            public decimal Freight { get; set; }

            public IEnumerable<IFormFile> Files { get; set; }
        }
    ```
    ```HtmlHelper
    @model FormViewModel

    <form id="exampleForm" action='@Url.Action("Submit")' method="post">
        <div class="k-form-group">
            <div class="k-form-field">
                @(Html.Kendo().TextBoxFor(m => m.OrderName)
                    .Label(l => l.Content("Name:").Floating(true))
                )
            </div>
            <div class="k-form-field">
                @(Html.Kendo().NumericTextBoxFor<decimal>(m => m.Freight)
                    .Min(10)
                    .Max(1000)
                    .Label(l => l.Content("Freight:").Floating(true))
                )
            </div>
            <div class="k-form-field">
                @(Html.Kendo().Upload()
                    .Name("Files")
                )
            </div>
        </div>
        <button type="submit" class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md">Submit</button>
    </form>
    ```
    ```TagHelper
    @addTagHelper *, Kendo.Mvc

    @model FormViewModel

    <form id="exampleForm" action='@Url.Action("Submit")' method="post">
        <div class="k-form-group">
            <div class="k-form-field">
                <kendo-textbox for="OrderName">
                    <textbox-label content="Name:" floating="true"/>
                </kendo-textbox>
            </div>
            <div class="k-form-field">
                <kendo-numerictextbox for="Freight" min="10" max="1000">
                    <numerictextbox-label content="Freight:" floating="true"/>
                </kendo-numerictextbox>
            </div>
            <div class="k-form-field">
                <kendo-upload name="Files">
                </kendo-upload>
            </div>
        </div>
        <button type="submit" class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md">Submit</button>
    </form>
    ```
    {% else %}
    ```Model
        using System.Web;

        public class FormViewModel
        {
            public string OrderName { get; set; }

            public decimal Freight { get; set; }

            public IEnumerable<HttpPostedFileBase> Files { get; set; }
        }
    ```
    ```View
    @model FormViewModel

    @using (Html.BeginForm("SubmitForm", "Home", FormMethod.Post, new { id = "exampleForm" }))
    {
        <div class="k-form-group">
            <div class="k-form-field">
                @(Html.Kendo().TextBoxFor(m => m.OrderName)
                    .Label(l => l.Content("Name:").Floating(true))
                )
            </div>
            <div class="k-form-field">
                @(Html.Kendo().NumericTextBoxFor<decimal>(m => m.Freight)
                    .Min(10)
                    .Max(1000)
                    .Label(l => l.Content("Freight:").Floating(true))
                )
            </div>
            <div class="k-form-field">
                @(Html.Kendo().Upload()
                    .Name("Files")
                )
            </div>
        </div>
        <button type="submit" class="k-button k-button-solid-primary k-button-solid k-button-md k-rounded-md">Submit</button>
    }
    ```
    {% endif %}

1. Handle the `submit` event of the form, prevent its default action, and gather the uploaded files along with the form fields. Then, trigger an AJAX request to the server to post the form data.

    ```Script
    <script type="text/javascript">
        $(document).ready(function () {
            $("#exampleForm").submit(function (e) {
                e.preventDefault(e);
                var formData = new FormData(); // 1. Create a new FormData instance.
                var upload = $("#Files").getKendoUpload(); // 2. Obtain the Upload widget incarnation's object reference.
                var files = upload.getFiles(); // 3. Gather the uploaded files.

                var serializedArray = $("#exampleForm").serializeArray(); // 4. Serialize the form data in to key-value pairs.

                for (var i = 0; i < serializedArray.length; i++) { // 5. Traverse through each of the key-value pairs.
                    var key = serializedArray[i]['name'];
                    var value = serializedArray[i]['value'];
                    formData.append(key, value); // 6. Append current key-value pair to the newly created Form Data from step 1.
                }

                for (var i = 0; i < files.length; i++) { // 7. Iterate through each of the uploaded and append them to the form data.
                    let file = files[i].rawFile;
                    formData.append("files", file);
                }

                $.ajax({ // 8. Make an AJAX request by posting the form data.
                    type: "POST",
                    url: "@Url.Action("SaveForm", "Home")",
                    data: formData,
                    processData: false,
                    contentType: false,
                    dataType: "json",
                    success: function (response) {
                        if (response.success) { // 9. If the request is completed successfully, clear the Form fields.
                            alert("Files Uploaded!");
                        }
                    },
                    error: function() {
                        alert("Request failed");
                    }
                });
            });
        });
    </script>
    ```

1. Access the received form data on the server and process the uploaded files.

    {% if site.core %}
    ```HomeController.cs
        [HttpPost]
        public JsonResult SaveForm(FormViewModel formData)
        {
            if (formData.Files != null)
            {
                foreach (var file in formData.Files)
                {
                    var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
                    var fileName = Path.GetFileName(fileContent.FileName.Trim('"'));
                    var physicalPath = Path.Combine("wwwroot/uploadedFiles", fileName); // Save the files in "wwwroot/uploadedFiles" application directory.
                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
            }
            // Return the respective request response if the files are uploaded successfully.
            return Json(new { success = true });
        }
    ```
    {% else %}
    ```HomeController.cs
        [HttpPost]
        public JsonResult SaveForm(FormViewModel formData)
        {
            if (formData.Files != null)
            {
                foreach (var file in formData.Files)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);
                    file.SaveAs(physicalPath);
                }
            }
            // Return the respective request response if the files are uploaded successfully.
            return Json(new { success = true });
        }
    ```
    {% endif %}

## See Also

* [Server-Side API](/api/upload)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
