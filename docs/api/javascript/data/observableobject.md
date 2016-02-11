---
title: ObservableObject
page_title: API Reference for ObservableObject, a building block of Kendo MVVM
description: The documentation contains examples for the configuration of a new ObservableObject, methods and different types of events.
---

# kendo.data.ObservableObject

The `kendo.data.ObservableObject` is the building block of [Kendo MVVM](/framework/mvvm/overview). In addition
the items of the [kendo.data.DataSource](/framework/datasource/overview) are `kendo.data.ObservableObject` instances.

Inherits from [kendo.Observable](/api/javascript/observable).

## Configuration

To create a new `ObservableObject` use its constructor or the `kendo.observable` method.

#### Example - creating a new ObservableObject via its constructor

    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    console.log(observable.name); // outputs "John Doe"
    </script>

#### Example - using the kendo.observable method

    <script>
    var observable = kendo.observable({ name: "John Doe" });
    console.log(observable.name); // outputs "John Doe"
    </script>

> **Important:** Complex fields are automatically wrapped in nested `ObservableObject` instances.
> Array fields are wrapped as `kendo.data.ObservableArray` objects.
> The `change` event of the child objects will bubble to the parent `ObservableObject`.
> Fields with names that are prefixed with an underscore will not be wrapped.

#### Example - creating ObservableObject with complex and array fields

    <script>
    var observable = kendo.observable({
        // complex object field
        person: {
            name: "John Doe"
        },
        // array field
        numbers: [1, 2, 3]
    });

    console.log(observable.person instanceof kendo.data.ObservableObject); // outputs "true"
    console.log(observable.numbers instanceof kendo.data.ObservableArray); // outputs "true"
    </script>

## Fields

### uid `String`

The unique identifier of the `ObservableObject`.

#### Example - using the uid field
    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    console.log(observable.uid); // outputs "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" where "x" is a number or letter
    </script>

## Methods

### bind

Attaches a handler to an event. Examples and more info can be found in the [bind](/api/javascript/observable#bind) section of the
kendo.Observable API reference.

#### Example - subscribe to an event

    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    observable.bind("change", function(e) {
        console.log(e.field); // will output the changed field once the event is raised
    });
    observable.set("name", "Jane Doe"); // raises the "change" event and the handler outputs "name"
    </script>

### get

Gets the value of the specified field.

#### Returns

`Object` the value of the specified field.

#### Parameters

##### name `String`

The name of the field whose value is going to be returned.

#### Example - get the value of a field

    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    var name = observable.get("name");
    console.log(name); //outputs "John Doe"
    </script>

#### Example - get the value of a nested field

    <script>
    var observable = new kendo.data.ObservableObject({ person: { name: "John Doe" } });
    var name = observable.get("person.name"); // use dot notation to denote nested fields
    console.log(name); //outputs "John Doe"
    </script>

### parent

Gets the parent of the object if such parent exists.

#### Returns

`kendo.data.ObservableObject` the parent of the object; `undefined` if the object is not nested and doesn't have a parent.

#### Example - get the parent object

    <script>
    var observable = new kendo.data.ObservableObject({ person: { name: "John Doe" } });
    var person = observable.get("person");
    console.log(observable.parent()); // outputs "undefined"
    console.log(person.parent() === observable); // outputs "true"
    </script>

### set

Sets the value of the specified field.

#### Parameters

##### name `String`

The name of the field whose value is going to be returned.

##### value `Number|String|Date|Object`

The new value of the field.

#### Example - set the value of a field

    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    observable.set("name", "Jane Doe"); // set the value
    console.log(observable.get("name")); //outputs the new value "Jane Doe"
    </script>

#### Example - set the value of a nested field

    <script>
    var observable = new kendo.data.ObservableObject({ person: { name: "John Doe" } });
    observable.set("person.name", "Jane Doe"); // set the value
    console.log(observable.get("person.name")); //outputs the new value "Jane Doe"
    </script>

### toJSON

Creates a plain JavaScript object which contains all fields of the `ObservableObject`.

#### Returns

`Object` which contains only the fields of the `ObservableObject`.

#### Example

    <script>
    var observable = new kendo.data.ObservableObject({ person: { name: "John Doe" } });
    var json = observable.toJSON();
    console.log(JSON.stringify(json)); // outputs {"person":{"name":"John Doe"}}
    </script>

## Events

### change event

Fired when a field value is updated via the `set` method.

> The `change` event is raised **after** the field value is updated. Calling the `get` method from the event handler will return the new value.

#### Event Data

##### e.field `String`

The name of the field which has changed.

#### Example - subscribe to the change event

    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    observable.bind("change", function(e) {
        console.log(e.field); // will output the field name when the event is raised
    });
    observable.set("name", "Jane Doe"); // raises the "change" event and the handler outputs "name"
    </script>

### get event

Fired when the `get` method is invoked.

#### Event Data

##### e.field `String`

The name of the field which is retrieved.

#### Example - subscribe to the get event

    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    observable.bind("get", function(e) {
        console.log(e.field); // will output the field name when the event is raised
    });
    observable.get("name"); // raises the "get" event and the handler outputs "name"
    </script>

### set event

Fired when the `set` method is invoked.

> The `set` event is raised **before** the field value is updated. Calling the `get` method from the event handler will return the old value. Calling
`e.preventDefault` will prevent the update of the field and the `change` event will not be raised.

#### Event Data

##### e.field `String`

The name of the field which is retrieved.

##### e.value `Number|String|Data|Object`

The new value.

##### e.preventDefault `Function`

A function which may prevent the update of the value. Can be used to perform validation.

#### Example - subscribe to the set event

    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    observable.bind("set", function(e) {
        console.log(e.field); // will output the field name when the event is raised
    });
    observable.set("name", "Jane Doe"); // raises the "set" event and the handler outputs "name"
    </script>

#### Example - perform validation by preventing the set event

    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    observable.bind("set", function(e) {
        if (e.field == "name") {
            if (!e.value) {
                // avoid emtpy value for the "name" field
                e.preventDefault();
            }
        }
    });
    observable.set("name", "Jane Doe");
    </script>
