---
title: Troubleshooting
page_title: Troubleshooting guide for Telerik UI for ASP.NET MVC
description: Find solutions for common problems which you may face while using Telerik UI for ASP.NET MVC
position: 7
---

# Troubleshooting

This page provides solutions for common problems you may encounter while working with Telerik UI for ASP.NET MVC. In addition you could check the general [Kendo UI troubleshooting help topic](/troubleshooting), which is relevant since Telerik UI for ASP.NET MVC is powered by Kendo UI.

## JavaScript error that jQuery is unavailable or undefined

This error will be triggered in the following cases:

* jQuery is not included at all
* jQuery is included after the Telerik UI for ASP.NET MVC script files
* jQuery is included after a Kendo UI widget or MVC wrapper declaration

Check the [Kendo UI troubleshooting help topic](/troubleshooting#javascript-error-that-jquery-is-unavailable-or-undefined) for more symptoms.

Make sure that jQuery is included **before** the Telerik UI for ASP.NET MVC JavaScript files, and **before** any Kendo UI widget or MVC wrapper declarations,
unless [deferred initialization](/aspnet-mvc/introduction#deferring-kendo-ui-initialization-scripts) is used.
If using ASP.NET bundles move the `Scripts.Render("~/bundles/jquery")` block **before** the Telerik UI for ASP.NET MVC JavaScript files.

## JavaScript error that Kendo UI widgets are unavailable or undefined

If jQuery is included more than once in the page all existing jQuery plugins (including Kendo UI) will be wiped out. Will also occur
if the [required Kendo UI JavaScript files](/javascript-dependencies) are not included.

Check the [Kendo UI troubleshooting help topic](/troubleshooting#javascript-error-that-kendo-widgets-are-unavailable-or-undefined) for more symptoms.

Make sure jQuery is not included more than once in your page. Remove any duplicate `script` references to jQuery. Include all [required Kendo UI JavaScript files](/javascript-dependencies).

If the application is also using Telerik Extensions for ASP.NET MVC tell the `ScriptRegistrar` not to include jQuery:

    Html.Telerik().ScriptRegistrar().jQuery(false)

If using ASP.NET bundles make sure the `Scripts.Render("~/bundles/jquery")` block appears **before** the Kendo JavaScript files. In that case you should not include jQuery as a `script` element.

## JavaScript error that live method is unavailable, undefined or unsupported

This error occurs after upgrading jQuery to 1.9. The `live` method is no longer available in this version of jQuery.
As a result some JavaScript libraries which are often used in ASP.NET MVC applications will throw errors.
Those libraries are **jquery.unobtrusive-ajax**, **jquery.validate** and **jquery.validate.unobtrusive**. You need to update the following packages via [Nuget](http://nuget.org):

* [jQuery.Validation](https://nuget.org/packages/jQuery.Validation)
* [Microsoft.jQuery.Unobtrusive.Ajax](http://nuget.org/packages/Microsoft.jQuery.Unobtrusive.Ajax)
* [Microsoft.jQuery.Unobtrusive.Validation](http://nuget.org/packages/Microsoft.jQuery.Unobtrusive.Validation)

> **Important**: In ASP.NET MVC 3 applications **jquery.unobtrusive-ajax** and **jquery.validate.unobtrusive** are not installed as NUget packages.
You would need to install them separately. The packages are [Microsoft.jQuery.Unobtrusive.Ajax](http://nuget.org/packages/Microsoft.jQuery.Unobtrusive.Ajax) and [Microsoft.jQuery.Unobtrusive.Validation](http://nuget.org/packages/Microsoft.jQuery.Unobtrusive.Validation).
First you must delete **jquery.unobtrusive-ajax.js**, **jquery.unobtrusive-ajax.min.js**, **jquery.validate.unobtrusive.js** and **jquery.validate.unobtrusive.min.js**
from your **~/Sripts** folder. Then install Microsoft.jQuery.Unobtrusive.Ajax and Microsoft.jQuery.Unobtrusive.Validation.

## Visual Studio server IntelliSense does not show the MVC HtmlHelper extension method

### Solution

1. Make sure the `Kendo.Mvc.UI` namespace is imported in `web.config`.
    * If you are using the WebForms view engine open the **web.config** file in the root folder of your application. Add
     `<add namespace="Kendo.Mvc.UI" />` before the closing `namespaces` tag:

             <namespaces>
                 <add namespace="System.Web.Mvc" />
                 <add namespace="System.Web.Mvc.Ajax" />
                 <add namespace="System.Web.Mvc.Html" />
                 <add namespace="System.Web.Routing" />
                 <add namespace="System.Linq" />
                 <add namespace="System.Collections.Generic" />
                 <add namespace="Kendo.Mvc.UI" />
             </namespaces>
    * If you are using the Razor view engine open the **web.config** file which is in the **Views** folder
     of your application.Add `<add namespace="Kendo.Mvc.UI" />` before the closing `namespaces` tag:

             <system.web.webPages.razor>
                 <pages pageBaseType="System.Web.Mvc.WebViewPage">
                     <namespaces>
                         <add namespace="System.Web.Mvc" />
                         <add namespace="System.Web.Mvc.Ajax" />
                         <add namespace="System.Web.Mvc.Html" />
                         <add namespace="System.Web.Routing" />
                         <add namespace="Kendo.Mvc.UI" />
                     </namespaces>
                 </pages>
             </system.web.webPages.razor>
2. Rebuild your solution.
3. Close and open again the view you were editing. IntelliSense should be working now.

## Menu renders too slow in debug mode

The Menu has security trimming functionality, which is enabled by default. Under the hood,
it creates an [AuthorizationContext](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizationcontext(v=vs.108).aspx) for every menu item
with set Action/Controller. In 'debug' mode those context objects are not cached and as a result there may be delay in rendering the menu in
case there are a lot of items. When your application is deployed and debug mode is disabled the authorization context objects are cached.

More info about ASP.NET debug mode can be found in the Scott Guthrie's blog post: [Don’t run production ASP.NET Applications with debug="true" enabled](http://weblogs.asp.net/scottgu/archive/2006/04/11/Don_1920_t-run-production-ASP.NET-Applications-with-debug_3D001D20_true_1D20_-enabled.aspx).

### Solution

1. Disable security trimming (if not needed or during development). Enable it again when deploying the site.
    * WebForms View Engine

            <%: Html.Kendo().Menu()
                    .SecurityTrimming(false)
            %>
    * Razor

            @(Html.Kendo().Menu()
                  .SecurityTrimming(false)
            )
2. Disable debug mode. Set the `debug` attribute of the `compilation` element in web.config to `false`:

    <compilation debug="false">

## Widget's value is not bound to the Model's property

If widget's name is different than the Model's property then the ModelBinder will not be able to update the model.

### Solution

Verify that the name of the widget is the same as the Model's property you want to update.

> **Important:** If strongly-typed widget is used do not set Name manually, because name is generated automatically.

## Loading icon of AutoComplete/ComboBox/DropDownList/MultiSelect continues spinning

The most common cause of this issue is an [internal server error](http://www.checkupdown.com/status/E500.html).
### Solution

Verify that GET requests are allowed:

        public JsonResult GetCascadeCategories()
        {
            var northwind = new NorthwindDataContext();

            return Json(northwind.Categories, **JsonRequestBehavior.AllowGet**);
        }

or change HTTP verb of the DataSource:

    * WebForms View Engine

            <%: Html.Kendo().ComboBox()
                    .Name("ComboBox")
                    .DataSource(read => {
                        read.Action("GetCascadeCategories", "ComboBox").Type(HttpVerbs.Post);
                    })
            %>
    * Razor

            @(Html.Kendo().ComboBox()
                  .Name("ComboBox")
                  .DataSource(read => {
                      read.Action("GetCascadeCategories", "ComboBox").Type(HttpVerbs.Post);
                  })
            )

## AutoComplete/ComboBox/DropDownList/MultiSelect does not work with remote binding and there are no errors

The most common cause of this issue is to use ToDataSourceResult extension method when returning Data. Please note that the method returns the result in a JSON structure,
which is understandable only for the Grid widget.

### Solution

Return simple array of data:

        public JsonResult GetCascadeCategories()
        {
            var northwind = new NorthwindDataContext();

            //TODO: Do not use northwind.Categories.ToDataSourceResult();

            return Json(northwind.Categories, **JsonRequestBehavior.AllowGet**);
        }

or return Data property only:

        public JsonResult GetCascadeCategories([DataSourceRequest] DataSourceRequest request)
        {
            var northwind = new NorthwindDataContext();

            return Json(northwind.Categories.ToDataSourceResult(request).Data, **JsonRequestBehavior.AllowGet**);
        }

In "Getting Started" section of every widget you can find "Configure widget for ajax binding". It clearly shows how to return data to the client.

## Only one instance of the widget works in the page

This will happen if two or more widgets or MVC server wrappers have the same `Name()`. The value specified via the `Name()` method is used as the `id` HTML attribute of the widget. The latter must be unique in the page.

### Solution

Always use unique widget or MVC sevver wrappers names. For example you can append an index to make the name unique.

## Loading a partial view that contains a Kendo UI widget works only the first time

This happens because there is more than one Kendo UI widget with the same `Name()`. Check the solution of the previous problem.

## Using Html.Kendo().SomeKendoWidgetFor() helper does not update the bound property on the server

Most probably this is happening because you have specified Name() for the widget which is different than the property name. Since the Name() controlls not only the "id" attribute of the input element but the "name" attribute as well,
the MVC model binder will fail to bind the value.

### Solution

Omit specifying Name() or use the same Name() as the name of the property.

## Kendo UI MVC wrappers do not work inside client templates

This can happen if the wrapper is declared without ToClientTemplate(). For more information please refer to
[Using Kendo UI MVC wrappers inside client templates](/aspnet-mvc/fundamentals#client-templates)

## Nesting Kendo UI MVC wrappers produces a server-side exception when using the WebForms view engine

This can happen if the nested wrappers are declared within code blocks, which output content directly, i.e. `<%= %>` or `<%: %>`.
The following exception is thrown: **Invalid expression term ')'**.
For example:

### Wrong

	<%: Html.Kendo().Splitter()
		.Name("splitter")
		.Panes(panes =>
		{
			panes.Add()
			.Content(() =>
			{ %>
				<%:  Html.Kendo().NumericTextBox().Name("textbox") %>
			<% });
		})
	%>

### Correct

	<% Html.Kendo().Splitter()
		.Name("splitter")
		.Panes(panes =>
		{
			panes.Add()
			.Content(() =>
			{ %>
				<%:  Html.Kendo().NumericTextBox().Name("textbox") %>
			<% });
		})
		.Render();
	%>

## Nesting Kendo UI MVC wrappers produces a server-side exception when using the Razor view engine

This can happen if there are nested `<text>` tags, which is not allowed by the Razor view engine.
The following exception is thrown: **Inline markup blocks cannot be nested. Only one level of inline markup is allowed**.
In such scenarios the inner widget can be included via a custom helper. For example:

	@helper PanelBarHelper()
	{
		@(
			Html.Kendo().PanelBar()
				.Name("PanelBar")
				.Items(items =>
				{
					items.Add().Text("Item 1")
						.Content(@<text>
							Root Item 1 Inner Content
						</text>);
				})
		)
	}

	@(Html.Kendo().TabStrip()
		.Name("tabstrip")
		.Items(tabstrip =>
		{
			tabstrip.Add().Text("Text")
				.Content(@<text>
					<p>some text before</p>
					@PanelBarHelper()
					<p>some text after</p>
				</text>);
		})
	)
## Kendo UI MVC wrappers cause double AJAX postback in debug mode using Ajax.Beginform()

To address this issue, add the following line to the bundleconfig.cs file:
 
    bundles.IgnoreList.Ignore("*.unobtrusive-ajax.min.js", OptimizationMode.WhenDisabled)

This will prevent the unobtrusive ajax script from loading twice (i.e. the minified and non-minified) in debug mode, which is what causes the double postback.

Alternatively, just remove the non minified script from the project (this obviously has implications for debugging, if you're inclined to debug the scripts included in the project template).

## Kendo UI Theme Images do not Appear when using CSS Bundling

Refer to the [CSS Bundling](/aspnet-mvc/fundamentals#css-bundling) documentation.