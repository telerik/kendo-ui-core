---
title: Binder
---

# kendo.data.Binder

The base class of the Kendo UI MVVM-style bindings. Use it to create custom MVVM bindings.

## Fields

### bindings `Object`

Represents all bindings applied to the current HTML [element](#fields-element). Use it to get or set the current view model field value.

#### Example - get the view model field

    <div data-bind="slide: slideChecked" style="background: orange; width: 100px; height: 100px"></div>
    <label>Check to slide<input type="checkbox" data-bind="checked: slideChecked"></label>
    <script>
    kendo.data.binders.slide = kendo.data.Binder.extend({
        refresh: function() {
            // get the value of the view model field to which the slide binding is bound (slideChecked)
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

#### Example - use the HTML element of the binder

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

## Class methods

### extend

Creates a new binding which inherits from the kendo.data.Binder class.

#### Returns

`Object` a new class which inherits the base methods.

#### Parameters

##### prototype `Object`

A key/value pair of all methods that the new class will have.

#### Example - create custom HTML element binding

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

#### Example - create custom Kendo UI Widget binding

    <input data-role="numerictextbox" id="numeric" data-bind="value: value, max: max" />
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
    var viewModel = kendo.observable( {
      value: 10,
      max: 100
    });
    kendo.bind(document.body, viewModel);
    </script>

## Methods

### refresh

Invoked by the Kendo UI MVVM framework when the bound view model value is changed. The binder should update the UI (HTML element or Kendo UI widget) to reflect the view model change.

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
