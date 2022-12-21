---
title: Separator
page_title: Separator ToolBar Command Type
description: "Get started with the Telerik UI ToolBar for {{ site.framework }} and learn how to configure and use the Separator command type."
slug: htmlhelpers_toolbar_separator_aspnetcore
---

# Separator ToolBar Command Type

The Separator can act as a delimiter between the ToolBar commands.

The following example demonstrates how to define a Separator.

```HtmlHelper
    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("Button 1");
            items.Add().Type(CommandType.Separator);
            items.Add().Type(CommandType.Button).Text("Button 2");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-toolbar name="ToolBar">
        <toolbar-items>
            <item type="CommandType.Button" text="Button1"></item>
            <item type="CommandType.Separator"></item>
            <item type="CommandType.Button" text="Button2"></item>
        </toolbar-items>
    </kendo-toolbar>
```
{% endif %}

## See Also

* [Basic Usage of the ToolBar (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar)
* [Server-Side API Reference of the ToolBar](/api/toolbar)
* [Client-Side API Reference of the ToolBar](/api/javascript/ui/toolbar)