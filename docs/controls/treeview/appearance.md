---
title: Appearance
page_title: jQuery TreeView Documentation - Appearance
description: "Learn how to apply different styling options to the TreeView widget."
slug: appearance_kendoui_treeview_widget
position: 5 
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI TreeView.

For a live example, visit the [Appearance Demo of the TreeView](https://demos.telerik.com/kendo-ui/treeview/appearance).

## Size

The Kendo UI TreeView supports the `size` style option. The `size` option controls the overall size of the component. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/treeview/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the `div` wrapping element through the `k-treeview-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<input id="treeview" />
<script>
    $("#treeview").kendoTreeView({
      size: "large"
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `div.k-treeview` wrapping element:

```html
<span class="k-treeview k-treeview-lg">
    ...
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the TreeView](https://demos.telerik.com/kendo-ui/treeview/appearance)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
