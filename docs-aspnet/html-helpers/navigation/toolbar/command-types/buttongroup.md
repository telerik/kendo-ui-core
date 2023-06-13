---
title: ButtonGroup
page_title: ButtonGroup ToolBar Command Type
description: "Get started with the Telerik UI ToolBar for {{ site.framework }} and learn how to configure and use the ButtonGroup command type."
slug: htmlhelpers_toolbar_buttongroup_aspnetcore
---

# ButtonGroup ToolBar Command Type

The ButtonGroup consists of multiple button elements that are visually separated in a group.

> In the command overflow popup, the ButtonGroup is rendered as a list of commands.

The following example demonstrates how to define a ButtonGroup in the ToolBar component:

```HtmlHelper
    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items =>
        {
            items.Add().Type(CommandType.ButtonGroup).Id("btnGroup").Buttons(buttons =>
            {
                buttons.Add().Text("Prev").Icon("caret-alt-left");
                buttons.Add().Text("Next").Icon("caret-alt-right");
            });

        })
    )
```
{% if site.core %}
```TagHelper
  <kendo-toolbar name="ToolBar">
        <toolbar-items>
            <item type="CommandType.ButtonGroup" id="btnGroup">
                <buttons>
                    <toolbar-button text="Prev" icon="caret-alt-left"></toolbar-button>
                    <toolbar-button text="Next" icon="caret-alt-right"></toolbar-button>
                </buttons>
            </item>
        </toolbar-items>
 </kendo-toolbar>
```
{% endif %}

## See Also

* [Basic Usage of the ToolBar (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar)
* [Server-Side API Reference of the ToolBar](/api/toolbar)
* [Client-Side API Reference of the ToolBar](/api/javascript/ui/toolbar)