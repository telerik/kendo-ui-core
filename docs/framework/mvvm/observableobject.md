---
title: ObservableObject
page_title: ObservableObject in Kendo UI MVVM framework | Kendo UI Documentation
description: Initialize ObservableObject in Kendo UI MVVM framework, get a field value, set a field value to change tracking and notify any subscribers when a change occurs.
position: 2
---

# ObservableObject

## Overview

The [kendo.data.ObservableObject](/api/framework/observableobject) is an important part of the Kendo MVVM framework - the View-Model.
It supports change tracking and notifies any subscribers when a change occurs.
All View-Model objects inherit from `kendo.data.ObservableObject`. From now on ObservableObject and View-Model would be used interchangeably.

To initialize an `ObservableObject` create a new instance of the `kendo.data.ObservableObject` type or use the `kendo.observable` method.
The end result is the same.

## Initializing an ObservableObject

    var viewModel1 = new kendo.data.ObservableObject( {
      field1: "value1",
      field2: "value2"
    });

    var viewModel2 = kendo.observable( {
      field1: "value1",
      field2: "value2"
    });


The `kendo.bind` method converts internally the provided View-Model object to an `ObservableObject` unless that object is already an `ObservableObject`.

### Important: when to use each method of initializing a View-Model

If the View-Model object is going to be used after initialization (before or after calling `kendo.bind`) the `kendo.observable` method or `new kendo.data.ObservableObject` must be used. Here is an example:


    var viewModel = kendo.observable({
    name: "John Doe"
    });

    viewModel.set("name", "Jane Doe"); // use the View-Model object after initialization


If the View-Model object is not going to be used after declaration you can define it as a regular JavaScript object. The
`kendo.bind` method will **not** convert the original View-Model object to `kendo.data.ObservableObject`. This is why the following will **not** work:

    var viewModel = {
       name: "John Doe"
    };

    kendo.bind(document.body, viewModel);

    /*
    The following statement  will fail because the View-Model
    is not an instance of kendo.data.ObservableObject.
    */
    viewModel.set("name", "Jane Doe");


This is why it is strongly recommended to **always** use `kendo.observable` to initialize the View-Model object.

## Getting field values of an ObservableObject

Use the `get` method to get the value of an `ObservableObject` field:


### Getting a field value

    var viewModel = kendo.observable({
     name: "John Doe"
    });

    var name = viewModel.get("name");
    alert(name); // shows "John Doe"


Getting nested fields is supported as well:

### Getting a nested field value

    var viewModel = kendo.observable({
     person: {
         name: "John Doe"
     }
    });
    var personName = viewModel.get("person.name");
    alert(personName); // shows "John Doe"


## Setting field values of an ObservableObject

Use the `set` method to set the value of an `ObservableObject` field.


### Setting a field value

    var viewModel = kendo.observable({
        name: "John Doe"
    });

    viewModel.set("name", "Jane Doe"); //set the "name" field to "Jane Doe"

    var name = viewModel.get("name");
    alert(name); // shows "Jane Doe"


Setting nested fields is supported as well:

### Setting a nested field value

    var viewModel = kendo.observable({
     person: {
         name: "John Doe"
     }
    });

    viewModel.set("person.name", "Jane Doe");

    var personName = viewModel.get("person.name");
    alert(personName); // shows "Jane Doe"

## Creating dependent methods (also known as calculated fields)

There is often need to convert a View-Model field value to a format more suitable for display in the View. In such cases extending the View-Model with a dependent method is essential. Here is an example:

### Creating a dependent method

    <span data-bind="text: fullName"></span>
    <script>
    var viewModel = kendo.observable({
        firstName: "John",
        lastName: "Doe",
        fullName: function() {
            return this.get("firstName") + " " + this.get("lastName");
        }
    });

    kendo.bind($("span"), viewModel);
    </script>


In that example `fullName` is a dependent method because it depends on `firstName` and `lastName`.
Changing the value of either `firstName` or `lastName` via the `set` method would also change
`fullName`. As a result all bindings referring to `fullName` will be updated.

### Important: dependent methods must use the `get` method to get field values

If the `get` method is not used Kendo MVVM would fail to detect any dependencies of the dependent method.
As a result changing any of the dependencies would not be reflected properly. Here is an example:

    var viewModel = kendo.observable({
        firstName: "John",
        lastName: "Doe",
        fullName: function() {
            return this.firstName + " " + this.lastName;
        }
    });


In this implementation of `fullName` direct field access is used instead of the `get` method. As a result
the depencencies of `fullName` are not tracked. Changing the value of either `firstName`
or `lastName` via the `set` method would **not** cause the change of `fullName`.
This means that  **no** binding referring to `fullName` is going to be updated.

Avoid using direct field access when implementing dependent methods. Always use the `get` method to obtain the field values.

### Setting values of dependent properties

    <p>Full Name: <input data-bind="value: fullName"></p>
    <p>First Name: <span data-bind="text: firstName"></span></p>
    <p>Last Name: <span data-bind="text: lastName"></span></p>

    <script>
      var vm = kendo.observable({
        firstName: "John",
        lastName: "Doe",
        fullName: function(value) {
          if (value !== undefined) {
            var name = value.split(" ");

            this.set("firstName", name[0]);
            this.set("lastName", name[1]);
          } else {
            return this.get("firstName") + " " + this.get("lastName");
          }
        }
      });

      kendo.bind(document.body, vm);
    </script>
