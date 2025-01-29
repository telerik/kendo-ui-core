---
title: Using PDFViewer with PDF.js Version 4.x.x or Later
description: Learn how to configure the Telerik UI for {{ site.framework }} PDFViewer to use PDF.js version 4.x.x for PDF processing.
type: how-to
page_title: Configuring the PDFViewer component to use PDF.js version 4.x.x
slug: pdfviewer-pdfjs-script-workarounds
tags: pdfviewer, pdf.js, version, 4.x.x, processing, script
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2024.4.1112 or later</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>PDFViewer for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description
The {% if site.core %}<a href="https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/telerik-ui-for-asp-net-core-2024-4-1112-(2024-q4)" target="_blank">2024 Q4 November release (version 2024.4.1112)</a>{% else%}<a href="https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/telerik-ui-for-asp-net-mvc-2024-4-1112-(2024-q4)" target="_blank">2024 Q4 November release (version 2024.4.1112)</a>{% endif %} introduced a new common engine for the PDFViewer component and support for the latest <a href="https://mozilla.github.io/pdf.js/" target="_blank">PDF.js library version 4. x.x</a>. Since PDF.js 4 (versions 4.x.x) uses <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" target="_blank">ECMAScript modules</a>, the required Kendo UI scripts must be included as modules as well.

The {{ site.product }} versions before 2024.4.1112 are not compatible with PDF.js version 4.x. You must use either PDF.js version 2.x or 3.x. For reference, the example below shows the PDFViewer configured for PDF.js processing when using versions before 2024.4.1112.

```HtmlHelper
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")
        .PdfjsProcessing(pdf => pdf
            .File("")
        )
        .Height(1200)
    )
```
{% if site.core %}
```TagHelper
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    <kendo-pdfviewer name="pdfviewer" height="1200">
        <pdfjs-processing file="@Url.Content("")" />
    </kendo-pdfviewer>
```
{% endif %}

When upgrading to version 2024.4.1112 or later, including the [required Kendo UI scripts]({% slug copyclientresources_aspnetmvc6_aspnetmvc%}) by adding `type="module"` in the script tags will throw the following client-side error:
![Kendo script, defined as a module, is not defined when the PDFViewer is initialized.](images/pdfviewer-kendo-module-error.png)

However, adding the scripts without `type="module"` is also not an option because the PDF.js library requires module scripts:
![PDF.js scripts are not added](images/pdfviewer-pdfjs-error.png)

## Solution

Apply any of the following approaches when using {{ site.product }} PDFViewer (version 2024.4.1112 or later):

