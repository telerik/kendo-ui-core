---
title: Cards
page_title: Cards | Kendo UI Styles and Appearance
description: "Learn how to use the Kendo UI card class to render a flexible content container."
slug: cards_kendouistyling
position: 9
---

# Cards Overview

The Kendo UI Card is a set of classes that provide a way of defining flexible content containers. A card can consist of a header, body and actions and can also accommodate images, lists, groups, separators and more.

## Card Building Blocks

Cards can be built by utilizing the `.k-card` class which provides the ability to utilize a wide variety of content:

```html
<div class="k-card">
  ...
</div>
```

### Header

A card can have an optional header through the `.k-card-header` class. It can include a title and/or a subtitle.

* Adding a title requires the `.k-card-title` class to an `h` element.
* Adding a subtitle requires the `.k-card-subtitle` class to an `h` element.

```dojo
 <div class="k-card">
    <div class="k-card-header">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
    </div>
    <div class="k-card-body">
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
</div>
```

Titles and subtitles can also be used outside of the header:

```dojo
<div class="k-card">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="k-card-actions">
        <span class="k-button k-flat k-primary">Action 1</span>
        <span class="k-button k-flat k-primary">Action 2</span>
    </div>
</div>
```

### Body

The main content of a card is the body which can be defined through the `.k-card-body` class:

```dojo
<div class="k-card">
    <div class="k-card-body">
        <p>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </p>
    </div>
</div>
```

### Actions

A list of actions could be added to a card through the `.k-card-actions` class:

```dojo
<div class="k-card">
    <div class="k-card-header">
        Card Header
    </div>
    <div class="k-card-body">
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="k-card-actions">
        <span class="k-button k-flat k-primary">Action 1</span>
        <span class="k-button k-flat k-primary">Action 2</span>
    </div>
</div>
```

Each action could be wrapped in a `.k-card-action` container to have consistent styling:

```dojo
<div class="k-card">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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

The actions can be stretched to take the entire container by adding the `.k-card-actions-stretched`:

```dojo
<div class="k-card">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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

The actions can also be forced to display vertically through the `.k-card-actions-vertical` class:

```dojo
<div class="k-card">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="k-card-actions k-card-actions-vertical">
        <span class="k-card-action"><span class="k-button k-flat k-primary">Action 1</span></span>
        <span class="k-card-action"><span class="k-button k-flat k-primary">Action 2</span></span>
    </div>
</div>
```

### Images

Cards support images through the `.k-card-image` class:

```dojo
<div class="k-card">
    <div class="k-card-header">
            Card Header
    </div>
    <img class="k-card-image" />
    <div class="k-card-body">
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
</div>
```

### Separators

Cards support images through the `.k-hr` class:

```dojo
<div class="k-card">
    <div class="k-columnset k-flex-auto">
        <div class="k-card-body">
            <h5 class="k-card-title">Card Title</h5>
            <h6 class="k-card-subtitle">Card Subtitle</h6>
            <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <hr class="k-hr" />
        <div class="k-card-body">
            <h5 class="k-card-title">Card Title</h5>
            <h6 class="k-card-subtitle">Card Subtitle</h6>
            <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
    </div>
</div>
```

## Layout

Cards have three additional classes that are useful for laying out series of cards:

### Card List

Rendering cards detached from one another in a column through the `.k-card-list` class:

```dojo
    <div class="k-card-list">
        <div class="k-card">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
        <div class="k-card">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
        <div class="k-card">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
    </div>
```

### Card Group

Rendering cards attached to one another on a single row through the `.k-card-group` class:

```dojo
    <div class="k-card-group">
        <div class="k-card">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
        <div class="k-card">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
        <div class="k-card">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
    </div>
```

### Card Deck

Rendering cards detached from one another on a single row through the `.k-card-deck` class:

```dojo
    <div class="k-card-deck">
        <div class="k-card">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
        <div class="k-card">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
        <div class="k-card">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div class="k-card-actions">
                <span class="k-button k-flat k-primary">Action 1</span>
                <span class="k-button k-flat k-primary">Action 2</span>
            </div>
        </div>
    </div>
```

## Card Styles

Cards have several pre-defined state classes that change their appearance:

```dojo
<div class="k-card k-state-primary">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title Primary</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="k-card-actions">
        <span class="k-button k-flat k-primary">Action 1</span>
        <span class="k-button k-flat k-primary">Action 2</span>
    </div>
</div>

<div class="k-card k-state-info">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title Info</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="k-card-actions">
        <span class="k-button k-flat k-primary">Action 1</span>
        <span class="k-button k-flat k-primary">Action 2</span>
    </div>
</div>

<div class="k-card k-state-success">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title Success</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="k-card-actions">
        <span class="k-button k-flat k-primary">Action 1</span>
        <span class="k-button k-flat k-primary">Action 2</span>
    </div>
</div>

<div class="k-card k-state-warning">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title Warning</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="k-card-actions">
        <span class="k-button k-flat k-primary">Action 1</span>
        <span class="k-button k-flat k-primary">Action 2</span>
    </div>
</div>

<div class="k-card k-state-error">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title Error</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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





