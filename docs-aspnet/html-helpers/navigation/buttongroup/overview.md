---
title: Overview
page_title: Overview
description: "Discover the Telerik UI ButtonGroup component for {{ site.framework }} that provides features like Icons, two selection modes, and numerous built-in configuration options."
previous_url: /helpers/html-helpers/buttongroup, /helpers/navigation/buttongroup/overview
slug: htmlhelpers_buttongroup_aspnetcore
position: 0
---

# ButtonGroup Overview

{% if site.core %}
The Telerik UI ButtonGroup TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ButtonGroup widget.
{% else %}
The Telerik UI ButtonGroup HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ButtonGroup widget.
{% endif %}

The ButtonGroup renders a series of buttons together on a single line.

* [Demo page for the ButtonGroup HtmlHelper](https://demos.telerik.com/{{ site.platform }}/buttongroup/index)
{% if site.core %}
* [Demo page for the ButtonGroup TagHelper](https://demos.telerik.com/aspnet-core/buttongroup/tag-helper)
{% endif %}

## Initializing the ButtonGroup

The following example demonstrates how to initialize the ButtonGroup.

```HtmlHelper
        @(Html.Kendo().ButtonGroup()
                .Name("select-period")
                .Items(t =>
                {
                        t.Add().Text("Month");
                        t.Add().Text("Quarter");
                        t.Add().Text("Year");
                }))
```
{% if site.core %}
```TagHelper
<kendo-buttongroup name="select-period">
        <buttongroup-items>
            <item text="Month"></item>
            <item text="Quarter"></item>
            <item text="Year"></item>
        </buttongroup-items>
    </kendo-buttongroup>
```
{% endif %}


## Functionality and Features

* [Disabled ButtonGroup]({% slug disabled_buttongroup_aspnetcore %})&mdash;The `Enable()` method allows you to render the ButtonGroup as disabled until certain requirements are met.
* [Icon ButtonGroup]({% slug icons_buttongroup_aspnetcore %})&mdash;To visually enhance the content of the buttons, you can use the `Icon()` method and add icons.
* [Index]({% slug index_buttongroup_aspnetcore %})&mdash;Using the `Index()` property allows you to configure the initially selected index of the ButtonGroup component.
* [Selection]({% slug selection_buttongroup_aspnetcore %})&mdash;You can control the number of buttons that the user can select in each ButtonGroup.
* [Events]({% slug events_buttongroup_aspnetcore %})&mdash;You can handle the ButtonGroup events and implement custom functionalities.

## Next Steps

* [Getting Started with the ButtonGroup]({% slug aspnetcore_buttongroup_getting_started %})
* [Basic Usage of the ButtonGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/buttongroup/index)
{% if site.core %}
* [Basic Usage of the ButtonGroup TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/buttongroup/tag-helper)
{% endif %}

## See Also

* [Using the API of the ButtonGroup for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/buttongroup/api)
* [Knowledge Base Section](/knowledge-base)
