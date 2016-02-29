---
title: Common Issues
page_title: Common Issues | UI for ASP.NET MVC Troubleshooting
description: "Learn about the solutions of common issues that may occur while working with Telerik UI for ASP.NET MVC."
previous_url: /aspnet-mvc/troubleshooting
slug: troubleshooting_aspnetmvc
position: 1
---

# Common Issues

This page provides solutions for common problems you may encounter while working with Telerik UI for ASP.NET MVC. In addition you could check the general [Kendo UI troubleshooting help topic](/troubleshooting), which is relevant since Telerik UI for ASP.NET MVC is powered by Kendo UI.

## Known JavaScript Issues

### jQuery Is Unavailable or Undefined

This error will be triggered in the following cases:

* jQuery is not included at all
* jQuery is included after the Telerik UI for ASP.NET MVC script files
* jQuery is included after a Kendo UI widget or MVC wrapper declaration

Check the [Kendo UI troubleshooting help topic]({% slug troubleshooting_common_issues_kendoui %}#jquery-is-unavailable-or-undefined) for more symptoms.

Make sure that jQuery is included **before** the Telerik UI for ASP.NET MVC JavaScript files, and **before** any Kendo UI widget or MVC wrapper declarations,
unless [deferred initialization](/aspnet-mvc/introduction#deferring-kendo-ui-initialization-scripts) is used.
If using ASP.NET bundles move the `Scripts.Render("~/bundles/jquery")` block **before** the Telerik UI for ASP.NET MVC JavaScript files.

### Kendo UI Widgets Are Unavailable or Undefined

If jQuery is included more than once in the page all existing jQuery plugins (including Kendo UI) will be wiped out. Will also occur
if the [required Kendo UI JavaScript files]({% slug javascript_prerequisites_kendoui_installation%}) are not included.

Check the [Kendo UI troubleshooting help topic]({% slug troubleshooting_common_issues_kendoui %}#kendo-ui-widgets-are-unavailable-or-undefined) for more symptoms.

Make sure jQuery is not included more than once in your page. Remove any duplicate `script` references to jQuery. Include all [required Kendo UI JavaScript files]({% slug javascript_prerequisites_kendoui_installation %}).

If the application is also using Telerik Extensions for ASP.NET MVC tell the `ScriptRegistrar` not to include jQuery:

    Html.Telerik().ScriptRegistrar().jQuery(false)

If using ASP.NET bundles make sure the `Scripts.Render("~/bundles/jquery")` block appears **before** the Kendo JavaScript files. In that case you should not include jQuery as a `script` element.

### Live Method Is Unavailable, Undefined or Unsupported

This error occurs after upgrading jQuery to 1.9. The `live` method is no longer available in this version of jQuery.
As a result some JavaScript libraries which are often used in ASP.NET MVC applications will throw errors.
Those libraries are **jquery.unobtrusive-ajax**, **jquery.validate** and **jquery.validate.unobtrusive**. You need to update the following packages via [Nuget](https://www.nuget.org/):

* [jQuery.Validation](https://www.nuget.org/packages/jQuery.Validation)
* [Microsoft.jQuery.Unobtrusive.Ajax](https://www.nuget.org/packages/Microsoft.jQuery.Unobtrusive.Ajax)
* [Microsoft.jQuery.Unobtrusive.Validation](https://www.nuget.org/packages/Microsoft.jQuery.Unobtrusive.Validation)

> **Important**
> In ASP.NET MVC 3 applications **jquery.unobtrusive-ajax** and **jquery.validate.unobtrusive** are not installed as NUget packages. You would need to install them separately. The packages are [Microsoft.jQuery.Unobtrusive.Ajax](https://www.nuget.org/packages/Microsoft.jQuery.Unobtrusive.Ajax) and [Microsoft.jQuery.Unobtrusive.Validation](https://www.nuget.org/packages/Microsoft.jQuery.Unobtrusive.Validation). First you must delete **jquery.unobtrusive-ajax.js**, **jquery.unobtrusive-ajax.min.js**, **jquery.validate.unobtrusive.js** and **jquery.validate.unobtrusive.min.js** from your **~/Sripts** folder. Then install Microsoft.jQuery.Unobtrusive.Ajax and Microsoft.jQuery.Unobtrusive.Validation.

## Visual Studio Server IntelliSense Does Not Show MVC HtmlHelper Extension Method

**Solution**:

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

## Menu Renders Too Slowly in Debug Mode

The Menu has security trimming functionality, which is enabled by default.
Under the hood, it creates an [AuthorizationContext](https://msdn.microsoft.com/en-us/library/system.web.mvc.authorizationcontext(v=vs.108).aspx) for every menu item with set Action/Controller.
In 'debug' mode those context objects (ControllerContext, ActionContext and the resulting AuthorizationContext) are not cached and are recreated each time the Menu is rendered.
As a result there may be delay in rendering the menu in case there are a lot of items. When your application is deployed and debug mode is disabled the authorization context objects are cached.

More info about ASP.NET debug mode can be found in the Scott Guthrie's blog post: [Don’t run production ASP.NET Applications with debug="true" enabled](http://weblogs.asp.net/scottgu/introducing-asp-net-5).

**Solution**:

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

## Widget Value Is Not Bound to Model Property

If the name of a widget is different from the property of the Model, the ModelBinder will not be able to update the model.

**Solution**: Verify that the name of the widget is the same as the Model's property you want to update.

> **Important**
> If strongly-typed widget is used do not set Name manually, because name is generated automatically.

## AutoComplete/ComboBox/DropDownList/MultiSelect Loading Icon Continues Spinning

The most common cause of this issue is an [internal server error](http://www.checkupdown.com/status/E500.html).

**Solution**: Verify that GET requests are allowed:

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

## AutoComplete/ComboBox/DropDownList/MultiSelect Does Not Work with Remote Binding and Throws No Errors

The most common cause of this issue is to use ToDataSourceResult extension method when returning Data. Please note that the method returns the result in a JSON structure, which is understandable only for the Grid widget.

**Solution**: Return simple array of data:

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

In the **Getting Started** section of every widget you can find a **Configure Widget for Ajax Binding** section. It clearly shows how to return data to the client.

## CombobBox Widget Displays <code>0</code> Value

The ComboBox supports item selection or custom values. In the latter case, the custom value is displayed as *text*, because this is how the custom value is treated.

The widget will display "0" value if it is bound to **non-nullable integer** or other number type. In that case, the widget will retrieve the default value which is "0" and will set it,
it is perfectly valid value. When the widget is initialized on the client, it cannot find such data item and considers the value as custom. That is why it is displayed in the visible input.

**Solution**: In order to avoid this default behavior, you will need to clear the widgets value using its `Value` method:

        @model int
        @(Html.Kendo().ComboBoxFor(m)
              .Value(m == 0 ? "" : m.ToString())

        @* other options are omitted for breavity *@

## Only One Instance of the Widget Works on Page

This will happen if two or more widgets or MVC server wrappers have the same `Name()`. The value specified via the `Name()` method is used as the `id` HTML attribute of the widget. The latter must be unique in the page.

**Solution**: Always use unique widget or MVC server wrappers names. For example you can append an index to make the name unique.

## Loading Partial View that Contains a Widget Works Only the First Time

This happens because there is more than one Kendo UI widget with the same `Name()`. Check the solution of the previous problem.

## Using Html.Kendo().SomeKendoWidgetFor() Helper Does Not Update the Bound Property on the Server

Most probably this is happening because you have specified Name() for the widget which is different than the property name. Since the Name() controlls not only the "id" attribute of the input element but the "name" attribute as well,
the MVC model binder will fail to bind the value.

**Solution**: Omit specifying Name() or use the same Name() as the name of the property.

## Kendo UI MVC Wrappers Do Not Work Inside Client Templates

This can happen if the wrapper is declared without ToClientTemplate(). For more information please refer to
[Using Kendo UI MVC wrappers inside client templates](/aspnet-mvc/fundamentals#client-templates)

## Nesting Kendo UI MVC Wrappers Produces a Server-side Exception When Using the WebForms View Engine

This can happen if the nested wrappers are declared within code blocks, which output content directly, i.e. `<%= %>` or `<%: %>`. The following exception is thrown: **Invalid expression term ')'**.

###### Example - wrong

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

###### Example - correct

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

## Nesting Kendo UI MVC Wrappers Produces a Server-side Exception When Using the Razor View Engine

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
## Kendo UI MVC wrappers Cause Double AJAX Postback in Debug Mode Using Ajax.Beginform()

To address this issue, add the following line to the bundleconfig.cs file:

    bundles.IgnoreList.Ignore("*.unobtrusive-ajax.min.js", OptimizationMode.WhenDisabled)

This will prevent the unobtrusive ajax script from loading twice (i.e. the minified and non-minified) in debug mode, which is what causes the double postback.

Alternatively, just remove the non minified script from the project (this obviously has implications for debugging, if you're inclined to debug the scripts included in the project template).

## Kendo UI Theme Images Do Not Appear When Using CSS Bundling

Refer to the [CSS Bundling](/aspnet-mvc/fundamentals#css-bundling) documentation.

## Kendo UI MVC wrapper with Ajax binding shows an outdated data

If the widget, DropDownList for instance, does not show the updated data on page visit, then the most common reason for this issue is a cached Ajax request. `IE` is notorious with its requests caching,
which returns the cached `XmlHttpRequest` result instead of making new request. The options to overcome this behavior are:

- to force the `check for newer versions of stored pages` [(link)](https://support.microsoft.com/en-us/kb/263070)
- to disable caching using HTTP headers

    [OutputCache(Duration=0,NoStore=true,VaryByParam="None")]
    public JsonResult Index()
    {
        //TODO: return the updated data here!
        return Json(new string[] {});
    }

## High Memory Consumption On The Server

Using the [ASP.NET Bundling](http://www.asp.net/mvc/overview/performance/bundling-and-minification) with the
large, pre-minified files such as kendo.all.min can result in high memory usage.

The solution is to use plain Bundle instead of ScriptBudle for those files:

    bundles.Add(new Bundle("~/bundles/kendo").Include(
                "~/Scripts/kendo.all.min.js",
                "~/Scripts/kendo.aspnetmvc.min.js",
                "~/Scripts/kendo.timezones.min.js"));
