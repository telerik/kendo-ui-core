---
title: Icon Button
page_title: Icon Button | Telerik UI Button HtmlHelper for ASP.NET MVC
description: "Accommodate an icon and enhance the meaning of the text content of the Telerik UI Button HtmlHelper for ASP.NET MVC."
slug: iconbuttonhelper_aspnetmvc
position: 3
---

# Icon Button

The Button can accommodate an icon which enhances the meaning of the text content.

The Button HtmlHelper provides the following methods for configuring icons:
* `Icon()`
* `SpriteCssClass()`
* `ImageUrl()`

## Background Icons

Background icons are applied through the `.Icon()` or `.SpriteCssClass()` fluent methods and are displayed as a background of a `span` element. The difference between the two settings is that `.Icon()` is intended to be used for built-in Kendo UI icons which are part of the theme sprite. For a list of available icon names, refer to the [demo on using the Kendo UI icons](http://demos.telerik.com/kendo-ui/web/styling/icons.html).

The following example demonstrates how to add a background icon by using `.Icon()`.

```Razor

        @(Html.Kendo().Button()
            .Name("cancelButton")
            .Icon("cancel")
            .Content("Cancel"))
```
```ASPX

        <%= Html.Kendo().Button()
            .Name("cancelButton")
            .Icon("cancel")
            .Content("Cancel") %>
```

The configuration from the previous example is expected to produce the HTML output from the following example.

        <button type="button" id="cancelButton" class="k-button k-button-icontext"><span class="k-icon k-cancel"></span>Cancel</button>

The following example demonstrates how to add a background icon by using `.SpriteCssClass()`.

```Razor

        @(Html.Kendo().Button()
            .Name("spriteButton")
            .SpriteCssClass("myIconClass")
            .Content("Sprite button"))
```
```ASPX

        <%= Html.Kendo().Button()
            .Name("spriteButton")
            .SpriteCssClass("myIconClass")
            .Content("Sprite button") %>
```

The configuration from the previous example is expected to produce the HTML output from the following example.

      <button type="button" id="spriteButton" class="k-button k-button-icontext"><span class="k-sprite myIconClass"></span>Sprite button</button>

Technically, you can use `.SpriteCssClass("k-icon k-cancel")` to achieve the same result as `.Icon("cancel")` but `.Icon()` avoids the need to set two CSS classes at the same time and provides a certain level of abstraction. The Button uses an existing `span` element if it is supplied as `.Content()`&mdash;for example, if you want to have a Button with no text. The `span` element must have a `k-sprite` CSS class.

The following example demonstrates how to use a button with no text.

```Razor

        @(Html.Kendo().Button()
            .Name("deleteButton")
            .SpriteCssClass("myDeleteClass")
            .Content("<span class='k-sprite'>Delete</span>"))
```
```ASPX

        <%= Html.Kendo().Button()
            .Name("deleteButton")
            .SpriteCssClass("myDeleteClass")
            .Content("<span class='k-sprite'>Delete</span>") %>
```

## Image Icons

Image icons are applied through the `.ImageUrl()` property and are displayed as an `img` element.

The following example demonstrates how to use `.ImageUrl()`.

```Razor

        @(Html.Kendo().Button()
            .Name("imageButton")
            .ImageUrl("/images/myIcon.gif")
            .Content("Image button"))
```
```ASPX

        <%= Html.Kendo().Button()
            .Name("imageButton")
            .ImageUrl("/images/myIcon.gif")
            .Content("Image button") %>
```

The configuration from the previous example is expected to produce the HTML output from the following example.

        <button type="button" id="imageButton" class="k-button k-button-icontext"><img class="k-image" src="/images/myIcon.gif" alt="icon" />Image button</button>

The following example demonstrates how to use `.ImageUrl()` with no text. You have to place an `img` tag inside the Button content. The image needs to have a `k-image` CSS class.

```Razor

        @(Html.Kendo().Button()
            .Name("iconButton")
            .ImageUrl("/images/myIcon.gif")
            .Content("<img class='k-image' alt='my icon' />"))
```
```ASPX

        <%= Html.Kendo().Button()
            .Name("iconButton")
            .ImageUrl("/images/myIcon.gif")
            .Content("<img class='k-image' alt='my icon' />") %>
```

## See Also

* [Adding Images to the Button HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/button/images)
* [ButtonBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/ButtonBuilder)
* [Button Server-Side API](/api/button)
