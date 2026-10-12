---
title: Overflow
page_title: Overflow
description: "Learn how to configure the overflow behavior of the Telerik UI FloatingToolBar for {{ site.framework }}."
components: ["floatingtoolbar"]
slug: floatingtoolbar_overflow
position: 4
---

# Overflow

The FloatingToolBar for {{ site.framework }} passes its `Overflow()` configuration to the hosted ToolBar. Use it to define how the toolbar behaves when its tools do not fit in the available width.

## Overflow Modes

The `Mode()` option of the `Overflow()` configuration accepts the following `ToolBarOverflowMode` values:

* `Menu` (default)&mdash;Moves the tools that do not fit into an overflow menu.
* `Scroll`&mdash;Keeps all tools on the toolbar and enables horizontal scrolling.
* `Section`&mdash;Moves the tools that do not fit into an expandable section.
* `None`&mdash;Disables the overflow handling. The tools that do not fit may be clipped.

In the `Scroll` mode, use the `ScrollButtons()`, `ScrollButtonsPosition()`, and `ScrollDistance()` options to configure the scroll buttons.

```HtmlHelper
    @(Html.Kendo().FloatingToolBar()
        .Name("floatingtoolbar")
        .Visible(true)
        .Overflow(overflow => overflow
            .Mode(ToolBarOverflowMode.Scroll)
            .ScrollButtons(ScrollButtonsType.Auto)
            .ScrollButtonsPosition(ScrollButtonsPositionType.Split)
            .ScrollDistance(120))
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("Track").Icon("map-marker-target");
            items.Add().Type(CommandType.Button).Text("Comment").Icon("comment");
            items.Add().Type(CommandType.Button).Text("Print").Icon("print");
            items.Add().Type(CommandType.Button).Text("Share").Icon("share");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingtoolbar name="floatingtoolbar" visible="true">
        <floatingtoolbar-overflow mode="ToolBarOverflowMode.Scroll"
                                  scroll-buttons="ScrollButtonsType.Auto"
                                  scroll-buttons-position="ScrollButtonsPositionType.Split"
                                  scroll-distance="120" />
        <floatingtoolbar-items>
            <item type="CommandType.Button" text="Track" icon="map-marker-target" />
            <item type="CommandType.Button" text="Comment" icon="comment" />
            <item type="CommandType.Button" text="Print" icon="print" />
            <item type="CommandType.Button" text="Share" icon="share" />
        </floatingtoolbar-items>
    </kendo-floatingtoolbar>
```
{% endif %}

## Item Overflow

Use the `Overflow()` option of an individual item to control where the item is displayed. It accepts the following `ShowInOverflowPopup` values:

* `Auto` (default)&mdash;The item moves to the overflow menu only when there is no room for it.
* `Always`&mdash;The item is always displayed in the overflow menu.
* `Never`&mdash;The item always stays on the toolbar.

To show only the icon of an item on the toolbar and display its text in the overflow menu, set the `ShowText()` option of the item to `ShowIn.Overflow`.

The following example keeps the call controls on the toolbar and moves the secondary actions to the overflow menu.

```HtmlHelper
    @(Html.Kendo().FloatingToolBar()
        .Name("floatingtoolbar")
        .Visible(true)
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("Chat").Icon("comment").ShowText(ShowIn.Overflow).Overflow(ShowInOverflowPopup.Always);
            items.Add().Type(CommandType.Button).Text("Participants").Icon("users-outline").ShowText(ShowIn.Overflow).Overflow(ShowInOverflowPopup.Always);
            items.Add().Type(CommandType.Button).Text("Microphone").Icon("microphone-outline").ShowText(ShowIn.Overflow).Overflow(ShowInOverflowPopup.Never);
            items.Add().Type(CommandType.Button).Text("Leave").Icon("cancel").ShowText(ShowIn.Overflow).Overflow(ShowInOverflowPopup.Never);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingtoolbar name="floatingtoolbar" visible="true">
        <floatingtoolbar-items>
            <item type="CommandType.Button" text="Chat" icon="comment" show-text="ShowIn.Overflow" overflow="ShowInOverflowPopup.Always" />
            <item type="CommandType.Button" text="Participants" icon="users-outline" show-text="ShowIn.Overflow" overflow="ShowInOverflowPopup.Always" />
            <item type="CommandType.Button" text="Microphone" icon="microphone-outline" show-text="ShowIn.Overflow" overflow="ShowInOverflowPopup.Never" />
            <item type="CommandType.Button" text="Leave" icon="cancel" show-text="ShowIn.Overflow" overflow="ShowInOverflowPopup.Never" />
        </floatingtoolbar-items>
    </kendo-floatingtoolbar>
```
{% endif %}

## Next Steps

* [Handling the FloatingToolBar Events]({% slug floatingtoolbar_events %})
* [Accessibility of the FloatingToolBar]({% slug htmlhelpers_floatingtoolbar_accessibility %})
* [Keyboard Navigation of the FloatingToolBar]({% slug keynav_aspnetcore_floatingtoolbar %})

## See Also

* [ToolBar Appearance]({% slug toolbar_appearance %})
