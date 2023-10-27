---
title: PDF Export
page_title: PDF Export
description: "Export the Telerik UI Scheduler for {{ site.framework }} to PDF."
slug: pdfexport_schedulerhelper_aspnetcore
position: 3
---

# PDF Export

The Telerik {{ site.product_short }} Scheduler component provides a built-in PDF export functionality.

For a runnable example, refer to the [demo on exporting the Scheduler to PDF](https://demos.telerik.com/{{ site.platform }}/scheduler/pdf-export).

## Getting Started

To enable PDF export:

1. Include the corresponding toolbar command and set the export settings.
    * [Toolbar configuration](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/schedulerbuilder#toolbarsystemaction)
    * [PDF export configuration](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/schedulerbuilder#pdfsystemaction)
1. Include the `Pako Deflate` library in the page to enable compression.

The following example demonstrates how to enable the PDF export functionality of the Scheduler.

```HtmlHelper
    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>

    @(Html.Kendo().Scheduler<SchedulerModel>()
        .Name("scheduler")
        .Toolbar(t => t.Pdf())
        .Pdf(pdf => pdf
            .FileName("Kendo UI Scheduler Export.pdf")
        )
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.Id);
                m.Field(f => f.Title).DefaultValue("No title");
            })
            .Read(read => read.Action("PDF_Export_Read", "Scheduler"))
        )
    )
```
{% if site.core %}
```TagHelper
    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>
    
    <kendo-scheduler name="scheduler">
        <pdf file-name="Kendo UI Scheduler Export.pdf"/>
        <toolbar>
            <scheduler-toolbar-button name="pdf"></scheduler-toolbar-button>
        </toolbar>
        <scheduler-datasource type="@DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("PDF_Export_Read", "Scheduler")" />
            </transport>
            <scheduler-model id="Id">
               <fields>
                   <field name="Id" type="number"></field>
                   <field name="title" from="Title" type="string" default-value="No title"></field>
               </fields>
            </scheduler-model>
        </scheduler-datasource>
    </kendo-scheduler>
```
{% endif %}

## Changing the Export Settings

By default, the paper size of the exported document is determined by the size of the Scheduler on the viewport. You have the ability to further alter the paper size and dimensions of the document as per your requirements. 

The following example demonstrates how to additionally configure the Scheduler's `PaperSize()`, `Margin()`, and `Landscape()` PDF export settings.

```HtmlHelper
    @(Html.Kendo().Scheduler<SchedulerModel>()
        .Name("scheduler")
        .Toolbar(t => t.Pdf())
        .Pdf(pdf => pdf
            .Landscape(true)
            .Margin(20, 50, 20, 50)
            .PaperSize("auto")
            .FileName("Kendo UI Scheduler Export.pdf")
        )
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.Id);
                m.Field(f => f.Title).DefaultValue("No title");
            })
            .Read(read => read.Action("PDF_Export_Read", "Scheduler"))
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-scheduler name="scheduler">
        <pdf file-name="Kendo UI Scheduler Export.pdf" landscape="true" paper-size="auto">
            <scheduler-pdf-margin top="20" left="50" right="20" bottom="50" />
        </pdf>
        <toolbar>
            <scheduler-toolbar-button name="pdf"></scheduler-toolbar-button>
        </toolbar>
        <scheduler-datasource type="@DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("PDF_Export_Read", "Scheduler")" />
            </transport>
            <scheduler-model id="Id">
               <fields>
                   <field name="Id" type="number"></field>
                   <field name="title" from="Title" type="string" default-value="No title"></field>
               </fields>
            </scheduler-model>
        </scheduler-datasource>
    </kendo-scheduler>
```
{% endif %}

## Saving Files on the Server

To send the generated file to a remote endpoint, use the `ProxyURL()` and `ForceProxy()` methods.

```HtmlHelper
     @(Html.Kendo().Scheduler<SchedulerModel>()
        .Name("scheduler")
        .Toolbar(t => t.Pdf())
        .Pdf(pdf => pdf
            .FileName("Kendo UI Scheduler Export.pdf")
            .ForceProxy(true)
            .ProxyURL(Url.Action("Pdf_Export_Save", "Scheduler"))
        )
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.Id);
                m.Field(f => f.Title).DefaultValue("No title");
            })
            .Read(read => read.Action("PDF_Export_Read", "Scheduler"))
        )
    )
```

{% if site.core %}
```TagHelper
    <kendo-scheduler name="scheduler">
        <pdf file-name="Kendo UI Scheduler Export.pdf" 
             force-proxy="true" 
             proxy-url="@Url.Action("Pdf_Export_Save", "Scheduler")">
        </pdf>
        <toolbar>
            <scheduler-toolbar-button name="pdf"></scheduler-toolbar-button>
        </toolbar>
        <scheduler-datasource type="@DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("PDF_Export_Read", "Scheduler")" />
            </transport>
            <scheduler-model id="Id">
               <fields>
                   <field name="Id" type="number"></field>
                   <field name="title" from="Title" type="string" default-value="No title"></field>
               </fields>
            </scheduler-model>
        </scheduler-datasource>
    </kendo-scheduler>
```
{% endif %}

```ServerProxy
    [HttpPost]
    public ActionResult Pdf_Export_Save(string contentType, string base64, string fileName)
    {
        var fileContents = Convert.FromBase64String(base64);
        return File(fileContents, contentType, fileName);
    }
```

## Embedding Unicode Characters

The default fonts in PDF files do not provide Unicode support. To support international characters, you have to embed an external font. For more information on the supported [Deja Vu font family](https://dejavu-fonts.github.io) as part of the Kendo UI distributions and other fonts, refer to the Kendo UI for jQuery article on [custom fonts and PDF](https://docs.telerik.com/kendo-ui/framework/drawing/pdf-output/embedded-fonts).

The following example demonstrates how to handle custom fonts.

```HtmlHelper
  @(Html.Kendo().Scheduler<SchedulerModel>()
      .Name("scheduler")
      .Toolbar(t => t.Pdf())
      .Pdf(pdf => pdf
          .FileName("Kendo UI Scheduler Export.pdf")
      )
      .DataSource(d => d
          .Model(m =>
          {
              m.Id(f => f.Id);
              m.Field(f => f.Title).DefaultValue("No title");
          })
          .Read(read => read.Action("PDF_Export_Read", "Scheduler"))
      )
  )
```
{% if site.core %}
```TagHelper
    <kendo-scheduler name="scheduler">
        <pdf file-name="Kendo UI Scheduler Export.pdf"/>
        <toolbar>
            <scheduler-toolbar-button name="pdf"></scheduler-toolbar-button>
        </toolbar>
        <scheduler-datasource type="@DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("PDF_Export_Read", "Scheduler")" />
            </transport>
            <scheduler-model id="Id">
               <fields>
                   <field name="Id" type="number"></field>
                   <field name="title" from="Title" type="string" default-value="No title"></field>
               </fields>
            </scheduler-model>
        </scheduler-datasource>
    </kendo-scheduler>
```
{% endif %}
```Style
   <style>
        /*
            Use the DejaVu Sans font for display and embedding in the PDF file.
            The standard PDF fonts have no support for Unicode characters.
        */
        .k-scheduler {
            font-family: "DejaVu Sans", "Arial", sans-serif;
        }

        /* Hide toolbar, navigation and footer during export */
        .k-pdf-export .k-scheduler-toolbar,
        .k-pdf-export .k-scheduler-navigation .k-nav-today,
        .k-pdf-export .k-scheduler-navigation .k-nav-prev,
        .k-pdf-export .k-scheduler-navigation .k-nav-next,
        .k-pdf-export .k-scheduler-footer {
            display: none;
        }
   </style>
```

## Further Reading

* [PDF output by the Kendo UI Drawing library](https://docs.telerik.com/kendo-ui/framework/drawing/pdf-output/overview)
* [Drawing DOM elements with the Kendo UI Drawing library](https://docs.telerik.com/kendo-ui/framework/drawing/dom-elements/overview)
* [Saving files with Kendo UI](https://docs.telerik.com/kendo-ui/framework/saving-files)

## See Also

* [Server-Side API](/api/scheduler)
* [PDF Export of the Telerik UI Scheduler for {{ site.framework }} Demo](https://demos.telerik.com/{{ site.platform }}/scheduler/pdf-export)