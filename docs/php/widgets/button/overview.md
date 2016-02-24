---
title: Overview
page_title: Overview | Button PHP Class
description: "Get started with the Button PHP class in Kendo UI."
slug: overview_button_uiforphp
position: 1
---

# Button PHP Class Overview

The Kendo UI Button for PHP is a server-side wrapper for the [Kendo UI Button](/api/javascript/ui/button) widget.

## Getting Started

Make sure you are familiar with some of the fundamental [Kendo UI widget concepts]({% slug initialize_widgets_using_jquery_plugins_installation %}) and that the [Kendo UI PHP wrappers]({% slug overview_uiforphp %}) are setup correctly.

### The Basics

The Button widget can be initialized from any element, defined via the `tag` property. However, using `button` or `a` elements is more reasonable. A `button` element is used by default, unless otherwise specified.

The Button can include both inline and block elements defined via `content`. One should take into account web standards, which prohibit placing block elements (e.g. `div`, `p`) inside inline elements (e.g. `a`, `span`).

### Initialization

Placing clickable elements with their own special behavior inside the Button, such as hyperlinks and textboxes among others, may cause undesired side effects.

The example below demonstrates how to initialize the Button by using the default `button` tag.

###### Example

    $textButton = new \Kendo\UI\Button('textButton');
    $textButton->attr('type', 'button')
               ->content('Text button');

    echo $textButton->render();

The example below demonstrates how to initialize the Button by using an `anchor` tag.

###### Example

    $linkButton = new \Kendo\UI\Button('linkButton');
    $linkButton->tag('a')
               ->content('Link button');

    echo $linkButton->render();

## Appearance

The Button can accommodate an icon, which enhances the meaning of the text content. The widget provides three ways to add an icon with a classic `img` element or with a background image, usually a sprite. From web standards' point of view, using background images is better, because the icon does not represent structural content, but is simply a decoration.

The Button supports three settings that help configure icons&mdash;`icon`, `spriteCssClass`, and `imageUrl`. Use only one at a time.

### Background Icons

Background icons are applied via the `icon` or `spriteCssClass` properties and are displayed as a background of a `span` element. The difference between the two settings is that `icon` is intended to be used for built-in Kendo UI icons, which are part of the theme sprite.

For a list of available icon names, refer to the [Icons demo](http://demos.telerik.com/kendo-ui/web/styling/icons.html).

#### The icon Property

The example below demonstrates how to use icons by applying the `icon` property.

###### Example

    $kendoIconButton = new \Kendo\UI\Button('cancelButton');
    $kendoIconButton->attr('type', 'button')
                    ->icon('cancel')
                    ->content('Cancel');

    echo $kendoIconButton->render();

The above configuration produces the HTML output shown below.

###### Example

    <button type="button" id="cancelButton" class="k-button k-button-icontext"><span class="k-icon k-cancel"></span>Cancel</button>

#### The spriteCssClass Property

The example below demonstrates how to use icons by applying the `spriteCssClass` property.

###### Example

    $spriteButton = new \Kendo\UI\Button('spriteButton');
    $spriteButton->attr('type', 'button')
               ->spriteCssClass('myIconClass')
               ->content('Sprite button');

    echo $iconButton->render();

The above configuration produces the HTML output shown below.

###### Example

    <button type="button" id="spriteButton" class="k-button k-button-icontext"><span class="k-sprite myIconClass"></span>Sprite Button</button>

Technically, `spriteCssClass="k-icon k-cancel"` can be used to achieve the same result as `icon="cancel"`, but `icon` spares you the need to set two CSS classes at the same time and provides a certain level of abstraction.

### Image Icons

Image icons are applied via the `imageUrl` property and are displayed as an `img` element.

#### The imageUrl Tag

The example below demonstrates how to use the `imageUrl` property.

###### Example

    $imageButton = new \Kendo\UI\Button('imageButton');
    $imageButton->attr('type', 'button')
                ->imageUrl('/images/myIcon.gif')
                ->content('Image button');

    echo $imageButton->render();

The above configuration produces the HTML output shown below.

###### Example

    <button type="button" id="imageButton" class="k-button k-button-icontext"><img class="k-image" src="/images/myIcon.gif" alt="icon" />Image button</button>

#### The imageUrl without Text

An `img` tag should be placed inside the **Button** content. The image should have a `k-image` CSS class.

###### Example

    $imageButton = new \Kendo\UI\Button('imageButton');
    $imageButton->attr('type', 'button')
                ->imageUrl('/images/myIcon.gif')
                ->content('<img alt="image" class="k-image" />');

    echo $imageButton->render();    

### Buttons without Text

The Button uses an existing `span` element if it is supplied as `content`, e.g. if the goal is to have a Button with no text. The `span` element must have a `k-sprite` CSS class.

###### Example

    $deleteButton = new \Kendo\UI\Button('deleteButton');
    $deleteButton->attr('type', 'button')
               ->spriteCssClass('myDeleteClass')
               ->content('<span class="k-sprite">Delete</span>');

    echo $deleteButton->render();

## Features

### Enable and Disable Buttons

The business logic of an application often requires a certain button to be temporarily disabled or enabled. The Button can be configured to be initially disabled via its `enable` setting. The widget can also be disabled or enabled at any time with JavaScript by using its `enable` method with a Boolean argument.

The example below demonstrates how to use the `enable` method.

###### Example

    $disabledButton = new \Kendo\UI\Button('disabledButton');
    $disabledButton->attr('type', 'button')
               ->enable(false)
               ->content('Disabled button');

    echo $disabledButton->render();

For more information on the [`enable` method of the Button](/api/javascript/ui/button#methods-enable), refer to the [Button API](/api/javascript/ui/button).

## Reference

### Existing Instances

To reference an existing Button instance, refer to the [introductory article on the Button]({% slug overview_kendoui_button_widget %}#reference).

## See Also

Other articles on Telerik UI for PHP and on the Button:

* [Overview of the Kendo UI Button Widget]({% slug overview_kendoui_button_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
