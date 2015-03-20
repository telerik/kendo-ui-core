---
title: Overview
page_title: Button PHP wrapper for Kendo UI Button widget | Kendo UI documentation
description: Getting started with Button PHP wrapper in quick steps - configure Kendo UI Button widget and operate Kendo UI Button events.
---

# Button

The Button PHP class is a server-side wrapper for the [Kendo UI Button](/api/web/button) widget.

It is assumed that the reader of this page is familiar with the fundamental [Kendo UI widget concepts](/widgets) and
the [Kendo UI PHP wrappers](/php/introduction) are setup correctly.

## Getting Started

The **Button** widget can be initialized from any element, defined via the `tag` property. However, using `button` or `a` elements is more reasonable. A `button` element is used by default, unless otherwise specified.

The **Button** can include both inline and block elements defined via `content`. One should take into account web standards, which prohibit placing block elements (e.g. `div`, `p`) inside inline elements (e.g. `a`, `span`).

Placing clickable elements with their own special behavior inside the **Button** (e.g. hyperlinks, textboxes, etc) may cause undesired side efects.

### Button initialization examples

#### Using the default `button` tag

    $textButton = new \Kendo\UI\Button('textButton');
    $textButton->attr('type', 'button')
               ->content('Text button');

    echo $textButton->render();

#### Using an `anchor` tag

    $linkButton = new \Kendo\UI\Button('linkButton');
    $linkButton->tag('a')
               ->content('Link button');

    echo $linkButton->render();

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

    $kendoIconButton = new \Kendo\UI\Button('cancelButton');
    $kendoIconButton->attr('type', 'button')
                    ->icon('cancel')
                    ->content('Cancel');

    echo $kendoIconButton->render();

The above configuration will produce the following HTML output:

    <button type="button" id="cancelButton" class="k-button k-button-icontext"><span class="k-icon k-cancel"></span>Cancel</button>

#### Using `spriteCssClass`

    $spriteButton = new \Kendo\UI\Button('spriteButton');
    $spriteButton->attr('type', 'button')
               ->spriteCssClass('myIconClass')
               ->content('Sprite button');

    echo $iconButton->render();

The above configuration will produce the following HTML output:

    <button type="button" id="spriteButton" class="k-button k-button-icontext"><span class="k-sprite myIconClass"></span>Sprite Button</button>
        
Technically, `spriteCssClass="k-icon k-cancel"` can be used to achieve the same result as `icon="cancel"`,
but `icon` will spare you the need to set two CSS classes at the same time and will provides a certain level of abstraction.

#### Using a Button with no text

The Button will use an existing `span` element if it is supplied as `content`, e.g. if the goal is to have a Button with no text. The `span` element must have a `k-sprite` CSS class.

    $deleteButton = new \Kendo\UI\Button('deleteButton');
    $deleteButton->attr('type', 'button')
               ->spriteCssClass('myDeleteClass')
               ->content('<span class="k-sprite">Delete</span>');

    echo $deleteButton->render();

### Image icons

Image icons are applied via the `imageUrl` property and are displayed as a `img` element.

#### Using `imageUrl`

    $imageButton = new \Kendo\UI\Button('imageButton');
    $imageButton->attr('type', 'button')
                ->imageUrl('/images/myIcon.gif')
                ->content('Image button');

    echo $imageButton->render();

The above configuration will produce the following HTML output:

    <button type="button" id="imageButton" class="k-button k-button-icontext"><img class="k-image" src="/images/myIcon.gif" alt="icon" />Image button</button>

#### Using `imageUrl` with no text

An `img` tag should be placed inside the **Button** content. The image should have a `k-image` CSS class.

    $imageButton = new \Kendo\UI\Button('imageButton');
    $imageButton->attr('type', 'button')
                ->imageUrl('/images/myIcon.gif')
                ->content('<img alt="image" class="k-image" />');

    echo $imageButton->render();

## Enabled and Disabled buttons

The business logic of an application often requires a certain button to be temporarily disabled or enabled.
The **Button** can be configured to be initially disabled via its `enable` setting.
The widget can also be disabled or enabled at any time with Javascript by using its `enable` method with a boolean argument.

### Using `enable`

    $disabledButton = new \Kendo\UI\Button('disabledButton');
    $disabledButton->attr('type', 'button')
               ->enable(false)
               ->content('Disabled button');

    echo $disabledButton->render();

For more information on the **Button** [`enable` method](/api/web/button#methods-enable), please refer to the [Button API](/api/web/button/).

## Accessing the Button instance

Please refer to the **Button**'s [Getting Started](/web/button/overview/#accessing-the-button-instance) documentation page.