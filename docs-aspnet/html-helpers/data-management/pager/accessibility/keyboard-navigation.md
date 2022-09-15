---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the {{ site.product_short }} Pager by Telerik UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_aspnetcore_pager
position: 2
---

# Keyboard Navigation

To enable keyboard navigation of the Pager set the `Navigatable()` option to `true`.

For a complete example, refer to the [demo on using the keyboard navigation of the Pager](https://demos.telerik.com/{{ site.platform }}/pager/keyboard-navigation).  

The Pager supports its keyboard navigation functionality through the `Navigatable()` method. When enabled, you can initially change the active page by using the `PageUp` and `PageDown` keys.
Alternatively, you can press `Enter` and navigate through the different elements of the pager via `Tab` and `Shift+Tab`.

The following example demonstrates how to enable the keyboard navigation in the Pager.

```HtmlHelper
    @(Html.Kendo().Pager()
        .Name("pager")
        /* Other configuration. */
        .Navigatable(true)
    )
```
{% if site.core %}
```TagHelper
    <kendo-pager name="pager" navigatable="true">
    </kendo-pager>
```
{% endif %}

The table below lists the available key combinations supported by the Pager.

When the Pager is focused:

| SHORTCUT			| DESCRIPTION				                                               |
|:---               |:---                                                                      |
| `Left Arrow`      | Loads the previous page, if it exists.                                   |
| `Right Arrow`     | Loads the next page, if it exists.                                       |
| `Page Up`         | Loads the previous page, if it exists.                                   |
| `Page Down`       | Loads the next page, if it exists.                                       |
| `Home`            | Loads the first page, if the current page is not already the first one.  |
| `End`             | Loads the last page, if the current page is not already the last one.    |
| `Enter`           | Changes the focus to the first focusable Pager element.                  |

When an element inside the Pager is focused:

| SHORTCUT			| DESCRIPTION				                                 |
|:---               |:---                                                        |
| `Tab`             | Changes the focus to the next Pager element.               |
| `Shift`+`Tab`     | Changes the focus to the previous Pager element.           |
| `Enter`           | Triggers the default action associated with this element.  |
| `Escape`          | Changes the focus to the Pager wrapper.                    |


## See Also

* [Keyboard Navigation of the Pager HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pager/keyboard-navigation)
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})
