---
title: Model
page_title: API Reference for kendo.data.Model
description: The documentation for kendo.data.Model will help you define a new model, then introduce different methods and guide you to change, get or set an event.
res_type: api
---

# kendo.data.Model

`Model` inherits from the [`ObservableObject`](/api/javascript/data/observableobject) and extends it with fields and methods which enable it to define a schema. The
[DataSource](/api/javascript/data/datasource) contains instances of the `Model` when the [`schema.model`](/api/javascript/data/datasource/configuration/schema#schemamodel) setting is specified.

## Fields

### id

The value of the ID of the `Model`. This field is available only if the `id` is defined in the Model configuration. See the following example.

#### Example - configure the Model id 

    <script>
        var Product = kendo.data.Model.define( {
          id: "ProductID", // the identifier is the "ProductID" field (declared below)
          fields: {
            /* name of the field - ProductID */ 
            ProductID: { editable: false, nullable: true },
            /* name of the field - ProductName*/ 
            ProductName: { type: "string", defaultValue: "<empty>"}
          }
        });
        var product = new Product({
          ProductID:3,
          ProductName: "Milk"
        });
  
        /* The result can be observed in the DevTools(F12) console of the browser. */  
        console.log(product.ProductID); // // outputs "3" which is the ProductID value
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(product.idField); // outputs "ProductID" which is the name of the 'id' field
    </script>


#### Example - define the model.id in dataSource schema

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
          dataSource = new kendo.data.DataSource({
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/Products"
              }
            },
            pageSize: 20,
            schema: {
              model: {
                id: "ProductID", // the identifier of the model
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true } },
                  UnitPrice: { type: "number" },
                  Discontinued: { type: "boolean" },
                }
              }
            }
          });
    </script>

### idField `String`

The name of the `Model` ID field. This field is available only if the `id` is defined in the Model configuration.

#### Example

    <script>
    var Product = kendo.data.Model.define({
        id: "productId",
        fields: {
            productId: { type: "number" },
            name: { type: "string" }
        }
    });
    var product = new Product({ productId: 1, name: "Sample Product" });
    
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(product.idField); // outputs "productId"
    </script>

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

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(person.id); // outputs 1
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(person.idField); // outputs "personId"
    </script>

### uid

