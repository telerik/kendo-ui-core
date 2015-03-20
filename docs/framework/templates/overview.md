---
title: Overview
page_title: Overview of templates component in Kendo UI framework
description: How to use HTML encoding and compilation in Templates component in Kendo UI framework.
position: 1
---

# Kendo UI Templates Overview

Kendo UI Templates provide a simple to use, high-performance JavaScript templating engine in the Kendo UI Framework.
Templates offer a way to create HTML chunks that can be automatially merged with JavaScript data. They are a substituate for traditional "HTML string building" in JavaScript.

## Template Basics

Kendo UI templates focus on providing essential templating features needed for common UI rendering scenarios,
with a heavy emphasis on performance over feature glut.
Kendo UI Templates will trade convenient "syntax sugar" for improved performance, which distinguishes from other JavaScript templating libraries.

### Template Syntax

Kendo UI Templates use a simple templating syntax we call "hash templates."
With this syntax, the `#` (or hash) symbol is used to mark areas in a template that should be replaced with data when the template is executed.
The `#` character is also used to signify the beginning and end of custom Javascript code inside the template.

There are three ways to use the hash syntax:

1. Render values as HTML: `#= #`
2. Uses HTML encoding to display values: `#: #`
3. Execute arbitrary Javascript code: `# if (true) { # ... non-script content here ... # } #`

### Escaping Hash Literals

> If your template includes a **literal `#` character**, which is not part of a binding expression and is not a script code marker,
then you must escape that character or it will cause a template compilation error.
For example, this can happen if a `#` is used inside a hyperlink URL or a CSS color value.
Literal `#` in Javascript strings are escaped with `\\\\#`, while literal `#` in external HTML script templates are escaped with `\\#`.

> If your template includes a `#` character, which is part of a binding expression of a **nested** template, then this character must be escaped as well.
In this way the character will be ignored by the outer template, but will be handled correctly by the inner template.

Let's take a closer look at how each of these Kendo UI Template syntaxes can be used in context.

#### Rendering Raw Values

One of the most basic templating tasks is rendering a value as-is in a template. With Kendo UI templates, this is done with the following code:


        var template = kendo.template("<div id='box'>#= firstName #</div>");


This approach will create a "compiled" in-line template that's ready for rendering with data. Consuming the template in an application looks like this:

        <div id="example"></div>
        <script>
            var template = kendo.template("<div id='box'>#= firstName #</div>");
            var data = { firstName: "Todd" }; //A value in JavaScript/JSON
            var result = template(data); /Pass the data to the compiled template
            $("#example").html(result); //display the result
        </script>

#### Rendering HTML-Encoded Values

If you want to render an encoded HTML value in a template, Kendo UI templates can automatically handle the encoding. To do that, use a slightly different syntax:

        var template = kendo.template("<div id='box'>#: firstName #</div>");

Now, when the template is consumed, assuming there are HTML characters in the data, the following output will be produced:

        <div id="example"></div>
        <script>
            var template = kendo.template("<div id='box'>#: firstName #</div>");
            var data = { firstName: "<b>Todd</b>" }; //Data with HTML tags
            var result = template(data); //Pass the data to the compiled template
            $("#example").html(result); // display the following string result ("<b>Todd</b>")
        </script>

If the HTML encoding is not used the output will be:

        <div id="example"></div>
        <script>
            var template = kendo.template("<div id='box'>#= firstName #</div>");
            var data = { firstName: "<b>Todd</b>" }; //Data with HTML tags
            var result = template(data); //Pass the data to the compiled template
            $("#example").html(result); //display "Todd" in a bold font weight
        </script>

> HTML encoding is useful when you want to avoid rendering HTML tags in your templates. It will escape the HTML tags in your data and render the tags as a string. You should use HTML encoding when working with data from unknown sources (such as user submitted values) in case users have included HTML markup in the content that could break the layout of your page.

#### External Templates and Expressions

