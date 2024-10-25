---
title: Icons
page_title: Icons
description: "Accommodate an icon and enhance the meaning of the text content of the Telerik UI ToggleButton component for {{ site.framework }}."
slug: icons_togglebutton_aspnetcore
position: 2
---

# Icon ToggleButton

The ToggleButton can accommodate an icon which enhances the meaning of the text content.

The ToggleButton provides the following methods for configuring icons:

* [`Icon()`](#icon)&mdash;Defines a name of an existing icon in the Kendo UI theme sprite.
* [`SpriteCssClass()`](#spriteclass)&mdash;Defines a CSS class (or multiple classes separated by spaces), which will be used for applying a background image to a span element inside the ToggleButton. 
* [`ImageUrl()`](#imageicons)&mdash;Defines a URL, which will be used for an `img ` element inside the ToggleButton. 
* [`IconClass()`](#iconclass)&mdash;Defines a CSS class or multiple classes which are applied to a span element inside the ToggleButton.

Use only one of them with a particular ToggleButton instance. If you define multiple properties, only one of them will be obeyed according to the order stated above.

### Icon

The `Icon()` method displays the appropriate [Kendo UI for jQuery font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) as a content of a `<spn> :before` pseudo element. The ToggleButton enables you to completely omit any text to be specified for its contents.

```HtmlHelper
	@(Html.Kendo().ToggleButton()
		.Name("toggleButton")
		.Icon("calendar")
	)
```
{% if site.core %}
```TagHelper
	<kendo-togglebutton name="toggleButton" 
                        icon="calendar">
    </kendo-togglebutton>
```
{% endif %}

### IconClass

Alternatively to the `Icon()` configuration, you can use the `IconClass()` configuration method to set a custom icon. It accepts a CSS class (or multiple space-separated CSS classes).

```HtmlHelper
    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />

	@(Html.Kendo().ToggleButton()
		.Name("toggleButton")
		.IconClass("fa fa-magic")
	)
```
{% if site.core %}
```TagHelper
	<link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />

	<kendo-togglebutton name="toggleButton" 
                        icon-class="fa fa-magic">
    </kendo-togglebutton>
```
{% endif %}

### SpriteClass

The `SpriteCssClass()` method displays the icon as a background of a `span` element instead.

```HtmlHelper
	@(Html.Kendo().ToggleButton()
		.Name("toggleButton")
		.Content("Text ToggleButton")
		.SpriteCssClass("myDeleteIcon")
	)
```
{% if site.core %}
```TagHelper
	<kendo-togglebutton name="toggleButton"
                  sprite-css-class="myDeleteIcon">
        Text ToggleButton
    </kendo-togglebutton>
```
{% endif %}

### ImageIcons

Image icons are applied by using the `ImageUrl()` method and are displayed as an `img` element.

```HtmlHelper
	@(Html.Kendo().ToggleButton()
		.Name("toggleButton")
		.Content("Text ToggleButton")
		.ImageUrl("url/to/myDeleteIcon.png")
	)
```
{% if site.core %}
```TagHelper
	<kendo-togglebutton name="buttonImage" 
                        image-url="/shared/icons/sports/snowboarding.png">
    </kendo-togglebutton>
```
{% endif %}

## See Also

* [Adding Images to the ToggleButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/togglebutton/images)
* [Server-Side API](/api/togglebutton)
