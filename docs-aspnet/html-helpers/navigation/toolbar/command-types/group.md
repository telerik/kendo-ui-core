---
title: Group
page_title: Group ToolBar Command Type
description: "Get started with the Telerik UI ToolBar for {{ site.framework }} and learn how to configure and use the Group command type."
slug: htmlhelpers_toolbar_group_aspnetcore
---

# Group ToolBar Command Type 

The ToolBar enables the user to select only one button from a group of buttons at a time.

This approach is useful when you create a group of mutually exclusive Toggle Buttons.

The following example demonstrates how to define a group of mutually exclusive Toggle Buttons.

```HtmlHelper
    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("foo").Togglable(true).Group("controlGroup");
            items.Add().Type(CommandType.Button).Text("bar").Togglable(true).Group("controlGroup");
            items.Add().Type(CommandType.Button).Text("baz").Togglable(true).Group("controlGroup");

        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-toolbar name="ToolBar">
        <toolbar-items>
            <item type="CommandType.Button" text="foo" togglable="true" group="controlGroup"></item>
            <item type="CommandType.Button" text="bar" togglable="true" group="controlGroup"></item>
            <item type="CommandType.Button" text="baz" togglable="true" group="controlGroup"></item>
        </toolbar-items>
    </kendo-toolbar>
```
{% endif %}

## See Also

* [Basic Usage of the ToolBar (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar)
* [Server-Side API Reference of the ToolBar](/api/toolbar)
* [Client-Side API Reference of the ToolBar](/api/javascript/ui/toolbar)
