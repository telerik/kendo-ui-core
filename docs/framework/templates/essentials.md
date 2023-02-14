---
title: Essentials
page_title: Templates Essentials and Implementation Specifics - Kendo UI Templates
description: "Learn how to implement the hash template syntax, render raw and HTML-encoded values, and handle external templates and expressions when working with the Kendo UI for jQuery Templates component."
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

>tip While other templating libraries include shorthand, like `{ each }`, Kendo UI does not deliver helper syntax for loops and opts for using normal JavaScript instead of custom syntax sugar because it is faster and easier for JavaScript developers.

To use the hash syntax, apply any of the following approaches:
* Render values as HTML (`#= #`).
* Use HTML encoding to display values (`#: #`).
* Execute arbitrary JavaScript code (`# if (true) { # ... non-script content here ... # } #`).

## Using Hash Literals

When you use the Kendo UI template architecture while having hash characters inside your application or website content, consider the following specifics:   

* If your template includes a `#` character literal, which is not part of a binding expression and is not a script code marker, you must escape that character. Otherwise, it will cause a template compilation error. For example, an error will be thrown if you use a `#` inside a URL hyperlink or a CSS color value. 
  
  In JavaScript strings, you can escape the `#` literal with `\\\\#`. In external HTML script templates, you can escape the `#` literal with `\\#`.

* If your template includes a `#` character, which is part of a binding expression of a nested template, you must escape that character. As a result, the outer template will ignore the character while the inner template will handle it correctly.

## Rendering Raw Values

To render a value in a template as-is, create a compiled inline template that is ready to render the data:

        var template = kendo.template("<div id='box'>#= firstName #</div>");

The following example demonstrates how an application consumes the template.

```dojo
    <div id="example"></div>
    <script>
        var template = kendo.template("<div id='box'>#= firstName #</div>");
        var data = { firstName: "Todd" }; //A value in JavaScript/JSON
        var result = template(data); //Pass the data to the compiled template
        $("#example").html(result); //display the result
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
        var data = { firstName: "<b>Todd</b>" }; //Data with HTML tags
        var result = template(data); //Pass the data to the compiled template
        $("#example").html(result); // display the following string result ("<b>Todd</b>")
    </script>
```

The following example demonstrates the output if, in the same scenario, you haven't used HTML encoding.

```dojo
    <div id="example"></div>
    <script>
        var template = kendo.template("<div id='box'>#= firstName #</div>");
        var data = { firstName: "<b>Todd</b>" }; //Data with HTML tags
        var result = template(data); //Pass the data to the compiled template
        $("#example").html(result); //display "Todd" in a bold font weight
    </script>
```

## Handling External Templates and Expressions

Normally, templates include expressions. While some templating frameworks invent their own re-implementation of JavaScript to provide expression sugar at the cost of performance, the Kendo UI Templates allow the execution of normal JavaScript inside templates thus favoring performance.

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
        // Use a custom function inside the template and define it in the global JavaScript scope.
        function myCustomFunction (str) {
            return str.replace(".", " ");
        }
        // Get the external template definition by using a jQuery selector.
        var template = kendo.template($("#javascriptTemplate").html());
        // Create some dummy data.
        var data = ["Todd.Holland", "Steve.Anglin", "Burke.Ballmer"];
        var result = template(data); //Execute the template
        $("#example").html(result); //Append the result
    </script>
```

You can also define custom variables inside a template expression and output them in the same fashion as data fields, as shown in the following example.

        <script id="javascriptTemplate" type="text/x-kendo-template">
            # var myCustomVariable = "foo"; #
  			<p>
  				#= myCustomVariable #
  			</p>
          </script>

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
