---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Loader TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/loader, /helpers/tag-helpers/loader
slug: taghelpers_loader_aspnetcore
position: 1
---

# Loader TagHelper Overview

The Telerik UI Loader TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Loader widget.

The Loader offers rich functionalities for displaying and tracking the progress of a task. It supports multiple types, horizontal and vertical orientation, and also different directions.

## Initializing the Loader

The following example demonstrates how to define the Loader by using the Loader TagHelper.

        <kendo-loader name="loader"></kendo-loader>

## Basic Configuration

The Loader TagHelper configuration options are passed as attributes of the tag.

```cshtml

        @(Html.Kendo().Loader()
                .Name("loader")
                .Type(LoaderType.InfiniteSpinner)
                .Size(LoaderSize.Large)
                .ThemeColor(LoaderThemeColor.Secondary)
        )
```
```tagHelper

        <kendo-loader name="loader"
            type="LoaderType.InfiniteSpinner" 
            size="LoaderSize.Large" 
            themeColor="LoaderThemeColor.Secondary">
        </kendo-loader>

```

## See Also

* [Basic Usage of the Loader TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/loader/tag-helper)
* [Server-Side API](/api/loader)