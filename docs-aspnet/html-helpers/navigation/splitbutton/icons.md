---
title: Icons
page_title: Icons
description: "Get started with the Telerik UI {{ site.platform }} SplitButton and add background, image, or font icons to enhance the visualization of the widget."
slug: htmlhelpers_splitbutton_aspnetcore_icons
position: 4
---

# Icons

The SplitButton provides options for visually enhancing its textual content by adding icons. You can specify them through the following configuration methods:

* `Icon()`&mdash;This method displays the appropriate [Kendo UI for jQuery font icon.](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes/font-icons)

    ```HtmlHelper
        @(Html.Kendo().SplitButton()
            .Name("splitButton")
            .Text("Plus")
            .Icon("plus")
        )
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-splitbutton name="splitButton" text="Plus" icon="plus">
    </kendo-splitbutton>
    ```
    {% endif %}
* `SpriteCssClass()`&mdash;This method displays the icon as a background of a span element instead.

    ```HtmlHelper
        @(Html.Kendo().SplitButton()
            .Name("splitButton")
            .Text("Plus")
            .SpriteCssClass("myPlusIcon")
        )
    ```
    {% if site.core %}
    ```TagHelper.cshtml
        <kendo-splitbutton name="splitButton" text="Plus" sprite-css-class="myPlusIcon">
        </kendo-splitbutton>
    ```
    {% endif %}
* `ImageUrl()`&mdash;This method applies image icons.

    ```HtmlHelper
        @(Html.Kendo().SplitButton()
                .Name("splitButton")
                .Text("Plus")
                .ImageUrl("url/to/myPlusIcon.png")
        )

    ```
    {% if site.core %}
    ```TagHelper
        <kendo-splitbutton name="splitButton" text="Plus" image-url="url/to/myPlusIcon.png">
        </kendo-splitbutton>
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

    @(Html.Kendo().SplitButton()
        .Name("splitButton")
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

    <kendo-splitbutton name="splitButton" text="Archive" sprite-css-class="fa fa-archive">
        <splitbutton-items>
            <item text="Item 1"></item>
            <item text="Item 2"></item>
        </splitbutton-items>
    </kendo-splitbutton>
```
{% endif %}

## See Also

* [Icons in the SplitButton (Demo)](https://demos.telerik.com/{{ site.platform }}/splitbutton/icons)
* [Server-Side API](/api/splitbutton)