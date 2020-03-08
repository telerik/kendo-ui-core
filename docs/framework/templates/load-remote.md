---
title: External Template Loading
page_title: External Template Loading | Kendo UI Templates
description: "Learn how to load Kendo UI templates from external files."
previous_url: /howto/load-templates-external-files
slug: externalteplateloading_templatescomponent
position: 3
---

# External Template Loading

This article demonstrates how to remove templates from HTML pages and manage them in external files, load external templates using Ajax, append loaded templates to a page, initialize an external template after it has loaded, and how to name and organize external template files in a project.

Following these steps helps you create more maintainable and don't-repeat-yourself (DRY) JavaScript applications. The outlined pattern can also be seen live in this [Kendo UI Feed Reader demo](https://www.telerik.com/blogs/rss-feed-reader-built-with-kendo-ui-yql-amp-less).

In any sufficiently large project built with Kendo UI, there are likely to be many templates used throughout the application to format and present JavaScript data. As templates are added to a project, you need to make the decision about where the Kendo UI Templates are going to be defined and maintained.

Templates can be defined and maintained in either of the ways listed below:

* Local templates&mdash;These are defined within the HTML files of a project, alongside other markup.
* Remote templates&mdash;These are defined in external files that contain only the template definitions.

## Local Templates

This is the most common and simplest approach to defining templates. With this pattern, template definitions are simply defined alongside markup in HTML files. For more detailed information on Kendo UI Templates, refer to the [introductory article on Templates]({% slug overview_kendoui_templatescomponent %}).

* Pros

	- The approach is simple and easy to create.
	- It is great for getting started with JavaScript templates.
	- It is easy to keep templates associated with a page that uses them.
	- There is no need for extra programming to load templates.

* Cons

	- The approach provides no ability to share templates between multiple pages. That tends to promote some `copy/paste` template development with multiple copies of the same template living in an application. This is not a best practice and can become very difficult to maintain over time.
	- The template syntax clutters other page markup.
	- The template definitions are scattered across pages and are more difficult to maintain.

> Kendo UI Templates can also be defined in JavaScript using simple strings. Use this technique only for very small templates with minimal markup. Templates embedded in JavaScript effectively put user interface HTML in JavaScript, which makes it difficult for designers to improve templates, and makes an application more difficult to maintain.

The following example demonstrates a basic HTML file with a local template and represents a simple Kendo UI Template defined in an HTML page.

		<html>
		<head>
			<title>My Page</title>
			<!--NOTE: Required links to Kendo UI CSS/JS omitted for demo clarity-->
		</head>
		<body>
			<!--Container to display a list of RSS feed names-->
			<ul id="feedItems">
			</ul>

			<!--Define template in the page to render each feed item name as a list item-->
			<script type="text/x-kendo-template" id="feedItemTemplate">
			<# for (var i = 0; i < data.length; i++) { #>
			    <li>
			    <#= data[i].Name #>
			    </li>
			<# } #>
			</script>
		</body>
		</html>

## Remote Templates

The basic idea with remote templates is to store Kendo UI Template definitions in a file, separate from the rest of the page markup, loading templates using Ajax when they are needed. This makes it possible to share template definitions between multiple pages while keeping all template definitions in a centralized project location, rather than being scattered throughout HTML files.

* Pros

	- The approach allows for the templates to be shared between pages in an application.
	- The templates are centrally defined, making it easier to locate and maintain template definitions.
	- Delayed template loading can improve app performance for applications with many templates.
	- The template syntax is removed from HTML pages which improves readability.

* Cons

	- The approach requires extra code to load and append templates to pages, which is not that simple.
	- Multiple files must be maintained&mdash;page and template files.
	- Template loading is asynchronous, requiring special considerations in app code that works with templates.

## Local to External Template Refactoring

