---
title: Form Integration
page_title: Form Integration
description: "Learn how to integrate the Telerik UI for {{ site.framework }} Upload component into a Telerik UI for {{ site.framework }} Form and standard HTML form."
slug: htmlhelpers_upload_form_integration
position: 10
---

# Form Integration

Usually, developers integrate the Upload component into a form, ensuring that uploaded files are submitted and processed together with other form fields like textboxes, dropdowns, and more.

You can define the Upload component as an editor in both a standard HTML form and a [Telerik UI for {{ site.framework }} Form]({% slug htmlhelpers_form_aspnetcore_overview %}).

## Upload in Telerik UI for {{ site.framework }} Form

Starting with version 2025 Q2, the [Form component]({% slug htmlhelpers_form_aspnetcore_overview %}) supports the Upload as a built-in editor. This integration lets you handle file uploads along with other form data.

When used in a form, the Upload editor operates only in [synchronous mode]({% slug htmlhelpers_upload_modes_of_operation_aspnetcore%}#synchronous-mode)&mdash;it behaves like a standard file selection input while still providing the standard Upload features except for the asynchronous-specific configurations.

### Basic Usage

To define the Upload component as an editor in the Form, follow the next steps:

1. Declare a field in the Form's Model that binds to a collection of {% if site.core %}[`IFormFile`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.http.iformfile?view=aspnetcore-8.0&viewFallbackFrom=aspnetcore-9.0){% else %}[`HttpPostedFileBase`](https://learn.microsoft.com/en-us/dotnet/api/system.web.httppostedfilebase?view=netframework-4.8.1){% endif %} and specify the Upload as an editor in the [`Items`](/api/kendo.mvc.ui.fluent/formbuilder#itemssystemaction) configuration of the Form.

    {% if site.core %}
    ```C# Model
        public class FormViewModel
        {
            public string OrderName { get; set; }

            public decimal Freight { get; set; }

            public IEnumerable<IFormFile> Files { get; set; }
        }
    ```
    {% else %}
    ```C# Model
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
        @model FormViewModel

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
                .Label(l => l.Text("Upload files:"))
                .Editor(e => e.Upload());
            })
        )
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
            <form-item field="Files">
                <item-label text="Upload files:" />
                <upload-editor></upload-editor>
            </form-item>
        </form-items>
    </kendo-form>
    ```
    {% endif %}

    When using {{ site.product }} versions before 2025 Q2, you can include the Upload editor by using the `EditorTemplateId()` option that accepts the name of [an external Kendo UI template](https://docs.telerik.com/kendo-ui/framework/templates/get-started-external), and manually handle the Form submission, as demonstrated in the [example with the HTML form](#upload-in-an-html-form).

    ```HtmlHelper
    @model FormViewModel

    @(Html.Kendo().Form<FormViewModel>()
        .Name("exampleForm")
        ... // Additional configuration.
        .Items(items =>
        {
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
        <!-- Additional configuration. -->
        <form-items>
            <form-item field="Files" editor-handler="uploadEditor"></form-item>
        </form-items>
    </kendo-form>

    <script type="text/javascript">
        function uploadEditor(container, options) {
            $('<input type="file" name="Files" id="Files"/>')
                .appendTo(container)
                .kendoUpload({}); // Set additional Upload configuration options, if needed.
        }
    </script>
    ```
    {% endif %}

1. Access the received Form data on the server and process the uploaded files.

    {% if site.core %}
    ```C# HomeController.cs
        [HttpPost]
        public IActionResult SubmitForm(FormViewModel formData)
        {
            if (formData.Files.Any())
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
            return View("Index", formData);
        }
    ```
    {% else %}
    ```C# HomeController.cs
        [HttpPost]
        public ActionResult SubmitForm(FormViewModel formData)
        {
            if (formData.Files.Any())
            {
                foreach (var file in formData.Files)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);
                    file.SaveAs(physicalPath);
                }
            }
            // Return the respective request response if the files are uploaded successfully.
            return View("Index", formData);
        }
    ```
    {% endif %}

> Currently, the Upload editor integrated into {{ site.product }} Form supports only synchronous mode.

### Validation

The Upload component supports the [`[Required]`](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.requiredattribute?view=net-9.0) DataAnnotation attribute, preventing the form submission without selecting at least one file.

```C# Model
public class FormViewModel
{
    [Required(ErrorMessage = "Please upload at least one file.")]
    public List<string> UploadedFileNames { get; set; }
}
```

To use the [built-in file validation of the Upload component]({% slug htmlhelpers_upload_validation_aspnetcore%}), such as allowed file extensions and file size, specify them directly in the Upload definition.

```HtmlHelper
@(Html.Kendo().Form<FormViewModel>()
    .Name("exampleForm")
    ... // Additional configuration.
    .Items(items =>
    {
        items.Add()
        .Field(f => f.UploadedFileNames)
        .Hint("Accepted file formats: .txt, .docx, .pdf")
        .Editor(e => e
            .Upload()
            .Validation(validation => 
            {
                validation.AllowedExtensions(new string[] { ".txt", ".docx", ".pdf" });
                validation.MaxFileSize(31457280);
                validation.MinFileSize(30720);
            })
        );
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
@{
    string[] fileExtensions = { ".txt", ".docx", ".pdf" };
}
<kendo-form name="exampleForm" method="POST">
    <!-- Additional configuration. -->
    <form-items>
        <form-item field="UploadedFileNames" hint="Accepted file formats: .txt, .docx, .pdf">
            <upload-editor>
                <validation allowed-extensions="@fileExtensions" max-file-size="31457280" min-file-size="30720"/>
            </upload-editor>
        </form-item>
    </form-items>
</kendo-form>
```
{% endif %}

By design, the Form does not automatically enforce the allowed extensions and file size limit validations on submission. As a result, invalid files may bypass validation unless explicitly handled.

To ensure that the selected files for upload are valid based on the specified file validations, handle the `Submit` event of the Form and prevent its action if the Upload contains invalid files.

```HtmlHelper
@(Html.Kendo().Form<FormViewModel>()
    .Name("exampleForm")
    .Events(ev => ev.Submit("onFormSubmit"))
    ... // Additional configuration.
    .Items(items =>
    {
        items.Add()
        .Field(f => f.UploadedFileNames)
        .Hint("Accepted file formats: .txt, .docx, .pdf")
        .Editor(e => e
            .Upload()
            .Validation(validation => 
            {
                validation.AllowedExtensions(new string[] { ".txt", ".docx", ".pdf" });
                validation.MaxFileSize(31457280);
                validation.MinFileSize(30720);
            })
        );
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
@{
    string[] fileExtensions = { ".txt", ".docx", ".pdf" };
}
<kendo-form name="exampleForm" method="POST" on-submit="onFormSubmit">
    <!-- Additional configuration. -->
    <form-items>
        <form-item field="UploadedFileNames" hint="Accepted file formats: .txt, .docx, .pdf">
            <upload-editor>
                <validation allowed-extensions="@fileExtensions" max-file-size="31457280" min-file-size="30720"/>
            </upload-editor>
        </form-item>
    </form-items>
</kendo-form>
```
{% endif %}
```JS Scripts
<script>
    function onFormSubmit(e) {
        var uploadComponent = $("#UploadedFileNames").data("kendoUpload"); // Get a reference to the Upload editor.
        if($(uploadComponent.wrapper).find(".k-upload-files li.k-file-invalid").length > 0) {
            // Prevent the form submission if the Upload contains invalid files.
            e.preventDefault();
        }
    }
</script>
```

## Upload in an HTML Form

The following example shows how to integrate the Upload component into a standard HTML form. This setup allows you to collect file uploads along with other form fields, such as textboxes and numeric inputs, and submit them together to the server for processing.

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

    ```JS script
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

                for (var i = 0; i < files.length; i++) { // 7. Iterate through each of the uploaded files and append them to the form data.
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
    ```C# HomeController.cs
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
    ```C# HomeController.cs
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

* [Using Upload in Form for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/upload/form-integration)
* [Server-Side API of the Upload HtmlHelper](/api/upload)
{% if site.core %}
* [Server-Side API of the Upload TagHelper](/api/taghelpers/upload)
{% endif %}
* [Client-Side API of the Upload](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
