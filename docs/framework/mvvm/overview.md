---
title: Overview
page_title: MVVM Pattern Overview | Kendo UI MVVM
description: "Learn more about the Kendo UI Model View ViewModel, which is an implementation of the MVVM pattern, integrated with the Kendo UI framework."
slug: overview_mvvmpattern_kendoui
position: 1
---

{% if site.has_cta_panels == true %}
{% include cta-panel-small.html %}
{% endif %}

# MVVM Pattern Overview

[Model View ViewModel (MVVM)](https://en.wikipedia.org/wiki/Model_View_ViewModel) is a design pattern which helps developers separate the Model, which is the data, from the View, which is the user interface (UI).

The View-Model part of the MVVM is responsible for exposing the data objects from the Model in such a way that those objects are easily consumed in the View. The [Kendo UI MVVM component](https://demos.telerik.com/kendo-ui/mvvm/index) is an implementation of the MVVM pattern which seamlessly integrates with the rest of the Kendo UI framework&mdash;Kendo UI widgets and Kendo UI DataSource.

> Kendo UI MVVM initialization is not designed to be combined with the Kendo UI server wrappers. Using wrappers is equivalent to [jQuery plugin syntax initialization]({% slug initialize_widgets_using_jquery_plugins_installation %}). If you want to create Kendo UI widget instances via the MVVM pattern, then do not use server wrappers for these instances.

## Getting Started  

1. Start by creating a View-Model object. The View-Model is a representation of your data (the Model) which will be displayed in the View. To declare your View-Model use the `kendo.observable` function and pass it a JavaScript object.

        var viewModel = kendo.observable({
            name: "John Doe",
            displayGreeting: function() {
                var name = this.get("name");
                alert("Hello, " + name + "!!!");
            }
        });

1. Declare a View. The View is the UI, i.e. a set of HTML elements, which will be bound to the View-Model. In the following example, the `input` value (its text) is bound via the `data-bind` attribute to the `name` field of the View-Model. When that field changes, the `input` value is updated to reflect that change. The opposite is also true: when the value of the `input` changes, the field is updated. The `click` event of the `button` is bound via the `data-bind` attribute to the `displayGreeting` method of the View-Model. That method will be invoked when the user clicks the `button`.

        <div id="view">
            <input data-bind="value: name" />
            <button data-bind="click: displayGreeting">Display Greeting</button>
        </div>

1. Bind the View to the View-Model. This is done by calling the `kendo.bind` method:

## Setting the data-* Options

For more information on the naming convention setting the configuration options of the Kendo UI MVVM widgets, check the naming convention for the [set `data` options](https://docs.telerik.com/kendo-ui/intro/widget-basics/mvvm-initialization#setting-the-data-options).

> The hybrid widgets and frameworks in Kendo UI are not included in the default list of initialized namespaces. You can initialize them explicitly by running `kendo.bind(element, viewModel, kendo.mobile.ui);`.

The following example demonstrates how to set the `data-*` options.

    kendo.bind($("#view"), viewModel);

## Bindings

A binding pairs a DOM element (or widget) property to a field or method of the View-Model. Bindings are specified via the `data-bind` attribute in the form `<binding name>: <view model field or method>`, e.g. `value: name`. Two bindings were used in the aforementioned example: `value` and `click`.

The Kendo UI MVVM supports binding to other properties as well: `source`, `html`, `attr`, `visible`, `enabled`, and other. The `data-bind` may contain a comma-separated list of bindings e.g. `data-bind="value: name, visible: isNameVisible"`. For more information on each Kendo UI MVVM binding, refer to the [MVVM bindings articles]({% slug attributebinding_mvvm_kendoui %}).

> * Bindings cannot include hard-coded values but only references to properties of the `viewModel`. For example, the `data-bind="visible: false, source: [{ foo: 'bar'}]"` configuration is incorrect.
> * The `data-template` attributes cannot contain inline template definitions, but only ID's of [external templates]({% slug overview_kendoui_templatescomponent %}#inline-vs-external-templates).

The Kendo UI MVVM also supports data binding to nested View-Model fields.

    <div data-bind="text: person.name">
    </div>
    <script>
    var viewModel = kendo.observable({
        person: {
            name: "John Doe"
        }
    });
    kendo.bind($("div"), viewModel);
    </script>

## Important Notes

* Set numeric options as strings. Some Kendo UI widgets accept string options, which represent numbers and can be parsed as such, for example, `<input data-role="maskedtextbox" data-mask="09">`. This mask will be parsed as a number and the widget will receive a single 9-digit in its initialization method, instead of a `"09"` string. In such scenarios, the widget options must be [set with custom MVVM binding]({% slug howto_customize_masks_through_mvvmbinding_mvvm_maskedtextbox %}).
* Bindings are not JavaScript code. Although bindings look like JavaScript code, they are not. The `<div data-bind="text: person.name.toLowerCase()"></div>` chunk of code is not a valid Kendo UI MVVM binding declaration. If a value from the View-Model requires processing before displaying it in the View, a method should be created and used instead.

        <div data-bind="text: person.lowerCaseName"></div>

        <script>
        var viewModel = kendo.observable({
            person: {
                name: "John Doe",
                lowerCaseName: function() {
                    return this.get("name").toLowerCase();
                }
            }
        });
        kendo.bind($("div"), viewModel);
        </script>

## See Also

* [ObservableObject Overview]({% slug overview_observabeobject_kendoui %})
* [Tutorial on How to Build MVVM Bound Forms]({% slug mvvmboundforms_mvvmpattern_kendoui %})
* [How to Apply Source and Template Binding Using Model with Computed Field]({% slug howto_applysourceandtemplatebinding_usingmodelcomputedfield_mvvm %})

For more information on the bindings Kendo UI MVVM supports, refer to the section about [Kendo UI MVVM bindings]({% slug attributebinding_mvvm_kendoui %}).
