---
title: Icon Button
page_title: jQuery Button Documentation | Icon Button
description: "Get started with the jQuery Button by Kendo UI and add background, image, or font icons to enhance the visualization of the widget."
slug: icons_button
position: 3
---

# Icon Button

The Button provides options for visually enhancing its textual content by adding icons to it.

You can add an icon with the `img` element or with a background image (usually a sprite). With regard to web standards, using background images is better because the icon represents a decoration, not structural content.

The Button provides the `icon`, `spriteCssClass`, and `imageUrl` properties for configuring icons. With a specific Button instance you have to use only one of them&mdash;if you define multiple properties, the Button will work with only one of them in the order previously stated.

For a complete example on rendering an Icon Button, refer to the [demo on adding images to the Button](https://demos.telerik.com/kendo-ui/button/images).

To visually enhance the Button:
* [Use background icons](#background-icons)
* [Use image icons](#image-icons)
* [Use font icons](#font-icons)

## Background Icons

Background icons are applied over the `icon` or `spriteCssClass` properties and are displayed as a background of a `span` element. The Button can automatically render the `span` element, or use an existing `span` element if it has a `k-sprite` CSS class or a `k-icon` class if the `icon` property is used. The difference between the `icon` or `spriteCssClass` properties is that `icon` is intended to be used for built-in Kendo UI icons which are part of the theme sprite. For a list of the available icon names, refer to the [demo on using icons](https://demos.telerik.com/kendo-ui/web/styling/icons.html).

The following example demonstrates how to use icons in the Button widget.

	<button type="button" id="editButton">Edit</button>
	<button type="button" id="deleteButton"><span class="k-icon"></span>Delete</button>

	<script>
	$(function(){
		$("#editButton").kendoButton({
			icon: "edit"
		});

		$("#deleteButton").kendoButton({
			icon: "delete"
		});
	});
	</script>

The `icon` configuration in the previous example will produce the following HTML output.

	<button type="button" id="editButton" class="k-button k-button-icontext"><span class="k-icon k-edit"></span>Edit</button>
	<button type="button" id="deleteButton" class="k-button k-button-icontext"><span class="k-icon k-delete"></span>Delete</button>

The following example demonstrates how to apply the `spriteCssClass`.

	<button type="button" id="editButton">Edit</button>
	<button type="button" id="deleteButton"><span class="k-sprite"></span>Delete</button>

	<script>
	$(function(){
		$("#editButton").kendoButton({
			spriteCssClass: "myEditIcon"
		});

		$("#deleteButton").kendoButton({
			spriteCssClass: "myDeleteIcon"
		});
	});
	</script>

Technically, `spriteCssClass` can be used to achieve the same result as `icon`. However, `icon` avoids the need to set two CSS classes at the same time and provides a certain level of abstraction. For example, the following two configurations are practically identical. `#button2` also applies a `k-sprite` CSS class to the `span` element but it does not change the appearance of the Button.

	$(function(){
		$("#button1").kendoButton({
			icon: "foo"
		});

		$("#button2").kendoButton({
			spriteCssClass: "k-icon k-foo"
		});
	});

In some cases, you may want to use a Button that renders an icon and no text. To increase the accessibility of the widget in this case, you can include a text label inside the sprite `span`.

	<button type="button" id="deleteButton"><span class="k-sprite">Delete</span></button>

	<script>
	$(function(){
		$("#deleteButton").kendoButton({
			spriteCssClass: "myDeleteIcon"
		});
	});
	</script>

## Image Icons

Image icons are applied over the `imageUrl` property and are displayed as an `img` element. The Button can automatically render the `img` element or use an existing `img` element if it has a `k-image` CSS class. To increase the accessibility of the widget when you manually add an `img` element, apply an `alt` attribute.

The following example demonstrates how to use the `imageUrl`.

	<button type="button" id="editButton">Edit</button>
	<button type="button" id="deleteButton"><img class="k-image" alt="Delete" />Delete</button>

	<script>
	$(function(){
		$("#editButton").kendoButton({
			imageUrl: "/images/myEditIcon.gif"
		});

		$("#deleteButton").kendoButton({
			imageUrl: "/images/myDeleteIcon.gif"
		});
	});
	</script>

## Font Icons

You can also use FontAwesome or other font icons inside the Kendo UI Button by setting the required third-party CSS classes over the `spriteCssClass` property. However, this approach will render a `k-sprite` CSS class which applies font and size styles that may interfere with the font icon styles.

To handle this issue, use either of the following approaches:

* Override the Kendo UI styles which break the font icons.

				```dojo
				<link rel="stylesheet"
				    href="https://fortawesome.github.io/Font-Awesome/assets/font-awesome/css/font-awesome.css" />
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
				<link rel="stylesheet"
				    href="https://fortawesome.github.io/Font-Awesome/assets/font-awesome/css/font-awesome.css" />

				<button type="button" id="archiveButton"><span class="fa fa-archive"></span> Archive</button>

				<script>
				    $("#archiveButton").kendoButton({});
				</script>
				```

## See Also

* [Adding Images to the Button (Demo)](https://demos.telerik.com/kendo-ui/button/images)
* [JavaScript API Reference of the Button](/api/javascript/ui/button)
