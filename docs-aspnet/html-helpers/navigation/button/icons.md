---
title: Icon Button
page_title: Icon Button
description: "Accommodate an icon and enhance the meaning of the text content of the Telerik UI Button component for {{ site.framework }}."
previous_url: /helpers/navigation/button/icons
slug: icons_button_aspnetcore
position: 2
---

# Icon Button

The Button can accommodate an icon which enhances the meaning of the text content.

The Button provides the following methods for configuring icons:

* `Icon()`
* `SpriteCssClass()`
* `ImageUrl()`

Use only one of them with a particular Button instance. If you define multiple properties, only one of them will be obeyed according to the order stated above.

The `Icon()` method displays the appropriate [Kendo UI for jQuery font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) as a content of a `<spn> :before` pseudo element. The Button enables you to completely omit any text to be specified for its contents.

```HtmlHelper
	@(Html.Kendo().Button()
		.Name("textButton")
		.Icon("trash")
	)
```
{% if site.core %}
```TagHelper
	<kendo-button name="buttonDelete" type="button" icon="delete"></kendo-button>
```

Alternatively, use the `icon-class` attribute to set a custom icon. It accepts a CSS class (or multiple space-separated CSS classes).

```TagHelper
	<link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />

	<kendo-button name="buttonCustom" type="button" icon-class="fa fa-magic"></kendo-button>
```

{% endif %}

The `SpriteCssClass()` method displays the icon as a background of a `span` element instead.

```HtmlHelper
	@(Html.Kendo().Button()
		.Name("textButton")
		.Content("Sample Button")
		.SpriteCssClass("myDeleteIcon")
	)
```
{% if site.core %}
```TagHelper
	<kendo-button name="buttonEdit" type="button" sprite-css-class="myEditIcon"></kendo-button>
```
{% endif %}

Image icons are applied by using the `ImageUrl()` method and are displayed as an `img` element.

```HtmlHelper
	@(Html.Kendo().Button()
		.Name("textButton")
		.Content("Sample Button")
		.ImageUrl("url/to/myDeleteIcon.png")
	)
```
{% if site.core %}
```TagHelper
	<kendo-button name="buttonImage" type="button" image-url="/shared/icons/sports/snowboarding.png"></kendo-button>
```
{% endif %}

## See Also

* [Adding Images to the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/images)
* [Server-Side API](/api/button)
