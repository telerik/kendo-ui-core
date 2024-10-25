---
title: ToggleButton
page_title: ToggleButton ToolBar Command Type
description: "Get started with the Telerik UI ToolBar for {{ site.framework }} and learn how to configure and use the ToggleButton command type."
slug: htmlhelpers_toolbar_togglebutton_aspnetcore
---

# ToggleButton ToolBar Command Type

The ToggleButton allows users to switch between two states.

To define a ToggleButton, set the `Togglable()` method of the button to `true`. The ToggleButton supports the same configuration options as the [standard Button]({% slug htmlhelpers_toolbar_button_aspnetcore %}).

> Clicking a ToggleButton triggers the `Toggle` event but does not trigger the `Click` event.

The following example demonstrates how to define a ToggleButton in the ToolBar component.

```HtmlHelper
    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items =>
        {
            items.Add().Type(CommandType.Button)
                 .Togglable(true)
                 .Text("My Toggle Button")
                 .SpriteCssClass("myIcon")
                 .ShowIcon(ShowIn.Toolbar)
                 .Selected(true);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-toolbar name="ToolBar">
        <toolbar-items>
            <item type="CommandType.Button"
                  togglable="true"
                  text="My Toggle Button"
                  sprite-css-class="myIcon" 
                  show-icon="ShowIn.Toolbar" 
                  selected="true">
            </item>
        </toolbar-items>
    </kendo-toolbar>
```
{% endif %}

## See Also

* [Basic Usage of the ToolBar (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar)
* [Server-Side API Reference of the ToolBar](/api/toolbar)
* [Client-Side API Reference of the ToolBar](/api/javascript/ui/toolbar)
