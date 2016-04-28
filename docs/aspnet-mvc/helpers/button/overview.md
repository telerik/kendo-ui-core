---
title: Overview
page_title: Overview | Kendo UI Button HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Button widget for ASP.NET MVC."
slug: overview_buttonhelper_aspnetmvc
position: 1
---

# Button HtmlHelper Overview

The Button HtmlHelper extension is a server-side wrapper for the [Kendo UI Button](https://demos.telerik.com/kendo-ui/button/index) widget.

Make sure you are familiar with the fundamental Kendo UI widget concepts and that the [Kendo UI MVC wrappers]({% slug overview_aspnetmvc %}) are set up correctly.

## Getting Started

### The Basics

The Kendo UI Button widget can be initialized from any element, defined via the `.Tag()` fluent method. However, using the `button` or `a` elements is more reasonable. A `button` tag is used by default, unless otherwise specified.

The Button can include both inline and block elements defined via `.Content()`. Take into account the web standards, which prohibit placing block elements, such as `div`, and `p`, inside inline elements, such as `a` and `span`.

Placing clickable elements with their own special behavior inside the Button&mdash;hyperlinks, textboxes, and others&mdash;may cause undesired side effects.

### Initialization

The example below demonstrates how to initialize the Button by using the default `button` tag.

###### Example

```tab-Razor

        @(Html.Kendo().Button()
            .Name("textButton")
            .HtmlAttributes( new {type = "button"} )
            .Content("Text button"))
```
```tab-ASPX

        <%= Html.Kendo().Button()
            .Name("textButton")
            .HtmlAttributes( new {type = "button"} )
            .Content("Text button") %>
```

The example below demonstrates how to initialize the Button by using the `anchor` tag.

###### Example

```tab-Razor

        @(Html.Kendo().Button()
            .Name("linkButton")
            .Tag("a")
            .Content("Link button"))
```
```tab-ASPX

        <%= Html.Kendo().Button()
            .Name("linkButton")
            .Tag("a")
            .Content("Link button") %>
```

## Appearance

The Button can accommodate an icon, which enhances the meaning of the text content. The widget provides three ways to add an icon with a classic `img` element or with a background image, usually a sprite. Taking web standards into consideration, using background images is better, because the icon does not represent structural content, but it's simply a decoration.

There are three settings that are available in the Button to configure icons:

* `.Icon()`
* `.SpriteCssClass()`
* `.ImageUrl()`

Use only one at a time.

### Background Icons

Background icons are applied via the `.Icon()` or `.SpriteCssClass()` fluent methods and are displayed as a background of a `span` element.

The difference between the two settings is that `.Icon()` is intended to be used for built-in Kendo UI icons, which are part of the theme sprite.

For a list of available icon names, refer to the [Icons demo](http://demos.telerik.com/kendo-ui/web/styling/icons.html).

The example below demonstrates how to add a background icon by using `.Icon()`.

###### Example

```tab-Razor

        @(Html.Kendo().Button()
            .Name("cancelButton")
            .Icon("cancel")
            .Content("Cancel"))
```
```tab-ASPX

        <%= Html.Kendo().Button()
            .Name("cancelButton")
            .Icon("cancel")
            .Content("Cancel") %>
```

The above configuration is expected to produce the HTML output from the example below.

###### Example

        <button type="button" id="cancelButton" class="k-button k-button-icontext"><span class="k-icon k-cancel"></span>Cancel</button>

The example below demonstrates how to add a background icon by using `.SpriteCssClass()`.

###### Example

```tab-Razor

        @(Html.Kendo().Button()
            .Name("spriteButton")
            .SpriteCssClass("myIconClass")
            .Content("Sprite button"))
```
```tab-ASPX

        <%= Html.Kendo().Button()
            .Name("spriteButton")
            .SpriteCssClass("myIconClass")
            .Content("Sprite button") %>
```

The above configuration is expected to produce the HTML output from the example below.

###### Example

      <button type="button" id="spriteButton" class="k-button k-button-icontext"><span class="k-sprite myIconClass"></span>Sprite button</button>

Technically, `.SpriteCssClass("k-icon k-cancel")` can be used to achieve the same result as `.Icon("cancel")`, but `.Icon()` spares you the need to set two CSS classes at the same time and provides a certain level of abstraction.

The Button uses an existing `span` element if it is supplied as `.Content()`&mdash;for example, if you want to have a Button with no text. The `span` element must have a `k-sprite` CSS class.

The example below demonstrates how to use a button with no text.

###### Example

```tab-Razor

        @(Html.Kendo().Button()
            .Name("deleteButton")
            .SpriteCssClass("myDeleteClass")
            .Content("<span class='k-sprite'>Delete</span>"))
```
```tab-ASPX

        <%= Html.Kendo().Button()
            .Name("deleteButton")
            .SpriteCssClass("myDeleteClass")
            .Content("<span class='k-sprite'>Delete</span>") %>
```

### Image Icons

Image icons are applied via the `.ImageUrl()` property and are displayed as an `img` element.

The example below demonstrates how to use `.ImageUrl()`.

###### Example

```tab-Razor

        @(Html.Kendo().Button()
            .Name("imageButton")
            .ImageUrl("/images/myIcon.gif")
            .Content("Image button"))
```
```tab-ASPX

        <%= Html.Kendo().Button()
            .Name("imageButton")
            .ImageUrl("/images/myIcon.gif")
            .Content("Image button") %>
```

The above configuration is expected to produce the HTML output from the example below.

###### Example

        <button type="button" id="imageButton" class="k-button k-button-icontext"><img class="k-image" src="/images/myIcon.gif" alt="icon" />Image button</button>

The example below demonstrates how to use `.ImageUrl()` with no text. Note that an `img` tag should be placed inside the Button content. The image should have a `k-image` CSS class.

###### Example

```tab-Razor

        @(Html.Kendo().Button()
            .Name("iconButton")
            .ImageUrl("/images/myIcon.gif")
            .Content("<img class='k-image' alt='my icon' />"))
```
```tab-ASPX

        <%= Html.Kendo().Button()
            .Name("iconButton")
            .ImageUrl("/images/myIcon.gif")
            .Content("<img class='k-image' alt='my icon' />") %>
```

## Features

### Enable and Disable Buttons

The business logic of an application often requires a certain button to be temporarily enabled or disabled. The Button can be configured to be initially disabled via its `.Enable()` setting. The widget can also be disabled or enabled at any time with Javascript by using its `enable()` method with a Boolean argument.

The example below demonstrates how to use `.Enable()`.

###### Example

```tab-Razor

        @(Html.Kendo().Button()
            .Name("disabledButton")
            .Enable(false)
            .Content("Disabled button"))
```
```tab-ASPX

        <%= Html.Kendo().Button()
            .Name("disabledButton")
            .Enable(false)
            .Content("Disabled button") %>
```

For more information on the [`enable` method of the Button](/api/javascript/ui/button#methods-enable), refer to the [API of the Button control](/api/javascript/ui/button).

## Reference

### Existing Instances

For more information on how to access an instance, refer to the [introductory article on the Button]({% slug overview_kendoui_button_widget %}).

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Button:

* [ASP.NET MVC API Reference: ButtonBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ButtonBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Button Widget]({% slug overview_kendoui_button_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
