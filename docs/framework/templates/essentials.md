---
title: Essentials
page_title: Templates Essentials and Implementation Specifics - Kendo UI Templates
description: "Learn how to implement the hash template syntax, render raw and HTML-encoded values, and handle external templates and expressions when working with the Kendo UI for jQuery Templates component."
components: ["general"]
slug: essentials_templates
position: 4
---

# Essentials 

The Kendo UI Templates require a specific `#` (hash) syntax, enable you to render raw and HTML-encoded values, and handle external templates and expressions. 

## Template Syntax

The Kendo UI Templates use a hash-template syntax by utilizing the `#` (hash) sign for marking the areas that will be parsed. 

The `#` (hash) sign allows you to:
* Mark areas that will be replaced by data during the template execution.
* Signify the beginning and end of custom JavaScript code within the template.

>tip While other template libraries include shorthand, like `{ each }`, Kendo UI does not deliver helper syntax for loops and opts for using normal JavaScript instead of custom syntax sugar. This is faster and easier for JavaScript developers.

To use the hash syntax, apply any of the following approaches:
* Render values as HTML (`#= #`).
* Use HTML encoding to display values (`#: #`).
* Execute arbitrary JavaScript code (`# if (true) { # ... non-script content here ... # } #`).

## Using Hash Literals

When you use the Kendo UI template architecture while having hash characters inside your application or website content, consider the following specifics:   

* If your template includes a `#` character literal, which is not part of a binding expression and is not a script code marker, you must escape that character. Otherwise, it will cause a template compilation error. For example, an error will appear if you use a `#` inside a URL hyperlink or a CSS color value. 
  
  In JavaScript strings, you can escape the `#` literal with `\\\\#`. In external HTML script templates, you can escape the `#` literal with `\\#`.

* If your template includes a `#` character, which is part of a binding expression of a nested template, you must escape that character. As a result, the outer template will ignore the character while the inner template will handle it correctly.

### Escaping Hash in URLs

The following example demonstrates how to escape hash literals in URL fragments.

```dojo
    <div id="example"></div>
    <script id="urlTemplate" type="text/x-kendo-template">
        <div>
            <a href="/page\\#section-#= id #">Go to Section #= id #</a>
        </div>
    </script>
    <script>
        var template = kendo.template($("#urlTemplate").html());
        var data = { id: "5" };
        var result = template(data);
        $("#example").html(result);
    </script>
```

### Escaping Hash in CSS Colors

The following example demonstrates how to use CSS color values with hash symbols.

```dojo
    <div id="example"></div>
    <script id="colorTemplate" type="text/x-kendo-template">
        <div style="background-color: \\#3498db; color: \\#ffffff; padding: 10px;">
            <h3>#= title #</h3>
            <p style="color: \\#ecf0f1;">#= description #</p>
        </div>
    </script>
    <script>
        var template = kendo.template($("#colorTemplate").html());
        var data = {
            title: "Featured Item",
            description: "This is a sample description with styled background."
        };
        var result = template(data);
        $("#example").html(result);
    </script>
```

### Inline Template with Escaped Hash

The following example demonstrates escaping hash literals in inline templates.

```dojo
    <div id="example"></div>
    <script>
        var template = kendo.template("<div>Code: \\\\#12345 - #= name #</div>");
        var data = { name: "Product Alpha" };
        var result = template(data);
        $("#example").html(result);
    </script>
```

## Rendering Raw Values

To render a value in a template as-is, create a compiled inline template that is ready to render the data:

        var template = kendo.template("<div id='box'>#= firstName #</div>");

The following example demonstrates how an application consumes the template.

```dojo
    <div id="example"></div>
    <script>
        var template = kendo.template("<div id='box'>#= firstName #</div>");
        var data = { firstName: "Todd" };
        var result = template(data);
        $("#example").html(result);
    </script>
```

### Rendering Multiple Properties

The following example demonstrates how to render multiple properties from a data object.

```dojo
    <div id="example"></div>
    <script>
        var template = kendo.template("<div><strong>#= name #</strong><br>Email: #= email #<br>Phone: #= phone #</div>");
        var data = {
            name: "John Smith",
            email: "john@example.com",
            phone: "555-1234"
        };
        var result = template(data);
        $("#example").html(result);
    </script>
```

### Rendering Nested Properties

The following example demonstrates how to access nested object properties in templates.

```dojo
    <div id="example"></div>
    <script>
        var template = kendo.template("<div>#= user.name #, #= user.address.city #</div>");
        var data = {
            user: {
                name: "Alice Johnson",
                address: {
                    city: "New York",
                    state: "NY"
                }
            }
        };
        var result = template(data);
        $("#example").html(result);
    </script>
```

### Rendering with Default Values

The following example demonstrates how to handle missing or undefined properties with default values.

