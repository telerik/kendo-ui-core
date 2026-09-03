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


<div class="meta-api-description">
How to access data bindings for a specific HTML element in Kendo UI Binder component? Retrieve or modify all data bindings associated with a specific HTML element within a Binder component, enabling inspection, iteration, or synchronization of bound values between the element and its view-model fields. Control or access the collection of binding entries attached to the element to programmatically get or set bound data, update fields, manage binding states, and interact with data synchronization after initialization, supporting scenarios like dynamic binding updates, real-time data manipulation, and binding state inspection for effective two-way data binding management.
</div>

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


<div class="meta-api-description">
How do I access the HTML element associated with a Kendo UI data-bound component? Retrieve or interact with the specific HTML DOM node linked to a data-binding or UI synchronization component, allowing developers to read or modify the element’s attributes, inner content, CSS styles, event handlers, or other properties on the associated DOM element after binding setup. This direct reference supports manipulation or inspection of the bound node for tasks such as dynamic updates, event delegation, style adjustments, attribute toggling, and other front-end element management scenarios involving components that connect data or logic to specific HTML elements.
</div>

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


<div class="meta-api-description">
How do I create custom data-binding behavior in Kendo UI for jQuery? Create or customize data-binding behavior by defining new binder types that inherit and extend existing binding classes, enabling you to implement custom MVVM or data-binding logic, override or add methods for how data connects to UI components, control DOM updates, configure specialized bind and unbind processes, and tailor the way data flows and updates synchronize between models and views through subclassing binding constructors.
</div>

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


<div class="meta-api-description">
How do I update my Kendo UI widgets when the bound data model changes? Refresh or update user interface elements based on changes in bound data models, enabling synchronization between view-model values and displayed content; configure dynamic UI refreshing by implementing methods that detect data updates, re-render components, apply new attributes, manage formatting changes, and maintain the current state of HTML elements or UI widgets, ensuring that data binding reflects the most recent model state across various scenarios and custom components.
</div>

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
