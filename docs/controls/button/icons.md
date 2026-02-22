---
title: Icon Button
page_title: jQuery Button Documentation - Icon Button
description: "Get started with the jQuery Button by Kendo UI and add background, image, or font icons to enhance the visualization of the component."
components: ["button"]
slug: icons_button
position: 5
---

# Icon Button

The Button provides options for visually enhancing its textual content by adding icons to it.

The Button provides the `icon`, `spriteCssClass`, and `imageUrl` properties for configuring icons. With a specific Button instance you have to use only one of them&mdash;if you define multiple properties, the Button will work with only one of them in the order previously stated.

For a complete example on rendering an Icon Button, refer to the [demo on adding images to the Button](https://demos.telerik.com/kendo-ui/button/images).

To visually enhance the Button:
* [Add an icon](#icon)
* [Use image icons](#image-icons)
* [Use CSS Class icons](#css-class-icons)

## Icon

The Buttons allows you to set an `svg` (default) or `font` icon through the ['icon'](/api/javascript/ui/button/configuration/icon) option. The option is intended to be used with the built-in Kendo UI icons which are part of the theme sprite. For a list of the available icon names, refer to the [icons list](https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/).

The following example demonstrates how to use `svg` icons in the Button component.

```dojo
	<button type="button" id="editButton">Edit</button>
	<button type="button" id="deleteButton"><span class="k-icon"></span>Delete</button>

	<script>
	$(function(){
		$("#editButton").kendoButton({
			icon: "pencil"
		});

		$("#deleteButton").kendoButton({
			icon: "trash"
		});
	});
	</script>
```

The `icon` configuration in the previous example will produce the following HTML output.

	<button type="button" id="editButton" data-role="button" class="k-button" role="button" aria-disabled="false" tabindex="0">
		<span class="k-icon k-svg-icon k-svg-i-pencil k-button-icon">
			<svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
				<path d="m334.9 86.6 45.3-45.3c12.4-12.4 32.8-12.4 45.3 0l45.3 45.3c12.4 12.4 12.4 32.8 0 45.3l-45.3 45.3zm-22.6 22.6L32 389.5V480h90.5l280.3-280.3zM99.9 412.1l-22.6-22.6 235-235 22.6 22.6z">
				</path>
			</svg>
		</span>
		<span class="k-button-text">Edit</span>
	</button>

	<button type="button" id="deleteButton" data-role="button" class="k-button" role="button" aria-disabled="false" tabindex="0">
		<span class="k-icon k-svg-icon k-svg-i-trash k-button-icon">
			<svg viewBox="0 0 512 512" focusable="false" xmlns="http://www.w3.org/2000/svg">
				<path d="M416 96h-96V64c0-17.6-14.4-32-32-32h-96c-17.6 0-32 14.4-32 32v32H64v64h32v288c0 17.6 14.4 32 32 32h224c17.6 0 32-14.4 32-32V160h32zM192 64h95.9l.1.1V96h-96c.1-.1.1-32.1 0-32m160 384H128.1l-.1-.1V160h32v256h32V160h32v256h32V160h32v256h32V160h32z">
				</path>
			</svg>
		</span>
		<span class="k-button-text">Delete</span>
	</button>

The next example demonstrates how to switch to [font icons]({% slug webfonticons_kendoui_desktopwidgets %}).

```dojo
    <link rel="stylesheet" href="https://unpkg.com/@progress/kendo-font-icons/dist/index.css" />
	<button type="button" id="editButton">Edit</button>
	<button type="button" id="deleteButton"><span class="k-icon"></span>Delete</button>

	<script>
	$(function(){
		kendo.setDefaults("iconType", "font")
		$("#editButton").kendoButton({
			icon: "pencil"
		});

		$("#deleteButton").kendoButton({
			icon: "trash"
		});
	});
	</script>
```

## Image Icons

Images are applied over the `imageUrl` property and are displayed as an `img` element. The Button can automatically render the `img` element or use an existing `img` element if it has a `k-image` CSS class. To increase the accessibility of the component when you manually add an `img` element, apply an `alt` attribute.

The following example demonstrates how to use the `imageUrl`.

 ```dojo
	<button type="button" id="imageIcon"><img class="k-image" alt="Delete" />Delete</button>

	<script>
	$(function(){

		$("#imageIcon").kendoButton({
			imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/snowboarding.png"
		});
	});
	</script>
```

## CSS Class Icons

You can also use FontAwesome or other font icons inside the Kendo UI Button by setting the required third-party CSS classes over the `spriteCssClass` property. However, this approach will render a `k-sprite` CSS class which applies font and size styles that may interfere with the font icon styles.

To handle this issue, use either of the following approaches:

* Override the Kendo UI styles which break the font icons.

```dojo
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
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
		$("#archiveButton").kendoButton({
			spriteCssClass: "fa fa-archive"
		});
	</script>
```

* Include the required HTML markup and CSS classes inside the Kendo UI Button directly as template content. In this way, the Button will not render a `k-sprite` class.

```dojo
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />

	<button type="button" id="archiveButton"><span class="fa fa-archive"></span> Archive</button>

	<script>
		$("#archiveButton").kendoButton({});
	</script>
```

## See Also

* [Adding Images to the Button (Demo)](https://demos.telerik.com/kendo-ui/button/images)
* [JavaScript API Reference of the Button](/api/javascript/ui/button)
