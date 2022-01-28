---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI CheckBoxGroup TagHelper for {{ site.framework }}."
slug: taghelpers_checkboxgroup_aspnetcore_overview
position: 1
---

# CheckBoxGroup TagHelper Overview

The Telerik UI CheckBoxGroup TagHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI CheckBoxGroup widget.

The CheckBoxGroup allows to style and provide checkbox functionality to list elements, set the position of the labels, attributes and custom css classes.

* [Demo page for the CheckBoxGroup](https://demos.telerik.com/{{ site.platform }}/checkboxgroup/index)

## Initializing the CheckBoxGroup

The following example demonstrates how to define the CheckBoxGroup by using the CheckBoxGroup HtmlHelper.

```tagHelper
     <kendo-checkboxgroup name="checkboxgroup"
            input-name="checkboxItem">
    </kendo-checkboxgroup>
```

## Basic Configuration

The following example demonstrates the basic configuration for the CheckBoxGroup TagHelper.

```tagHelper
    <kendo-checkboxgroup name="checkboxgroup">
        <kendo-checkboxgroup-items>
            <kendo-checkboxgroup-item value="one" label="Female"></kendo-checkboxgroup-item>
            <kendo-checkboxgroup-item value="two" label="Male"></kendo-checkboxgroup-item>
        </kendo-checkboxgroup-items>
    </kendo-checkboxgroup>
```

## Functionality and Features

* [Binding]({% slug taghelpers_checkboxgroup_binding_aspnetcore %})
* [Label]({% slug taghelpers_checkboxgroup_aspnetcore_label %})
* [Layout]({% slug taghelpers_checkboxgroup_aspnetcore_layout %})

## See Also

* [Basic Usage of the CheckBoxGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/checkboxgroup/index)
* [Using the API of the CheckBoxGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/checkboxgroup/api)
* [Server-Side API](/api/checkboxgroup)