```dojo
    <div id="example"></div>
    <script>
        var template = kendo.template("<div>#= title || 'Untitled' #</div>");
        var data1 = { title: "My Document" };
        var data2 = {};
        $("#example").html(template(data1) + template(data2));
    </script>
```

## Rendering HTML-Encoded Values

HTML encoding escapes the HTML tags in the data and renders them as strings. For example, you can use the HTML-encoding approach to avoid the rendering of HTML tags in your templates. Also, HTML encoding will prevent the breaking of the layout if you are working with data from unknown sources such as user-submitted values or if your users have included HTML markup in the content.

The following example demonstrates how to render an encoded HTML value in a template by using the Kendo UI Templates as they can automatically handle the encoding.

        var template = kendo.template("<div id='box'>#: firstName #</div>");

The following example demonstrates the produced output when the template is consumed, assuming that no HTML characters occur in the data.

```dojo
    <div id="example"></div>
    <script>
        var template = kendo.template("<div id='box'>#: firstName #</div>");
        var data = { firstName: "<b>Todd</b>" };
        var result = template(data);
        $("#example").html(result);
    </script>
```

The following example demonstrates the output if, in the same scenario, you haven't used HTML encoding.

```dojo
    <div id="example"></div>
    <script>
        var template = kendo.template("<div id='box'>#= firstName #</div>");
        var data = { firstName: "<b>Todd</b>" };
        var result = template(data);
        $("#example").html(result);
    </script>
```

### Rendering User-Generated Content Safely

The following example demonstrates how to safely render user-submitted content that may contain malicious scripts.

```dojo
    <div id="example"></div>
    <script>
        var template = kendo.template("<div class='comment'><strong>#: username #</strong><p>#: comment #</p></div>");
        var data = {
            username: "<script>alert('XSS')<\/script>Admin",
            comment: "Check out this <a href='javascript:alert(1)'>link</a>"
        };
        var result = template(data);
        $("#example").html(result);
    </script>
```

### Comparing Encoded and Raw Values

The following example demonstrates the difference between encoded and raw rendering side by side.

```dojo
    <div id="example"></div>
    <script>
        var template = kendo.template("<div><strong>Encoded:</strong> #: content #<br><strong>Raw:</strong> #= content #</div>");
        var data = { content: "<em>Italic Text</em>" };
        var result = template(data);
        $("#example").html(result);
    </script>
```

### Rendering Special Characters

The following example demonstrates how HTML encoding handles various special characters.

```dojo
    <div id="example"></div>
    <script>
        var template = kendo.template("<div>#: text #</div>");
        var data = { text: "Price: $100 < $200 & $150 > $50" };
        var result = template(data);
        $("#example").html(result);
    </script>
```

## Handling External Templates and Expressions

Normally, templates include expressions. While some template frameworks invent their own re-implementation of JavaScript to provide expression sugar at the cost of performance, the Kendo UI Templates allow the execution of normal JavaScript inside templates thus favoring performance.

The following example demonstrates how to display a list of items by using JavaScript and Kendo UI Templates.

        <script id="javascriptTemplate" type="text/x-kendo-template">
            <ul>
            # for (var i = 0; i < data.length; i++) { #
                <li>#= myCustomFunction(data[i]) #</li>
            # } #
            </ul>
        </script>

To consume an external template with an expression, initialize a template that uses this definition and receives an array of values. Inside the template, the JavaScript executes a `for` loop and produces an HTML list item for each name. The example uses an auxiliary global JavaScript function to manipulate each data item during display.

```dojo
    <div id="example"></div>
    <script id="javascriptTemplate" type="text/x-kendo-template">
        <ul>
        # for (var i = 0; i < data.length; i++) { #
            <li>#= myCustomFunction(data[i]) #</li>
        # } #
        </ul>
    </script>
    <script type="text/javascript">
        function myCustomFunction (str) {
            return str.replace(".", " ");
        }
        var template = kendo.template($("#javascriptTemplate").html());
        var data = ["Todd.Holland", "Steve.Anglin", "Burke.Ballmer"];
        var result = template(data);
        $("#example").html(result);
    </script>
```

### Using Conditional Logic

The following example demonstrates how to use if-else statements in templates.

```dojo
    <div id="example"></div>
    <script id="conditionalTemplate" type="text/x-kendo-template">
        <div class="user-card">
            <h3>#= name #</h3>
            # if (age >= 18) { #
                <span class="badge">Adult</span>
            # } else { #
                <span class="badge">Minor</span>
            # } #
            # if (isActive) { #
                <span class="status active">Active</span>
            # } else { #
                <span class="status inactive">Inactive</span>
            # } #
        </div>
    </script>
    <script>
        var template = kendo.template($("#conditionalTemplate").html());
        var users = [
            { name: "John Doe", age: 25, isActive: true },
            { name: "Jane Smith", age: 16, isActive: false }
        ];
        users.forEach(function(user) {
            $("#example").append(template(user));
        });
    </script>
```

