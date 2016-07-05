---
title: Custom
page_title: Custom | Kendo UI MVVM
description: "Learn how to create custom bindings in Kendo UI MVVM."
slug: custombinding_mvvm_kendoui
---

# Custom Binding

The [Kendo UI MVVM component](http://demos.telerik.com/kendo-ui/mvvm/index) allows for the [custom bindings](http://demos.telerik.com/kendo-ui/mvvm/custom).

> **Important**
>
> The custom binding should be registered before the `kendo.bind` method is called.

## Getting Started

A custom binding is registered by extending the [`kendo.data.Binder`](/api/javascript/data/binder) object.

### One-Way Custom Bindings

The example below demonstrates how to register a one-way binding. As a result, the HTML element is updated when the view-model changes.  

###### Example

```html
    <p><label><input type="checkbox" data-bind="checked: slideValue" />toggle slideValue</label></p>

    <div id="target" style="width:200px;height:200px;background:#fc9;" data-bind="slide: slideValue">
        Orange Square.
    </div>

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
```

### Two-Way Custom Bindings

The example below demonstrates how to register a two-way binding. As a result, both the HTML element and the View-Model are updated.

###### Example

```html
    <input data-bind="numericValue: number" />
    Input value: <span data-bind="text: number" />
    
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
```

### Custom Widget Binding

The example below demonstrates how to bind the max value of a Kendo UI NumericTextBox widget. As a result, the widget is updated when the View-Model changes.

###### Example

```html
    <input data-role="numerictextbox" id="numeric" data-bind="value: value, max: max" />​

    <script>
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
    
    //View-Model source
    var viewModel = kendo.observable({
        value: 5,
        max: 10
    });

    kendo.bind(document.body, viewModel);    
    </script>


```

#### Breakdown of Code Elements

* `init`&mdash;This is the binding constructor. If this function is overridden, the base `Binder` constructor should be called explicitly.
* `refresh`&mdash;This is the handler responsible for updating the HTML element. It is executed each time when the value of the bound MVVM field changes. The bound DOM element and the attached MVVM bindings could be retrieved through the context of the function.

###### Example

    refresh: function() {
        this.bindings //contains all bindings for the current element
        this.element //reference the to the DOM element
    }

* `change`&mdash;This is the handler responsible for updating the View-Model. It listens for the change event of the bound HTML input element. The View-Model is updated through the `set(value)` method of the binding.

###### Example

    change: function() {
        this.bindings //contains all bindings for the current element
        this.element //reference to the DOM element
    }

* Binding methods&mdash;Bindings have two important methods: `get()` and `set(value)`.

The `get` method returns the value from the View-Model.

###### Example

    this.bindings["slide"].get() //outputs true

The `set` method accepts one parameter and sets it as a new value of the bound field from the View-Model.

###### Example

    this.bindings["slide"].set(false) //sets the slideValue to false

## Basic Usage

Custom bindings are set via `data-bind` attribute, as demonstrated in the example below.

###### Example

    <div id="target" data-bind="slide: slideValue">
        One Big Orange Square.
    </div>

## See Also

Other articles on the Kendo UI MVVM component and bindings:

* [MVVM Overview]({% slug overview_mvvmpattern_kendoui %})
* [Overview of the Attribute Binding]({% slug attributebinding_mvvm_kendoui %})
* [Overview of the Checked Binding]({% slug checkedbinding_mvvm_kendoui %})
* [Overview of the Click Binding]({% slug clickbinding_mvvm_kendoui %})
* [Overview of the CSS Binding]({% slug cssbinding_mvvm_kendoui %})
* [Overview of the Disabled Binding]({% slug disabledbinding_mvvm_kendoui %})
* [Overview of the Enabled Binding]({% slug enabledbinding_mvvm_kendoui %})
* [Overview of the Events Binding]({% slug eventsbinding_mvvm_kendoui %})
* [Overview of the HTML Binding]({% slug htmlbinding_mvvm_kendoui %})
* [Overview of the Invisible Binding]({% slug invisiblebinding_mvvm_kendoui %})
* [Overview of the Source Binding]({% slug sourceblebinding_mvvm_kendoui %})
* [Overview of the Style Binding]({% slug stylebinding_mvvm_kendoui %})
* [Overview of the Text Binding]({% slug textbinding_mvvm_kendoui %})
* [Overview of the Value Binding]({% slug valuebinding_mvvm_kendoui %})
* [Overview of the Visible Binding]({% slug visiblebinding_mvvm_kendoui %})
