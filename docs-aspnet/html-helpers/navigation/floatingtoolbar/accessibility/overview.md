---
title: Overview
page_title: FloatingToolBar Documentation | FloatingToolBar Accessibility
description: "Get started with the {{ site.product }} FloatingToolBar and learn about its accessibility support."
components: ["floatingtoolbar"]
slug: htmlhelpers_floatingtoolbar_accessibility
position: 1
---

# FloatingToolBar Accessibility

The {{ site.product }} FloatingToolBar hosts the accessible {{ site.product }} ToolBar component. The hosted ToolBar implements the WAI-ARIA `toolbar` role and the keyboard navigation between its tools. For details, refer to the [ToolBar accessibility]({% slug htmlhelpers_toolbar_accessibility %}) article.

## Accessible Name

Use the `AriaLabel()` option to set an accessible name that describes the purpose of the toolbar. The value is applied as the `aria-label` attribute of the hosted ToolBar and replaces its default `Toolbar` label. Set an accessible name especially when the tools display only icons.

```HtmlHelper
    @(Html.Kendo().FloatingToolBar()
        .Name("floatingtoolbar")
        .Visible(true)
        .AriaLabel("Call controls")
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("Chat").Icon("comment").ShowText(ShowIn.Overflow);
            items.Add().Type(CommandType.Button).Text("Mute microphone").Icon("microphone-outline").ShowText(ShowIn.Overflow);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingtoolbar name="floatingtoolbar" visible="true" aria-label="Call controls">
        <floatingtoolbar-items>
            <item type="CommandType.Button" text="Chat" icon="comment" show-text="ShowIn.Overflow" />
            <item type="CommandType.Button" text="Mute microphone" icon="microphone-outline" show-text="ShowIn.Overflow" />
        </floatingtoolbar-items>
    </kendo-floatingtoolbar>
```
{% endif %}

When an item shows only its icon, provide a `title` through the `HtmlAttributes()` option of the item to give the tool a visible tooltip.

## Drag Handle

When the `Draggable()` option is enabled, the toolbar renders a drag handle with the following attributes:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-floating-toolbar-drag-handle` | `role=button` | Exposes the drag handle as a button. |
| | `tabindex=0` | Makes the drag handle focusable. |
| | `aria-label` | Describes the drag handle. Configured through the `DragHandle()` message. |
| | `aria-pressed` | Set to `true` while the keyboard Move mode is active. |

The toolbar also renders a polite live region that announces each keyboard movement. Use the `Messages()` option to localize the drag handle label and the movement announcements.

```HtmlHelper
    @(Html.Kendo().FloatingToolBar()
        .Name("floatingtoolbar")
        .Visible(true)
        .Draggable(true)
        .AriaLabel("Document actions")
        .Messages(messages => messages
            .DragHandle("Reposition document actions")
            .MovedUp("Toolbar moved up")
            .MovedDown("Toolbar moved down")
            .MovedLeft("Toolbar moved left")
            .MovedRight("Toolbar moved right"))
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("Save").Icon("save");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingtoolbar name="floatingtoolbar" visible="true" draggable="true" aria-label="Document actions">
        <messages drag-handle="Reposition document actions"
                  moved-up="Toolbar moved up"
                  moved-down="Toolbar moved down"
                  moved-left="Toolbar moved left"
                  moved-right="Toolbar moved right" />
        <floatingtoolbar-items>
            <item type="CommandType.Button" text="Save" icon="save" />
        </floatingtoolbar-items>
    </kendo-floatingtoolbar>
```
{% endif %}

## Keyboard Navigation

For details on how the FloatingToolBar keyboard navigation works, refer to the [FloatingToolBar Keyboard Navigation]({% slug keynav_aspnetcore_floatingtoolbar %}) article.

## Next Steps

* [Keyboard Navigation of the FloatingToolBar]({% slug keynav_aspnetcore_floatingtoolbar %})

## See Also

* [Keyboard Navigation by the FloatingToolBar for {{ site.framework }}]({% slug keynav_aspnetcore_floatingtoolbar %})
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})
