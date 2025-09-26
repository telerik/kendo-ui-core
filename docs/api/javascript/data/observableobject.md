---
title: ObservableObject
page_title: API Reference for ObservableObject, a building block of Kendo MVVM
description: The documentation contains examples for the configuration of a new ObservableObject, methods and different types of events.
res_type: api
---

# kendo.data.ObservableObject

The `kendo.data.ObservableObject` is the building block of the [Kendo UI MVVM](/framework/mvvm/overview) design pattern. In addition, the items of the [`kendo.data.DataSource`](/framework/datasource/overview) are `kendo.data.ObservableObject` instances.

Inherits from [`kendo.Observable`](/api/javascript/observable).

## Configuration

To create a new `ObservableObject`, use its constructor or the `kendo.observable` method.

#### Example - create a new ObservableObject through its constructor

    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(observable.name); // outputs "John Doe"
    </script>

#### Example - use the kendo.observable method

    <script>
    var observable = kendo.observable({ name: "John Doe" });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(observable.name); // outputs "John Doe"
    </script>

> * Complex fields are automatically wrapped in nested `ObservableObject` instances. Array fields are wrapped as `kendo.data.ObservableArray` objects.
> * The `change` event of the child objects will bubble to the parent `ObservableObject`.
> * Fields with names that are prefixed with an underscore will not be wrapped.

#### Example - create ObservableObject with complex and array fields

    <script>
    var observable = kendo.observable({
        // complex object field
        person: {
            name: "John Doe"
        },
        // array field
        numbers: [1, 2, 3]
    });

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(observable.person instanceof kendo.data.ObservableObject); // outputs "true"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(observable.numbers instanceof kendo.data.ObservableArray); // outputs "true"
    </script>

## Fields

### uid `String`

The unique identifier of the `ObservableObject`.


<div class="meta-api-description">
Access or retrieve the unique identifier assigned to each instance of an observable object for tasks such as instance identification, object comparison, referencing specific objects during lookups, managing or updating particular elements in observable collections, or tracking and differentiating objects in data-binding scenarios. This unique ID can be used to configure instance-specific logic, control state changes per object, correlate objects across different contexts, or enable precise object management and retrieval in reactive programming environments where distinct object identification is essential.
</div>

#### Example - use the uid field

    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(observable.uid); // outputs "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" where "x" is a number or letter
    </script>

## Methods

### bind

Attaches a handler to an event. For more information and examples, refer to the [`bind`](/api/javascript/observable#bind) API reference.


<div class="meta-api-description">
Subscribe to events emitted by an observable data source by attaching callback functions that trigger when specific events occur, enabling you to listen for and respond to state changes, updates, or custom event notifications dynamically. Configure event listeners, set handlers, and bind functions to event names to monitor data flow and changes, facilitating reactive programming patterns, event-driven interactions, and real-time responses to observable signals within an object or data model. Enable event subscription, callback registration, and event handling mechanisms to capture emitted events and execute custom logic in response to observable updates.
</div>

#### Example - subscribe to an event

    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    observable.bind("change", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.field); // will output the changed field once the event is raised
    });
    observable.set("name", "Jane Doe"); // raises the "change" event and the handler outputs "name"
    </script>

### get

Gets the value of the specified field.


<div class="meta-api-description">
Access or retrieve the current value of a specific property or field from a reactive or observable object by name, enabling reading of individual data points from an observable state without mutating or altering it. This is useful for developers needing to get or read property values for conditional logic, UI updates, data binding, debugging, or state inspection after initialization, supporting queries like how to fetch a field’s value, access observable data fields dynamically, or obtain real-time values from a managed state object without triggering reactivity or writes.
</div>

#### Returns

`Object`&mdash;The value of the specified field.

#### Parameters

##### name `String`

The name of the field whose value will be returned.

#### Example - get the value of a field

    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    var name = observable.get("name");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(name); //outputs "John Doe"
    </script>

#### Example - get the value of a nested field

    <script>
    var observable = new kendo.data.ObservableObject({ person: { name: "John Doe" } });
    var name = observable.get("person.name"); // use dot notation to denote nested fields
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(name); //outputs "John Doe"
    </script>

### parent

Gets the parent of the object if such a parent exists.


<div class="meta-api-description">
Retrieve or access the immediate ancestor or containing object of a nested observable data structure, enabling traversal of hierarchical observable relationships, navigating up through observable instances, obtaining parent references to manage state dependencies, inspect parent properties, control bindings based on ancestor data, and support logic that depends on relationships between nested observable objects or data models.
</div>

#### Returns

