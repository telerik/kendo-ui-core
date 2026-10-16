---
title: Customize the Drawer Open and Close Animation
page_title: Customize the Drawer Open and Close Animation
description: "Learn how to change the duration and easing of the open and close animation of the Kendo UI for jQuery Drawer."
type: how-to
slug: drawer-customize-animation
tags: telerik, kendo, jquery, drawer, animation, transition, duration, easing, open, close
res_type: kb
components: ["drawer"]
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Drawer for jQuery</td>
		</tr>
		<tr>
			<td>Version</td>
			<td>{{ site.cdnVersion }}</td>
		</tr>
	</tbody>
</table>

## Description

I want to control the open and close animation of the Kendo UI for jQuery Drawer in the same way the `animation` option of the ComboBox controls its popup. How can I change the duration and easing of the Drawer animation?

This KB also answers the following questions:

- How do I change the open and close animation speed of the Kendo UI Drawer?
- Can I set the easing function of the Kendo UI for jQuery Drawer animation?
- Is there an animation option for the Kendo UI Drawer?

## Solution

The Drawer's [configuration options](/api/ui/drawer#configuration) do not include a dedicated `animation` option. The widget animates by applying an inline `transition` style to its `.k-drawer-wrapper` element.

To change the duration and easing, override the inline transition with a CSS rule. The rule must use the `!important` flag because the Drawer sets the transition as an inline style, and inline styles take precedence over regular stylesheet rules.

1. Add a CSS rule for the `.k-drawer-wrapper` element that sets the `transition-duration` and `transition-timing-function` properties.

    ```css
      .k-drawer-wrapper {
        transition-duration: 1s !important;
        transition-timing-function: ease-in-out !important;
      }
    ```

1. Set the [`swipeToOpen`](/api/ui/drawer/configuration/swipetoopen) option to `false`. While the user swipes the Drawer, the widget temporarily disables the transition to follow the pointer. A forced transition would override this behavior and make the swipe lag.

The following example demonstrates how to apply the custom transition duration and easing to the Kendo UI for jQuery Drawer.

```dojo
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/14.5.0/meridian/meridian-main.css" />
  <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
  <script src="https://kendo.cdn.telerik.com/2025.3.1002/js/kendo.all.min.js"></script>
  <style>
    #drawer .k-drawer-wrapper {
      transition-duration: 1s !important;
      transition-timing-function: ease-in-out !important;
    }
  </style>
</head>
<body>
  <button id="show" class="k-button">Show</button>
  <button id="hide" class="k-button">Hide</button>

  <div id="drawer">
    <div>Content area content.</div>
  </div>

  <script>
    $(document).ready(function() {
      var drawer = $("#drawer").kendoDrawer({
        mode: "push",
        template: `<ul><li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='item-text'>item 1</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span class='k-icon k-i-x-logo'></span><span class='item-text'>item 2</span></li></ul>`,
        position: "left",
        swipeToOpen: false
      }).data("kendoDrawer");

      $("#show").click(function() {
        drawer.show();
      });
      $("#hide").click(function() {
        drawer.hide();
      });
    });
  </script>
</body>
</html>
```

## See Also

* [Drawer Overview]({% slug overview_kendoui_drawer_widget %})
* [JavaScript API Reference of the Drawer](/api/ui/drawer)
