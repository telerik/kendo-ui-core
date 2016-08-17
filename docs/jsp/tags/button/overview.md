---
title: Overview
page_title: Overview | Button JSP Tag
description: "Get started with the Button JSP tag in Kendo UI."
slug: overview_button_uiforjsp
position: 1
---

# Button JSP Tag Overview

The Button JSP tag is a server-side wrapper for the [Kendo UI Button](/api/javascript/ui/button) widget.

## Getting Started

Make sure you are familiar with some of the fundamental [Kendo UI widget concepts]({% slug getting_started_installation_kendoui %}) and
that the [Kendo UI Java wrappers]({% slug overview_uiforjsp %}) are set up correctly.

### The Basics

The Button widget can be initialized from any element, defined via the `tag` attribute. However, using `button` or `a` elements is more reasonable. A `button` element is used by default, unless otherwise specified.

The Button can include both inline and block elements defined via `content`. One should take into account web standards, which prohibit placing block elements (e.g. `div`, `p`) inside inline elements (e.g. `a`, `span`).

### Initialization

Placing clickable elements with their own special behavior inside the Button, such as hyperlinks and textboxes among others, may cause undesired side effects.

The example below demonstrates how to initialize the Button by using the default `button` tag.

###### Example

    <kendo:button name="textButton" type="button" content="Text button">
    </kendo:button>

The example below demonstrates how to initialize the Button by using an `anchor` tag.

###### Example

    <kendo:button name="linkButton" tag="a" content="Link button">
    </kendo:button>

## Appearance

The Button can accommodate an icon, which enhances the meaning of the text content. The widget provides three ways to add an icon with a classic `img` element or with a background image, usually a sprite. From web standards' point of view, using background images is better, because the icon does not represent structural content, but is simply a decoration.

The Button supports three settings that help configure icons&mdash;`icon`, `spriteCssClass`, and `imageUrl`. Use only one at a time.

### Background Icons

Background icons are applied via the `icon` or `spriteCssClass` properties and are displayed as a background of a `span` element. The difference between the two settings is that `icon` is intended to be used for built-in Kendo UI icons, which are part of the theme sprite.

For a list of available icon names, refer to the [Icons demo](http://demos.telerik.com/kendo-ui/web/styling/icons.html).

#### The icon Property

The example below demonstrates how to use icons by applying the `icon` property.

###### Example

    <kendo:button name="cancelButton" type="button" icon="cancel" content="Cancel">
    </kendo:button>

The above configuration produces the HTML output shown below.

###### Example

    <button type="button" id="cancelButton" class="k-button k-button-icontext"><span class="k-icon k-cancel"></span>Cancel</button>

#### The spriteCssClass Property

The example below demonstrates how to use icons by applying the `spriteCssClass` property.

###### Example

    <kendo:button name="spriteButton" type="button" spriteCssClass="myIconClass" content="Sprite icon">
    </kendo:button>

The above configuration produces the HTML output shown below.

###### Example

    <button type="button" id="spriteButton" class="k-button k-button-icontext"><span class="k-sprite myIconClass"></span>Sprite button</button>

Technically, `spriteCssClass="k-icon k-cancel"` can be used to achieve the same result as `icon="cancel"`, but `icon` spares you the need to set two CSS classes at the same time and provides a certain level of abstraction.

### Image Icons

Image icons are applied via the `imageUrl` property and are displayed as an `img` element.

#### The imageUrl Tag

The example below demonstrates how to use the `imageUrl` property.

###### Example

    <kendo:button name="imageButton" type="button" imageUrl="${myIcon}" content="Image button">
    </kendo:button>

The above configuration produces the HTML output shown below.

###### Example

    <button type="button" id="imageButton" class="k-button k-button-icontext"><img class="k-image" src="/images/myIcon.gif" alt="icon" />Image button</button>

#### The img Tag

An `img` tag should be placed inside the Button content. The image should have a `k-image` CSS class.

The example below demonstrates how to use the `imageUrl` property with no text.

###### Example

    <kendo:button name="imageButton" type="button" imageUrl="${myIcon}" content="<img class='k-image' alt='my icon' />">
    </kendo:button>

### Buttons without Text

The Button uses an existing `span` element if it is supplied as `content`, e.g. if the goal is to have a Button with no text. The `span` element must have a `k-sprite` CSS class.

###### Example

    <kendo:button name="deleteButton" type="button" spriteCssClass="myDeleteClass" content="<span class='k-sprite'>Delete</span>">
    </kendo:button>

## Features

### Enable and Disable Buttons

The business logic of an application often requires a certain button to be temporarily disabled or enabled. The Button can be configured to be initially disabled via its `enable` setting. The widget can also be disabled or enabled at any time with JavaScript by using its `enable` method with a Boolean argument.

The example below demonstrates how to use the `enable` method.

###### Example

    <kendo:button name="disabledButton" type="button" enable="false" content="Disabled button">
    </kendo:button>

For more information on the [`enable` method of the Button](/api/javascript/ui/button#methods-enable), refer to the [Button API](/api/javascript/ui/button).

## Reference

### Existing Instance

To reference an existing Button instance, refer to the [introductory article on the Button]({% slug overview_kendoui_button_widget %}#reference).

## See Also

Other articles on Telerik UI for JSP and on the Button:

* [Overview of the Kendo UI Button Widget]({% slug overview_kendoui_button_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
