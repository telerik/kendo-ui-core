---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ButtonGroup HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/buttongroup, /helpers/navigation/buttongroup/overview
slug: htmlhelpers_buttongroup_aspnetcore
position: 1
---

# ButtonGroup HtmlHelper Overview

The Telerik UI ButtonGroup HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ButtonGroup widget.

The ButtonGroup groups a series of buttons together on a single line.

* [Demo page for the ButtonGroup](https://demos.telerik.com/{{ site.platform }}/buttongroup/index)

## Initializing the ButtonGroup

The following example demonstrates how to initialize the ButtonGroup.

```
        @(Html.Kendo().ButtonGroup()
            .Name("select-period")
            .Items(t =>
                {
                        t.Add().Text("Month");
                        t.Add().Text("Quarter");
                        t.Add().Text("Year");
                }))
```

## Functionality and Features

* [Disabled ButtonGroup]({% slug disabled_buttongroup_aspnetcore %})
* [Icon ButtonGroup]({% slug icons_buttongroup_aspnetcore %})
* [Index]({% slug index_buttongroup_aspnetcore %})
* [Selection]({% slug selection_buttongroup_aspnetcore %})

## Events

For a complete example on basic ButtonGroup events, refer to the [demo on using the events of the ButtonGroup](https://demos.telerik.com/{{ site.platform }}/buttongroup/events).

## See Also

* [Basic Usage of the ButtonGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/buttongroup)
* [Using the API of the ButtonGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/buttongroup/api)
* [Server-Side API](/api/buttongroup)
