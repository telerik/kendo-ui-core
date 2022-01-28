---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI RadioGroup TagHelper for {{ site.framework }}."
slug: taghelpers_radiogroup_aspnetcore_overview
position: 1
---

# RadioGroup TagHelper Overview

The Telerik UI RadioGroup TagHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI RadioGroup widget.

The RadioGroup allows to check and uncheck radio buttons, set the position of the labels, attributes and custom css classes.

* [Demo page for the RadioGroup](https://demos.telerik.com/{{ site.platform }}/radiogroup/index)

## Initializing the RadioGroup

The following example demonstrates how to define the RadioGroup by using the RadioGroup HtmlHelper.

```Razor
     <kendo-radiogroup name="radiogroup"
            radio-name="radiogroup">
    </kendo-radiogroup>
```

## Basic Configuration

The following example demonstrates the basic configuration for the RadioGroup TagHelper.

```Razor
    <kendo-radiogroup name="radiogroup"
                      radio-name="radiogroup">
        <kendo-radiogroup-items>
            <kendo-radiogroup-item value="one" label="First">
            </kendo-radiogroup-item>
            <kendo-radiogroup-item value="two" label="Second">
            </kendo-radiogroup-item>
        </kendo-radiogroup-items>
    </kendo-radiogroup>
```

## Functionality and Features

* [Binding]({% slug taghelpers_radiogroup_binding_aspnetcore %})
* [Label]({% slug taghelpers_radiogroup_aspnetcore_label %})
* [Layout]({% slug taghelpers_radiogroup_aspnetcore_layout %})

## See Also

* [Basic Usage of the RadioGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/radiogroup/index)
* [Using the API of the Rating HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/radiogroup/api)
* [Server-Side API](/api/radiogroup)
