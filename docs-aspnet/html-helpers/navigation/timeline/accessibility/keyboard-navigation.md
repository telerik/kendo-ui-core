---
title:  Keyboard Navigation
page_title: Keyboard Navigation
description: "Learn how to use the keyboard navigation functionality of the Telerik UI TimeLine HtmlHelper for {{ site.framework }}."
previous_url: /html-helpers/navigation/timeline/keyboard-navigation
slug: htmlhelpers_timeline_keyboardnavigation_aspnetcore
position: 2
---

# Keyboard Navigation

The keyboard navigation of the TimeLine is always available.

In Vertical mode when the TimeLine is focused, the first card gets focused. In Horizontal mode when the TimeLine is focused, the timeline scrollable wrap element gets focused. For a complete example, refer to the [demo on keyboard navigation of the TimeLine](https://demos.telerik.com/{{ site.platform }}/timeline/keyboard-navigation).

#### Focusing the widget with the ALT+W key combination in Horizontal mode
The demo showcases how to focus the widget when the Vertical mode is used. In order to focus the widget with the ALT+W key combination in Horizontal mode, you should use the ".k-timeline-scrollable-wrap" class as a selector.
```javascript
$(document.body).keydown(function (e) {
    if (e.altKey && e.keyCode == 87) {
        $(".k-timeline-scrollable-wrap").focus();
    }
});
```

Kendo UI TimeLine supports the following keyboard shortcuts in **Vertical mode**:

| SHORTCUT						| DESCRIPTION				                                                        |
|:---                 |:---                                                                                |
| `Tab`              | Focus the next card.                                                            |
| `Shift + Tab`              | Focus the previous card.                                                             |
| `Space`              | Toggle the expand/collapse state of the item.                                                             |
| `Enter`              | Toggle the expand/collapse state of the item.                                                             |

Kendo UI TimeLine supports the following keyboard shortcuts in **Horizontal mode**:

| SHORTCUT						| DESCRIPTION				                                                        |
|:---                 |:---                                                                                |
| `Enter`              | Selects the current event.                                                             |
| `Space`              | Selects the current event.                                                              |
| `Left Arrow`              | Focuses the previous date.                                                             |
| `Right Arrow`              | Focuses the next date.                                                             |

## See Also

* [Keyboard Navigation by the TimeLine HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timeline/keyboard-navigation)
* [Server-Side API](/api/timeline)
