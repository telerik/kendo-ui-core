---
title: Load from External Files
page_title: Load template contents from external files
description: Learn how to load Kendo UI templates in external files.
previous_url: /howto/load-templates-external-files
---

# Load Templates from External Files

In any sufficiently large project built with Kendo UI, there are likely to be many templates used throughout the application to format and present
JavaScript data. As templates are added to a project, an important decision must be made: **where will the Kendo UI templates be defined and
maintained?**

Generally speaking, templates can be defined and maintained in one of two ways:

1. **Local Templates:** Defined within a project's HTML files (side-by-side with other markup)
2. **Remote Templates:** Defined in external files that only contain the template definition(s)

There are pros and cons to both approaches. Let's examine.

## Local Templates

This is the most common and simplest approach to defining templates. With this pattern, template definitions are simply defined side-by-side with
markup in HTML files. For example, a basic HTML file with a local template might look like this:

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

This approach should be familiar. It is a simple Kendo UI Template defined in an HTML page. For more basic Kendo UI Template information, [please
review the Getting Started doc](/framework/templates/overview).

#### PROS
- Simple, easy to create
- Great for getting started with JavaScript templates
- Easy to keep templates associated with page that uses them
- No need for extra programming to load templates

#### CONS
- **No ability to share templates between multiple pages**
- Template syntax clutters other page markup
- Template definitions are scattered across pages and more difficult to maintain

Clearly, the biggest drawback to embedded local templates is that they cannot be reused or shared between pages that may require the same template
definition. That tends to promote "copy/paste" template development, with multiple copies of the same template living in an application. This is
clearly not best practice and can become very difficult to maintain over time.

> Kendo UI Templates can also be defined in JavaScript using simple strings, but this technique should only be used for very small templates with
> minimal markup. Templates embedded in JavaScript effectively put UI HTML in JavaScript, which makes it difficult for designers to improve templates
> and makes an application more difficult to maintain.

## Remote Templates

The basic idea with remote templates is to store Kendo UI Template definitions in a file separate from the rest of the page markup, loading templates
using Ajax when they are needed. This makes it possible to share template definitions between multiple pages while keeping all template definitions in a
centralized project location (rather than being scattered throughout HTML files).

#### PROS
- Templates can be shared between pages in an application
- Templates are centrally defined, making it easier to locate/maintain template definitions
- For apps with many templates, delayed template loading can improve app performance
- Template syntax is remove from HTML pages, improving readability

#### CONS
- Extra code is required to load and append templates to pages (not as simple)
- Multiple files must be maintained (page and template file)
- Template loading is async, requiring special considerations in app code that works with templates

### Refactoring Local Templates to External
To begin refactoring local templates to external templates, the template definition needs to be removed from the HTML page (it will be put in a
separate file later):

    <!--Container to display a list of RSS feed names-->
    <ul id="feedItems">
    </ul>

    <script>
        //Load the template definition from an external file
        templateLoader.loadExtTemplate("feedItemTemplate.tmpl.htm");
    </script>

In addition to removing the template definition, a new JavaScript block has been added with a call to `templateLoader.loadExtTemplate` that accepts a
path to a file. Kendo UI does **not** provide a remote template loader, so each application must define its own approach for loading external templates.

There are many ways to create a "template loader", but here is a simple option used in this example:

		//Creates a gloabl object called templateLoader with a single method "loadExtTemplate"
		var templateLoader = (function($,host){
			//Loads external templates from path and injects in to page DOM
			return{
				//Method: loadExtTemplate
				//Params: (string) path: the relative path to a file that contains template definition(s)
				loadExtTemplate: function(path){
					//Use jQuery Ajax to fetch the template file
					var tmplLoader = $.get(path)
						.success(function(result){
							//On success, Add templates to DOM (assumes file only has template definitions)
							$("body").append(result);
						})
						.error(function(result){
							alert("Error Loading Templates -- TODO: Better Error Handling");
						})

					tmplLoader.complete(function(){
						//Publish an event that indicates when a template is done loading
						$(host).trigger("TEMPLATE_LOADED", [path]);
					});
				}
			};
		})(jQuery, document);

This code is [available as a downloadable Gist](https://gist.github.com/3087987). It may look a bit intimidating, but it's actually quite simple:

1. It's taking a path to a file
2. Grabbing the contents with jQuery Ajax
3. Appending the contents to the body of our document
4. Then notifying the application that the template has loaded

By putting this in a reusable `templateLoader` it can be used by any page in an application that needs to load an external template.

Finally, the template definition needs to be stored in an external file that can be loaded by the template loader. In this example, the `feedItemTemplate.tmpl.htm` file contents are:

		<!--Template defintion and nothing else in the file-->
		<script type="text/x-kendo-template" id="feedItemTemplate">
			<# for (var i = 0; i < data.length; i++) { #>
			    <li>
			    <#= data[i].Name #>
			    </li>
			<# } #>
		</script>

> The template loader shown in this example appends all contents from a template file to a document, making it is possible to store multiple templates
> in a single template file. It becomes a matter of optimization and template organization to determine how best to store templates in the external
> files.

#### Async template loading

Since Ajax is asynchronous, loading templates is now asynchronous. Code that consumes templates in an application must now wait until a template has
loaded before executing. To ensure that code does not run before the necessary template is loaded, the template loader in this example publishes a
custom `TEMPLATE_LOADED` event (along with the path that was loaded). Application code can subscribe to this event and initialize templates with data
after it fires, guaranteeing templates are loaded before they're used.

Using the template loader previously defined, application code can initialize templates after they load by binding to the `TEMPLATE_LOADED` event, like this:

		<script>
			templateLoader.loadExtTemplate("_feedItemTemplate.tmpl.htm");

			//Subscribe to event triggered when templates loaded
			//(Don't load use templates before they are available)
			$(document).bind("TEMPLATE_LOADED", function(e, path) {
				console.log('Templates loaded');

				//Compile and cache templates
				_itemTemplate = kendo.template($("#feedItemTemplate").html(),{useWithBlock:false});

				//Using the template (assuming "data" is collection loaded elsewhere)
				_itemTemplate(data);
			}
		</script>

The template is now ready to go! Now page markup lives in an application's HTML files, and templates live in their own files.

## Project Structure with Remote Templates

Once remote templates are used, it is a good practice to adopt a consistent project folder and naming convention so it is easy to locate and update
templates. A file naming convention also helps avoid any confusion about which files are application HTML and which files contain template
definitions.

Any consistent convention will work, but here is a sample used by this example:

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

Key takeaways from this convention specific to templates:

- Template files use the ".tmpl.htm" extension to make it clear they contain template definitions. The ".htm" extension is used last to avoid MIME type problems for servers that do not understand the custom ".tmpl" extension.
- Templates specific to a view are named "[viewname].tmpl.htm" to make it easy to find templates used in a specific HTML file. Templates that are common across views are in "shared.tmpl.htm."

## Wrapping-up

This document has demonstrated the following:

- How to remove templates from HTML pages and managed them in external files;
- How to load external templates using Ajax;
- How to append loaded templates to a page;
- How to initialize an external template after it has loaded;
- How to name and organize external template files in a project.

Following these steps will help create a more maintainable and DRY JavaScript application. The pattern outlined in this document can be seen live in
the [Kendo UI Feed Reader demo](http://blogs.telerik.com/kendoui/posts/11-09-29/rss_feed_reader_built_with_kendo_ui_yql_amp_less).




