---
title: Templates
page_title: jQuery FloatingActionButton Documentation
description: "Learn about hoe to use Kendo UI templates with the jQuery FloatingActionButton by Kendo UI"
slug: templates_floatingactionbutton_widget
position: 4
---

# Templates

The FloatingActionButton provides full control over the rendering of the speed dial action items by using [Kendo UI templates]({% slug overview_kendoui_templatescomponent %}).

For a complete example, refer to the [demo on customizing the FloatingActionButton templates](https://demos.telerik.com/kendo-ui/floatingactionbutton/templates).

## Item Templates

The [`items.template`](/api/javascript/ui/floatingactionbutton/configuration/items/template) configuration options manages the way the speed dial action items of a FloatingActionButton are rendered.

```
    <div id="fab"></div>

    <script>
      $(document).ready(function () {
        $("#fab").kendoFloatingActionButton({
          icon:"plus",
          items:[{
                icon:"star",
                label:"Add Rating",
                template:kendo.template($("#fabTemplate").html())
            },{
                icon:"edit",
                label:"Add Comment",
                template:kendo.template($("#fabTemplate").html())}]
        });
      });
    </script>

    <script id="fabTemplate">
      <span class="k-fab-item-text"><strong>#:text#</strong></span>
      <span class= "k-fab-item-icon k-icon k-i-#:icon#"></span>
    </script>
```

## See Also

* [API Demo of the FloatingActionButton](https://demos.telerik.com/kendo-ui/floatingactionbutton/api)
* [JavaScript API Reference of the FloatingActionButton](/api/javascript/ui/floatingactionbutton)
