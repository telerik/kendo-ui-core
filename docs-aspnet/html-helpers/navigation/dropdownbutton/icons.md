---
title: Icons
page_title: Icons
description: "Get started with the Telerik UI {{ site.platform }} DropDownButton and add background, image, or font icons to enhance the visualization of the widget."
slug: htmlhelpers_dropdownbutton_aspnetcore_icons
position: 4
---

# Icons

The DropDownButton provides the `Icon`, `SpriteCssClass`, and `ImageUrl` properties for configuring icons. With a specific DropDownButton instance, you have to use only one of them&mdash;if you define multiple properties, the DropDownButton will work with only one of them in the order previously stated.

* `Icon()`&mdash;This method displays the appropriate [Kendo UI font icon.](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes/font-icons)

    ```HtmlHelper
        @(Html.Kendo().DropDownButton()
            .Name("DropDownButton")
            .Text("Plus")
            .Icon("plus")
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-dropdownbutton name="DropDownButton" text="Plus" icon="plus">
        </kendo-dropdownbutton>
    ```
    {% endif %}
* `SpriteCssClass()`&mdash;This method displays the icon as a background of a span element instead.

    ```HtmlHelper
        @(Html.Kendo().DropDownButton()
            .Name("DropDownButton")
            .Text("Plus")
            .SpriteCssClass("myPlusIcon")
        )
    ```
    {% if site.core %}
    ```TagHelper.cshtml
        <kendo-dropdownbutton name="DropDownButton" text="Plus" sprite-css-class="myPlusIcon">
        </kendo-dropdownbutton>
    ```
    {% endif %}
* `ImageUrl()`&mdash;This method applies image icons.

    ```HtmlHelper
        @(Html.Kendo().DropDownButton()
                .Name("DropDownButton")
                .Text("Plus")
                .ImageUrl("url/to/myPlusIcon.png")
        )

    ```
    {% if site.core %}
    ```TagHelper
        <kendo-dropdownbutton name="DropDownButton" text="Plus" image-url="url/to/myPlusIcon.png">
        </kendo-dropdownbutton>
    ```
    {% endif %}

## Font Icons

You can integrate FontAwesome or other font icons by setting the required third-party CSS classes over the `.SpriteCssClass()` configuration method. However, this approach will render a `k-sprite` CSS class, which applies font and size styles that may interfere with the font icon styles.

```HtmlHelper
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

    @(Html.Kendo().DropDownButton()
        .Name("DropDownButton")
        .Text("Archive")
        .SpriteCssClass("fa fa-archive")
        .Items(items =>
        {
            items.Add().Text("Item 1");
            items.Add().Text("Item 2");
        })
    )
```
{% if site.core %}
```TagHelper
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

    <kendo-dropdownbutton name="DropDownButton" text="Archive" sprite-css-class="fa fa-archive">
        <dropdownbutton-items>
            <item text="Item 1"></item>
            <item text="Item 2"></item>
        </dropdownbutton-items>
    </kendo-dropdownbutton>
```
{% endif %}

## See Also

* [Icons in the DropDownButton (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownbutton/icons)
* [Server-Side API](/api/dropdownbutton)