---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI TextBox TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_overview_textbox
position: 1
---

# TextBox TagHelper Overview

The Telerik UI TextBox TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI TextBox widget.

The TextBox provides a set of [default API configuration options](/api/textbox) that can be set during its initialization such as value, placeholder, and so on.

* [Demo page for the TextBox](https://demos.telerik.com/aspnet-core/textbox/tag-helper)

## Initializing the TextBox

The following example demonstrates how to define the TextBox by using the TextBox TagHelper.

```
    <kendo-textbox name="textbox"></kendo-textbox>
```

## Basic Configuration

The TextBox TagHelper configuration options are passed as attributes of the tag.

```
    <kendo-textbox name="phone_number"  placeholder="Name..." value="John Doe"></kendo-textbox>
```

## See Also

* [Basic Usage of the TextBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/textbox/tag-helper)
* [Server-Side API](/api/textbox)
