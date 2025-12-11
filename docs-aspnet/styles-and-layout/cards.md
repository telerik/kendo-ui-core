---
title: Cards
page_title: Cards
description: Learn how to use the Telerik UI card class to render a flexible content container in {{ site.product }} applications.
components: ["general"]
slug: cards_aspnetmvc6_aspnetmvc
previous_url: /knowledge-base/cards
position: 10
---

# Cards

The Telerik UI Cards for {{ site.framework }} is a set of classes that define flexible content containers.

A card can consist of a header, a body, and actions and can also accommodate images, lists, groups, separators, and more.

To build a card, utilize the `.k-card` class, which enables you to use a wide variety of content.

```html
<div class="k-card">
  ...
</div>
```

## Building Blocks

The Card can accommodate the following elements:

* [Header](#header)
* [Body](#body)
* [Actions](#actions)
* [Images](#images)
* [Separators](#separators)

### Header

The header of the Card is an optional element. To render a Card header, use the `.k-card-header` class which can include a title and a subtitle.

* Adding a title requires you to set the `.k-card-title` class to an `h` element.
* Adding a subtitle requires you to set the `.k-card-subtitle` class to an `h` element.

```html
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

```html
<div class="k-card" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-actions k-card-actions">
        <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
        <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
    </div>
</div>
```

### Body

The main content of a card is the body which can be defined through the `.k-card-body` class.

```html
<div class="k-card" style="width: 300px;">
    <div class="k-card-body">
        <p>
            Some quick example text to build on the card title and make up the bulk of the card content.
        </p>
    </div>
</div>
```

### Actions

You can add a list of actions to a Card by using the `.k-actions k-card-actions` class.

```html
<div class="k-card" style="width: 300px;">
    <div class="k-card-header">
        Card Header
    </div>
    <div class="k-card-body">
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-actions k-card-actions">
        <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
        <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
    </div>
</div>
```

To achieve a consistent styling, each action can be wrapped in a `.k-card-action` container.

```html
<div class="k-card" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-actions k-card-actions">
        <span class="k-card-action">
            <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
        </span>
        <span class="k-card-action">
            <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
        </span>
    </div>
</div>
```

The actions can be stretched to take the entire container by adding the `.k-actions-stretched`.

```html
<div class="k-card" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-actions k-card-actions k-actions-stretched">
        <span class="k-card-action">
            <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
        </span>
        <span class="k-card-action">
            <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
        </span>
    </div>
</div>
```

The actions can also be forced to display vertically through the `.k-actions-vertical` class.

```html
<div class="k-card" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-actions k-card-actions k-actions-vertical">
        <span class="k-card-action"><span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span></span>
        <span class="k-card-action"><span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span></span>
    </div>
</div>
```

### Images

Cards support images through the `.k-card-media` class.

```html
<div class="k-card" style="width: 300px;">
    <div class="k-card-header">
            Card Header
    </div>
    <img class="k-card-media" />
    <div class="k-card-body">
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
</div>
```

### Separators

To include Card separators, use the `.k-hr` class.

```html
<div class="k-card" style="width: 300px;">
    <div class="k-columnset k-flex-auto">
        <div class="k-card-body">
            <h5 class="k-card-title">Card Title</h5>
            <h6 class="k-card-subtitle">Card Subtitle</h6>
            <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
        </div>
        <hr class="k-hr" />
        <div class="k-card-body">
            <h5 class="k-card-title">Card Title</h5>
            <h6 class="k-card-subtitle">Card Subtitle</h6>
            <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
        </div>
    </div>
</div>
```

## Layout

Cards expose additional classes that are used for laying out series of cards.

### Rendering Lists of Cards

To render cards that are detached from one another in a column, use the `.k-card-list` class.

```html
    <div class="k-card-list">
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-actions k-card-actions">
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
            </div>
        </div>
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-actions k-card-actions">
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
            </div>
        </div>
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-actions k-card-actions">
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
            </div>
        </div>
    </div>
```

### Rendering Groups of Cards

To render Cards that are attached to one another on a single row, use the `.k-card-group` class.

```html
    <div class="k-card-group">
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-actions k-card-actions">
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
            </div>
        </div>
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-actions k-card-actions">
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
            </div>
        </div>
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-actions k-card-actions">
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
            </div>
        </div>
    </div>
```

### Rendering Decks of Cards

To render Cards that are detached from one another on a single row, use the `.k-card-deck` class.

```html
    <div class="k-card-deck">
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-actions k-card-actions">
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
            </div>
        </div>
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-actions k-card-actions">
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
            </div>
        </div>
        <div class="k-card" style="width: 300px;">
            <div class="k-card-body">
                <h5 class="k-card-title">Card Title</h5>
                <h6 class="k-card-subtitle">Card Subtitle</h6>
                <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
            </div>
            <div class="k-actions k-card-actions">
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
                <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
            </div>
        </div>
    </div>
```

### Orientation

The Card content can be arranged vertically or horizontally through the `.k-card-vertical` and `.k-card-horizontal` classes:

```html
<div class="k-card k-card-vertical k-text-center">
    <div class="k-card-header">
        <h5 class="k-card-title">Sofia</h5>
        <h6 class="k-card-subtitle">Sunny</h6>
    </div>
    <div class="k-card-body">
        <div>2&ordm;C</div>
    </div>
    <div class="k-actions k-card-actions k-actions-stretched k-actions-horizontal">
        <button class="k-button k-flat">Action 1</button>
        <button class="k-button k-primary k-flat">Action 2</button>
    </div>
</div>
```

### Types

The main advantage of the Card structure is the full customization of the desired layout. It allows you to define rich variety of columns, rows, images.

The sample below contains two different container layout options.

```html
    <style>
        .cards-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        .k-card {
            margin: 5%;
            width: 300px;
        }
    </style>
      <div class="cards-container">
        <div class="k-card k-card-horizontal">
            <img alt="Telerik UI for ASP.NET Core Cards Sofia cathedral" src="https://demos.telerik.com/aspnet-core/shared/web/cards/sofia.jpg" class="k-card-media"/>
            <div class="k-vbox k-column">
                <div class="k-card-header">
                    <h5 class="k-card-title">Card Title</h5>
                    <h6 class="k-card-subtitle">Card Subtitle</h6>
                </div>
                <div class="k-card-body">
                    <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <div class="k-actions k-card-actions k-actions-stretched k-actions-horizontal">
                    <span class="k-card-action">
                        <button class="k-button k-button-flat-base k-button-flat k-button-md k-rounded-md">Action 1</button>
                    </span>
                    <span class="k-card-action">
                        <button class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</button>
                    </span>
                </div>
            </div>
        </div>
        <div class="k-card k-card-horizontal">
            <div class="k-vbox k-column">
                <div class="k-card-header">
                    <h5 class="k-card-title">Horizontal Card with Header</h5>
                    <h6 class="k-card-subtitle">Actions Center</h6>
                </div>
                <div class="k-card-body">
                    <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <div class="k-card-footer">
                    <span>Card Footer</span>
                </div>
            </div>
            <hr class="k-card-separator k-separator-vertical">
            <div class="k-actions k-card-actions k-actions-center k-actions-vertical">
                <button class="k-button k-button-flat-base k-button-flat k-button-md k-rounded-md">Action 1</button>
                <button class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</button>
            </div>
        </div>
```

## Styles

Cards provide predefined state classes that you can use to change the Card appearance.

```html
<div class="k-card k-state-primary" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title Primary</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-actions k-card-actions">
        <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
        <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
    </div>
</div>

<div class="k-card k-state-info" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title Info</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-actions k-card-actions">
        <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
        <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
    </div>
</div>

<div class="k-card k-state-success" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title Success</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-actions k-card-actions">
        <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
        <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
    </div>
</div>

<div class="k-card k-state-warning" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title Warning</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-actions k-card-actions">
        <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
        <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
    </div>
</div>

<div class="k-card k-state-error" style="width: 300px;">
    <div class="k-card-body">
        <h5 class="k-card-title">Card Title Error</h5>
        <h6 class="k-card-subtitle">Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
    </div>
    <div class="k-actions k-card-actions">
        <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 1</span>
        <span class="k-card-action"><span class="k-button k-button-flat-primary k-button-flat k-button-md k-rounded-md">Action 2</span>
    </div>
</div>
```

## Drag and Drop Capability

Thanks to the Telerik Sortable integration, the Card is capable to provide the user with drag-n-drop functionality.

To achieve this behavior, you can use the following structure:
```html
    <div id="list">
        <div class="cards-container">
            <div class="k-card">
                ... 
            </div>

            <div class="k-card">
               ...
            </div>
          </div>
      </div>
```

And then implement the kendoSortable logic:
```JavaScript
<script>
    $(document).ready( function () {
        $("#list").kendoSortable({
            filter: ".k-card",
            cursor: "move",
            placeholder: function (element) {
                return element.clone().css("opacity",  0.1);
            },
            hint: function (element) {
                return element.clone().css("width", element.width()).removeClass("k-selected");
            }
        });
    });
</script>
```

