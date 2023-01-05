---
title:  Toolbar
page_title: Chat Toolbar
description: "Learn how to configure the toolbar of the Telerik UI Chat component for {{ site.framework }}."
slug: htmlhelpers_chat_toolbar_aspnetcore
position: 4
---

# Toolbar

The Toolbar of the Telerik UI for {{ site.framework }} Chat allows you to add toolbar actions for achieving a more user-friendly conversational UI. 

The Chat toolbar is located below the input box of the component. You can display or hide the toolbar by clicking the toolbar icon which is placed to the left of the **Send** button.

## Configuring the Items

To configure the toolbar items, use the [`Toolbar.Buttons()`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/ChatToolbarSettingsBuilder#buttonssystemaction) configuration method. Depending on the executed command in the toolbar, you can also implement a specific functionality by handling the [`ToolClick`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/ChatEventBuilder#toolclicksystemstring) event.

The following example demonstrates how to configure the toolbar items for the Chat.

```HtmlHelper
    @(Html.Kendo().Chat()
        .Name("chat")
        .Events(e => e.ToolClick("onToolClick"))
        .Toolbar(toolbar =>
        {
            toolbar.Toggleable(true);
            toolbar.Buttons(buttons =>
            {
                buttons.Add().Name("ButtonA").IconClass("k-icon k-i-image");
                buttons.Add().Name("ButtonB").IconClass("k-icon k-i-wrench");
            });
        })
    )

    <script>
        function onToolClick(e){
            console.log("Button name: " + e.name);
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-chat name="chat" on-tool-click="onToolClick">
        <toolbar toggleable="true">
            <buttons>
                <button name="ButtonA" icon-class="k-icon k-i-image"/>
                <button name="ButtonB" icon-class="k-icon k-i-wrench"/>
            </buttons>
        </toolbar>
    </kendo-chat>

    <script>
        function onToolClick(e){
            console.log("Button name: " + e.name);
        }
    </script>
```
{% endif %}

## Configuring the Behavior

The toolbar of the Chat provides the following methods that allow you to further configure its behavioral aspects:

* `Animation()`&mdash;Represents the toggle animation of the toolbar.
* `Scrollable()`&mdash;Enables or disables the scrollable behavior of the toolbar.
* `Toggleable()`&mdash;Enables or disables the toggleable behavior of the toolbar.

```HtmlHelper
    @(Html.Kendo().Chat()
        .Name("chat")
        .Toolbar(toolbar => toolbar
            .Toggleable(true)
            .Scrollable(true)
            .Animation(animation => animation
                .Collapse(collapse => collapse
                    .Expand(ExpandDirection.Vertical)
                    .Fade(FadeDirection.In)
                    .Duration(500)
                )
            )
            .Buttons(buttons =>
            {
                buttons.Add().Name("ButtonA").IconClass("k-icon k-i-image");
                buttons.Add().Name("ButtonB").IconClass("k-icon k-i-wrench");
            })
       )
    )
```
{% if site.core %}
```TagHelper
    <kendo-chat name="chat">
        <toolbar toggleable="true" scrollable="true">
            <animation enabled="true">
                <expand effects="expand:vertical fadeIn" duration="500" />
                <collapse effects="expand:vertical fadeIn" duration="500" />
            </animation>
            <buttons>
                <button name="ButtonA" icon-class="k-icon k-i-image" />
                <button name="ButtonB" icon-class="k-icon k-i-wrench" />
            </buttons>
        </toolbar>
    </kendo-chat>
```
{% endif %}

## See Also

* [Using the Chat Toolbar HtmlHelper for {{ site.framework}} (Demo)](https://demos.telerik.com/{{site.platform}}/chat/toolbar)
* [Server-Side API of the Chat for {{ site.framework }}](/api/chat)