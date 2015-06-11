---
title: CSS
page_title: CSS binding in Kendo UI MVVM | Kendo UI Documentation
description: Update the classes of the DOM element to a View-Model value with CSS binding in Kendo UI MVVM.
---

# CSS binding

The `css` binding sets a predefined CSS class of the target DOM element to a boolean View-Model value. Changing the View-Model value via code will either add or remove the CSS class of the DOM element. 

## Use the CSS binding
```html
	<span data-bind="css:{online: isOnline, admin: isAdmin}">John Doe</span>
    <script>
    var viewModel = kendo.observable({
        isOnline: true,
        isAdmin: false
    });

    kendo.bind($("span"), viewModel);
    </script>
```

The output will be (the data-bind attribute is omitted for clarity):
```html
    <span class="online">John Doe</span>
```
