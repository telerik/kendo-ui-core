---
title: Spacer
page_title: Spacer
description: "Learn how to use the spacer command type when working with the Telerik UI ToolBar component for {{ site.framework }}."
previous_url: /helpers/navigation/toolbar/spacer
slug: spacer_toolbar_aspnetcore
position: 2
---

# Spacer

The `Spacer` command type moves the tools that are declared after it to the right side of the ToolBar.

```HtmlHelper
    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items => {
            items.Add().Type(CommandType.Button).Text("Button 1").Id("button1");
            items.Add().Type(CommandType.Spacer);
            items.Add().Type(CommandType.Button).Text("Button 2").Id("button2");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-toolbar name="ToolBar">
        <toolbar-items>
            <item type="CommandType.Button" text="Button 1" id="button1" />
            <item type="CommandType.Spacer" />
            <item type="CommandType.Button" text="Button 2" id="button2" />
        </toolbar-items>
    </kendo-toolbar>
```
{% endif %}

You can use multiple spacers to create an equal amount of space between several tools.

```HtmlHelper
    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items => {
            items.Add().Type(CommandType.Button).Text("Button 1").Id("button1");
            items.Add().Type(CommandType.Spacer);
            items.Add().Type(CommandType.Button).Text("Button 2").Id("button2");
            items.Add().Type(CommandType.Spacer);
            items.Add().Type(CommandType.Button).Text("Button 3").Id("button3");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-toolbar name="ToolBar">
        <toolbar-items>
            <item type="CommandType.Button" text="Button 1" id="button1" />
            <item type="CommandType.Spacer" />
            <item type="CommandType.Button" text="Button 2" id="button2" />
            <item type="CommandType.Spacer" />
            <item type="CommandType.Button" text="Button 3" id="button3" />
        </toolbar-items>
    </kendo-toolbar>
```
{% endif %}

## See Also

* [Server-Side API](/api/toolbar)
