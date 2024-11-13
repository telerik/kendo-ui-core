---
title: Overview
page_title: MVVM Pattern Overview - Kendo UI MVVM
description: "Learn more about the Kendo UI Model View ViewModel, which is an implementation of the MVVM pattern, integrated with the Kendo UI framework."
slug: overview_mvvmpattern_kendoui
position: 0
---

{% if site.has_cta_panels == true %}
{% include cta-panel-small.html %}
{% endif %}

# MVVM Pattern Overview

[Model View ViewModel (MVVM)](https://en.wikipedia.org/wiki/Model_View_ViewModel) is a design pattern which helps developers separate the Model, which is the data, from the View, which is the user interface (UI).

The View-Model part of the MVVM handles the exposing of the data objects from the Model in such a way that those objects are consumed in the View. The [Kendo UI MVVM component](https://demos.telerik.com/kendo-ui/mvvm/index) is an implementation of the MVVM pattern which seamlessly integrates with the rest of the Kendo UI framework&mdash;Kendo UI widgets and Kendo UI DataSource.

> Kendo UI MVVM initialization is not designed to be combined with the Kendo UI server wrappers. Using wrappers is equivalent to [jQuery plugin syntax initialization]({% slug initialize_widgets_using_jquery_plugins_installation %}). If you want to create Kendo UI widget instances via the MVVM pattern, then do not use server wrappers for these instances.

## Important Notes

* Set numeric options as strings. Some Kendo UI widgets accept string options, which represent numbers and can be parsed as such, for example, `<input data-role="maskedtextbox" data-mask="09">`. This mask will be parsed as a number and the widget will receive a single 9-digit in its initialization method, instead of a `"09"` string. In such scenarios, the widget options must be [set with custom MVVM binding]({% slug howto_customize_masks_through_mvvmbinding_mvvm_maskedtextbox %}).
* Bindings are not JavaScript code. Although bindings look like JavaScript code, they are not. The `<div data-bind="text: person.name.toLowerCase()"></div>` chunk of code is not a valid Kendo UI MVVM binding declaration. If a value from the View-Model requires processing before displaying it in the View, a method must be created and used instead. Note: Although the approach was working with older Kendo UI for jQuery versions, with the [CSP compliance improvements]({% slug troubleshooting_content_security_policy_kendoui %}) introduced with the 2023 R1 release, the approach could not be used. 


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

* Initializing components' properties by passing `JSON` as string to the `DOM` results in unsafe HTML and is not recommended. The better practise is to pass the properties to the [`Observable Objects`]({% slug overview_observabeobject_kendoui %}).

## Functionality and Features

* [ObservableObject]({% slug overview_observabeobject_kendoui %})&mdash;All View-Model objects inherit from `kendo.data.ObservableObject`.
* [Forms]({% slug mvvmboundforms_mvvmpattern_kendoui %})&mdash;You can collect data from HTML forms.
* [Inheritance]({% slug inheritance_kendoui_gettingstarted %})&mdash;The MVVM pattern allows you to take advantage of the inheritance from parent classes.
* [Bindings]({% slug overview_mvvmbindings_kendoui %})&mdash;Kendo UI MVVM supports bindings that pair a DOM element (or component) property to a field or method of the View-Model.

## Next Steps

* [Getting Started with the MVVM Pattern]({% slug getting_started_kendoui_mvvm %})

## See Also

* [jQuery Forums](https://www.telerik.com/forums/kendo-ui)
* [jQuery Blog](https://www.telerik.com/blogs/tag/jquery)
* [jQuery Videos](https://www.telerik.com/videos/kendo-jquery-ui)
* [jQuery Roadmap](https://www.telerik.com/support/whats-new/kendo-ui/roadmap)
* [jQuery Pricing](https://www.telerik.com/purchase/kendo-ui)
* [jQuery Training](https://learn.telerik.com/learn/course/external/view/elearning/30/kendo-ui-for-jquery-with-javascript)
