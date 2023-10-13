---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ImageEditor component for {{ site.framework }}."
slug: htmlhelpers_imageeditor_aspnetcore
position: 0
---

# {{ site.framework }} ImageEditor Overview

{% if site.core %}
The Telerik UI ImageEditor TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ImageEditor widget.
{% else %}
The Telerik UI ImageEditor HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ImageEditor widget.
{% endif %}

The ImageEditor utilizes a canvas element and enables image editing. It allows you to open, edit and save edited `.png`, `.jpg`, or `.jpeg` images.

* [Demo page for the ImageEditor HtmlHelper](https://demos.telerik.com/{{ site.platform }}/imageeditor/index)
{% if site.core %}
* [Demo page for the ImageEditor TagHelper](https://demos.telerik.com/aspnet-core/imageeditor/index)
{% endif %}

## Initializing the ImageEditor

The following example demonstrates how to define the ImageEditor.

```HtmlHelper
@(Html.Kendo().ImageEditor()
    .Name("imageEditor")
    .Width(500)
    .Height(500)
    .SaveAs(saveas => saveas.FileName("image.png"))
)
```
{% if site.core %}
```TagHelper
    <kendo-imageeditor name="imageEditor" width="500" height="500">
        <save-as file-name="image.png" />
    </kendo-imageeditor>
```
{% endif %}

## Functionality and Features

* [Tools]({% slug htmlhelpers_imageeditor_tools_aspnetcore %})—The ImageEditor offers a collection of tools that allow the user to interact with the UI component.
* [Events]({% slug events_imageeditor_aspnetcore %})—To control the behavior of the component upon user interaction, you can use the events that the component emits.
* [Accessibility]({% slug accessibility_aspnetcore_imageeditor %})—The ImageEditor is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

## Next Steps

* [Getting Started with the ImageEditor]({% slug aspnetcore_imageeditor_getting_started %})
* [Basic Usage of the ImageEditor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/imageeditor/index)
{% if site.core %}
* [Basic Usage of the ImageEditor TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/imageeditor/tag-helper)
{% endif %}

## See Also
* [Using the API of the ImageEditor for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/imageeditor/api)
* [Knowledge Base Section](/knowledge-base)
