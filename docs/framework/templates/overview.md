---
title: Overview
page_title: Templates Overview | Kendo UI Templates
description: "Learn how to use HTML encoding and compilation in the Kendo UI Templates component."
slug: overview_kendoui_templatescomponent
position: 1
---

# Templates Overview

The [Kendo UI Templates](http://demos.telerik.com/kendo-ui/templates/index) provide a simple-to-use, high-performance JavaScript templating engine within the Kendo UI toolkit.

Templates offer a way to create HTML chunks that can be automatically merged with JavaScript data. They are a substitute for traditional HTML string building in JavaScript. Kendo UI Templates focus on providing essential templating features needed for common user interface (UI) rendering scenarios, with a heavy emphasis on performance over feature glut. Kendo UI Templates trade convenient [syntax sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) for improved performance, which distinguishes it from other templating JavaScript libraries.

## Template Syntax

The Kendo UI Templates use a simple templating syntax called hash templates. With this syntax, the `#` (hash) sign is used to mark areas in a template that should be replaced by data when the template is executed. The `#` character is also used to signify the beginning and end of custom JavaScript code inside the template.

> Kendo UI does not provide helper syntax for loops. While other templating libraries include shorthand like `{ each }`, Kendo UI opts to use normal JavaScript instead of custom syntax sugar. The reason for this is that it is much faster and it is also easy for anyone familiar with JavaScript to use. If you know JavaScript, then you know Kendo UI templates.

To use the hash syntax, use any of the following approaches:
* Render values as HTML: `#= #`.
* Use HTML encoding to display values: `#: #`.
* Execute arbitrary JavaScript code: `# if (true) { # ... non-script content here ... # } #`.

## Hash Literals

* If your template includes a literal `#` character, which is not part of a binding expression and is not a script code marker, then you must escape that character or it causes a template compilation error. For example, this can happen if a `#` is used inside a hyperlink URL or a CSS color value. Literal `#` in JavaScript strings are escaped via `\\\\#`, while literal `#` in external HTML script templates are escaped via `\\#`.
* If your template includes a `#` character, which is part of a binding expression of a nested template, then this character must be escaped as well. In this way the character is ignored by the outer template, but is handled correctly by the inner template.

### Rendering Raw Values

To render a value as-is in a template, use the following example. It creates a compiled in-line template that is ready for rendering with data.

        var template = kendo.template("<div id='box'>#= firstName #</div>");

The following example demonstrates what consuming the template in an application looks like.

       <div id="example"></div>
        <script>
            var template = kendo.template("<div id='box'>#= firstName #</div>");
            var data = { firstName: "Todd" }; //A value in JavaScript/JSON
            var result = template(data); /Pass the data to the compiled template
            $("#example").html(result); //display the result
        </script>

### Rendering HTML-Encoded Values

> HTML encoding is useful when you want to avoid rendering HTML tags in your templates. It escapes the HTML tags in your data and renders the tags as a string. When working with data from unknown sources, such as user-submitted values, use HTML encoding in case users have included HTML markup in the content that could break the layout of your page.

The following example demonstrates how to render an encoded HTML value in a template through the templates as they can automatically handle the encoding.

        var template = kendo.template("<div id='box'>#: firstName #</div>");

The following example demonstrates the produced output when the template is consumed and assuming no HTML characters occur in the data.

        <div id="example"></div>
        <script>
            var template = kendo.template("<div id='box'>#: firstName #</div>");
            var data = { firstName: "<b>Todd</b>" }; //Data with HTML tags
            var result = template(data); //Pass the data to the compiled template
            $("#example").html(result); // display the following string result ("<b>Todd</b>")
        </script>

The following example demonstrates the output if the HTML encoding is not used.

        <div id="example"></div>
        <script>
            var template = kendo.template("<div id='box'>#= firstName #</div>");
            var data = { firstName: "<b>Todd</b>" }; //Data with HTML tags
            var result = template(data); //Pass the data to the compiled template
            $("#example").html(result); //display "Todd" in a bold font weight
        </script>

### Handling External Templates and Expressions

Normally, templates include expressions. Some templating frameworks invent their own re-implementation of JavaScript to provide expression sugar at the cost of performance, but Kendo UI templates opt to allow the execution of normal JavaScript inside templates, again favoring performance over expensive syntax sugar.

The following example demonstrates how to display a list of items using JavaScript and Kendo UI templates.

        <script id="javascriptTemplate" type="text/x-kendo-template">
            <ul>
            # for (var i = 0; i < data.length; i++) { #
                <li>#= myCustomFunction(data[i]) #</li>
            # } #
            </ul>
        </script>

To consume the external template with an expression, initialize a template that uses this definition and receives an array of values. The JavaScript executes a `for` loop inside the template and produces a HTML list item for each name. An auxiliary global JavaScript function is used to manipulate each data item during display.

        <div id="example"></div>

        <script id="javascriptTemplate" type="text/x-kendo-template">
            <ul>
            # for (var i = 0; i < data.length; i++) { #
                <li>#= myCustomFunction(data[i]) #</li>
            # } #
            </ul>
        </script>

        <script type="text/javascript">
            // Use a custom function inside the template. Must be defined in the global JavaScript scope.
            function myCustomFunction (str) {
                return str.replace(".", " ");
            }

            // Get the external template definition using a jQuery selector.
            var template = kendo.template($("#javascriptTemplate").html());

            // Create some dummy data.
            var data = ["Todd.Holland", "Steve.Anglin", "Burke.Ballmer"];

            var result = template(data); //Execute the template
            $("#example").html(result); //Append the result
        </script>

You can define custom variables inside a template expression and then output in the same fashion as data fields.

        <script id="javascriptTemplate" type="text/x-kendo-template">
            # var myCustomVariable = "foo"; #
  			<p>
  				#= myCustomVariable #
  			</p>
          </script>

Expressions, even if they are within HTML comments, are executed.

    <!-- #alert('it is executed!')# -->

For more information on the existing limitations, refer to the documentation on [using script expressions in the `Name()` method of Kendo UI MVC wrappers](/aspnet-mvc/troubleshoot/troubleshooting#kendo-ui-mvc-wrappers-do-not-work-inside-client-templates).

## Inline and External Templates

To define a template, use either of the following approaches:

- Defining inline templates&mdash;Use JavaScript strings and are good for small templates.
- Defining external templates&mdash;Use HTML script blocks. Most larger templates which include logic or HTML markup should use external templates. Since external templates live in HTML instead of JavaScript, they are easier for designers to create and modify.

### Creating Inline Templates

To create an inline template, create a JavaScript string.

        var templateString = "Your name is #: myName #";
        var template = kendo.template(templateString);

As long as the data, passed in to the template, contains a variable called `myName`, the template works. If an inline template contains a literal `#`, escape it through the `var templateString = '<a href="\\#index">#: myName #</a>';` configuration. This produces an anchor tag that is displayed on the page.

        <div id="example"></div>

        <script type="text/javascript">
            var templateString = '<a href="\\#index">#: myName #</a>';
            var template = kendo.template(templateString);

            $("#example").html(template({ myName: "Todd" }));
        </script>

### Creating External Templates

External templates do not live in JavaScript but in special blocks in HTML. To define an external template, create a script block in your HTML with the type `text/x-kendo-template`.

        <script type="text/x-kendo-template" id="myTemplate">
            <!--Template content here-->
        </script>

> The type of `text/x-kendo-template` is not specifically required. When using Visual Studio, you can maintain Syntax Highlighting by setting the type to `text/html`. You may use virtually any value as the type, except for `text/javascript`, to prevent the browser from rendering the block at runtime, except where used as a template.

External templates always have to have an ID so that you can select the template content when initializing in JavaScript.

        // Extract the template content from script tag.
        var templateContent = $("#myTemplate").html();
        // Compile a template.
        var template = kendo.template(templateContent);

Within an external template you can add any HTML and JavaScript as long as the JavaScript is properly formatted with the Kendo UI template syntax, as displayed below.

        <script type="text/x-kendo-template" id="myTemplate">
            #if(isAdmin){#
                <li>#: name # is Admin</li>
            #}else{#
                <li>#: name # is User</li>
            #}#
        </script>

The following example demonstrates a summarized sample case.

        <ul id="users"></ul>

        <script type="text/x-kendo-template" id="myTemplate">
            #if(isAdmin){#
                <li>#: name # is Admin</li>
            #}else{#
                <li>#: name # is User</li>
            #}#
        </script>

        <script type="text/javascript">
            var templateContent = $("#myTemplate").html();
            var template = kendo.template(templateContent);

            //Create some dummy data
            var data = [
                { name: "John", isAdmin: false },
                { name: "Alex", isAdmin: true }
            ];

            var result = kendo.render(template, data); //render the template

            $("#users").html(result); //append the result to the page
        </script>

## See Also

* [Template Performance]({% slug performance_kendoui_templatescomponent %})
* [Load Templates from External Files]({% slug externalteplateloading_templatescomponent %})
* [JavaScript API Reference: template](/api/javascript/kendo/methods/template)
