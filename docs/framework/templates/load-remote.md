---
title: External Template Loading
page_title: Loading Templates from External Files - Kendo UI Templates
description: "Learn how to load the jQuery Templates by Kendo UI from external files."
previous_url: /howto/load-templates-external-files
slug: externalteplateloading_templatescomponent
position: 5
---

# External Template Loading

The Kendo UI Templates enable you to remove templates from HTML pages and manage them in external files, load external templates by using Ajax, append loaded templates to a page, initialize an external template after it has loaded, and name and organize external template files in a project.

These capabilities help you create more maintainable and don't-repeat-yourself (DRY) JavaScript applications. To see the outlined pattern in action, refer to the [Kendo UI Feed Reader demo](https://www.telerik.com/blogs/rss-feed-reader-built-with-kendo-ui-yql-amp-less).

Often, large Kendo UI projects contain many templates that are used throughout the application to format and present JavaScript data. Therefore, you need to define whether you will maintain the Kendo UI Templates [locally](#local-templates) (defined within the HTML files of a project alongside other markup) or [remotely](#remote-templates) (defined in external files that contain only the template definitions).

## Defining Local Templates

Keeping the Templates locally is the most common and simplest approach to define them as the template definitions are kept alongside the markup in HTML files. 

You can also define the Kendo UI Templates in JavaScript through strings. However, this approach is suitable only for very small templates with minimal markup. Templates, embedded in JavaScript, effectively put user interface HTML in JavaScript, which makes it difficult for designers to improve templates, and makes an application more difficult to maintain.

The following table lists the advantages and disadvantages for having local templates. 

|Pros|Cons
|:---|:---
|<ul><li>The approach is simple and easy to create.</li> <li>Local templates are great for getting started with JavaScript templates.</li> <li>It is easy to keep templates associated with a page that uses them.</li> <li>You don't need extra programming to load templates.</li></ul>|<ul><li>The approach doesn't allow you to share templates between multiple pages, which may lead to some `copy/paste` template development with multiple copies of the same template within a single application.</li> <li>Local templates can become very difficult to maintain over time.</li> <li>The template syntax clutters other page markup.</li> <li>The template definitions are scattered across pages and are more difficult to maintain.</li></ul>

The following example demonstrates a basic HTML file with a local template and represents a simple Kendo UI Template defined in an HTML page.

```dojo
	<ul id="feedItems"></ul>

    <!--Define template in the page to render each feed item name as a list item-->
    <script type="text/x-kendo-template" id="feedItemTemplate">
        # for (var i = 0; i < data.length; i++) { #
            <li>
            #= data[i].Name #
      			</li>
        # } #
    </script>

    <script>
      var template = kendo.template($("#feedItemTemplate").html());
      var data = [{Name: "Anton"}, { Name: "Michael"}, { Name: "John"}];
      var result = template(data); //Execute the template
      $("#feedItems").html(result); //Append the result
    </script>
```

## Defining Remote Templates

The basic idea with remote templates is to store Kendo UI Template definitions in a file, separate from the rest of the page markup, and load them with Ajax when they are needed. This approach enables you to share template definitions between multiple pages while keeping all template definitions in a centralized project location, rather than being scattered throughout HTML files.

The following table lists the advantages and disadvantages for having remote templates. 

|Pros|Cons
|:---|:---
|<ul><li>The approach allows for the templates to be shared between pages in an application.</li> <li>The templates are centrally defined, making it easier to locate and maintain template definitions.</li> <li>Delayed template loading can improve app performance for applications with many templates.</li> <li>The template syntax is removed from HTML pages which improves readability.</li></ul>|<ul><li>The approach requires extra code to load and append templates to pages, which is not that simple.</li> <li>Multiple files must be maintained&mdash;page and template files.</li> <li>Template loading is asynchronous, requiring special considerations in app code that works with templates.</li></ul>

## Converting Local to External Templates

You can refactor local templates and convert them into remote templates.  

1. Remove the template definition from the HTML page. Later, you will put in a separate file.

	Note that in addition to removing the template definition, a new JavaScript block with a call to `templateLoader.loadExtTemplate`, which accepts a path to a file, will be added. Kendo UI does not provide a remote template loader, so each application must define its own approach for loading external templates.

		  <!--Container to display a list of RSS feed names-->
		  <ul id="feedItems">
		  </ul>
	    <script>
        // Load the template definition from an external file.
        templateLoader.loadExtTemplate("feedItemTemplate.tmpl.htm");
      </script>

	
1. Create a template loader as demonstrated in the following example, which shows one of the options for creating a template loader. By putting the loader in a reusable `templateLoader`, it can be used by any page in an application that needs to load an external template.

	Note that the template loader from the example appends the whole template file content to a document, thus enabling you to store multiple templates in a single template file. You can then further optimize and organize the template and store the templates in the external files in the best possible way.

	For the full implementation of the suggested approach, refer to [this downloadable Gist](https://gist.github.com/3087987), which takes a path to a file, grabs the contents with Ajax, appends the content to the body of your document, and notifies the application that the template has loaded.

				// Creates a global object called templateLoader with a single method "loadExtTemplate".
				var templateLoader = (function($,host){
					// Loads the external templates from the path and injects into the page DOM.
					return{
						// Method: loadExtTemplate.
						// Params: (string) path: the relative path to a file that contains template definitions.
						loadExtTemplate: function(path){
							// Use jQuery Ajax to fetch the template file.
							var tmplLoader = $.get(path)
								.success(function(result){
									// On success, add templates to the DOM (assumes that only the file has template definitions).
									$("body").append(result);
								})
								.error(function(result){
									alert("Error Loading Templates -- TODO: Better Error Handling");
								})

							tmplLoader.complete(function(){
								// Publish an event that indicates when a template is done loading.
								$(host).trigger("TEMPLATE_LOADED", [path]);
							});
						}
					};
				})(jQuery, document);

1. Now you need to store the template definitions in an external file that can be loaded by the template loader. The following example demonstrates what the content of the `feedItemTemplate.tmpl.htm` file is.

		<!--Template definition and nothing else in the file-->
		<script type="text/x-kendo-template" id="feedItemTemplate">
			<# for (var i = 0; i < data.length; i++) { #>
			    <li>
			    <#= data[i].Name #>
			    </li>
			<# } #>
		</script>

## Loading Templates Asynchronously

Since AJAX is asynchronous, loading templates is asynchronous. Code that consumes templates in an application must wait before executing until the template is loaded. 

To ensure that the code does not run before the necessary template is loaded, the template loader in this example publishes a custom `TEMPLATE_LOADED` event along with the path that was loaded. Application code can subscribe to this event and initialize templates with data after it fires, thus guaranteeing that the templates are loaded before they are used.

The following example demonstrates how by using the previously defined template loader, the application code can initialize templates after they are loaded by binding to the `TEMPLATE_LOADED`.

		<script>
			templateLoader.loadExtTemplate("_feedItemTemplate.tmpl.htm");

			// Subscribe to the event triggered when the templates are loaded.
			// Do not load use templates before they are available.
			$(document).bind("TEMPLATE_LOADED", function(e, path) {
				console.log('Templates loaded');

				// Compile and cache templates.
				_itemTemplate = kendo.template($("#feedItemTemplate").html(),{useWithBlock:false});

				// Use the template (assuming "data" is collection loaded elsewhere).
				_itemTemplate(data);
			})
		</script>

<!--_-->
The template is now ready to go. The page markup lives in the HTML files of the application, while the templates live in their own files.

## Project Structure

When you use remote templates, it is recommended that you adopt a consistent project folder and a naming convention  to easily locate and update templates. A file naming convention also helps you to avoid any confusion about which files are application HTML and which files contain template definitions.

The following example is a sample case for applying a consistent convention and demonstrates the following rules:

- Template files use the `.tmpl.htm` extension to make it clear they contain template definitions.
- The `.htm` extension is used last to avoid MIME type problems for servers that do not understand the custom `.tmpl` extension.
- View-specific templates are named `[viewname].tmpl.htm` to make it easy to find templates used in a specific HTML file. 
- Templates that are common across views are in `shared.tmpl.htm`. 

    /Templates
      index.tmpl.htm
      shared.tmpl.htm
    /Scripts
      templateLoader.js
      yourapp.js
      index.html.js
    /Styles
    /Content
    index.html


## See Also

* [Templates Essentials]({% slug essentials_templates %})
* [Templates Performance]({% slug performance_kendoui_templatescomponent %})
* [Templates JavaScript API Reference](/api/javascript/kendo/methods/template)
* [Templates Demos](https://demos.telerik.com/kendo-ui/templates/index)
* [Knowledge Base](https://docs.telerik.com/kendo-ui/knowledge-base)
