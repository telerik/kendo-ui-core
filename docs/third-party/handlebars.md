---
title: Handlebars
page_title: Handlebars - Kendo UI Third-Party Tools
description: "Learn how to use Kendo UI components with Handlebars templating library and enhance your web applications with dynamic templates."
components: ["general"]
slug: handlebars_integration_kendoui
---

# Handlebars

The [Kendo UI components](https://demos.telerik.com/kendo-ui/) can be integrated with the [Handlebars](https://handlebarsjs.com/) templating library to create dynamic content for your components.

## Basic Integration

1. Include the Handlebars library in your project:

    ```html
    <script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.min.js"></script>
    ```

2. Create a Handlebars template:

    ```html
    <script id="template" type="text/x-handlebars-template">
        <div>
            <h3>{{name}}</h3>
            <p>{{description}}</p>
        </div>
    </script>
    ```

3. Use the template with a Kendo UI component:

    ```javascript
    // Compile the template
    var source = $("#template").html();
    var template = Handlebars.compile(source);

    // Use with a Kendo UI component
    $("#listView").kendoListView({
        dataSource: dataSource,
        template: function(data) {
            return template(data);
        }
    });
    ```

## Example: Handlebars with Kendo UI ListView

```html
<script id="product-template" type="text/x-handlebars-template">
    <div class="product">
        <h3>{{ProductName}}</h3>
        <p>Price: ${{UnitPrice}}</p>
    </div>
</script>

<div id="listView"></div>

<script>
    var template = Handlebars.compile($("#product-template").html());
    
    $("#listView").kendoListView({
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Products",
                    dataType: "jsonp"
                }
            }
        },
        template: function(data) {
            return template(data);
        }
    });
</script>
```

## See Also

* [Kendo UI Templates]({% slug overview_kendoui_templatescomponent %})
* [Twitter Bootstrap Integration]({% slug twitterbootstrapintegration_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
* [Module Bundlers]({% slug module_bundlers_integration_kendoui %})7
