---
title: Keyboard Navigation
page_title: jQuery TimeLine Documentation - Keyboard Navigation
description: "Get started with the jQuery TimeLine by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_timeline_jquery
position: 2
---

# Keyboard Navigation

The keyboard navigation of the TimeLine is always available.

In its vertical mode when the TimeLine is focused, the first card gets focused. In its horizontal mode when the TimeLine is focused, the timeline scrollable `wrap` element gets focused.

For a complete example, refer to the [demo on keyboard navigation of the TimeLine](https://demos.telerik.com/kendo-ui/timeline/keyboard-navigation) showing how to focus the component when in the vertical mode.

To focus the component with the `ALT` + `W` key combination when in its horizontal mode, use the `.k-timeline-scrollable-wrap` class as a selector.

```javascript
$(document.body).keydown(function (e) {
    if (e.altKey && e.keyCode == 87) {
        $(".k-timeline-scrollable-wrap").focus();
    }
});
```

In vertical mode, the Kendo UI for jQuery TimeLine supports the following keyboard shortcuts:

| SHORTCUT						| DESCRIPTION				       
|:---                 |:---                      
| `Tab`               | Focuses the next card.   
| `Shift + Tab`       | Focuses the previous card.
| `Space`             | Toggles the expand and collapse state of the item.                                            
| `Enter`             | Toggles the expand and collapse state of the item.

In horizontal mode, the Kendo UI for jQuery TimeLine supports the following keyboard shortcuts:

| SHORTCUT						| DESCRIPTION
|:---                 |:---         
| `Enter`             | Selects the current event.
| `Space`             | Selects the current event.
| `Left Arrow`        | Focuses the previous date.
| `Right Arrow`       | Focuses the next date.   

## See Also

* [Keyboard Navigation by the Kendo UI for jQuery TimeLine (Demo)](https://demos.telerik.com/kendo-ui/timeline/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}#keyboard-navigation)
* [Accessibility in the TimeLine]({% slug jquery_timeline_accessibility %})