### Iterating Over Arrays

The following example demonstrates how to loop through arrays and render each item.

```dojo
    <div id="example"></div>
    <script id="arrayTemplate" type="text/x-kendo-template">
        <div class="product-list">
            <h2>#= category #</h2>
            <ul>
            # for (var i = 0; i < products.length; i++) { #
                <li>
                    <strong>#= products[i].name #</strong> - $#= products[i].price #
                    # if (products[i].inStock) { #
                        <span class="in-stock">In Stock</span>
                    # } else { #
                        <span class="out-of-stock">Out of Stock</span>
                    # } #
                </li>
            # } #
            </ul>
        </div>
    </script>
    <script>
        var template = kendo.template($("#arrayTemplate").html());
        var data = {
            category: "Electronics",
            products: [
                { name: "Laptop", price: 999, inStock: true },
                { name: "Mouse", price: 25, inStock: true },
                { name: "Keyboard", price: 75, inStock: false }
            ]
        };
        var result = template(data);
        $("#example").html(result);
    </script>
```

### Using JavaScript Array Methods

The following example demonstrates how to use array methods like filter, map, and forEach in templates.

```dojo
    <div id="example"></div>
    <script id="arrayMethodsTemplate" type="text/x-kendo-template">
        <div>
            <h3>Premium Items (Price > $50)</h3>
            <ul>
            # data.filter(function(item) { return item.price > 50; }).forEach(function(item) { #
                <li>#= item.name # - $#= item.price #</li>
            # }); #
            </ul>
        </div>
    </script>
    <script>
        var template = kendo.template($("#arrayMethodsTemplate").html());
        var data = [
            { name: "Phone", price: 699 },
            { name: "Case", price: 20 },
            { name: "Charger", price: 35 },
            { name: "Tablet", price: 499 }
        ];
        var result = template(data);
        $("#example").html(result);
    </script>
```

### Using Template Variables

You can define custom variables inside a template expression and output them in the same fashion as data fields, as shown in the following example.

```dojo
    <div id="example"></div>
    <script id="variablesTemplate" type="text/x-kendo-template">
        # var total = 0; #
        # var taxRate = 0.08; #
        <div>
            <ul>
            # for (var i = 0; i < items.length; i++) { #
                # total += items[i].price * items[i].quantity; #
                <li>#= items[i].name # - Qty: #= items[i].quantity # - $#= items[i].price * items[i].quantity #</li>
            # } #
            </ul>
            <hr>
            # var tax = total * taxRate; #
            # var grandTotal = total + tax; #
            <p>Subtotal: $#= total.toFixed(2) #</p>
            <p>Tax (8%): $#= tax.toFixed(2) #</p>
            <p><strong>Total: $#= grandTotal.toFixed(2) #</strong></p>
        </div>
    </script>
    <script>
        var template = kendo.template($("#variablesTemplate").html());
        var data = {
            items: [
                { name: "Widget A", price: 29.99, quantity: 2 },
                { name: "Widget B", price: 49.99, quantity: 1 },
                { name: "Widget C", price: 19.99, quantity: 3 }
            ]
        };
        var result = template(data);
        $("#example").html(result);
    </script>
```

### Formatting Dates

The following example demonstrates how to format dates within templates.

```dojo
    <div id="example"></div>
    <script id="dateTemplate" type="text/x-kendo-template">
        <div>
            <h3>Event: #= title #</h3>
            # var eventDate = new Date(date); #
            <p>Date: #= eventDate.toLocaleDateString() #</p>
            <p>Time: #= eventDate.toLocaleTimeString() #</p>
            <p>Day: #= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][eventDate.getDay()] #</p>
        </div>
    </script>
    <script>
        var template = kendo.template($("#dateTemplate").html());
        var data = {
            title: "Product Launch",
            date: "2026-02-15T14:30:00"
        };
        var result = template(data);
        $("#example").html(result);
    </script>
```

Even if the expressions are within HTML comments, they are executed.

    <!-- #alert('it is executed!')# -->

## Known Limitations 

For more information on the existing limitations, refer to the documentation on [using script expressions in the `Name()` method of Kendo UI MVC wrappers](/aspnet-mvc/troubleshoot/troubleshooting#kendo-ui-mvc-wrappers-do-not-work-inside-client-templates).

## See Also

* [Templates Performance]({% slug performance_kendoui_templatescomponent %})
* [Loading Templates from External Files]({% slug externalteplateloading_templatescomponent %})
* [Templates JavaScript API Reference](/api/javascript/kendo/methods/template)
* [Templates Demos](https://demos.telerik.com/kendo-ui/templates/index)
* [Knowledge Base](https://docs.telerik.com/kendo-ui/knowledge-base)
