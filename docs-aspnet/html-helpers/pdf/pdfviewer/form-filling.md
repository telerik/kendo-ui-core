---
title: Form Filling
page_title: Telerik UI PDFViewer component for {{ site.framework }}  Documentation - Form Filling
description: "Get familiar with the Form Filling feature provided by the Telerik UI PDFViewer component for {{ site.framework }}."
slug: form_filling_pdfviewer_core
position: 5
---

# Form Filling

Starting with Telerik UI {{ site.framework }} version Q2 2025, the PDFViewer introduces a comprehensive Form Filling feature that allows users to interact with and complete PDF forms directly within the viewer.

When uploading PDF files that contain forms, users can utilize the form editors by entering data and making selections without requiring external PDF editing tools. The Form Filling feature simplifies the process of editing and managing PDF forms, enhancing user experience and productivity.

> The Form Filling feature is available only with [PDF.js processing]({% slug htmlhelpers_pdfviewer_pdfjs_processing_aspnetcore%}).

To activate the Form Filling feature, enable the `RenderForms()` option in the `PdfjsProcessing()` configuration:

```HtmlHelper
    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")
            .PdfjsProcessing(pdf =>{
                pdf.RenderForms(true);
                pdf.File("~/shared/web/pdfViewer/sample.pdf");
            })
        .Height(800)
    )
```
{% if site.core %}
```TagHelper
    <kendo-pdfviewer name="pdfviewer" height="800">
        <pdfjs-processing render-forms="true" file="@Url.Content("~/shared/web/pdfViewer/sample.pdf")" />
    </kendo-pdfviewer>
```
{% endif %}

## Form Inputs

The supported form input types include:

- Text Box&mdash;Enables users to input and edit text within designated form fields.
- Password Box&mdash;Provides secure entry of sensitive information through password-protected fields.
- Check Box&mdash;Lets users toggle between selected and deselected states for predefined options.
- Radio Button&mdash;Implements radio button functionality for selecting exclusive options within a group.
- List Box&mdash;Allows users to select multiple options from a list of predefined items.

## Form Styling

Currently, the [Telerik and Kendo UI themes]({% slug sassbasedthemes_overview %}) do not contain the necessary styles for the form elements rendered in the layers. For this reason, to enhance the appearance of the form elements, include the following CSS styles on the page where the PDFViewer is defined.

```css
<style>
    .k-annotation-layer .k-text-widget-annotation .k-annotation-content {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
    
    .k-annotation-layer {
        --annotation-unfocused-field-background: url(data:image/svg+xml;charset=UTF-8,<svg width='1px' height='1px' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill:rgba(0, 54, 255, 0.13);'/></svg>);
        --input-focus-border-color: black;
        --input-focus-outline: 1px solid Canvas;
        --input-unfocused-border-color: transparent;
        --input-disabled-border-color: transparent;
        --input-hover-border-color: black;
        --link-outline: none;
    }
    
    .k-annotation-layer .k-text-widget-annotation > input, .k-annotation-layer .k-text-widget-annotation > textarea, .k-annotation-layer .choiceWidgetAnnotation > select, .k-annotation-layer .k-button-widget-annotation:is(.k-checkbox-widget-annotation, .k-radio-button-widget-annotation) input {
        height: 100%;
        width: 100%;
    }
    
    .k-annotation-content {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
    
    .k-annotation-layer {
        :is(.k-link-annotation, .k-button-widget-annotation.k-push-button-widget-annotation) > a {
            position: absolute;
            font-size: 1em;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    
    .k-annotation-layer {
        :is(.k-link-annotation, .k-button-widget-annotation.k-push-button-widget-annotation):not(.hasBorder) > a:hover {
            opacity: 0.2;
            background-color: rgb(255 255 0);
            box-shadow: 0 2px 10px rgb(255 255 0);
        }
    }
    
    </style>
```

## See Also

* [Using Form Filling in the PDFViewer for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pdfviewer/form-filling)
* [Server-Side API Reference of the PDFViewer for {{ site.framework }}](/api/pdfviewer)
{% if site.core %}
* [Server-Side TagHelper API Reference of the PDFViewer for {{ site.framework }}](/api/taghelpers/pdfviewer)
{% endif %}
* [Client-Side API Reference of the PDFViewer](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer)

