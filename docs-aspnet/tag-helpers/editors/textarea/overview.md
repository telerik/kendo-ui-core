---
title: Overview
page_title: Overview
description: "How to use the TextArea TagHelper component for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_overview_textarea
position: 1
---

# TextArea TagHelper Overview

The Telerik UI TextArea TagHelper for ASP.NET Core is a server-side wrapper for the [Kendo UI TextArea](https://demos.telerik.com/kendo-ui/textarea/index) widget.

The TextArea provides a set of [default API configuration options](/api/textarea) that can be set during its initialization such as value, placeholder, and so on.

* [Demo page for the TextArea](https://demos.telerik.com/aspnet-core/textarea/tag-helper)

## Initializing the TextArea

The following example demonstrates how to define the TextArea by using the TextArea TagHelper.

```
    <kendo-textarea name="description" rows="5">
        <label floating="true" content="Description"/>
    </kendo-textarea>

    <style>
        .k-floating-label-container {
            width: 100%;
        }
    </style>
```

## Basic Configuration

The TextArea TagHelper configuration options are passed as attributes of the tag.

```
    <kendo-textarea name="phone_number"  placeholder="Name..." value="John Doe"></kendo-textarea>
```

## Functionality and Features

* [Labels]({% slug taghelpers_labels_textarea %})

## See Also

* [Basic Usage of the TextArea TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/textarea/tag-helper)
* [Server-Side API](/api/textarea)