`kendo.data.ObservableObject`&mdash;The parent of the object. Returns `undefined` if the object is not nested and does not have a parent.

#### Example - get the parent object

    <script>
    var observable = new kendo.data.ObservableObject({ person: { name: "John Doe" } });
    var person = observable.get("person");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(observable.parent()); // outputs "undefined"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(person.parent() === observable); // outputs "true"
    </script>

### set

Sets the value of the specified field.


<div class="meta-api-description">
Update or modify a specific property or attribute within a reactive data model by specifying the field name and assigning a new value, enabling dynamic state changes that automatically trigger notifications to update UI components, observers, bindings, or listeners. This method supports setting individual fields at runtime, allowing developers to programmatically control and refresh model data, drive reactivity, or propagate changes in data-binding scenarios, state management, or observable patterns. Whether you need to replace, assign, mutate, or update a property for real-time interface updates, syncing models with views, or responding to user interactions, this enables precise field-level modification and reactive dataflow control.
</div>

#### Parameters

##### name `String`

The name of the field whose value will be returned.

##### value `Number|String|Date|Object`

The new value of the field.

#### Example - set the value of a field

    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    observable.set("name", "Jane Doe"); // set the value
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(observable.get("name")); //outputs the new value "Jane Doe"
    </script>

#### Example - set the value of a nested field

    <script>
    var observable = new kendo.data.ObservableObject({ person: { name: "John Doe" } });
    observable.set("person.name", "Jane Doe"); // set the value
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(observable.get("person.name")); //outputs the new value "Jane Doe"
    </script>

### toJSON

Creates a plain JavaScript object which contains all fields of the `ObservableObject`.


<div class="meta-api-description">
Convert reactive or observable data structures into plain JavaScript objects by extracting all internal fields, enabling serialization, JSON formatting, logging, debugging, state inspection, transmission over networks, API payload preparation, data storage, deep comparison, or client-server communication. Easily transform complex observable entities into simple POJOs that are compatible with JSON.stringify or any process requiring raw data conversion, flattening reactive wrappers for easier handling and analysis in JavaScript applications.
</div>

#### Returns

`Object`&mdash;Contains only the fields of the `ObservableObject`.

#### Example

    <script>
    var observable = new kendo.data.ObservableObject({ person: { name: "John Doe" } });
    var json = observable.toJSON();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(JSON.stringify(json)); // outputs {"person":{"name":"John Doe"}}
    </script>

## Events

### change

Fires when a field value is updated through the `set` method.

> The `change` event is raised after the field value is updated. Calling the `get` method from the event handler will return the new value.


<div class="meta-api-description">
Detect changes or updates to data fields within observable objects managed by data sources, enabling you to track and respond when a property value is modified or set. This event fires after a value update, allowing you to handle notifications, trigger callbacks, execute custom logic, or synchronize state based on the latest field data retrieved via getters. Listen for field modifications, value shifts, or property mutations to enable reactive programming patterns, data binding updates, or event-driven workflows that monitor dynamic data changes in your application.
</div>

#### Event Data

##### e.field `String`

The name of the field which changed.

#### Example - subscribe to the change event

    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    observable.bind("change", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.field); // will output the field name when the event is raised
    });
    observable.set("name", "Jane Doe"); // raises the "change" event and the handler outputs "name"
    </script>

### get

Fired when the `get` method is invoked.


<div class="meta-api-description">
Detect property access or reads on ObservableObject by listening to get method calls, enabling monitoring, logging, tracking, or triggering actions when object properties are retrieved; configure event handlers or listeners to respond dynamically to property fetches, implement lazy-loading or audit access patterns, capture get invocations for debugging, analytics, or reactive programming tied to property access, and control behavior when properties are read within observable data structures.
</div>

#### Event Data

##### e.field `String`

The name of the field which is retrieved.

#### Example - subscribe to the get event

    <script>
    var observable = new kendo.data.ObservableObject({ name: "John Doe" });
    observable.bind("get", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.field); // will output the field name when the event is raised
    });
    observable.get("name"); // raises the "get" event and the handler outputs "name"
    </script>

### set

Fires when the `set` method is invoked.

> The `set` event is raised before the field value is updated. Calling the `get` method from the event handler will return the old value. Calling `e.preventDefault` will prevent the update of the field and the `change` event will not be triggered.


<div class="meta-api-description">
Intercept, validate, or block updates to object fields by handling events triggered before a value change is applied, enabling developers to monitor or cancel modifications, access previous values during update attempts, prevent changes dynamically, and control whether subsequent change notifications or events fire when setting new data on observable objects.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
