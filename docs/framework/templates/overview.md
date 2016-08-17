---
title: Overview
page_title: Overview | Kendo UI Templates
description: "Learn how to use HTML encoding and compilation in the Kendo UI Templates component."
slug: overview_kendoui_templatescomponent
position: 1
---

# Templates Overview

The [Kendo UI Templates](http://demos.telerik.com/kendo-ui/templates/index) provide a simple-to-use, high-performance JavaScript templating engine within the Kendo UI framework. Templates offer a way to create HTML chunks that can be automatically merged with JavaScript data. They are a substitute for traditional HTML string building in JavaScript.

## Basics

Kendo UI Templates focus on providing essential templating features needed for common user interface (UI) rendering scenarios, with a heavy emphasis on performance over feature glut. Kendo UI Templates trade convenient [syntax sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) for improved performance, which distinguishes it from other templating JavaScript libraries.

## Template Syntax

Kendo UI Templates use a simple templating syntax called hash templates. With this syntax, the `#` (hash) sign is used to mark areas in a template that should be replaced by data when the template is executed. The `#` character is also used to signify the beginning and end of custom Javascript code inside the template.

There are three ways to use the hash syntax:

1. Render values as HTML: `#= #`.
2. Use HTML encoding to display values: `#: #`.
3. Execute arbitrary Javascript code: `# if (true) { # ... non-script content here ... # } #`.

## Hash Literals

> **Important**
> * If your template includes a literal `#` character, which is not part of a binding expression and is not a script code marker, then you must escape that character or it causes a template compilation error. For example, this can happen if a `#` is used inside a hyperlink URL or a CSS color value. Literal `#` in Javascript strings are escaped via `\\\\#`, while literal `#` in external HTML script templates are escaped via `\\#`.
> * If your template includes a `#` character, which is part of a binding expression of a nested template, then this character must be escaped as well. In this way the character is ignored by the outer template, but is handled correctly by the inner template.

Find more information on how each of these Kendo UI Template syntaxes can be used in context in the sections below.

### Render Raw Values

One of the most basic templating tasks is rendering a value as-is in a template. With Kendo UI templates, this is done via the following code:


        var template = kendo.template("<div id='box'>#= firstName #</div>");


This approach creates a compiled in-line template that is ready for rendering with data.

The example below demonstrates what consuming the template in an application looks like.

###### Example  

        <div id="example"></div>
        <script>
            var template = kendo.template("<div id='box'>#= firstName #</div>");
            var data = { firstName: "Todd" }; //A value in JavaScript/JSON
            var result = template(data); /Pass the data to the compiled template
            $("#example").html(result); //display the result
        </script>

### Render HTML-Encoded Values

If you want to render an encoded HTML value in a template, Kendo UI templates can automatically handle the encoding. To do that, use a slightly different syntax:

        var template = kendo.template("<div id='box'>#: firstName #</div>");

The example below demonstrates the produced output when the template is consumed and assuming there are HTML characters in the data.

###### Example

        <div id="example"></div>
        <script>
            var template = kendo.template("<div id='box'>#: firstName #</div>");
            var data = { firstName: "<b>Todd</b>" }; //Data with HTML tags
            var result = template(data); //Pass the data to the compiled template
            $("#example").html(result); // display the following string result ("<b>Todd</b>")
        </script>

If the HTML encoding is not used, the output is as demonstrated below.

###### Example

        <div id="example"></div>
        <script>
            var template = kendo.template("<div id='box'>#= firstName #</div>");
            var data = { firstName: "<b>Todd</b>" }; //Data with HTML tags
            var result = template(data); //Pass the data to the compiled template
            $("#example").html(result); //display "Todd" in a bold font weight
        </script>

> **Important**
>
> HTML encoding is useful when you want to avoid rendering HTML tags in your templates. It escapes the HTML tags in your data and renders the tags as a string. When working with data from unknown sources, such as user-submitted values, use HTML encoding in case users have included HTML markup in the content that could break the layout of your page.

### Handle External Templates and Expressions

It is common for templates to include expressions. Some templating frameworks invent their own re-implementation of JavaScript to provide expression sugar at the cost of performance, but Kendo UI templates opt to allow the execution of normal JavaScript inside templates, again favoring performance over expensive syntax sugar.

The example below demonstrates how to display a list of items using JavaScript and Kendo UI templates.

###### Example

        <script id="javascriptTemplate" type="text/x-kendo-template">
            <ul>
            # for (var i = 0; i < data.length; i++) { #
                <li>#= myCustomFunction(data[i]) #</li>
            # } #
            </ul>
        </script>

Then, to consume this external template with an expression, simply initialize a template that uses this definition and receives an array of values, as demonstrated below.

###### Example

        <div id="example"></div>

        <script id="javascriptTemplate" type="text/x-kendo-template">
            <ul>
            # for (var i = 0; i < data.length; i++) { #
                <li>#= myCustomFunction(data[i]) #</li>
            # } #
            </ul>
        </script>

        <script type="text/javascript">
            // use a custom function inside the template. Must be defined in the global JavaScript scope
            function myCustomFunction (str) {
                return str.replace(".", " ");
            }
        
            //Get the external template definition using a jQuery selector
            var template = kendo.template($("#javascriptTemplate").html());

            //Create some dummy data
            var data = ["Todd.Holland", "Steve.Anglin", "Burke.Ballmer"];

            var result = template(data); //Execute the template
            $("#example").html(result); //Append the result
        </script>

As seen from the code above, the JavaScript executes a `for` loop inside the template and produces a HTML list item for each name. An auxiliary global JavaScript function is used to manipulate each data item during display.

Custom variables can be defined inside a template expression and then output in the same fashion as data fields.

###### Example

        <script id="javascriptTemplate" type="text/x-kendo-template">
            # var myCustomVariable = "foo"; #
			<p>
				#= myCustomVariable #
			</p>
        </script>

Keep in mind that expressions even within HTML comments are executed, as demonstrated below.

###### Example

    <!-- #alert('it is executed!')# -->

## Inline vs. External Templates

Kendo UI Templates can be defined in either of the two ways:

- Inline&mdash;These use JavaScript strings and are good for small templates.
- External&mdash;These use HTML script blocks. Most larger templates which include logic or HTML markup should use external templates. Since external templates live in HTML instead of JavaScript, they are easier for designers to create and modify.

### Create Inline Templates

To create an inline template, create a JavaScript string.

###### Example

        var templateString = "Your name is #: myName #";
        var template = kendo.template(templateString);

As long as the data, passed in to the template, contains a variable called `myName`, this template works. If an inline template contains a literal `#`, it should be escaped in the way shown below.

###### Example

        var templateString = '<a href="\\#index">#: myName #</a>';

This produces an anchor tag displayed on the page, as demonstrated in the example.

###### Example

        <div id="example"></div>

        <script type="text/javascript">
            var templateString = '<a href="\\#index">#: myName #</a>';
            var template = kendo.template(templateString);

            $("#example").html(template({ myName: "Todd" }));
        </script>

### Create External Templates

External templates do not live in JavaScript, but instead in special blocks in HTML. To define an external template, create a script block in your HTML with the type `text/x-kendo-template`, as shown below.

###### Example

        <script type="text/x-kendo-template" id="myTemplate">
            <!--Template content here-->
        </script>

> **Important**
>
> The type of `text/x-kendo-template` is not specifically required. When using Visual Studio, you can maintain Syntax Highlighting by setting the type to `text/html`. You may use virtually any value as the type, except for `text/javascript`, to prevent the browser from rendering the block at runtime, except where used as a template.

External templates should always have an ID, too, so that you can select the template content when initializing in JavaScript.

###### Example

        //extract the template content from script tag
        var templateContent = $("#myTemplate").html();
        //compile a template
        var template = kendo.template(templateContent);

Within an external template you can add any HTML and JavaScript as long as the JavaScript is properly formatted with the Kendo UI template syntax, as displayed below.

###### Example

        <script type="text/x-kendo-template" id="myTemplate">
            #if(isAdmin){#
                <li>#: name # is Admin</li>
            #}else{#
                <li>#: name # is User</li>
            #}#
        </script>

The example below demonstrates a summarized sample case.

###### Example

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

> **Important**
>
> Kendo UI does not provide helper syntax for things like loops. While other templating libraries include shorthand like `{ each }`, Kendo UI opts to use normal JavaScript instead of custom syntax sugar. The reason for this is that it is much faster and it is also easy for anyone familiar with JavaScript to use. If you know JavaScript, then you know Kendo UI templates.

## See Also

Other articles on Kendo UI Templates:

* [Template Performance]({% slug performance_kendoui_templatescomponent %})
* [Load Templates from External Files]({% slug externalteplateloading_templatescomponent %})
* [JavaScript API Reference: template](/api/javascript/kendo#methods-template)
