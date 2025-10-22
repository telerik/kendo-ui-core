---
title: Form Filling
page_title: jQuery PDFViewer Documentation - Form Filling
description: "Get familiar with the Form Filling feature provided by the Kendo UI for jQuery PDFViewer."
slug: form_filling_pdfviewer
position: 7
---

# Form Filling

Starting with Kendo UI for jQuery version Q2 2025, the PDFViewer introduces a comprehensive Form Filling feature that allows users to interact with and complete PDF forms directly within the viewer. The supported input types include:

- Text Box&mdash;Enables users to input and edit text within designated form fields.
- Password Box&mdash;Provides secure entry of sensitive information through password-protected fields.
- Check Box&mdash;Lets users toggle between selected and deselected states for predefined options.
- Radio Button&mdash;Implements radio button functionality for selecting exclusive options within a group.
- List Box&mdash;Allows users to select multiple options from a list of predefined items.

The Form Filling feature enhances the usability of PDF forms, making it easier for users to complete and submit forms without requiring external tools.

## Form Styling

Currently, the Kendo themes do not contain the necessary styles for the form elements rendered in the layers. This requires you to include the styles below:

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

In the example below, you can see how to enable the Form Filling feature:

```dojo
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.mjs" type="module"></script> <!-- Include pdf.js before the kendo scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.worker.mjs" type="module"></script> <!-- Include pdf.worker.js before the kendo scripts -->
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" type="module"></script>
    <script src="https://kendo.cdn.telerik.com/2025.2.520/js/kendo.all.min.js" type="module"></script>

    <div id="pdfviewer"></div>
    <script type="module">
        $("#pdfviewer").kendoPDFViewer({
            pdfjsProcessing: {
                renderForms:true,
                file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/form-filling.pdf"
            }
        });
    </script>
```

## See Also

* [Form Filling in the PDFViewer (Demo)](https://demos.telerik.com/kendo-ui/pdfviewer/form-filling)
* [JavaScript API Reference of the PDFViewer](/api/javascript/ui/pdfviewer)