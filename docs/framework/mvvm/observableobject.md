---
title: ObservableObject
page_title: ObservableObject | Kendo UI MVVM
description: "Learn how to initialize the ObservableObject in the Kendo UI MVVM framework, get a field value, set a field value to change tracking, and notify any subscribers when a change occurs."
slug: overview_observabeobject_kendoui
position: 2
---

# ObservableObject

The [`kendo.data.ObservableObject`](/api/javascript/data/observableobject) is an important part of the Kendo UI MVVM framework, specifically of the View-Model. It supports change tracking and notifies any subscribers when a change occurs. All View-Model objects inherit from `kendo.data.ObservableObject`.

Note that from now on ObservableObject and View-Model are going to be used interchangeably.

## Getting Started

### Initialize the ObservableObject

To initialize an `ObservableObject`, create a new instance of the `kendo.data.ObservableObject` type or use the `kendo.observable` method, as demonstrated in the example below. The end result is the same.

###### Example

    var viewModel1 = new kendo.data.ObservableObject( {
      field1: "value1",
      field2: "value2"
    });

    var viewModel2 = kendo.observable( {
      field1: "value1",
      field2: "value2"
    });


The `kendo.bind` method converts internally the provided View-Model object to an `ObservableObject` unless that object is already an `ObservableObject`.

### Important Notes on Getting Started

#### When to Use Each Method for Initializing a View-Model

If the View-Model object is going to be used after initialization (before or after calling `kendo.bind`), the `kendo.observable` method or the `new kendo.data.ObservableObject` must be used, as shown in the example below.

###### Example

    var viewModel = kendo.observable({
    name: "John Doe"
    });

    viewModel.set("name", "Jane Doe"); // use the View-Model object after initialization


If the View-Model object is not going to be used after declaration, you can define it as a regular JavaScript object. The `kendo.bind` method will not convert the original View-Model object to `kendo.data.ObservableObject`. That is why the code, demonstrated in the example below, is not going to work. Therefore, it is strongly recommended to always use the `kendo.observable` to initialize the View-Model object.

###### Example

    var viewModel = {
       name: "John Doe"
    };

    kendo.bind(document.body, viewModel);

    /*
    The following statement  will fail because the View-Model
    is not an instance of kendo.data.ObservableObject.
    */
    viewModel.set("name", "Jane Doe");

<!--*-->
## Field Values

### Get Field Values

#### Get the Value of an ObservableObject Field

Use the `get` method to get the value of an `ObservableObject` field, as demonstrated in the example below.

###### Example

    var viewModel = kendo.observable({
     name: "John Doe"
    });

    var name = viewModel.get("name");
    alert(name); // shows "John Doe"

#### Get the Nested Field Value

Getting a nested field value is also supported, as shown in the example below.

###### Example

    var viewModel = kendo.observable({
     person: {
         name: "John Doe"
     }
    });
    var personName = viewModel.get("person.name");
    alert(personName); // shows "John Doe"

### Set Field Values

#### Set the Value of an ObservableObject Field

Use the `set` method to set the value of an `ObservableObject` field, as demonstrated in the example below.

###### Example

    var viewModel = kendo.observable({
        name: "John Doe"
    });

    viewModel.set("name", "Jane Doe"); //set the "name" field to "Jane Doe"

    var name = viewModel.get("name");
    alert(name); // shows "Jane Doe"

#### Set the Nested Field Value

Setting a nested field value is also supported, as shown in the example below.

###### Example

    var viewModel = kendo.observable({
     person: {
         name: "John Doe"
     }
    });

    viewModel.set("person.name", "Jane Doe");

    var personName = viewModel.get("person.name");
    alert(personName); // shows "Jane Doe"

## Dependent Methods

### Create Dependent Methods

Often there is need to convert a View-Model field value to a format more suitable for display in the View. In such cases, extending the View-Model with a dependent method is essential.

The example below demonstrates how to create dependent methods, also known as calculated fields.

###### Example

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

In the example, `fullName` is a dependent method because it depends on `firstName` and `lastName`. Changing the value of either `firstName` or `lastName` via the `set` method would also change `fullName`. As a result, all bindings referring to `fullName` are going to be updated.

### Set Values of Dependent Properties

The example below demonstrates how to set values of dependent properties.

###### Example

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

### Important Notes on Dependent Methods

#### Dependent Methods Must Use the get Method for Getting Field Values

If the `get` method is not used, the Kendo UI MVVM fails to detect any dependencies of the dependent method. As a result, changing any of the dependencies would not be reflected properly.

###### Example

    var viewModel = kendo.observable({
        firstName: "John",
        lastName: "Doe",
        fullName: function() {
            return this.firstName + " " + this.lastName;
        }
    });

This implementation of the `fullName` uses direct field access instead of the `get` method. As a result, the dependencies of `fullName` are not tracked. Changing the value of either `firstName` or `lastName` via the `set` method would not cause the change of `fullName`. This means that no binding referring to `fullName` is going to be updated.

Avoid using direct field access when implementing dependent methods. Always use the `get` method to obtain the field values.

## See Also

Articles and how-to examples on Kendo UI MVVM:

* [MVVM Overview]({% slug overview_mvvmpattern_kendoui %})
* [Tutorial on How to Build MVVM Bound Forms]({% slug mvvmboundforms_mvvmpattern_kendoui %})

For detailed information on the bindings Kendo UI MVVM supports, refer to the section about [Kendo UI MVVM bindings]({% slug attributebinding_mvvm_kendoui %}).
