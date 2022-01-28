---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Loader HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_loader_aspnetcore_overview
position: 1
---

# Loader Overview

The Telerik UI Loader HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Loader widget.

The Loader component is a visual indicator that expresses an indeterminate wait time. It informs users about the status of ongoing processes, such as loading an application, submitting a form, saving updates or fetching data.

## Initializing the Loader

The following example demonstrates how to define the Loader by using the Loader HtmlHelper.

```Razor
    @(Html.Kendo().Loader()
        .Name("loader")
    )
```

## Basic Configuration

The following example demonstrates the Loader in action.

```Razor
    @(Html.Kendo().Loader()
        .Name("loader")
        .Size(LoaderSize.Large)
        .ThemeColor(LoaderThemeColor.Secondary)
        .Type(LoaderType.InfiniteSpinner)
    )
```

## Functionality and Features

* [Appearance]({% slug htmlhelpers_loader_aspnetcore_appearance %})
* [Integration]({% slug htmlhelpers_loader_aspnetcore_integration %})

## See Also

* [Overview of the Loader HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/loader/index)
* [Server-Side API](/api/loader)