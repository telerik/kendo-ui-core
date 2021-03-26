---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the {{ site.product_short }} ScrollView by Telerik UI and learn about the accessibility support it provides through its keyboard navigation functionality."
previous_url: /helpers/media/scrollview/accessibility/keyboard-navigation
slug: htmlhelpers_scrollview_accessibility_keyboard_navigation_aspnetcore
position: 2
---

# Keyboard Navigation

The keyboard navigation of the ScrollView is always available.

To enable it, use the `Navigatable(true)` configuration. For a complete example, refer to the [demo on using the keyboard navigation of the ScrollView](https://demos.telerik.com/{{ site.platform }}/scrollview/keyboard).

The ScrollView supports the following keyboard shortcuts:

### Focus:

|Shortcut |Description
|:---     |:---
|`Access key + W`  |Focuses the widget


### List of images:

|Shortcut |Description
|:---     |:---
|`Left arrow`  |Switches to the previous item
|`Right arrow`  |Switches to the next item


### Prev/Next buttons:

|Shortcut |Description
|:---     |:---
|`Enter`  |Triggers a click for the button
|`Space`  |Triggers a click for the button


### Pager:

|Shortcut |Description
|:---     |:---
|`Left arrow`  |Focuses to the previous dot in the pager
|`Right arrow`  |Focuses to the next dot in the pager
|`Enter`  |Selects the focused item in the pager
|`Space`  |Selects the focused item in the pager

```
    @(Html.Kendo().ScrollView()
        .Name("scrollView")
        .EnablePager(true)
        .Navigatable(true)
        .ContentHeight("100%")
        .Items(x =>
        {
            x.Add().Content("<div class='photo photo1'></div>");
            x.Add().Content("<div class='photo photo2'></div>");
            x.Add().Content("<div class='photo photo3'></div>");
            x.Add().Content("<div class='photo photo4'></div>");
            x.Add().Content("<div class='photo photo5'></div>");
            x.Add().Content("<div class='photo photo6'></div>");
            x.Add().Content("<div class='photo photo7'></div>");
            x.Add().Content("<div class='photo photo8'></div>");
            x.Add().Content("<div class='photo photo9'></div>");
            x.Add().Content("<div class='photo photo10'></div>");
        }
        )
        .HtmlAttributes(new { style = "height:515px; width:1022px; max-width: 100%" })
    )
```

## See Also

* [Keyboard Navigation by the ScrollView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scrollview/keyboard)
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})
