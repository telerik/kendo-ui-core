---
title: Model
page_title: API Reference for kendo.data.Model
description: The documentation for kendo.data.Model will help you define a new model, then introduce different methods and guide you to change, get or set an event.
---

# kendo.data.Model

The `Model` inherits from the [ObservableObject](/api/javascript/data/observableobject) and extends it with the ability to define schema - fields and methods. The
[DataSource](/api/javascript/data/datasource) contains instances of the `Model` when the [schema.model](/api/javascript/data/datasource#configuration-schema.model) setting is specified.

## Configuration

To define a new model use the `Model.define` method.

### Define a model

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

## Fields

### id

The value of the Model's ID. This field is available **only** if the `id` is defined in the Model configuration. See the example below.

### idField `String`

The name of the Model's ID field. This field is available **only** if the `id` is defined in the Model configuration.

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

The unique identifier of the `Model`. Inherited from `ObservableObject`. More info can be found in the [uid](/api/javascript/data/observableobject#fields-uid) section of the
ObservableObject API reference.

### dirty `Boolean`

Indicates whether the model is modified.

#### Example - using the dirty field

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

Attaches a handler to an event. Examples and more info can be found in the [bind](/api/javascript/observable#methods-bind) section of the `kendo.Observable` API reference.

### Model.define

Defines a new `Model` type using the provided options. The returned value inherits from the `kendo.data.Model` class.

#### Parameters

##### options `Object`

Describes the configuration options of the new model type.

##### options.id `String`

The name of the field which acts as the identifier of the model. The identifier is used to determine if a model instance is new or existing one.
If the value of the field specified is equal to the default value (specified through the `fields` configuration) the model is considered as new.

##### options.fields `Object|Array`

A set of key/value pairs the configure the model fields. The key specifies the name of the field.
Quote the key if it contains spaces or other symbols which are not valid for a JavaScript identifier.

##### options.fields.fieldName.defaultValue

Specifies the which will be used for the field when a new model instance is created. Default settings depend on the type of the field. Default for "string" is `""`,
for "number" is `0` and for "date" is `new Date()` (today).

##### options.fields.fieldName.editable `Boolean`

Specifies if the field is editable or not. The default value is `true`.

##### options.fields.fieldName.nullable `Boolean`

Specifies if the `defaultValue` setting should be used. The default is `false`.

##### options.fields.fieldName.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.

##### options.fields.fieldName.type `String`

Specifies the type of the field. The available options are `"string"`, `"number"`, `"boolean"`, `"date`". The default is `"string"`.

##### options.fields.fieldName.from `String`

Specifies the field of the original record whose value is used to populate the Model field.

##### options.fields.fieldName.validation `Object`

Specifies the validation options which will be used by [Kendo Validator](/api/javascript/ui/validator).

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

`Boolean` `true` if the field is editable; `false` otherwise.

#### Parameters

##### field `String`

The field to check.

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

Gets the value of the specified field. Inherited from `kendo.data.ObservableObject`. Examples and more info can be found in the [get](/api/javascript/data/observableobject#methods-get) section of the
ObservableObject API reference.

### isNew

Checks if the `Model` is new or not. The `id` field is used to determine if a model instance is new or existing one.
If the value of the field specified is equal to the default value (specified through the `fields` configuration) the model is considered as new.

#### Returns

`Boolean` `true` if the model is new; `false` otherwise.

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

Sets the value of the specified field. Inherited from `kendo.data.ObservableObject`. Examples and more info can be found in the [set](/api/javascript/data/observableobject#methods-set) section of the
ObservableObject API reference.

### toJSON

Creates a plain JavaScript object which contains all fields of the `Model`. Inherited from `kendo.data.ObservableObject`. Examples and more info can be found in the [toJSON](/api/javascript/data/observableobject#methods-toJSON) section of the
ObservableObject API reference.

## Events

### change event

Raised when a field value is updated via the `set` method. Inherited from `kendo.data.ObservableObject`. Examples and more info can be found in the [change](/api/javascript/data/observableobject#events-change) section of the
ObservableObject API reference.

### get event

Raised when the `get` method is invoked. Inherited from `kendo.data.ObservableObject`. Examples and more info can be found in the [get](/api/javascript/data/observableobject#events-get) section of the
ObservableObject API reference.

### set event

Raised when the `set` method is invoked. Inherited from `kendo.data.ObservableObject`. Examples and more info can be found in the [set](/api/javascript/data/observableobject#events-set) section of the
ObservableObject API reference.