1. To begin refactoring local templates to external templates, the template definition needs to be removed from the HTML page. It will be put in a separate file later on.

		  <!--Container to display a list of RSS feed names-->
		  <ul id="feedItems">
		  </ul>
	    <script>
        // Load the template definition from an external file.
        templateLoader.loadExtTemplate("feedItemTemplate.tmpl.htm");
      </script>

	In addition to removing the template definition, a new JavaScript block has been added with a call to `templateLoader.loadExtTemplate` that accepts a path to a file. Note that Kendo UI does not provide a remote template loader, so each application must define its own approach for loading external templates.

1. Create a template loader. The following example demonstrates one of the options for creating a template loader. By putting this in a reusable `templateLoader`, it can be used by any page in an application that needs to load an external template.

	> The template loader shown in the example appends all contents from a template file to a document, making it is possible to store multiple templates in a single template file. It becomes a matter of optimization and template organization to determine the way to store templates in the external files in the best way.

	For a runnable demo, refer to [this downloadable Gist](https://gist.github.com/3087987). The whole features the following steps:

	1. It takes a path to a file.
	1. Grabs the contents with jQuery Ajax.
	1. Appends the contents to the body of your document.
	1. Notifies the application that the template has loaded.

				// Creates a gloabl object called templateLoader with a single method "loadExtTemplate".
				var templateLoader = (function($,host){
					// Loads external templates from path and injects in to page DOM.
					return{
						// Method: loadExtTemplate.
						// Params: (string) path: the relative path to a file that contains template definitions.
						loadExtTemplate: function(path){
							// Use jQuery Ajax to fetch the template file.
							var tmplLoader = $.get(path)
								.success(function(result){
									// On success, Add templates to DOM (assumes file only has template definitions).
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

1. The template definition needs to be stored in an external file that can be loaded by the template loader. The following example demonstrates what the `feedItemTemplate.tmpl.htm` file contents are.

		<!--Template defintion and nothing else in the file-->
		<script type="text/x-kendo-template" id="feedItemTemplate">
			<# for (var i = 0; i < data.length; i++) { #>
			    <li>
			    <#= data[i].Name #>
			    </li>
			<# } #>
		</script>

## Asynchronous Template Loading

Since AJAX is asynchronous, loading templates is now asynchronous. Code that consumes templates in an application must wait until the template is loaded before executing. To ensure that the code does not run before the necessary template is loaded, the template loader in this example publishes a custom `TEMPLATE_LOADED` event along with the path that was loaded. Application code can subscribe to this event and initialize templates with data after it fires, thus guaranteeing that the templates are loaded before they are used.

The following example demonstrates how by using the template loader previously defined, the application code can initialize templates after they are loaded by binding to the `TEMPLATE_LOADED`.

		<script>
			templateLoader.loadExtTemplate("_feedItemTemplate.tmpl.htm");

			//Subscribe to the event triggered when the templates are loaded
			//Do not load use templates before they are available
			$(document).bind("TEMPLATE_LOADED", function(e, path) {
				console.log('Templates loaded');

				//Compile and cache templates
				_itemTemplate = kendo.template($("#feedItemTemplate").html(),{useWithBlock:false});

				//Use the template (assuming "data" is collection loaded elsewhere)
				_itemTemplate(data);
			})
		</script>

<!--_-->
The template is now ready to go. The page markup lives in the HTML files of the application, while the templates live in their own files.

## Project Structure

Once remote templates are used, it is a good practice to adopt a consistent project folder and a naming convention, so it is easy to locate and update templates. A file naming convention also helps you to avoid any confusion about which files are application HTML and which files contain template definitions.

Any consistent convention will work. The following example demonstrates a sample case.

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

The key takeaways from this convention that are specific to templates include:

- Template files use the `.tmpl.htm` extension to make it clear they contain template definitions. The `.htm` extension is used last to avoid MIME type problems for servers that do not understand the custom `.tmpl` extension.
- Templates specific to a view are named `[viewname].tmpl.htm` to make it easy to find templates used in a specific HTML file. Templates that are common across views are in `shared.tmpl.htm`.

## See Also

* [Templates Overview]({% slug overview_kendoui_templatescomponent %})
* [Performance]({% slug performance_kendoui_templatescomponent %})
* [JavaScript API Reference: template](/api/javascript/kendo/methods/template)
