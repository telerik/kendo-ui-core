---
title: Templates
page_title: Templates
description: "Learn how to use templates to customize the appearance of the Telerik UI Upload component for {{ site.framework }}."
slug: htmlhelpers_upload_templates_aspnetcore
position: 9
---

# Templates

The Telerik UI Upload for {{ site.framework }} allows you to implement templates to customize the rendering of the files in the file list of the Upload component.

To configure the Telerik UI Upload for {{ site.framework }} to use a template use the [`Template()`](/api/kendo.mvc.ui.fluent/uploadbuilder#templatesystemstring) or  [`Templateid()`](/api/kendo.mvc.ui.fluent/uploadbuilder#templateidsystemstring) configuration option.

When the Upload is configured to use a template, the content of the template replaces some of the HTML elements of the Telerik UI Upload for {{ site.framework }} that are rendered by default. The following example demonstrates how you can use a custom template and display a validation message conditionally:

```HtmlHelper
    <h4>Upload PDF</h4>
    @(Html.Kendo().Upload()
        .Name("files")
        .Async(a => a
            .Save("Validation_Save", "Upload")
            .Remove("Validation_Remove", "Upload")
            .SaveField("files")
        )
        .Validation(validation => validation.AllowedExtensions(new string[] { ".pdf" }))
        .TemplateId("fileTemplate")
    )

    <script id="fileTemplate" type="text/x-kendo-template">
        <span class='k-progress'></span>
        <div class='file-wrapper'>
            <h4 class='file-heading file-name-heading'>Name: #=name#</h4>
            <h4 class='file-heading file-size-heading'>Size: #=size# bytes</h4>
            <span class='validation-message #=files[0].extension == ".pdf" ? "hide" : "show"#'>#=files[0].extension# file type not allowed. </span>
            <button type='button' class='k-upload-action'></button>
        </div>
    </script>

    <style>
        .hide {
            display: none;
        }
        .show {
            display: inline;
        }
        .validation-message {
            color: red;
        }
    </style>
```
{% if site.core %}
```TagHelper
    @{
        string[] extensions = { ".pdf" };
    }

    <h4>Upload PDF</h4>
     <kendo-upload name="files" template-id="fileTemplate">
        <async save-url="@Url.Action("Validation_Save","Upload")"
               remove-url="@Url.Action("Validation_Remove","Upload")"
               save-field="files" />
        <validation allowed-extensions="@extensions" />
     </kendo-upload>

    <script id="fileTemplate" type="text/x-kendo-template">
        <span class='k-progress'></span>
        <div class='file-wrapper'>
            <h4 class='file-heading file-name-heading'>Name: #=name#</h4>
            <h4 class='file-heading file-size-heading'>Size: #=size# bytes</h4>
            <span class='validation-message #=files[0].extension == ".pdf" ? "hide" : "show"#'>#=files[0].extension# file type not allowed. </span>
            <button type='button' class='k-upload-action'></button>
        </div>
    </script>

    <style>
        .hide {
            display: none;
        }
        .show {
            display: inline;
        }
        .validation-message {
            color: red;
        }
    </style>
```
{% endif %}

## See Also
* [Templates for the Upload HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/upload/templates)
* [Server-Side API](/api/upload)
