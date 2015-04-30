---
title: Overview
page_title: Button JSP tag for Kendo UI Button widget | Kendo UI documentation
description: Getting started with Button JSP tag extension in quick steps - configure Kendo UI Button widget and operate Kendo UI Button events.
---

# Button

The Button JSP tag is a server-side wrapper for the [Kendo UI Button](/api/web/button) widget.

It is assumed that the reader of this page is familiar with the fundamental [Kendo UI widget concepts](/widgets) and
the [Kendo UI Java wrappers](/jsp/introduction) are setup correctly.

## Getting Started

The **Button** widget can be initialized from any element, defined via the `tag` attribute. However, using `button` or `a` elements is more reasonable. A `button` element is used by default, unless otherwise specified.

The **Button** can include both inline and block elements defined via `content`. One should take into account web standards, which prohibit placing block elements (e.g. `div`, `p`) inside inline elements (e.g. `a`, `span`).

Placing clickable elements with their own special behavior inside the **Button** (e.g. hyperlinks, textboxes, etc) may cause undesired side efects.

### Button initialization examples

#### Using the default `button` tag

    <kendo:button name="textButton" type="button" content="Text button">
    </kendo:button>

#### Using an `anchor` tag

    <kendo:button name="linkButton" tag="a" content="Link button">
    </kendo:button>

## Using Icons

The **Button** can accommodate an icon, which enhances the meaning of the text content.
The widget provides three ways to add an icon with a classic `img` element or with a background image (usually a sprite).
From web standarts' point of view, using background images is better, because the icon does not represent structural content, but it's simply a decoration.

There are three settings, which the **Button** provides for configuring icons - `icon`, `spriteCssClass` and `imageUrl`. Only one should be used at a time.

### Background icons

Background icons are applied via the `icon` or `spriteCssClass` properties and are displayed as a background of a `span` element.

The difference between the two settings is that `icon` is intended to be used for built-in Kendo UI icons, which are part of the theme sprite.
For a list of available icon names, please refer to the [Icons demo](http://demos.telerik.com/kendo-ui/web/styling/icons.html).

#### Using `icon`

    <kendo:button name="cancelButton" type="button" icon="cancel" content="Cancel">
    </kendo:button>

The above configuration will produce the following HTML output:

    <button type="button" id="cancelButton" class="k-button k-button-icontext"><span class="k-icon k-cancel"></span>Cancel</button>

#### Using `spriteCssClass`

    <kendo:button name="spriteButton" type="button" spriteCssClass="myIconClass" content="Sprite icon">
    </kendo:button>

The above configuration will produce the following HTML output:

    <button type="button" id="spriteButton" class="k-button k-button-icontext"><span class="k-sprite myIconClass"></span>Sprite button</button>
        
Technically, `spriteCssClass="k-icon k-cancel"` can be used to achieve the same result as `icon="cancel"`,
but `icon` will spare you the need to set two CSS classes at the same time and will provides a certain level of abstraction.

#### Using a Button with no text

The Button will use an existing `span` element if it is supplied as `content`, e.g. if the goal is to have a Button with no text. The `span` element must have a `k-sprite` CSS class.

    <kendo:button name="deleteButton" type="button" spriteCssClass="myDeleteClass" content="<span class='k-sprite'>Delete</span>">
    </kendo:button>

### Image icons

Image icons are applied via the `imageUrl` property and are displayed as a `img` element.

#### Using `imageUrl`

    <kendo:button name="imageButton" type="button" imageUrl="${myIcon}" content="Image button">
    </kendo:button>

The above configuration will produce the following HTML output:

    <button type="button" id="imageButton" class="k-button k-button-icontext"><img class="k-image" src="/images/myIcon.gif" alt="icon" />Image button</button>

#### Using `imageUrl` with no text

An `img` tag should be placed inside the **Button** content. The image should have a `k-image` CSS class.

    <kendo:button name="imageButton" type="button" imageUrl="${myIcon}" content="<img class='k-image' alt='my icon' />">
    </kendo:button>

## Enabled and Disabled buttons

The business logic of an application often requires a certain button to be temporarily disabled or enabled.
The **Button** can be configured to be initially disabled via its `enable` setting.
The widget can also be disabled or enabled at any time with Javascript by using its `enable` method with a boolean argument.

### Using `enable`

    <kendo:button name="disabledButton" type="button" enable="false" content="Disabled button">
    </kendo:button>

For more information on the **Button** [`enable` method](/api/web/button#methods-enable), please refer to the [Button API](/api/web/button/).

## Accessing the Button instance

Please refer to the **Button**'s [Getting Started](/web/button/overview/#accessing-the-button-instance) documentation page.