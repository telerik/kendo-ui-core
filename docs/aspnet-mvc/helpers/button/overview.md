---
title: Overview
page_title: Button HtmlHelper extension for Kendo UI Button widget | Kendo UI documentation
description: Getting started with Button HtmlHelper extension in quick steps - configure Kendo UI Button widget and operate Kendo UI Button events.
---

# Button

The Button HtmlHelper extension is a server-side wrapper for the [Kendo UI Button](/api/web/button) widget.

It is assumed that the reader of this page is familiar with the fundamental [Kendo UI widget concepts](/widgets) and
the [Kendo UI MVC wrappers](/aspnet-mvc/introduction) are setup correctly.

## Getting Started

The **Button** widget can be initialized from any element, defined via the `.Tag()` fluent method. However, using `button` or `a` elements is more reasonable. A `button` tag is used by default, unless otherwise specified.

The **Button** can include both inline and block elements defined via `.Content()`. One should take into account web standards, which prohibit placing block elements (e.g. `div`, `p`) inside inline elements (e.g. `a`, `span`).

Placing clickable elements with their own special behavior inside the **Button** (e.g. hyperlinks, textboxes, etc) may cause undesired side efects.

### Button initialization examples

#### Using the default `button` tag

* Razor

        @(Html.Kendo().Button()
            .Name("textButton")
            .HtmlAttributes( new {type = "button"} )
            .Content("Text button"))
* WebForms

        <%= Html.Kendo().Button()
            .Name("textButton")
            .HtmlAttributes( new {type = "button"} )
            .Content("Text button") %>

#### Using an `anchor` tag

* Razor

        @(Html.Kendo().Button()
            .Name("linkButton")
            .Tag("a")
            .Content("Link button"))
* WebForms

        <%= Html.Kendo().Button()
            .Name("linkButton")
            .Tag("a")
            .Content("Link button") %>

## Using Icons

The **Button** can accommodate an icon, which enhances the meaning of the text content.
The widget provides three ways to add an icon with a classic `img` element or with a background image (usually a sprite).
From web standarts' point of view, using background images is better, because the icon does not represent structural content, but it's simply a decoration.

There are three settings, which the **Button** provides for configuring icons - `.Icon()`, `.SpriteCssClass()` and `.ImageUrl()`. Only one should be used at a time.

### Background icons

Background icons are applied via the `.Icon()` or `.SpriteCssClass()` fluent methods and are displayed as a background of a `span` element.

The difference between the two settings is that `.Icon()` is intended to be used for built-in Kendo UI icons, which are part of the theme sprite.
For a list of available icon names, please refer to the [Icons demo](http://demos.telerik.com/kendo-ui/web/styling/icons.html).

#### Using `.Icon()`

* Razor

        @(Html.Kendo().Button()
            .Name("cancelButton")
            .Icon("cancel")
            .Content("Cancel"))
* WebForms

        <%= Html.Kendo().Button()
            .Name("cancelButton")
            .Icon("cancel")
            .Content("Cancel") %>

The above configuration will produce the following HTML output:

    <button type="button" id="cancelButton" class="k-button k-button-icontext"><span class="k-icon k-cancel"></span>Cancel</button>

#### Using `.SpriteCssClass()`

* Razor

        @(Html.Kendo().Button()
            .Name("spriteButton")
            .SpriteCssClass("myIconClass")
            .Content("Sprite button"))
* WebForms

        <%= Html.Kendo().Button()
            .Name("spriteButton")
            .SpriteCssClass("myIconClass")
            .Content("Sprite button") %>

The above configuration will produce the following HTML output:

    <button type="button" id="spriteButton" class="k-button k-button-icontext"><span class="k-sprite myIconClass"></span>Sprite button</button>
        
Technically, `.SpriteCssClass("k-icon k-cancel")` can be used to achieve the same result as `.Icon("cancel")`,
but `.Icon()` will spare you the need to set two CSS classes at the same time and will provides a certain level of abstraction.

#### Using a Button with no text

The Button will use an existing `span` element if it is supplied as `.Content()`, e.g. if the goal is to have a Button with no text. The `span` element must have a `k-sprite` CSS class.

* Razor

        @(Html.Kendo().Button()
            .Name("deleteButton")
            .SpriteCssClass("myDeleteClass")
            .Content("<span class='k-sprite'>Delete</span>"))
* WebForms

        <%= Html.Kendo().Button()
            .Name("deleteButton")
            .SpriteCssClass("myDeleteClass")
            .Content("<span class='k-sprite'>Delete</span>") %>

### Image icons

Image icons are applied via the `.ImageUrl()` property and are displayed as a `img` element.

#### Using `.ImageUrl()`

* Razor

        @(Html.Kendo().Button()
            .Name("imageButton")
            .ImageUrl("/images/myIcon.gif")
            .Content("Image button"))
* WebForms

        <%= Html.Kendo().Button()
            .Name("imageButton")
            .ImageUrl("/images/myIcon.gif")
            .Content("Image button") %>

The above configuration will produce the following HTML output:

    <button type="button" id="imageButton" class="k-button k-button-icontext"><img class="k-image" src="/images/myIcon.gif" alt="icon" />Image button</button>

#### Using `.ImageUrl()` with no text

An `img` tag should be placed inside the **Button** content. The image should have a `k-image` CSS class.

* Razor

        @(Html.Kendo().Button()
            .Name("iconButton")
            .ImageUrl("/images/myIcon.gif")
            .Content("<img class='k-image' alt='my icon' />"))
* WebForms

        <%= Html.Kendo().Button()
            .Name("iconButton")
            .ImageUrl("/images/myIcon.gif")
            .Content("<img class='k-image' alt='my icon' />") %>

## Enabled and Disabled buttons

The business logic of an application often requires a certain button to be temporarily disabled or enabled.
The **Button** can be configured to be initially disabled via its `.Enable()` setting.
The widget can also be disabled or enabled at any time with Javascript by using its `enable()` method with a boolean argument.

### Using `.Enable()`

* Razor

        @(Html.Kendo().Button()
            .Name("disabledButton")
            .Enable(false)
            .Content("Disabled button"))
* WebForms

        <%= Html.Kendo().Button()
            .Name("disabledButton")
            .Enable(false)
            .Content("Disabled button") %>

For more information on the **Button** [`enable` method](/api/web/button#methods-enable), please refer to the [Button API](/api/web/button/).

## Accessing the Button instance

Please refer to the **Button**'s [Getting Started](/web/button/overview/#accessing-the-button-instance) documentation page.