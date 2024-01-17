---
title: Icons
page_title: jQuery DropDownButton Documentation - Icons
description: "Get started with the jQuery DropDownButton by Kendo UI and add background, image, or font icons to enhance the visualization of the component."
slug: icons_kendoui_dropdownbutton_widget
position: 4
---

# Icons

The DropDownButton provides options for visually enhancing its textual content by adding icons to it.

You can add an icon with the `img` element or with a background image (usually a sprite). With regard to web standards, using background images is better because the icon represents a decoration, not structural content.

The DropDownButton provides the `icon`, `spriteCssClass`, and `imageUrl` properties for configuring icons. With a specific DropDownButton instance, you have to use only one of them&mdash;if you define multiple properties, the DropDownButton will work with only one of them in the order previously stated.

For a complete example on rendering an Icon DropDownButton, refer to the [Icons demo of the DropDownButton](https://demos.telerik.com/kendo-ui/dropdownbutton/icons).

To visually enhance the DropDownButton, use any of the following approaches:
* [Use background icons](#background-icons)
* [Use image icons](#image-icons)
* [Use font icons](#font-icons)

## Background Icons

Background icons are applied through the `icon` or `spriteCssClass` properties and are displayed as a background of a `span` element. The DropDownButton can either:
* Automatically render the `span` element.
* Use an existing `span` element&mdash;Possible only if the element has a `k-sprite` CSS class or a `k-icon` CSS class (if you use the `icon` property).
The difference between the `icon` and `spriteCssClass` properties is that `icon` is intended for use with the built-in Kendo UI icons which are part of the theme sprite. For a list of the available icon names, refer to the [demo on using icons](https://demos.telerik.com/kendo-ui/web/styling/icons.html).

The following example demonstrates how to use icons in the DropDownButton component:

```
	<button type="button" id="dropDownButton">Plus</button>

	<script>
	$(function(){
		$("#dropDownButton").kendoDropDownButton({
			icon: "plus"
		});
	});
	</script>
```

The `icon` configuration in the previous example will produce the following HTML output:

	```html
    <button type="button" id="dropDownButton" data-role="dropdownbutton" class="k-menu-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" aria-label="Plus dropdownbutton">
        <span class="k-icon k-i-plus k-button-icon"></span>
        <span class="k-button-text">Plus</span>
    </button>
    ```

The following example demonstrates how to apply the `spriteCssClass`:

	```
    <button type="button" id="dropDownButton">Plus</button>

	<script>
	$(function(){
		$("#dropDownButton").kendoDropDownButton({
			spriteCssClass: "myPlusIcon"
		});
	});
	</script>
    ```

Technically, you can use the `spriteCssClass` to achieve the same result as `icon`. However, `icon` avoids the need to set two CSS classes at the same time and provides a certain level of abstraction.

## Image Icons

Image icons are applied over the `imageUrl` property and are displayed as an `img` element. You can use [`imageUrl`](/api/javascript/ui/dropdownbutton/configuration/imageurl) to set an image for the default button, and the [`items.imageUrl`](/api/javascript/ui/dropdownbutton/configuration/items) to set the image for each item in the dropdown.

## Font Icons

You can also use FontAwesome or other font icons inside the Kendo UI DropDownButton by setting the required third-party CSS classes over the `spriteCssClass` property. However, this approach will render a `k-sprite` CSS class which applies font and size styles that may interfere with the font icon styles.

To handle this issue, use either of the following approaches:

* Override the Kendo UI styles which break the font icons.

    ```dojo
    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
    <style>
        .k-button .fa {
            font-size: inherit;
            line-height: inherit;
            width: auto;
            height: auto;
            margin-left: 0;
        }
    </style>

    <button type="button" id="archiveButton">Archive</button>

    <script>
        $("#archiveButton").kendoDropDownButton({
            spriteCssClass: "fa fa-archive",
            items:[
                { text: "Item 1"},
                { text: "Item 2"},
            ]
        });
    </script>
    ```

* Include the required HTML markup and CSS classes inside the Kendo UI DropDownButton directly as template content. In this way, the DropDownButton will not render a `k-sprite` class.

    ```dojo
    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />

    <button type="button" id="archiveButton"><span class="fa fa-archive"></span> Archive</button>

    <script>
        $("#archiveButton").kendoDropDownButton({
            items:[
                { text: "Item 1"},
                { text: "Item 2"},
            ]
        });
    </script>
    ```

## See Also

* [Icons in the DropDownButton (Demo)](https://demos.telerik.com/kendo-ui/dropdownbutton/icons)
* [JavaScript API Reference of the DropDownButton](/api/javascript/ui/dropdownbutton)
