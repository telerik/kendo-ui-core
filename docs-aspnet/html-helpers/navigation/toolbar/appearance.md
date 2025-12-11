---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI ToolBar HtmlHelper for {{ site.framework }}."
components: ["toolbar"]
slug: toolbar_appearance
position: 2
---

# Appearance


The ToolBar provides predefined appearance options such as different sizes and settings to control its overflow behavior.

For a complete example, refer to the [Appearance Demo of the ToolBar](https://demos.telerik.com/{{ site.platform }}/toolbar/appearance).

## Options

The ToolBar HtmlHelper and its Overflow configuration provide the following methods for styling:

- [`Size()`](#Size)—configures the overall size of the component.
- [`ScrollButtons()`](#ScrollButtons)—Defines the visibility of scroll buttons when mode is "scroll".
- [`ScrollButtonsPosition()`](#ScrollButtonsPosition)—Defines the placement of scroll buttons.
- [`ScrollDistance()`](#ScrollDistance)—Specifies the distance (in pixels) the toolbar scrolls when a scroll button is clicked.
- [`Mode()`](#Mode)—Defines the overflow mode. 

### Size

To control the size of the ToolBar, configure the `Size` option with any of the following values:

- `Small`
- `Medium` - the default size
- `Large`
- `None`

```HtmlHelper
@(Html.Kendo().ToolBar()
    .Name("toolbar")
    .Size(ComponentSize.Small)
    .Items(items =>
    {
        items.Add().Type(CommandType.Button).Text("Button");
        items.Add().Type(CommandType.Button).Text("Toggle Button").Togglable(true);
    })
)
```
{% if site.core %}
```TagHelper
<kendo-toolbar name="toolbar" size="ComponentSize.Small">
    <toolbar-items>
        <item text="Button" type="CommandType.Button">
        </item>
        <item text="Toggle Button" togglable="true" type="CommandType.Button">
        </item>
</kendo-toolbar>
```
{% endif %}

### Mode

The `Mode()` setting defines the overflow mode. The available options are:

- `Menu` — Moves overflowing items into a dropdown menu. 
- `Scroll` — Keeps items visible and enables horizontal scrolling. 
- `Section` — Groups items into collapsible sections. 
- `None` — Disables overflow handling and items may be cut off.

```HtmlHelper
@(Html.Kendo().ToolBar()
    .Name("toolbar")
    .Overflow(o=>o
       .Mode(ToolBarOverflowMode.Scroll)
    )
    .Items(items =>
    {
        items.Add().Type(CommandType.Button).Text("Button");
        items.Add().Type(CommandType.Button).Text("Toggle Button").Togglable(true);
    })
)
```
{% if site.core %}
```TagHelper
<kendo-toolbar name="toolbar">
    <overflow mode="ToolBarOverflowMode.Scroll" />
    <toolbar-items>
        <item text="Button" type="CommandType.Button">
        </item>
        <item text="Toggle Button" togglable="true" type="CommandType.Button">
        </item>
</kendo-toolbar>
```
{% endif %}

### ScrollButtons

The `ScrollButtons()` setting defines the visibility of scroll buttons when mode is "scroll". The available options are:

- `Auto` — Displays scroll buttons only when needed. This is the default value.
- `Hidden` — Hides the scroll buttons at all times. 
- `Visible` — Always shows the scroll buttons.

```HtmlHelper
@(Html.Kendo().ToolBar()
    .Name("toolbar")
    .Overflow(o=>o
       .Mode(ToolBarOverflowMode.Scroll)
       .ScrollButtons(ScrollButtonsType.Auto)
    )
    .Items(items =>
    {
        items.Add().Type(CommandType.Button).Text("Button");
        items.Add().Type(CommandType.Button).Text("Toggle Button").Togglable(true);
    })
)
```
{% if site.core %}
```TagHelper
<kendo-toolbar name="toolbar">
    <overflow mode="ToolBarOverflowMode.Scroll" scroll-buttons="ScrollButtonsType.Auto" />
    <toolbar-items>
        <item text="Button" type="CommandType.Button">
        </item>
        <item text="Toggle Button" togglable="true" type="CommandType.Button">
        </item>
</kendo-toolbar>
```
{% endif %}

### ScrollButtonsPosition

The `ScrollButtonsPosition()` setting defines the placement of scroll buttons. The available options are:

- `Split` — Scroll buttons appear at both ends of the toolbar. 
- `Start` — Scroll buttons appear only at the start of the toolbar. 
- `End` — Scroll buttons appear only at the end of the toolbar.

```HtmlHelper
@(Html.Kendo().ToolBar()
    .Name("toolbar")
    .Overflow(o=>o
         .Mode(ToolBarOverflowMode.Scroll)
         .ScrollButtonsPosition(ScrollButtonsPositionType.Start)
    )
    .Items(items =>
    {
        items.Add().Type(CommandType.Button).Text("Button");
        items.Add().Type(CommandType.Button).Text("Toggle Button").Togglable(true);
    })
)
```
{% if site.core %}
```TagHelper
<kendo-toolbar name="toolbar">
    <overflow mode="ToolBarOverflowMode.Scroll" scroll-buttons-position="ScrollButtonsPositionType.Start" />
    <toolbar-items>
        <item text="Button" type="CommandType.Button">
        </item>
        <item text="Toggle Button" togglable="true" type="CommandType.Button">
        </item>
</kendo-toolbar>
```
{% endif %}

### ScrollDistance

The `ScrollDistance()` setting specifies the distance (in pixels) the toolbar scrolls when a scroll button is clicked. Default is 50.

```HtmlHelper
@(Html.Kendo().ToolBar()
    .Name("toolbar")
    .Overflow(o=>o
        .Mode(ToolBarOverflowMode.Scroll)
        .ScrollDistance(50)
    )
    .Items(items =>
    {
        items.Add().Type(CommandType.Button).Text("Button");
        items.Add().Type(CommandType.Button).Text("Toggle Button").Togglable(true);
    })
)
```
{% if site.core %}
```TagHelper
<kendo-toolbar name="toolbar">
    <overflow mode="ToolBarOverflowMode.Scroll" scroll-distance="50" />
    <toolbar-items>
        <item text="Button" type="CommandType.Button">
        </item>
        <item text="Toggle Button" togglable="true" type="CommandType.Button">
        </item>
</kendo-toolbar>
```
{% endif %}

## See Also

* [Appearance of the ToolBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar/appearance)
* [ToolBar Server-Side API](/api/toolbar)
* [ToolBar Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar)