The unique identifier of the `Model`. Inherited from `ObservableObject`. For more information, refer to the [`uid`](/api/javascript/data/observableobject#fields-uid) API reference.

#### Example

    <script>
    var model1 = new kendo.data.Model({ name: "Item 1" });
    var model2 = new kendo.data.Model({ name: "Item 2" });
    
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(model1.uid); // outputs a unique identifier string like "1e3b4c5d-6789"
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(model2.uid); // outputs a different unique identifier string
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(model1.uid === model2.uid); // outputs false - each model has a unique uid
    </script>

The main benefit of the `uid` identifiers is to represent a link between data items (that may not have an ID of their own) and the corresponding rendered DOM elements (list items, table rows, and so on). The `uid` identifiers are generated randomly and are not persisted on reloading of data or web pages.

### dirty `Boolean`

Indicates whether the model is modified.

#### Example - use the dirty field

    <script>
    var model = new kendo.data.Model({
        name: "John Doe"
    });

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(model.dirty); // outputs "false"
    model.set("name", "Jane Doe");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(model.dirty); // outputs "true"
    </script>

## Methods

### bind

Attaches a handler to an event. For more information and examples, refer to the [`bind`](/api/javascript/observable/methods/bind) API reference.

#### Example

    <script>
    var Product = kendo.data.Model.define({
        fields: {
            name: { type: "string" },
            price: { type: "number" }
        }
    });
    
    var product = new Product({ name: "Laptop", price: 999 });
    
    // Bind to the change event
    product.bind("change", function(e) {
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Field '" + e.field + "' changed to: " + e.value);
    });
    
    product.set("name", "Gaming Laptop"); // triggers change event
    product.set("price", 1299); // triggers change event
    </script>

### define

Defines a new `Model` type by using the provided options. The returned value inherits from the `kendo.data.Model` class.

#### Example - define a model

    <button id="update-name">Change Name</button>
    <button id="update-age">Change Age</button>

    <script>
      var Person = kendo.data.Model.define({
        id: "personId", // the identifier of the model
        fields: {
          "personId": {
            defaultValue: 0,
            type: "number"
          },
          "name": {
            type: "string"
          },
          "age": {
            parse: (value) => kendo.parseInt(value), // Parse the value manually.
            nullable: true, // Age can be null
            editable: false, // Age cannot be edited.
          }
        }
      });

      var person = new Person({
        name: "John Doe",
        age: 42
      });

      var person2 = new Person({
        name: "James Doe",
        age: null
      });

      $(document.body).append(`<div><h3>Person 1</h3><p>Name - ${person.get("name")}, Type - ${typeof(person.get("name"))}</p><p>Age - ${person.get("age")}, Type - ${typeof(person.get("age"))}</p></div>`);
      $(document.body).append(`<div><h3>Person 2</h3><p>Name - ${person2.get("name")}, Type - ${typeof(person2.get("name"))}</p><p>Age - ${person2.get("age")}, Type - ${typeof(person2.get("age"))}</p></div>`);

      $("#update-name").on("click", (e) => {
        person.set("name", "Test Name");
        $(document.body).append(`<div><h3>Updated Person 1</h3><p>Name - ${person.get("name")}, Type - ${typeof(person.get("name"))}</p><p>Age - ${person.get("age")}, Type - ${typeof(person.get("age"))}</p></div>`);
      });
      
      // The age will not be updated through the `set` method because the field is not editable.
      $("#update-age").on("click", (e) => {
        person.set("age", 1645);
        $(document.body).append(`<div><h3>Updated Person 1</h3><p>Name - ${person.get("name")}, Type - ${typeof(person.get("name"))}</p><p>Age - ${person.get("age")}, Type - ${typeof(person.get("age"))}</p></div>`);
      });
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

> If `options.fields.fieldName.nullable` is set to `true` the defaultValue will be ignored when a new model is created.

The parameter can also be set to a function that returns the dynamic default values of the fields. For a live demo, refer to [this how-to example]({% slug howto_gridfiltering_dynamicdefaultvalues_grid %}).

##### options.fields.fieldName.editable `Boolean`

Specifies if the field is editable or not. Defaults to `true`.

##### options.fields.fieldName.nullable `Boolean`

Specifies if the `defaultValue` setting will be used. If set to true, the defaultValue will be ignored and new models will be created with `null` field value. Defaults to `false`.

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
                    required: {
                        message: "Custom required message" // the message that is displayed when an empty value is about to be saved
                    }
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(product.editable("id")); // outputs "false"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(product.editable("name")); // outputs "true"
    </script>

### get

Gets the value of the specified field. Inherited from `kendo.data.ObservableObject`. For more information and examples, refer to the [`get`](/api/javascript/data/observableobject/methods/get) API reference.

#### Example

    <script>
    var Product = kendo.data.Model.define({
        fields: {
            name: { type: "string" },
            price: { type: "number" },
            category: { type: "string", defaultValue: "Electronics" }
        }
    });
    
    var product = new Product({ name: "Smartphone", price: 599 });
    
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(product.get("name")); // outputs "Smartphone"
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(product.get("price")); // outputs 599
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(product.get("category")); // outputs "Electronics" (default value)
    </script>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(productOne.isNew()); // outputs "true"
    var productTwo = new Product({ productId: 1 });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(productTwo.isNew()); // outputs "false" because productId is set to 1
    </script>

### set

Sets the value of the specified field. Inherited from `kendo.data.ObservableObject`. For more information and examples, refer to the [`set`](/api/javascript/data/observableobject/methods/set) API reference.

#### Example

    <script>
    var Product = kendo.data.Model.define({
        fields: {
            name: { type: "string" },
            price: { type: "number" },
            inStock: { type: "boolean", defaultValue: true }
        }
    });
    
    var product = new Product({ name: "Tablet", price: 299 });
    
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(product.get("name")); // outputs "Tablet"
    
    // Set new values
    product.set("name", "iPad Pro");
    product.set("price", 1099);
    product.set("inStock", false);
    
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(product.get("name")); // outputs "iPad Pro"
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(product.get("price")); // outputs 1099
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(product.get("inStock")); // outputs false
    </script>

### toJSON

Creates a plain JavaScript object which contains all fields of the `Model`. Inherited from `kendo.data.ObservableObject`. For more information and examples, refer to the [`toJSON`](/api/javascript/data/observableobject/methods/tojson) API reference.

#### Example

    <script>
    var Product = kendo.data.Model.define({
        id: "productId",
        fields: {
            productId: { type: "number" },
            name: { type: "string" },
            price: { type: "number" },
            category: { type: "string" }
        }
    });
    
    var product = new Product({
        productId: 1,
        name: "Wireless Mouse",
        price: 29.99,
        category: "Computer Accessories"
    });
    
    var jsonObject = product.toJSON();
    
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(jsonObject); // outputs { productId: 1, name: "Wireless Mouse", price: 29.99, category: "Computer Accessories" }
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(typeof jsonObject); // outputs "object" - it's a plain JavaScript object
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(JSON.stringify(jsonObject)); // outputs JSON string representation
    </script>

## Events

### change

Fires when a field value is updated through the `set` method. Inherited from `kendo.data.ObservableObject`. For more information and examples, refer to the [`change`](/api/javascript/data/observableobject/events/change) API reference.

#### Example

    <script>
    var Product = kendo.data.Model.define({
        fields: {
            name: { type: "string" },
            price: { type: "number" },
            inStock: { type: "boolean" }
        }
    });
    
    var product = new Product({ name: "Monitor", price: 299, inStock: true });
    
    // Bind to the change event
    product.bind("change", function(e) {
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Change event fired!");
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Field: " + e.field);
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("New value: " + e.value);
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Old value: " + e.previousValue);
    });
    
    product.set("name", "Gaming Monitor"); // triggers change event
    product.set("price", 399); // triggers change event
    product.set("inStock", false); // triggers change event
    </script>

### get

Fires when the `get` method is invoked. Inherited from `kendo.data.ObservableObject`. For more information and examples, refer to the [`get`](/api/javascript/data/observableobject/events/get) API reference.

#### Example

    <script>
    var Product = kendo.data.Model.define({
        fields: {
            name: { type: "string" },
            price: { type: "number" }
        }
    });
    
    var product = new Product({ name: "Keyboard", price: 79 });
    
    // Bind to the get event
    product.bind("get", function(e) {
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Get event fired for field: " + e.field);
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Value being retrieved: " + e.value);
    });
    
    var name = product.get("name"); // triggers get event
    var price = product.get("price"); // triggers get event
    </script>

### set

Fires when the `set` method is invoked. Inherited from `kendo.data.ObservableObject`. For more information and examples, refer to the [`set`](/api/javascript/data/observableobject/events/set) API reference.

#### Example

    <script>
    var Product = kendo.data.Model.define({
        fields: {
            name: { type: "string" },
            price: { type: "number" },
            available: { type: "boolean" }
        }
    });
    
    var product = new Product({ name: "Headphones", price: 149, available: true });
    
    // Bind to the set event
    product.bind("set", function(e) {
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Set event fired for field: " + e.field);
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("New value being set: " + e.value);
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Previous value: " + e.previousValue);
    });
    
    product.set("name", "Wireless Headphones"); // triggers set event
    product.set("price", 199); // triggers set event
    product.set("available", false); // triggers set event
    </script>
