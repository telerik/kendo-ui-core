---
title: Icon SplitButton
page_title: jQuery SplitButton Documentation - Icon SplitButton
description: "Get started with the jQuery SplitButton by Kendo UI and add background, image, or font icons to enhance the visualization of the widget."
slug: icons_kendoui_splitbutton_widget
position: 4
---

# Icons

The SplitButton provides options for visually enhancing its textual content by adding icons to it.

You can add an icon with the `img` element or with a background image (usually a sprite). With regard to web standards, using background images is better because the icon represents a decoration, not structural content.

The SplitButton provides the `icon`, `spriteCssClass` and `imageUrl` properties for configuring icons. With a specific SplitButton instance, you have to use only one of them&mdash;if you define multiple properties, the SplitButton will work with only one of them in the order previously stated.

For a complete example on rendering an Icon SplitButton, refer to the [Icons demo of the SplitButton](https://demos.telerik.com/kendo-ui/splitbutton/icons).

To visually enhance the SplitButton, use any of the following approaches:
* [Use background icons](#background-icons)
* [Use image icons](#image-icons)
* [Use font icons](#font-icons)

## Background Icons

Background icons are applied over the `icon` or `spriteCssClass` properties and are displayed as a background of a `span` element. The SplitButton can automatically render the `span` element, or use an existing `span` element if it has a `k-sprite` CSS class or a `k-icon` class if the `icon` property is used. The difference between the `icon` or `spriteCssClass` properties is that `icon` is intended to be used for built-in Kendo UI icons which are part of the theme sprite. For a list of the available icon names, refer to the [demo on using icons](https://demos.telerik.com/kendo-ui/web/styling/icons.html).

The following example demonstrates how to use icons in the SplitButton widget.

```
	<button type="button" id="splitButton">Plus</button>

	<script>
	$(function(){
		$("#splitButton").kendoSplitButton({
			icon: "plus"
		});
	});
	</script>
```

The `icon` configuration in the previous example will produce the following HTML output:

	```html
    
    <div id="splitButton_wrapper" class="k-split-button k-button-group k-rounded-md">
        <button type="button" id="splitButton" data-role="splitbutton" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" aria-label="Plus splitbutton">
            <span class="k-icon k-i-plus k-button-icon"></span>
            <span class="k-button-text">Plus</span>
        </button>
        <button tabindex="-1" aria-label="arrow-button" class="k-split-button-arrow k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button" type="button">
            <span class="k-icon k-i-arrow-s k-button-icon"></span>
        </button>
    </div>
    ```

The following example demonstrates how to apply the `spriteCssClass`:

	```
    <button type="button" id="splitButton">Plus</button>

	<script>
	$(function(){
		$("#splitButton").kendoSplitButton({
			spriteCssClass: "myPlusIcon"
		});
	});
	</script>
    ```

Technically, you can use the `spriteCssClass` to achieve the same result as `icon`. However, `icon` avoids the need to set two CSS classes at the same time and provides a certain level of abstraction. 

## Image Icons

Image icons are applied over the `imageUrl` property and are displayed as an `img` element. You can use [`imageUrl`](/api/javascript/ui/splitbutton/configuration/imageurl) to set an image for the default button, and the [`items.imageUrl`](/api/javascript/ui/splitbutton/configuration/items) to set the image for each item in the dropdown.

## Font Icons

You can also use FontAwesome or other font icons inside the Kendo UI SplitButton by setting the required third-party CSS classes over the `spriteCssClass` property. However, this approach will render a `k-sprite` CSS class which applies font and size styles that may interfere with the font icon styles.

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
        $("#archiveButton").kendoSplitButton({
            spriteCssClass: "fa fa-archive",
            items:[
                { text: "Item 1"},
                { text: "Item 2"},
            ]
        });
    </script>
    ```

* Include the required HTML markup and CSS classes inside the Kendo UI Button directly as template content. In this way, the Button will not render a `k-sprite` class.

    ```dojo
    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />

    <button type="button" id="archiveButton"><span class="fa fa-archive"></span> Archive</button>

    <script>
        $("#archiveButton").kendoSplitButton();
    </script>
    ```

## See Also

* [Icons in the SplitButton (Demo)](https://demos.telerik.com/kendo-ui/splitbutton/icons)
* [JavaScript API Reference of the SplitButton](/api/javascript/ui/splitbutton)
