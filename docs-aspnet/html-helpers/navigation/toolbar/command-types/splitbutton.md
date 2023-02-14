---
title: SplitButton
page_title: SplitButton ToolBar Command Type
description: "Get started with the Telerik UI ToolBar for {{ site.framework }} and learn how to configure and use the SplitButton command type."
slug: htmlhelpers_toolbar_splitbutton_aspnetcore
---

# SplitButton ToolBar Command Type

The SplitButton is a composite control, which has a primary (main) button, and alternative options that are displayed in a drop-down list, which is bound to a secondary button.

In the command overflow popup, the SplitButton is rendered as a flat list of commands. The first one is the primary (main) button, followed by the drop-down items in the order they are defined.

The following example demonstrates how to define a SplitButton in the ToolBar component.

```HtmlHelper
    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items =>
        {
            items.Add().Type(CommandType.SplitButton)
                .Text("SplitButton")
                .Icon("folder-add")
                .MenuButtons(menuButtons =>
                {
                    menuButtons.Add().Id("option1").Text("Option 1");
                    menuButtons.Add().Id("option2").Text("Option 2");
                    menuButtons.Add().Id("option3").Text("Option 3");
                    menuButtons.Add().Id("option4").Text("Option 4");
                    menuButtons.Add().Id("option5").Text("Option 5");
                });
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-toolbar name="ToolBar">
        <toolbar-items>
            <item type="CommandType.SplitButton" text="SplitButton" icon="folder-add">
                <menu-buttons>
                    <toolbar-button id="option1" text="Option 1"></toolbar-button>
                    <toolbar-button id="option2" text="Option 2"></toolbar-button>
                    <toolbar-button id="option3" text="Option 3"></toolbar-button>
                    <toolbar-button id="option4" text="Option 4"></toolbar-button>
                    <toolbar-button id="option5" text="Option 5"></toolbar-button>
                </menu-buttons>
            </item>
        </toolbar-items>
    </kendo-toolbar>
```
{% endif %}

## See Also

* [Basic Usage of the ToolBar (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar)
* [Server-Side API Reference of the ToolBar](/api/toolbar)
* [Client-Side API Reference of the ToolBar](/api/javascript/ui/toolbar)