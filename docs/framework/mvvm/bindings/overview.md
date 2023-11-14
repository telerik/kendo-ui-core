---
title: Overview
page_title: MVVM Bindings Overview - Kendo UI MVVM
description: "Learn more about the different bindings that the Kendo UI for jQuery MVVM provides."
slug: overview_mvvmbindings_kendoui
position: 0
---

# Bindings

A binding pairs a DOM element (or widget) property to a field or method of the View-Model. Bindings are specified via the `data-bind` attribute in the form `<binding name>: <view model field or method>`, such as `value: name`.

The Kendo UI MVVM supports binding to other properties as well: `source`, `html`, `attr`, `visible`, `enabled`, and others. The `data-bind` attribute may contain a comma-separated list of bindings, such as `data-bind="value: name, visible: isNameVisible"`. For more information on each Kendo UI MVVM binding, refer to the [MVVM bindings articles]({% slug attributebinding_mvvm_kendoui %}).

> * Bindings cannot include hard-coded values but only references to properties of the `viewModel`. For example, the `data-bind="visible: false, source: [{ foo: 'bar'}]"` configuration is incorrect.
> * The `data-template` attributes cannot contain inline template definitions, but only IDs of [external templates]({% slug overview_kendoui_templatescomponent %}#inline-vs-external-templates).

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