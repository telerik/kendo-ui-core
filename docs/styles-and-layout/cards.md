---
title: Cards
page_title: Cards | Kendo UI Styles and Appearance
description: "Learn how to use the Kendo UI card class to render a flexible content container."
slug: cards_kendouistyling
position: 9
---

# Cards

The Kendo UI Card is a set of classes that define flexible content containers.

A card can consist of a header, a body, and actions and can also accommodate images, lists, groups, separators, and more.

## Getting Started

To build a card, utilize the `.k-card` class which enables you to use a wide variety of content.

```html
<div class="k-card">
  ...
</div>
```

## Building Blocks

The Card can accommodate the following elements:

* [Header](#header)
* [Body](#body)
* [Footer](#footer)
* [Actions](#actions)
* [Media](#media)
* [Separators](#separators)

### Header

The header of the Card is an optional element. To render a Card header, use the `.k-card-header` class which can include a title and a subtitle.

* Adding a title requires you to set the `.k-card-title` class to an `h` element.
* Adding a subtitle requires you to set the `.k-card-subtitle` class to an `h` element.

```dojo
 <div class="k-card" style="width: 300px;">
    <div class="k-card-header">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
    </div>
    <div class="k-card-body">
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
</div>
```

You can also use titles and subtitles outside the header.

```dojo
<div class="k-card" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-card-actions">
        <span class="k-button k-flat k-primary">Action 1</span>
        <span class="k-button k-flat k-primary">Action 2</span>
    </div>
</div>
```

### Body

The main content of a card is the body which can be defined through the `.k-card-body` class.

```dojo
<div class="k-card" style="width: 300px;">
    <div class="k-card-body">
        <p>
            Some quick example text to build on the card title and make up the bulk of the card content.
        </p>
    </div>
</div>
```

### Footer

The main content of a card is the body which can be defined through the `.k-card-body` class.

```dojo
<div class="k-card" style="width: 300px;">
    <div class="k-card-footer">
        <span>Card Footer</span>
    </div>
</div>
```

### Actions

You can add a list of actions to a Card by using the `.k-card-actions` class.

```dojo
<div class="k-card" style="width: 300px;">
    <div class="k-card-header">
        Card Header
    </div>
    <div class="k-card-body">
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-card-actions">
        <span class="k-button k-flat k-primary">Action 1</span>
        <span class="k-button k-flat k-primary">Action 2</span>
    </div>
</div>
```

To achieve a consistent styling, each action can be wrapped in a `.k-card-action` container.

```dojo
<div class="k-card" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-card-actions">
        <span class="k-card-action">
            <span class="k-button k-flat k-primary">Action 1</span>
        </span>
        <span class="k-card-action">
            <span class="k-button k-flat k-primary">Action 2</span>
        </span>
    </div>
</div>
```

The actions can be stretched to take the entire container by adding the `.k-card-actions-stretched` class.

```dojo
<div class="k-card" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-card-actions k-card-actions-stretched">
        <span class="k-card-action">
            <span class="k-button k-flat k-primary">Action 1</span>
        </span>
        <span class="k-card-action">
            <span class="k-button k-flat k-primary">Action 2</span>
        </span>
    </div>
</div>
```

The actions can be centered inside the container by adding the `.k-card-actions-center` class:

```dojo
<div class="k-card" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-card-actions k-card-actions-center">
        <span class="k-card-action">
            <span class="k-button k-flat k-primary">Action 1</span>
        </span>
        <span class="k-card-action">
            <span class="k-button k-flat k-primary">Action 2</span>
        </span>
    </div>
</div>
```

The actions can be aligned at the start of the container with the `.k-card-actions-start` class:

```dojo
<div class="k-card" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-card-actions k-card-actions-start">
        <span class="k-card-action">
            <span class="k-button k-flat k-primary">Action 1</span>
        </span>
        <span class="k-card-action">
            <span class="k-button k-flat k-primary">Action 2</span>
        </span>
    </div>
</div>
```

The actions can be aligned at the end of the container with the `.k-card-actions-end` class:

```dojo
<div class="k-card" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-card-actions k-card-actions-end">
        <span class="k-card-action">
            <span class="k-button k-flat k-primary">Action 1</span>
        </span>
        <span class="k-card-action">
            <span class="k-button k-flat k-primary">Action 2</span>
        </span>
    </div>
</div>
```

The actions can also be forced to display vertically through the `.k-card-actions-vertical` class.

```dojo
<div class="k-card" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-card-actions k-card-actions-vertical">
        <span class="k-card-action"><span class="k-button k-flat k-primary">Action 1</span></span>
        <span class="k-card-action"><span class="k-button k-flat k-primary">Action 2</span></span>
    </div>
</div>
```

### Media

The Cards allows you to display an image or video within its content.

Images can be added through the `.k-card-image` class.

```
<div class="k-card" style="width: 300px;">
    <div class="k-card-header">
            Card Header
    </div>
    <img class="k-card-image" />
    <div class="k-card-body">
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
</div>
```

Videos can be added through the `.k-card-media` class.

```
<div class="k-card k-card-vertical">
    <div class="k-card-header k-display-flex k-align-items-center ">
        <h5 class="k-card-title">DevReach</h5>
    </div>
    <iframe height="267" src="https://www.youtube.com/embed/00EMMRFocNs" class="k-card-media"></iframe>
    <div class="k-card-body">
        <p><strong>DevReach 2019 Day 2 Morning Keynote:</strong> Technical Leadership: Lessons Learned at NASA with Jody Davis</p>
    </div>
    <span class="k-card-separator"></span>
    <div class="k-card-actions">
        <span class="k-button k-flat k-button-icon"><span class="k-icon k-i-heart-outline"></span></span>
        <span class="k-button k-flat k-button-icon"><span class="k-icon k-i-comment"></span></span>
        <span class="k-button k-flat k-button-icon"><span class="k-icon k-i-share"></span></span>
    </div>
</div>
```

### Separators

To include Card separators, use the `.k-card-separator` class.

```dojo
<div class="k-card" style="width: 300px;">
    <div class="k-columnset k-flex-auto">
        <div class="k-card-body">
            <h5 class="k-card-title">Card Title</h5>
            <h6 class="k-card-subtitle">Card Subtitle</h6>
            <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
        </div>
        <hr class="k-card-separator" />
        <div class="k-card-body">
            <h5 class="k-card-title">Card Title</h5>
            <h6 class="k-card-subtitle">Card Subtitle</h6>
            <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
        </div>
    </div>
</div>
```

To specify a vertical orientation for the separator add the `.k-card-separator-vertical` class to the separator element.

## Layout

Cards expose additional classes that are used for laying out series of cards.

### Rendering Lists of Cards

To render cards that are detached from one another in a column, use the `.k-card-list` class.

```dojo
    <div class="k-card-list">
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
    </div>
```

### Rendering Groups of Cards

To render Cards that are attached to one another on a single row, use the `.k-card-group` class.

```dojo
    <div class="k-card-group">
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
    </div>
```

### Rendering Decks of Cards

To render Cards that are detached from one another on a single row, use the `.k-card-deck` class.

```dojo
    <div class="k-card-deck">
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
    </div>
```

### Custom layout

Positioning a horizontal flex container element inside the card could be achieved with the `.k-hbox` class:

```
<div class="k-card k-card-horizontal">
    <div class="k-card-header">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
    </div>
    <div class="k-hbox">
        <div class="k-card-body">
            <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <div class="k-card-actions k-card-actions-stretched k-card-actions-horizontal">
            <span class="k-button k-flat">Action 1</span>
            <span class="k-button k-flat k-primary">Action 2</span>
        </div>
    </div>
</div>
```

Positioning a vertical flex container element inside the card could be achieved with the `.k-vbox` class:

```
<div class="k-card k-card-horizontal">
    <div class="k-vbox">
        <div class="k-card-header">
            <h5 class="k-card-title">Card Title</h5>
            <h6 class="k-card-subtitle">Card Subtitle</h6>
        </div>
        <div class="k-card-body">
            <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <div class="k-card-actions k-card-actions-stretched k-card-actions-horizontal">
            <span class="k-button k-flat">Action 1</span>
            <span class="k-button k-flat k-primary">Action 2</span>
        </div>
    </div>
</div>
```

### Orientation

The Card content can be arranged vertically or horizontally through the `.k-card-vertical` and `.k-card-horizontal` classes:

```
<div class="k-card k-card-vertical k-text-center">
    <div class="k-card-header">
        <h5 class="k-card-title">Sofia</h5>
        <h6 class="k-card-subtitle">Sunny</h6>
    </div>
    <div class="k-card-body">
        <div>2&ordm;C</div>
    </div>
    <div class="k-card-actions k-card-actions-stretched k-card-actions-horizontal">
        <button class="k-button k-flat">Action 1</button>
        <button class="k-button k-primary k-flat">Action 2</button>
    </div>
</div>
```

## Styles

Cards provide predefined state classes that you can use to change the Card appearance.

```
<div class="k-card k-state-primary" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title Primary</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-card-actions">
        <span class="k-button k-flat k-primary">Action 1</span>
        <span class="k-button k-flat k-primary">Action 2</span>
    </div>
</div>

<div class="k-card k-state-info" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title Info</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-card-actions">
        <span class="k-button k-flat k-primary">Action 1</span>
        <span class="k-button k-flat k-primary">Action 2</span>
    </div>
</div>

<div class="k-card k-state-success" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title Success</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-card-actions">
        <span class="k-button k-flat k-primary">Action 1</span>
        <span class="k-button k-flat k-primary">Action 2</span>
    </div>
</div>

<div class="k-card k-state-warning" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title Warning</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-card-actions">
        <span class="k-button k-flat k-primary">Action 1</span>
        <span class="k-button k-flat k-primary">Action 2</span>
    </div>
</div>

<div class="k-card k-state-error" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title Error</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-card-actions">
        <span class="k-button k-flat k-primary">Action 1</span>
        <span class="k-button k-flat k-primary">Action 2</span>
    </div>
</div>
```

## See Also

* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Responsive Web Design]({% slug responsivewebdesign_integration_kendoui %})
* [Web Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
* [Sass ThemeBuilder Overview]({% slug sassbasedthemes_kendoui %}#sass-theme-builder)
* [Less ThemeBuilder Overview]({% slug themesandappearnce_kendoui_desktopwidgets %}#less-theme-builder)
* [Rendering Modes for Data Visualization]({% slug renderingmodesfor_datavisualization_kendouistyling %})
