---
title: Overview
page_title: Overview
description: "Get started with the Telerik UI AppBar HtmlHelper for {{ site.framework }}, and learn how to initialize the component."
slug: htmlhelpers_appbar_aspnetcore_overview
position: 1
---

# AppBar Overview

The Telerik UI AppBar HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI AppBar widget.

The AppBar component is mainly used for navigation. At the same time, it is template-driven, which makes it very flexible. To take full advantage of its functionality, you can include various [Content Items]({% slug htmlhelpers_appbar_aspnetcore_items %}) in the AppBar component, for example:
* Titles
* Icons
* Actions (such as redirect buttons or a search panel)

Visit the [AppBar demo page](https://demos.telerik.com/{{ site.platform }}/appbar/index) to see it in action.

## Initializing the AppBar

The following example demonstrates how to define the AppBar by using the AppBar HtmlHelper.

```Razor
    @(Html.Kendo().AppBar()
        .Name("appbar")
    )
```

## Functionality and Features

* [Items]({% slug htmlhelpers_appbar_aspnetcore_items %})
* [Position]({% slug htmlhelpers_appbar_aspnetcore_position %})

## See Also

* [Overview of the AppBar (Demo)](https://demos.telerik.com/{{ site.platform }}/appbar/index)