- [Using RenderAsModule option for module-based script initialization](#using-renderasmodule-for-module-based-script-initialization)
- [Loading Kendo UI scripts twice](#loading-kendo-ui-scripts-twice)
- [Loading only the required PDFViewer scripts](#loading-only-the-required-pdfviewer-scripts)
- [Compiling the PDF.js scripts to UMD modules](#compiling-pdfjs-scripts-to-umd-modules)

### Using RenderAsModule for Module-Based Script Initialization

The recommended solution is to include the required Kendo UI scripts as modules and enable the `RenderAsModule` option, which will add `type="module"` to the initialization scripts of all Telerik UI components in the application.

Also, it is important to ensure that `type="module"` is added to all script tags that contain custom logic related to the Telerik UI components.

{% if site.core %}
```Program.cs
    builder.Services.AddKendo(x => x.RenderAsModule = true);
```
{% else %}
```Global.asax
    KendoMvc.Setup(options =>
    {
        options.RenderAsModule = true;
    });
```
{% endif %}
```_Layout
    <link href="https://kendo.cdn.telerik.com/themes/10.0.1/default/default-ocean-blue.css" rel="stylesheet" type="text/css" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.mjs" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.mjs" type="module"></script>
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.all.min.js" type="module"></script>
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.aspnetmvc.min.js" type="module"></script>
```
```HtmlHelper
    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")
        .PdfjsProcessing(pdf => pdf.File(""))
        .Height(800)
    )

    <script type="module">
        $(document).ready(() => {
            var pdfviewer = $('#pdfviewer').data('kendoPdfViewer');
            console.log(pdfviewer);
        })  
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-pdfviewer name="pdfviewer" height="800">
        <pdfjs-processing file="@Url.Content("")" />
    </kendo-pdfviewer>

    <script type="module">
        $(document).ready(() => {
            var pdfviewer = $('#pdfviewer').data('kendoPdfViewer');
            console.log(pdfviewer);
        })
    </script>
```
{% endif %}

### Loading Kendo UI Scripts Twice

Another workaround is to include the Kendo UI scripts twice—with and without `type="module"`:

```HtmlHelper
    <link href="https://kendo.cdn.telerik.com/themes/10.0.1/default/default-ocean-blue.css" rel="stylesheet" type="text/css" />

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

    <!-- Add the Kendo UI scripts in standard fashion. -->
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.all.min.js"></script>
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.aspnetmvc.min.js"></script>

    <!-- Add the "pdf.mjs" and "pdf.worker.mjs" module scripts. -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.mjs" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.mjs" type="module"></script>

    <!-- Add the Kendo UI script as a module afterwards -->
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.all.min.js" type="module"></script>

    @(Html.Kendo().PDFViewer().Name("pdfviewer")
        .PdfjsProcessing(pdf => pdf.File(@Url.Content("../sample.pdf")))
            .Height(1200)
        )
    @(Html.Kendo().DateTimePicker().Name("picker"))
```
{% if site.core %}
```TagHelper
    <link href="https://kendo.cdn.telerik.com/themes/10.0.1/default/default-ocean-blue.css" rel="stylesheet" type="text/css" />

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

    <!-- Add the Kendo UI scripts in standard fashion. -->
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.all.min.js"></script>
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.aspnetmvc.min.js"></script>

    <!-- Add the "pdf.mjs" and "pdf.worker.mjs" module scripts. -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.mjs" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.mjs" type="module"></script>

    <!-- Add the Kendo UI script as a module afterwards -->
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.all.min.js" type="module"></script>

    <kendo-pdfviewer name="pdfviewer" height="1200">
        <pdfjs-processing file-url="@Url.Content("../sample.pdf")" />
    </kendo-pdfviewer>

    <kendo-datetimepicker name="picker"/>
```
{% endif %}

### Loading Only the Required PDFViewer Scripts

Instead of loading the whole "kendo.all.min.js" script file twice, you can include only the specific PDFViewer scripts. Also, you can load the scripts and the PDFViewer declaration through a Partial View:

```_Layout
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/10.0.1/default/default-ocean-blue.css">
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2024.4.1112/js/kendo.all.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2024.4.1112/js/kendo.aspnetmvc.min.js"></script>

    <partial name="PDFViewer" />
```
```HtmlHelper
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.mjs" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.mjs" type="module"></script>
    <script src="https://kendo.cdn.telerik.com/2024.4.1112/mjs/kendo.pdfviewer-common.cmn.chunk.js" type="module"></script>
    <script src="https://kendo.cdn.telerik.com/2024.4.1112/mjs/kendo.pdfviewer.js" type="module"></script>

    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")
        .PdfjsProcessing(pdf => pdf.File(""))
        .Height(1200)
    )
```
{% if site.core %}
```TagHelper
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.mjs" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.mjs" type="module"></script>
    <script src="https://kendo.cdn.telerik.com/2024.4.1112/mjs/kendo.pdfviewer-common.cmn.chunk.js" type="module"></script>
    <script src="https://kendo.cdn.telerik.com/2024.4.1112/mjs/kendo.pdfviewer.js" type="module"></script>

    <kendo-pdfviewer name="pdfviewer1" height="1200">
        <pdfjs-processing />
    </kendo-pdfviewer>
```
{% endif %}

### Compiling PDF.js Scripts to UMD Modules

Theoretically, you can download the PDF.js scripts and use a JS bundler tool like [webpack](https://webpack.js.org/) to compile them to UMD modules.

## More {{ site.framework }} PDFViewer Resources

* [{{ site.framework }} PDFViewer Documentation]({%slug htmlhelpers_pdfviewer_aspnetcore%})

* [{{ site.framework }} PDFViewer Demos](https://demos.telerik.com/{{ site.platform }}/pdfviewer/index)

{% if site.core %}
* [{{ site.framework }} PDFViewer Product Page](https://www.telerik.com/aspnet-core-ui/pdf-viewer)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} PDFViewer Product Page](https://www.telerik.com/aspnet-mvc/pdf-viewer)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the PDFViewer for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer)
* [Server-Side API Reference of the PDFViewer for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/pdfviewer)
{% if site.core %}
* [Server-Side TagHelper API Reference of the PDFViewer for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/pdfviewer)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)