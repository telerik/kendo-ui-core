---
title: Icon Button
page_title: Icon Button
description: "Accommodate an icon and enhance the meaning of the text content of the Telerik UI Button TagHelper for {{ site.framework }}."
slug: taghelpers_button_icons
position: 3
---

# Icon Button

The Button can accommodate an icon that enhances the textual content.

The Button TagHelper provides a couple of attributes for configuring icons. Use only one of them with a particular Button instance. If you define multiple attributes, only one of them will take precedence (in the order listed below).

* The `icon` attribute displays the appropriate [Kendo UI for jQuery font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) as a content of a `<span>:before` pseudo element. You can completely omit the text for the Button content. 

Alternatively, use the `icon-class` attribute to set a custom icon. It accepts a CSS class (or multiple space-separated CSS classes).


```icon
<kendo-button name="buttonDelete" type="button" icon="delete"></kendo-button>

```
```icon-class

<link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />

<kendo-button name="buttonCustom" type="button" icon-class="fa fa-magic"></kendo-button>

```

* The `sprite-css-class` attribute displays the icon as a background of a `span` element instead.


```

<kendo-button name="buttonEdit" type="button" sprite-css-class="myEditIcon"></kendo-button>

```

* The Image icons are applied by using the `image-url` attribute and are displayed as an `img` element. The URL can be relative or absolute. In case it is relative, it will be evaluated with relation to the web page URL.


```

<kendo-button name="buttonImage" type="button" image-url="/shared/icons/sports/snowboarding.png"></kendo-button>

```

## See Also

* [Adding Images to the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/images)
* [Server-Side API](/api/button)
