---
title: Getting Started
page_title: Getting Started - Kendo UI for jQuery MVVM
description: "Get started with the jQuery MVVM pattern by Kendo UI and learn how to bind elements to models."
components: ["mvvm"]
slug: getting_started_kendoui_mvvm
position: 1
---

# Getting Started with MVVM

This guide demonstrates how to use the Kendo UI for jQuery MVVM pattern to bind a view-model to an HTML element.

After the completion of this guide, you will achieve the following result:

```dojo
    <div id="view">
      <input data-bind="value: name" />
      <button data-bind="click: displayGreeting">Display Greeting</button>
    </div>

    <script>
      var viewModel = kendo.observable({
        name: "John Doe",
        displayGreeting: function() {
          var name = this.get("name");
          kendo.alert("Hello, " + name + "!!!");
        }
      });

      kendo.bind($("#view"), viewModel);
    </script>
```

## 1. Create the View-Model Object

Start by creating a View-Model object. The View-Model is a representation of your data (the Model) which will be displayed in the View. To declare your View-Model, use the `kendo.observable` function and pass it a JavaScript object.

        var viewModel = kendo.observable({
            name: "John Doe",
            displayGreeting: function() {
                var name = this.get("name");
                alert("Hello, " + name + "!!!");
            }
        });

## 2. Declare a View

The View is the UI, as in a set of HTML elements, which you will bind to the View-Model. In the following example, the `input` value (its text) is bound via the `data-bind` attribute to the `name` field of the View-Model. When that field changes, the `input` value is updated to reflect that change. The opposite is also true: when the value of the `input` changes, the field is updated. The `click` event of the `button` is bound via the `data-bind` attribute to the `displayGreeting` method of the View-Model. That method will be invoked when the user clicks the `button`.

        <div id="view">
            <input data-bind="value: name" />
            <button data-bind="click: displayGreeting">Display Greeting</button>
        </div>

## 3. Bind the View to the View-Model

This is achieved by calling the `kendo.bind` method:

    kendo.bind($("#view"), viewModel);

## Next Steps 

* [Using Observable Objects]({% slug overview_observabeobject_kendoui %})
* [Bindings Overview Article]({% slug overview_mvvmbindings_kendoui %})
* [Demo Page for the MVVM](https://demos.telerik.com/kendo-ui/mvvm/index)

## See Also 

* [Knowledge Base Section](/knowledge-base)

