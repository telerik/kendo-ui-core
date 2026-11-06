---
title: Using an Older Version of the Kendo SVG Icons with the Icon Override Service
description: Learn how to use an older SVG icon set in Kendo UI for jQuery and provide replacements for missing icons with kendo.setIcons.
type: how-to
page_title: How to Use an Older Kendo SVG Icons Package in Kendo UI for jQuery
slug: use-older-svg-icons-package-jquery
tags: kendo, ui, jquery, svg, icons, seticons, icon overrides, downgrade, migration, svgicons
res_type: kb
components: ["general"]
---

## Description

Kendo UI for jQuery ships with a specific version of the `@progress/kendo-svg-icons` package. Version 5 of the package replaced the filled icons from version 4 with a lighter, outline-based design. How can I keep my current Kendo UI version and use the older icons?

This article also answers the following questions:

- How can I use the version 4 icons with a newer Kendo UI for jQuery version?
- How can I replace the entire icon set instead of overriding individual icons?
- Why is an icon missing after I switch to the older icon set?
- How can I substitute an icon that the older set does not include?

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery</td>
</tr>
<tr>
<td>Version</td>
<td>2026.4.1110</td>
</tr>
</tbody>
</table>

## Solution

Kendo UI for jQuery stores its SVG icon definitions in the `kendo.ui.svgIcons` object. Assigning a different icon collection to this object replaces the entire set. For icons that the older package does not include, use the [`kendo.setIcons`](https://docs.telerik.com/kendo-ui/api/javascript/kendo#methods-setIcons) method to configure replacements.

### 1. Load the Older Icon Package

Load the older icon package after `kendo.all.min.js`. The package exposes its icons through `window.KendoSVGIcons`:

```html
<script src="https://kendo.cdn.telerik.com/2026.3.811/js/kendo.all.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@progress/kendo-svg-icons@4.9.0/dist/index.min.js"></script>
```

Loading the script alone does not change the icons used by Kendo UI.

### 2. Switch to the Older Icons

Assign the older icon collection before initializing any widgets:

```javascript
kendo.ui.svgIcons = window.KendoSVGIcons;
```

This assignment replaces the entire icon set. Icons introduced in version 5 are not available in version 4 and will no longer render.

To keep those icons available, merge the two collections instead. Matching older icons take precedence, while newer icons remain available as fallbacks:

```javascript
kendo.ui.svgIcons = $.extend({}, kendo.ui.svgIcons, window.KendoSVGIcons);
```

The following example uses the older icons in a ToolBar and a PanelBar:

```dojo
    <div id="toolbar"></div>
    <ul id="panelbar">
      <li>Products<ul><li>Furniture</li></ul></li>
      <li>Services</li>
    </ul>

    <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-svg-icons@4.9.0/dist/index.min.js"></script>
    <script>
      // Older icons are preferred, newer ones remain as a fallback.
      kendo.ui.svgIcons = $.extend({}, kendo.ui.svgIcons, window.KendoSVGIcons);

      $("#toolbar").kendoToolBar({
        items: [
          { type: "button", text: "Save", icon: "save" },
          { type: "button", text: "Filter", icon: "filter" },
          { type: "button", text: "Print", icon: "print" }
        ]
      });

      $("#panelbar").kendoPanelBar();
    </script>
```

The older icons use filled shapes, while the newer icons use thin outlines.

### 3. Keep Using the Same Icon Names

Many icons were renamed between the two versions. You do not need to update their configured names because the older package recognizes the newer names. For example, an icon configured as `microphone` continues to work after the switch and displays the corresponding older icon.

The CSS class on the rendered element reflects the icon's name in the older package. If your custom styles target `k-svg-i-` classes, review those selectors after switching icon sets. Use the [v4 to v5 migration guide](https://github.com/telerik/kendo-icons/blob/v4.12.0/v4-v5-migration-assets/migration-guide.md) to identify renamed icons and their corresponding class names.

### 4. Handle the Icons the Older Set Does Not Include

Of the 827 icon names available in version 5, 711 have a match in version 4. The remaining 116 have no older equivalent, including `address-book`, `brain`, `cloud-arrow-up`, `cpu`, `desktop`, and `rocket`. If you replaced the entire icon set in step 2, these icons will not render.

Choose one of the following approaches:

**Option A - merge the collections.** Use the `$.extend` approach from step 2 to retain the newer icons for those 116 names. No additional configuration is required.

**Option B - substitute a similar icon.** Use `kendo.setIcons` to map an icon name to an icon available in the older set:

```javascript
kendo.setIcons({
    "arrows-clockwise": "arrow-rotate-cw",
    "arrows-counter-clockwise": "arrow-rotate-ccw",
    "book-open": "book"
});
```

**Option C - provide a custom icon.** Pass an object with `name`, `viewBox`, and `content` properties:

```javascript
kendo.setIcons({
    "brain": {
        name: "brain",
        viewBox: "0 0 512 512",
        content: '<path d="..."></path>'
    }
});
```

### 5. Apply Overrides Globally or per Component

`kendo.setIcons` accepts global and component-specific overrides in the same call. A component-specific override takes precedence over a global override for the same icon name:

```dojo
    <div id="grid"></div>
    <ul id="menu">
      <li>Products<ul><li>Furniture</li></ul></li>
      <li>Services</li>
    </ul>

    <script src="https://cdn.jsdelivr.net/npm/@progress/kendo-svg-icons@4.9.0/dist/index.min.js"></script>
    <script>
      kendo.ui.svgIcons = $.extend({}, kendo.ui.svgIcons, window.KendoSVGIcons);

      kendo.setIcons({
        // Applies to every component.
        "chevron-right": "arrow-right",
        // Applies to the Menu only and takes priority over the entry above.
        menu: {
          "chevron-right": "caret-alt-right",
          "chevron-down": "caret-alt-down"
        }
      });

      $("#menu").kendoMenu();

      $("#grid").kendoGrid({
        columns: [{ field: "name", title: "Name" }],
        dataSource: {
          data: [{ name: "Chai", category: "Beverages" }, { name: "Tofu", category: "Produce" }],
          group: { field: "category" }
        }
      });
    </script>
```

Call `kendo.setIcons` before initializing the widgets. Widgets resolve their icons during initialization, so calling the method later does not update icons that have already been rendered.

## See Also

- [kendo.setIcons API Reference](https://docs.telerik.com/kendo-ui/api/javascript/kendo#methods-setIcons)
- [SVG Icons]({% slug svgicons_kendoui_desktopwidgets %})
- [Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
- [Extending Kendo SVG Icons with Custom Ones]({% slug extend-kendo-svg-icons-jquery %})
- [v4 to v5 icon migration guide (telerik/kendo-icons)](https://github.com/telerik/kendo-icons/blob/v4.12.0/v4-v5-migration-assets/migration-guide.md)
- [@progress/kendo-svg-icons on npm](https://www.npmjs.com/package/@progress/kendo-svg-icons)
