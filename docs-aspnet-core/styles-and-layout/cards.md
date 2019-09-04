---
title: Cards
page_title: Cards | Telerik UI for ASP.NET Core Styles and Appearance
description: "Learn how to use the Telerik UI card class to render a flexible content container in Telerik UI for ASP.NET Core applications."
slug: cards_aspnetmvc6_aspnetmvc
position: 1
---

# Cards Overview

The Telerik UI Card is a set of classes that provide a way of defining flexible content containers. A card can consist of a header, body and actions and can also accommodate images, lists, groups, separators and more.

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

```
 <div class="k-card" style="width: 300px;">
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

```
<div class="k-card" style="width: 300px;">
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

```
<div class="k-card" style="width: 300px;">
    <div class="k-card-body">
        <p>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </p>
    </div>
</div>
```

### Actions

A list of actions could be added to a card through the `.k-card-actions` class:

```
<div class="k-card" style="width: 300px;">
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

```
<div class="k-card" style="width: 300px;">
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

```
<div class="k-card" style="width: 300px;">
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

```
<div class="k-card" style="width: 300px;">
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

```
<div class="k-card" style="width: 300px;">
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

```
<div class="k-card" style="width: 300px;">
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

```
    <div class="k-card-list">
        <div class="k-card" style="width: 300px;">
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
        <div class="k-card" style="width: 300px;">
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
        <div class="k-card" style="width: 300px;">
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

```
    <div class="k-card-group">
        <div class="k-card" style="width: 300px;">
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
        <div class="k-card" style="width: 300px;">
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
        <div class="k-card" style="width: 300px;">
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

```
    <div class="k-card-deck">
        <div class="k-card" style="width: 300px;">
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
        <div class="k-card" style="width: 300px;">
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
        <div class="k-card" style="width: 300px;">
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

```
<div class="k-card k-state-primary" style="width: 300px;">
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

<div class="k-card k-state-info" style="width: 300px;">
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

<div class="k-card k-state-success" style="width: 300px;">
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

<div class="k-card k-state-warning" style="width: 300px;">
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

<div class="k-card k-state-error" style="width: 300px;">
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
