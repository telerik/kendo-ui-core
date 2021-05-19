---
title: Binder
page_title: Configuration of the Binder component | Kendo UI API
description: API documentation and examples for configuring the Kendo UI Binder component.
res_type: api
---

# kendo.data.Binder

The base class of the Kendo UI MVVM-style bindings. Creates custom MVVM bindings.

## Fields

### bindings `Object`

Represents all bindings applied to the current HTML [element](/api/javascript/data/binder#fields-element). Gets or sets the current view-model field value.

#### Example - get the view model field

    <div data-bind="slide: slideChecked" style="background: orange; width: 100px; height: 100px"></div>
    <label>Check to slide<input type="checkbox" data-bind="checked: slideChecked"></label>
    <script>
    kendo.data.binders.slide = kendo.data.Binder.extend({
        refresh: function() {
            // Get the value of the view-model field to which the slide binding is bound (slideChecked)
            var value = this.bindings["slide"].get();

            if (value) {
                $(this.element).slideDown();
            } else {
                $(this.element).slideUp();
            }
        }
    });
    var viewModel = kendo.observable({
      slideChecked: true
    });
    kendo.bind(document.body, viewModel);
    </script>

### element `Element`

The bound HTML element.

#### Example - use the HTML element of the Binder

    <div data-bind="slide: slideChecked" style="background: orange; width: 100px; height: 100px"></div>
    <label>Check to slide<input type="checkbox" data-bind="checked: slideChecked"></label>
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
      slideChecked: true
    });
    kendo.bind(document.body, viewModel);
    </script>

## Class Methods

### extend

Creates a new binding which inherits from the `kendo.data.Binder` class.

#### Returns

`Object`&mdash;A new class which inherits the base methods.

#### Parameters

##### prototype `Object`

A key/value pair of all methods that the new class will have.

#### Example - create a custom HTML element binding

    <div data-bind="slide: slideChecked" style="background: orange; width: 100px; height: 100px"></div>
    <label>Check to slide<input type="checkbox" data-bind="checked: slideChecked"></label>
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
      slideChecked: true
    });
    kendo.bind(document.body, viewModel);
    </script>

#### Example - create a custom Kendo UI widget binding

    <input data-role="numerictextbox" id="numeric" data-bind="value: value, max: max" />
    <script>
    kendo.data.binders.widget.max = kendo.data.Binder.extend({
      init: function(widget, bindings, options) {
          // Call the base constructor
          kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
      },
      refresh: function() {
          var that = this,
          value = that.bindings["max"].get(); //get the value from the View-Model
          $(that.element).data("kendoNumericTextBox").max(value); //update the widget
      }
    });
    var viewModel = kendo.observable( {
      value: 10,
      max: 100
    });
    kendo.bind(document.body, viewModel);
    </script>

## Methods

### refresh

Invoked by the Kendo UI MVVM framework when the bound view-model value is changed. The Binder should update the UI (the HTML element or the Kendo UI widget) to reflect the view-model change.

#### Example - slide up or down the element when the bound value changes

    <div data-bind="slide: slideChecked" style="background: orange; width: 100px; height: 100px"></div>
    <label>Check to slide<input type="checkbox" data-bind="checked: slideChecked"></label>
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
      slideChecked: true
    });
    kendo.bind(document.body, viewModel);
    </script>
