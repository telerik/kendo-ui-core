---
title: Custom
---

# Custom binding

Kendo MVVM provides the ability to create custom bindings.

> **Important:** The custom binding should be registered **before**  `kendo.bind` is called.

## Registering a custom binding

A custom binding is registered by extending the [`kendo.data.Binder`](/api/framework/binder) object.

#### Example: one-way binding (the HTML element will be updated when the view-model changes)

    <script>
        kendo.data.binders.slide = kendo.data.Binder.extend({
            refresh: function() {
                var value = this.bindings["slide"].get();

                if (value) {
                    $(this.element).slideDown();
                } else {
                    $(this.element).slideUp();
                }
            }
        });

        var viewModel = kendo.observable({
            slideValue: true
        });

        kendo.bind(document.body, viewModel);
    </script>

    <div id="target" data-bind="slide: slideValue">
        One Big Orange Square.
    </div>

#### Example: two-way binding (both HTML element and View-Model will be updated)

    <script>
        kendo.data.binders.numericValue = kendo.data.Binder.extend({
            init: function(element, bindings, options) {
                //call the base constructor
                kendo.data.Binder.fn.init.call(this, element, bindings, options);

                var that = this;
                //listen for the change event of the element
                $(that.element).on("change", function() {
                    that.change(); //call the change function
                });
            },
            refresh: function() {
                var that = this,
                    value = that.bindings["numericValue"].get(); //get the value from the View-Model

                $(that.element).val(value); //update the HTML input element
            },
            change: function() {
                var value = this.element.value;
                //in this example the View-Model will be updated only if the value of the input is a number
                if (!isNaN(value)) {
                    this.bindings["numericValue"].set(value); //update the View-Model
                }
            }
        });

        //View-Model source
        var viewModel = kendo.observable({
            number: 10
        });

        kendo.bind(document.body, viewModel);
    </script>

    <!-- View source -->
    <input data-bind="numericValue: number" />
    Input value: <span data-bind="text: number" />

#### Example: custom widget binding (the widget will be updated when the view-model changes)

    //the following example demonstrates how to bind the max value of a NumericTextBox widget
    kendo.data.binders.widget.max = kendo.data.Binder.extend({
        init: function(widget, bindings, options) {
            //call the base constructor
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
        },
        refresh: function() {
            var that = this,
            value = that.bindings["max"].get(); //get the value from the View-Model
            $(that.element).data("kendoNumericTextBox").max(value); //update the widget
        }
    });

    <!-- View source -->
    <input data-role="numerictextbox" id="numeric" data-bind="value: value, max: max" />​

### init

This is the binding constructor. If this function is overriden the base Binder constructor should be called explicitly.

### refresh

The `refresh` handler is responsible for updating the HTML element. It will be executed each time when the value of the bound MVVM field changes. The bound DOM element and attached MVVM bindings could be retrieved through the context of the function.

    refresh: function() {
        this.bindings //contains all bindings for the current element
        this.element //reference the to the DOM element
    }

### change

The `change` handler is responsible for updating the View-Model. It listens for the change event of the bound HTML input element. The View-Model is updated through the `set(value)` method of the binding.

    change: function() {
        this.bindings //contains all bindings for the current element
        this.element //reference to the DOM element
    }

### bindings - methods

Bindings have two important methods - `get()` and `set(value)`.

The **get** method will return the value from the View-Model.

    this.bindings["slide"].get() //outputs true

The **set** method accepts one parameter and sets it as a new value of the bound field from the View-Model.

    this.bindings["slide"].set(false) //sets the slideValue to false

## Using the custom binding

Custom bindings are set via `data-bind` attribute.

    <div id="target" data-bind="slide: slideValue">
        One Big Orange Square.
    </div>
