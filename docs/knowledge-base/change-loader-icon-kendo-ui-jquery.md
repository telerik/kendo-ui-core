---
title: Changing the Icon of the Loader in Kendo UI for jQuery
description: Learn how to change the loader icon for a specific element in Kendo UI for jQuery using custom CSS and JavaScript.
type: how-to
page_title: How to Customize Loader Icon in Kendo UI for jQuery
meta_title: How to Customize Loader Icon in Kendo UI for jQuery
slug: change-loader-icon-kendo-ui-jquery
tags: loader,kendo-ui-for-jquery,custom-icon,progress,loading-mask
res_type: kb
ticketid: 1702608
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Loader</td>
</tr>
<tr>
<td>Version</td>
<td>2025.4.1111</td>
</tr>
</tbody>
</table>

## Description

I want to change the loader icon for a specific element in Kendo UI for jQuery while keeping the default loader unchanged for other elements.

This knowledge base article also answers the following questions:
- How to apply a custom loader icon for specific containers in Kendo UI for jQuery?
- How to replace the default loader icon with a GIF in Kendo UI for jQuery?
- How to use CSS to modify the loader behavior in Kendo UI for jQuery?

## Solution

To change the loader icon for a specific element, such as a container, without affecting the default loader behavior for the whole page:

1. Use CSS to target the specific container's loading mask and apply a custom background image to it.
2. Hide all default spinner elements and animations by overriding their styles.
3. Use JavaScript to trigger the loader for both the page and the container.

Here is the implementation:

### CSS for Customizing the Loader Icon

```css
/* Ensure the container has relative positioning */
#container {
    position: relative;
    margin: 1em 4em;
    padding: .5em;
    z-index: 2;
}

/* Apply custom loader icon for the container */
#container>.k-loading-mask .k-loading-image {
    background-image: url('loader.gif') !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: 64px 64px !important;
    width: 100% !important;
    height: 100% !important;
    display: block !important;
}

/* Hide default spinner elements */
#container>.k-loading-mask .k-i-loading,
#container>.k-loading-mask .k-i-loading::before,
#container>.k-loading-mask .k-i-loading::after,
#container>.k-loading-mask .k-loading-image::before,
#container>.k-loading-mask .k-loading-image::after {
    display: none !important;
    content: none !important;
    background: none !important;
}

/* Hide loading text */
#container>.k-loading-mask .k-loading-text {
    display: none !important;
}

/* Disable default animations */
#container>.k-loading-mask * {
    animation: none !important;
    -webkit-animation: none !important;
}

/* Remove background for clean appearance */
#container>.k-loading-mask {
    background: transparent !important;
}
```

### JavaScript for Activating the Loader

```javascript
$(function () {
    function displayLoading(target) {
        var element = $(target);
        kendo.ui.progress(element, true); // Show loader
        setTimeout(function () {
            kendo.ui.progress(element, false); // Hide loader after 10 seconds
        }, 10000);
    }

    // Trigger page-level loader
    displayLoading(document.body);

    // Trigger custom loader for container
    displayLoading("#container");
});
```
### Sample HTML

```html
    <div id="container" class="k-widget">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nam lacinia congue leo, ut euismod orci accumsan ut. Pellentesque ligula erat, tempus ut faucibus sit amet,
        interdum vitae lectus.
        Curabitur placerat, magna a dictum blandit, felis dolor blandit purus, quis malesuada dolor mauris non justo.
    </div>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nam lacinia congue leo, ut euismod orci accumsan ut. Pellentesque ligula erat, tempus ut faucibus sit amet,
        interdum vitae lectus.
        Curabitur placerat, magna a dictum blandit, felis dolor blandit purus, quis malesuada dolor mauris non justo.
    </p>
```
To have a runnable example, paste the above HTML, CSS and JS in an HTML file and add your loader GIF image to the same directory.

### Explanation

- The CSS targets the `.k-loading-mask` and `.k-loading-image` inside the `#container` to apply a custom background image.
- The default spinner elements like `.k-i-loading` and pseudo-elements (`::before`, `::after`) are hidden to ensure only the custom loader icon is visible.
- JavaScript uses `kendo.ui.progress` to activate the loader for the container and the page.

## See Also

- [Loader Documentation](https://docs.telerik.com/kendo-ui/controls/interactivity/loader/overview)
- [Progress API](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/ui/methods/progress)

