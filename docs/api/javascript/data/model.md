---
title: Model
page_title: API Reference for kendo.data.Model
description: The documentation for kendo.data.Model will help you define a new model, then introduce different methods and guide you to change, get or set an event.
res_type: api
---

# kendo.data.Model

`Model` inherits from the [`ObservableObject`](/api/javascript/data/observableobject) and extends it with fields and methods which enable it to define a schema. The
[DataSource](/api/javascript/data/datasource) contains instances of the `Model` when the [`schema.model`](/api/javascript/data/datasource/configuration/schema.model) setting is specified.

## Fields

### id

The value of the ID of the `Model`. This field is available only if the `id` is defined in the Model configuration. See the following example.

### idField `String`

The name of the `Model` ID field. This field is available only if the `id` is defined in the Model configuration.

    <script>
    var Person = kendo.data.Model.define({
        id: "personId",
        fields: {
            "name": {
                type: "string"
            },
            "age": {
                type: "number"
            }
        }
    });

    var person = new Person({
        personId: 1,
        name: "John Doe",
        age: 42
    });

    console.log(person.id); // outputs 1
    console.log(person.idField); // outputs "personId"
    </script>

### uid

The unique identifier of the `Model`. Inherited from `ObservableObject`. For more information, refer to the [`uid`](/api/javascript/data/observableobject#fields-uid) API reference.

The main benefit of the `uid` identifiers is to represent a link between data items (that may not have an ID of their own) and the corresponding rendered DOM elements (list items, table rows, and so on). The `uid` identifiers are generated randomly and are not persisted on reloading of data or web pages.

### dirty `Boolean`

Indicates whether the model is modified.

#### Example - use the dirty field

    <script>
    var model = new kendo.data.Model({
        name: "John Doe"
    });

    console.log(model.dirty); // outputs "false"
    model.set("name", "Jane Doe");
    console.log(model.dirty); // outputs "true"
    </script>

## Methods

### bind

Attaches a handler to an event. For more information and examples, refer to the [`bind`](/api/javascript/observable/methods/bind) API reference.

### define

Defines a new `Model` type by using the provided options. The returned value inherits from the `kendo.data.Model` class.

#### Example - define a model

    <script>
    var Person = kendo.data.Model.define({
        id: "personId", // the identifier of the model
        fields: {
            "name": {
                type: "string"
            },
            "age": {
                type: "number"
            }
        }
    });

    var person = new Person({
        name: "John Doe",
        age: 42
    });

    console.log(person.get("name")); // outputs "John Doe"
    console.log(person.get("age")); // outputs 42
    </script>

#### Parameters

##### options `Object`

Describes the configuration options of the new model type.

##### options.id `String`

The name of the field which acts as the identifier of the model. The identifier is used to determine if a model instance is new or existing. If the value of the specified field is equal to the default value that is specified through the `fields` configuration, the model is considered new.

##### options.fields `Object|Array`

A set of key/value pairs that configure the model fields. The key specifies the name of the field. Quote the key if it contains spaces or other symbols which are not valid for a JavaScript identifier.

> A field configuration cannot contain configurations for nested fields.

##### options.fields.fieldName.defaultValue

Specifies the default value which will be used for the field when a new model instance is created. The default settings depend on the type of the field. The default value for a string is `""`, for a number is `0`, and for a date is `new Date()` (today).

The parameter can also be set to a function that returns the dynamic default values of the fields. For a live demo, refer to [this how-to example]({% slug howto_gridfiltering_dynamicdefaultvalues_grid %}).

##### options.fields.fieldName.editable `Boolean`

Specifies if the field is editable or not. Defaults to `true`.

##### options.fields.fieldName.nullable `Boolean`

Specifies if the `defaultValue` setting should be used. Defaults to `false`.

##### options.fields.fieldName.parse `Function`

Specifies the function which will parse the field value. If not set, the default parsers will be used.

##### options.fields.fieldName.type `String`

Specifies the type of the field.

The available dataType options are:
* `"string"`
* `"number"`
* `"boolean"`
* `"date"`
* `"object"`
* (Default) `"default"`

##### options.fields.fieldName.from `String`

Specifies the field of the original record whose value is used to populate the Model field. When CRUD operations (specifically, adding new items) are enabled, the original field name should be defined with a `defaultValue` as well. The reason for this is that during updates and creates, the Kendo UI DataSource will try to construct a data item object which matches the original (server-side) data item structure. For more information and examples, refer to the article on [how to use nested model properties]({% slug howto_use_nested_model_properties_grid %}).

##### options.fields.fieldName.validation `Object`

Specifies the validation options which will be used by the [Kendo UI Validator](/api/javascript/ui/validator).

#### Example - define the fields of a model

    <script>
    var Product = kendo.data.Model.define( {
        id: "id", // the identifier is the "id" field (declared below)
        fields: {
            /* name of the field */ name: {
                type: "string", // the field is a string
                validation: { // validation rules
                    required: true // the field is required
                },
                defaultValue: "<empty>" // default field value
            },

            /* name of the field */ price: {
                type: "number", // the field is a number
                validation: { // validation rules
                    required: true, // the field is required
                    min: 1 // the minimum value is 1
                },
                defaultValue: 99.99 // default field value
            },

            /* name of the field */ id: {
                editable: false, // this field is not editable
                nullable: true // a default value will not be assigned
            }
        }
    });
    var product = new Product();
    console.log(product.get("price")); // outputs "99.99" which is the default value
    </script>

### editable

Determines if the specified field is editable or not.

#### Returns

`Boolean`&mdash;Returns `true` if the field is editable. Otherwise, returns `false`.

#### Parameters

##### field `String`

The field that will be checked.

#### Example - check if a field is editable or not

    <script>
    var Product = kendo.data.Model.define({
        fields: {
            id: {
                editable: false
            },
            name: {
                editable: true
            }
        }
    });
    var product = new Product();
    console.log(product.editable("id")); // outputs "false"
    console.log(product.editable("name")); // outputs "true"
    </script>

### get

Gets the value of the specified field. Inherited from `kendo.data.ObservableObject`. For more information and examples, refer to the [`get`](/api/javascript/data/observableobject/methods/get) API reference.

### isNew

Checks if the `Model` is new or not. The `id` field is used to determine if a model instance is new or existing. If the value of the specified field is equal to the default value that is specified through the `fields` configuration, the model is considered new.

#### Returns

`Boolean`&mdash;Returns `true` if the field is editable. Otherwise, returns `false`.

#### Example - check if a model is new
    <script>
    var Product = kendo.data.Model.define({
        id: "productId",
        fields: {
            productId: {
                editable: false
            }
        }
    });
    var productOne = new Product();
    console.log(productOne.isNew()); // outputs "true"
    var productTwo = new Product({ productId: 1 });
    console.log(productTwo.isNew()); // outputs "false" because productId is set to 1
    </script>

### set

Sets the value of the specified field. Inherited from `kendo.data.ObservableObject`. For more information and examples, refer to the [`set`](/api/javascript/data/observableobject/methods/set) API reference.

### toJSON

Creates a plain JavaScript object which contains all fields of the `Model`. Inherited from `kendo.data.ObservableObject`. For more information and examples, refer to the [`toJSON`](/api/javascript/data/observableobject/methods/tojson) API reference.

## Events

### change event

Fires when a field value is updated through the `set` method. Inherited from `kendo.data.ObservableObject`. For more information and examples, refer to the [`change`](/api/javascript/data/observableobject/events/change) API reference.

### get event

Fires when the `get` method is invoked. Inherited from `kendo.data.ObservableObject`. For more information and examples, refer to the [`get`](/api/javascript/data/observableobject/events/get event) API reference.

### set event

Fires when the `set` method is invoked. Inherited from `kendo.data.ObservableObject`. For more information and examples, refer to the [`set`](/api/javascript/data/observableobject/events/set event) API reference.
