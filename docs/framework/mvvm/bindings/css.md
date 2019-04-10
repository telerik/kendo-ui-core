---
title: CSS
page_title: CSS Binding | Kendo UI MVVM
description: "Learn how to update the classes of the DOM element to a View-Model value with CSS binding in Kendo UI MVVM."
slug: cssbinding_mvvm_kendoui
---

# CSS Binding

The [Kendo UI CSS (`css`) binding](http://demos.telerik.com/kendo-ui/mvvm/css) sets a predefined CSS class of the target DOM element to a Boolean View-Model value.

Changing the View-Model value via code is going to either add, or remove the CSS class of the DOM element.

```dojo
	<span data-bind="css:{online: isOnline, admin: isAdmin}">John Doe</span>
    <script>
    var viewModel = kendo.observable({
        isOnline: true,
        isAdmin: false
    });

    kendo.bind($("span"), viewModel);
    </script>
```

The following example demonstrates the expected output (the data-bind attribute is omitted for clarity).

```dojo
    <span class="online">John Doe</span>
```

## See Also

* [MVVM Overview]({% slug overview_mvvmpattern_kendoui %})
* [Overview of the Attribute Binding]({% slug attributebinding_mvvm_kendoui %})
* [Overview of the Checked Binding]({% slug checkedbinding_mvvm_kendoui %})
* [Overview of the Click Binding]({% slug clickbinding_mvvm_kendoui %})
* [Overview of the Custom Binding]({% slug custombinding_mvvm_kendoui %})
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
