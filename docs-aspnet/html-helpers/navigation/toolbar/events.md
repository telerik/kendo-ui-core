---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI ToolBar component for {{ site.framework }}."
slug: toolbar_events
position: 6
---

# Events

You can subscribe to [all ToolBar events](/api/kendo.mvc.ui.fluent/toolbareventbuilder) and then use them to further customize the behavior of the ToolBar.

The example below demonstrates how to use the [`Click` event](/api/kendo.mvc.ui.fluent/toolbareventbuilder#clicksystemstring) that the ToolBar triggers when the user clicks on a tool.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("Button 1").Id("button1");
            items.Add().Type(CommandType.Button).Text("Button 2").Id("button2");
            items.Add().Type(CommandType.Separator);
            items.Add().Type(CommandType.SplitButton).Text("Split Button").Id("mainButton").MenuButtons(menuButtons =>
            {
                menuButtons.Add().Text("Action 1").Id("action1");
                menuButtons.Add().Text("Action 2").Id("action2");
                menuButtons.Add().Text("Action 3").Id("action3");
            });
        })
        .Events(e => e.Click("onClick"))
    )

    <script>
        function onClick(e) {
            console.log("ToolBar 'click' event is fired for element with id: " + e.id);
        }
    </script>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-toolbar name="ToolBar" on-click="onClick">
        <toolbar-items>
            <item text="Button 1" type="CommandType.Button">
            </item>
            <item text="Button 2" type="CommandType.Button">
            </item>
            <item type="CommandType.Separator">
            </item>
            <item text="Split Button" type="CommandType.SplitButton">
                <menu-buttons>
                    <toolbar-button text="Action 1"/>
                    <toolbar-button text="Action 2"/>
                    <toolbar-button text="Action 3"/>
                </menu-buttons>
            </item>
        </toolbar-items>
    </kendo-toolbar>

    <script>
        function onClick(e) {
            console.log("ToolBar 'click' event is fired for element with id: " + e.id);
        }
    </script>
```
{% endif %}

## Next Steps

* [API for Configuring the ToolBar Events](/api/kendo.mvc.ui.fluent/toolbareventbuilder)
* [Using the ToolBar Events (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar/events)

## See Also

* [Using the API of the ToolBar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar/api)
