---
title: Overview
page_title: Kendo UI MVVM pattern, integrated with Kendo UI jQuery-powered framework
description: Kendo UI Model View ViewModel is an implementation of the MVVM pattern, integrated with Kendo UI framework.
position: 1
---
# Kendo MVVM Overview

Model View ViewModel ([MVVM](http://en.wikipedia.org/wiki/Model_View_ViewModel)) is a design pattern which helps developers separate the Model (the data) from the View (the UI).
The View-Model part of MVVM is responsible for exposing the data objects from the Model in such a way that those objects are easily consumed in the View.

Kendo MVVM is an implementation of the MVVM pattern which seamlessly integrates with the rest of the Kendo framework (widgets and DataSource).

## Getting Started

First let's start by creating a View-Model object. The View-Model is a representation of your data (the Model) which will be displayed in the View.
To declare your View-Model use the `kendo.observable` function and pass it a JavaScript object:

### View-Model declaration:

    var viewModel = kendo.observable({
        name: "John Doe",
        displayGreeting: function() {
            var name = this.get("name");
            alert("Hello, " + name + "!!!");
        }
    });


Now, let's create a View. The View is the UI (a set of HTML elements) which will be bound to the View-Model.


### View declaration:

    <div id="view">
        <input data-bind="value: name" />
        <button data-bind="click: displayGreeting">Display Greeting</button>
    </div>

The `input` value (its text) is bound via the `data-bind` attribute to the `name` field of the View-Model. When that field changes the `input` value will be updated to reflect that change.
The opposite is also true - when the value of the `input` changes the field will be updated.

The click event of the `button` is bound via the `data-bind` attribute to the `displayGreeting` method of the View-Model. That method will be invoked when user clicks the `button`.

Finally, let's bind the View to the View-Model. This is done by calling the `kendo.bind` method:


### Binding the View to the View-Model:

    kendo.bind($("#view"), viewModel);

> **Important:** Kendo UI Mobile is not included in the default list of initialized namespaces. You can initialize it explicitly by
  running _kendo.bind(element, viewModel, kendo.mobile.ui);_

## Bindings

A binding pairs a DOM element (or widget) property to a field or method of the View-Model. Bindings are specified via the `data-bind` attribute in the form `<binding name>: <view model field or method>` e.g. `value: name`. Two bindings were used in the aforementioned example - `value` and `click`.
Kendo MVVM supports binding to other properties as well: `source, html, attr, visible, enabled` etc. The `data-bind` may contain a comma-separated list of bindings e.g. `data-bind="value: name, visible: isNameVisible"`. Kendo MVVM also supports data binding to nested View-Model fields:

### Binding to nested fields:

    <div data-bind="text: person.name">
    </div>
    <script>
    var viewModel = kendo.observable({
        person: {
            name: "John Doe"
        }
    });
    kendo.bind($("div"), viewModel);
    </script>

### Important: bindings are not JavaScript

Although bindings look like JavaScript code they are not. The following is **NOT** a valid Kendo MVVM binding declaration:
`<div data-bind="text: person.name.toLowerCase()"></div>`

If a value from the View-Model requires processing before displaying it in the View, a method should be created and used instead:


    <div data-bind="text: person.lowerCaseName"></div>

    <script>
    var viewModel = kendo.observable({
        person: {
            name: "John Doe",
            lowerCaseName: function() {
                return this.get("name").toLowerCase();
            }
        }
    });
    kendo.bind($("div"), viewModel);
    </script>