It's common for templates to include expressions. Some templating frameworks invent their own re-implementation of JavaScript to provide expression sugar (at the cost of performance), but Kendo UI templates opt to simply allow the execution of "normal" JavaScript inside of templates, again favoring performance over expensive syntax sugar.

For example, to display a list of items using JavaScript and Kendo UI templates, we use the following syntax:

        <script id="javascriptTemplate" type="text/x-kendo-template">
            <ul>
            # for (var i = 0; i < data.length; i++) { #
                <li>#= data[i] #</li>
            # } #
            </ul>
        </script>


To then consume this external template with an expression, we simply need to initialize a template that uses this definition and receives an array of values:

        <div id="example"></div>

        <script id="javascriptTemplate" type="text/x-kendo-template">
            <ul>
            # for (var i = 0; i < data.length; i++) { #
                <li>#= data[i] #</li>
            # } #
            </ul>
        </script>

        <script type="text/javascript">
            //Get the external template definition using a jQuery selector
            var template = kendo.template($("#javascriptTemplate").html());

            //Create some dummy data
            var data = ["Todd", "Steve", "Burke"];

            var result = template(data); //Execute the template
            $("#example").html(result); //Append the result
        </script>

As you can see, the JavaScript executes a `for` loop inside of the template and produces a HTML list item for each name.

Custom variables can be defined inside a template expression and then output in the same fashion as data fields:

        <script id="javascriptTemplate" type="text/x-kendo-template">
            # var myCustomVariable = "foo"; #
			<p>
				#= myCustomVariable #
			</p>
        </script>

Keep in mind that expressions even within HTML comments will be executed
e.g.

    <!-- #alert('it is executed!')# -->

### Internal vs. External Templates

Kendo UI Templates can be defined in one of two ways:

- **Inline** using JavaScript strings
- **External** using HTML script blocks

Inline templates are good for small templates, but most larger templates that include logic or HTML markup should use external templates. Since external templates live in the HTML instead of JavaScript, this also makes them easier for designers to create and modify.

#### Creating an inline template

As you've already seen on this page, creating an inline template is as simple as creating a JavaScript string:

        var templateString = "Your name is #: myName #";
        var template = kendo.template(templateString);

As long as the data passed-in to the template contains a variable called "myName," this template will work. If a inline template contains a literal "#", it should be escaped like this:

        var templateString = '<a href="\\#index">#: myName #</a>';

This will produce an anchor tag displayed on the page:

        <div id="example"></div>

        <script type="text/javascript">
            var templateString = '<a href="\\#index">#: myName #</a>';
            var template = kendo.template(templateString);

            $("#example").html(template({ myName: "Todd" }));
        </script>

#### Creating an external template

External templates do not live in JavaScript, but instead in special blocks in HTML. To define an external template, create a script block in your HTML with the type `text/x-kendo-template`, like this:

        <script type="text/x-kendo-template" id="myTemplate">
            <!--Template content here-->
        </script>

> Note: The type of `text/x-kendo-template` is not specifically required. When using Visual Studio, you can maintain Syntax Highlighting by setting the type to `text/html`. You may use virtually any value as the type, except `text/javascript` to prevent the browser from rendering the block at runtime, except where used as a template.

External templates should always have an ID, too, so that you can select the template content when initalizign in JavaScript:

        //extract the template content from script tag
        var templateContent = $("#myTemplate").html();
        //compile a template
        var template = kendo.template(templateContent);

Within an external template, you can add any HTML and JavaScript, as long as the JavaScript is properly formatted with the Kendo UI template syntax. For example:

        <script type="text/x-kendo-template" id="myTemplate">
            #if(isAdmin){#
                <li>#: name # is Admin</li>
            #}else{#
                <li>#: name # is User</li>
            #}#
        </script>

Example:

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

> Why doesn't Kendo UI provide helper syntax for things like loops? Other templating libraries include shorthand like `{ each }`. Kendo UI opts to use normal JavaScript instead of custom syntax sugar because it's much faster and it's easy for anyone familiar with JavaScript to use. If you know JavaScript, you know Kendo UI templates!

