---
title: Overview
page_title: ChipList Overview
description: "Try now the Telerik UI for {{ site.framework }} ChipList component representing a container element for two or more Chip components, and delivering various styling options and features such as enabling the single and multiple user selection, and more."
slug: htmlhelpers_chiplist_aspnetcore_overview
position: 1
---

# ChipList Overview

{% if site.core %}
The Telerik UI ChipList TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ChipList component.
{% else %}
The Telerik UI ChipList HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ChipList component.
{% endif %}

The ChipList acts as a container for two or more individual Chip components and allows you to maintain a set of selected chips. They represent a complex piece of information in a compact form—for example, an entity that can be a person, a place, or a thing. Each chip from the list can be selected or removed and supports various styling options. The ChipList component is commonly used for single or multiple selections such as additions to an ordered meal.

* [Demo page for the ChipList HtmlHelper](https://demos.telerik.com/{{ site.platform }}/chiplist/index)
{% if site.core %}
* [Demo page for the ChipList TagHelper](https://demos.telerik.com/aspnet-core/chiplist/tag-helper)
{% endif %}

![Telerik UI Chip for {{ site.framework }} with Basic Configuration](./images/basic-chiplist.png)

## Initializing the Chip

The following example demonstrates how to initialize the ChipList.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().ChipList()
        .Name("chiplist")
        .Items(item=>{
            item.Add().Label("One");
            item.Add().Label("Two");
            item.Add().Label("Three");
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chiplist name="chiplist">
        <items>
            <item label="One"></item>
            <item label="Two"></item>
            <item label="Three"></item>
        </items>
    </kendo-chiplist>
```
{% endif %}


## Functionality and Features

* [Customization]({% slug htmlhelpers_chiplist_aspnetcore_customization %})&mdash;You can specify icons for the item content of the chips displayed in the ChipList.
* [Appearance]({% slug htmlhelpers_chiplist_aspnetcore_appearance %})—The ChipList delivers a number of ready-to-use, predefined sets of styling options.

## Next Steps
 
* [Getting Started with the Telerik UI Chip for {{ site.framework }}]({% slug htmlhelpers_chip_aspnetcore_customization %})
* [Basic Usage of the ChipList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chiplist/index)
* [JavaScript API Reference of the ChipList HtmlHelper for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/chiplist#methods)
* [Server-Side API of the ChipList HtmlHelper for {{ site.framework }}](/api/chiplist)

## See Also

* [Applying the ChipList API (Demo)](https://demos.telerik.com/{{ site.platform }}/chiplist/api)
* [Basic Events in the ChipList (Demo)](https://demos.telerik.com/{{ site.platform }}/chiplist/events)

