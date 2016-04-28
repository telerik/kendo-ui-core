---
title: Common Issues
page_title: Common Issues | UI for ASP.NET MVC Troubleshooting
description: "Learn about the solutions of common issues that may occur while working with Telerik UI for ASP.NET MVC."
previous_url: /aspnet-mvc/troubleshooting
slug: troubleshooting_aspnetmvc
position: 1
---

# Common Issues

This page provides solutions to common issues you may encounter while working with Telerik UI for ASP.NET MVC.

Because Telerik UI for ASP.NET MVC is powered by Kendo UI, check the [general article on Kendo UI troubleshooting]({% slug troubleshooting_common_issues_kendoui %}) for more issues and their solutions.

## JavaScript

### jQuery Is Unavailable or Undefined

This error is triggered in the following cases:

* jQuery is not included at all.
* jQuery is included after the Telerik UI for ASP.NET MVC script files.
* jQuery is included after a Kendo UI widget or an MVC wrapper declaration.

For more symptoms on that, refer to the [article on JavaScript errors]({% slug troubleshooting_javascript_errors_kendoui %}).

**Solution**

Make sure that jQuery is included before the Telerik UI for ASP.NET MVC JavaScript files, and before any Kendo UI widget or MVC wrapper declarations, unless [deferred initialization]({% slug overview_aspnetmvc %}) is used. If using the ASP.NET bundles, move the `Scripts.Render("~/bundles/jquery")` block before the Telerik UI for ASP.NET MVC JavaScript files.

### Widgets Are Unavailable or Undefined

If jQuery is included more than once in the page, all existing jQuery plugins (including Kendo UI) are wiped out. This symptom also occurs if the [required Kendo UI JavaScript files]({% slug javascript_prerequisites_kendoui_installation %}) are not included.

For more symptoms, check the [article on troubleshooting]({% slug troubleshooting_common_issues_kendoui %}#kendo-ui-widgets-are-unavailable-or-undefined).

**Solution**

Make sure jQuery is not included more than once in your page. Remove any duplicate `script` references to jQuery. Include all [required Kendo UI JavaScript files]({% slug javascript_prerequisites_kendoui_installation %}).

If the application is also using Telerik Extensions for ASP.NET MVC, tell the `ScriptRegistrar` not to include jQuery, as demonstrated in the example below.

###### Example

    Html.Telerik().ScriptRegistrar().jQuery(false)

If using ASP.NET bundles, make sure the `Scripts.Render("~/bundles/jquery")` block appears before the Kendo JavaScript files. In this case, you should not include jQuery as a `script` element.

### Live Method Is Unavailable, Undefined or Unsupported

This error occurs after upgrading jQuery to 1.9. The `live` method is no longer available in this version of jQuery. As a result, some JavaScript libraries which are often used in ASP.NET MVC applications, throw errors.

These libraries are:
* `jquery.unobtrusive-ajax`
* `jquery.validate`
* `jquery.validate.unobtrusive`

**Solution**

Below are listed the packages you need to update through [NuGet](https://www.nuget.org/).

* [`jQuery.Validation`](https://www.nuget.org/packages/jQuery.Validation)
* [`Microsoft.jQuery.Unobtrusive.Ajax`](https://www.nuget.org/packages/Microsoft.jQuery.Unobtrusive.Ajax)
* [`Microsoft.jQuery.Unobtrusive.Validation`](https://www.nuget.org/packages/Microsoft.jQuery.Unobtrusive.Validation)

> **Important**
>
> In ASP.NET MVC 3 applications `jquery.unobtrusive-ajax` and `jquery.validate.unobtrusive` are not installed as NuGet packages. Install them separately. The packages are [`Microsoft.jQuery.Unobtrusive.Ajax`](https://www.nuget.org/packages/Microsoft.jQuery.Unobtrusive.Ajax) and [`Microsoft.jQuery.Unobtrusive.Validation`](https://www.nuget.org/packages/Microsoft.jQuery.Unobtrusive.Validation). First, delete `jquery.unobtrusive-ajax.js`, `jquery.unobtrusive-ajax.min.js`, `jquery.validate.unobtrusive.js`, and `jquery.validate.unobtrusive.min.js` from your `~/Sripts` folder. Then, install `Microsoft.jQuery.Unobtrusive.Ajax` and `Microsoft.jQuery.Unobtrusive.Validation`.

## Server Side

### Visual Studio Server IntelliSense Does Not Show MVC Helper Extension Methods

**Solution**

Below are listed the steps for you to follow to fix this issue.

**Step 1** Make sure the `Kendo.Mvc.UI` namespace is imported in `web.config`.

* If you are using the WebForms view engine, open the `web.config` file in the root folder of your application. Add `<add namespace="Kendo.Mvc.UI" />` before the closing `namespaces` tag.

###### Example

             <namespaces>
                 <add namespace="System.Web.Mvc" />
                 <add namespace="System.Web.Mvc.Ajax" />
                 <add namespace="System.Web.Mvc.Html" />
                 <add namespace="System.Web.Routing" />
                 <add namespace="System.Linq" />
                 <add namespace="System.Collections.Generic" />
                 <add namespace="Kendo.Mvc.UI" />
             </namespaces>

* If you are using the Razor view engine, open the `web.config` file which is in the `Views` folder of your application. Add `<add namespace="Kendo.Mvc.UI" />` before the closing `namespaces` tag.

###### Example

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

**Step 2** Rebuild your solution.

**Step 3** Close and open again the view you were editing. IntelliSense should be working now.

### Html.Kendo().SomeKendoWidgetFor() Does Not Update Bound Properties on Server

Most probably this is happening because you have a specified `Name()` for the widget which is different from the property name. Since the `Name()` controls not only the `id` attribute of the input element, but also the `name` attribute as well, the MVC model binder fails to bind the value.

**Solution**

Omit specifying the `Name()` or use the same `Name()` as the name of the property.

### Nesting MVC Wrappers Produces Server-Side Exceptions When Using WebForms View Engine

This can happen if the nested wrappers are declared within code blocks, which output content directly, for example, `<%= %>` or `<%: %>`. An `Invalid expression term ')'` exception is thrown.

The example below demonstrates a wrong approach to avoid the issue.

###### Example

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

**Solution**

The example below demonstrates the proper approach to avoid the issue.

###### Example

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

### Nesting MVC Wrappers Produces Server-Side Exceptions When Using Razor View Engine

This can happen if there are nested `<text>` tags, which is not allowed by the Razor view engine. An `Inline markup blocks cannot be nested. Only one level of inline markup is allowed` exception is thrown.

**Solution**

In such scenarios, the inner widget can be included through a custom helper.

###### Example

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

### High Memory Consumption On Server

Using the [ASP.NET Bundling](http://www.asp.net/mvc/overview/performance/bundling-and-minification) with the large, pre-minified files, such as `kendo.all.min`, can result in a high memory usage.

**Solution**

Use a plain `Bundle` instead of `ScriptBudle` for these files.

###### Example

    bundles.Add(new Bundle("~/bundles/kendo").Include(
                "~/Scripts/kendo.all.min.js",
                "~/Scripts/kendo.aspnetmvc.min.js",
                "~/Scripts/kendo.timezones.min.js"));

## Performance

### Menu Renders Too Slowly in Debug Mode

The Menu has security trimming functionality, which is enabled by default. Under the hood, it creates an [`AuthorizationContext`](https://msdn.microsoft.com/en-us/library/system.web.mvc.authorizationcontext(v=vs.108).aspx) for every menu item with set Action/Controller. In the debug mode these context objects&mdash;`ControllerContext`, `ActionContext`, and the resulting `AuthorizationContext`&mdash;are not cached and are recreated each time the Menu is rendered. As a result, there may be delay in rendering the menu in case there are a lot of items. When your application is deployed and debug mode is disabled, the authorization context objects are cached.

For more information on the ASP.NET debug mode, refer to the Scott Guthrie's [Don’t Run Production ASP.NET Applications with debug="true" Enabled](http://weblogs.asp.net/scottgu/introducing-asp-net-5) blog post.

**Solution**

Below are listed the steps for you to follow while handling this issue.

**Step 1** Disable security trimming if not needed or during development. Enable it again when deploying the site.

```tab-ASPX

            <%: Html.Kendo().Menu()
                    .SecurityTrimming(false)
            %>
```
```tab-Razor

            @(Html.Kendo().Menu()
                  .SecurityTrimming(false)
            )
```

**Step 2** Disable debug mode. Set the `debug` attribute of the `compilation` element in the `web.config` to `false`.

###### Example

    <compilation debug="false">

### Kendo UI MVC Wrappers Do Not Work Inside Client Templates

This can happens if the wrapper is declared without `ToClientTemplate()`.

**Solution**

For more information on this issue, refer to the [article on Kendo UI wrappers fundamentals]({% slug fundamentals_aspnetmvc %}#client-templates)

## Widgets

### Widget Value Is Not Bound to Model Property

If the name of a widget is different from the property of the Model, the `ModelBinder` is not able to update the model.

**Solution**

Verify that the name of the widget is the same as the Model's property you want to update.

> **Important**
>
> If strongly-typed widget is used, do not set the `Name` manually, because a name is generated automatically.

### Widget Loading Icon Continues Spinning

This issue refers to the Kendo UI AutoComplete, ComboBox, DropDownList, and MultiSelect widgets. The most common cause is an [internal server error](http://www.checkupdown.com/status/E500.html).

**Solution**

Apply either of the two options below:

* Verify that `GET` requests are allowed.

###### Example

        public JsonResult GetCascadeCategories()
        {
            var northwind = new NorthwindDataContext();

            return Json(northwind.Categories, **JsonRequestBehavior.AllowGet**);
        }

* Change HTTP verb of the DataSource.

```tab-ASPX

            <%: Html.Kendo().ComboBox()
                    .Name("ComboBox")
                    .DataSource(read => {
                        read.Action("GetCascadeCategories", "ComboBox").Type(HttpVerbs.Post);
                    })
            %>
```
```tab-Razor

            @(Html.Kendo().ComboBox()
                  .Name("ComboBox")
                  .DataSource(read => {
                      read.Action("GetCascadeCategories", "ComboBox").Type(HttpVerbs.Post);
                  })
            )
```

### Widgets Do Not Work with Remote Binding and Throw No Errors

This issue refers to the Kendo UI AutoComplete, ComboBox, DropDownList, and MultiSelect widgets. The most common cause is the usage of the `ToDataSourceResult` extension method when returning Data. Note that the method returns the result in a JSON structure, which is understandable only for the Grid widget.

**Solution**

Apply either of the two options below:

* Return a simple array of data.

###### Example

        public JsonResult GetCascadeCategories()
        {
            var northwind = new NorthwindDataContext();

            //TODO: Do not use northwind.Categories.ToDataSourceResult();

            return Json(northwind.Categories, **JsonRequestBehavior.AllowGet**);
        }

* Return the `Data` property only.

###### Example

        public JsonResult GetCascadeCategories([DataSourceRequest] DataSourceRequest request)
        {
            var northwind = new NorthwindDataContext();

            return Json(northwind.Categories.ToDataSourceResult(request).Data, **JsonRequestBehavior.AllowGet**);
        }

In the **Getting Started** section of each widget's Overview article, a section related to the widget configuration fro Ajax binding can be found. In it find how to return data to the client.

### Widgets Display Zero Values

This issue refers to the Kendo UI CombobBox widget. It supports item selection or custom values. In the latter case, the custom value is displayed as `text`, because this is how the custom value is treated.

The widget displays a `0` value if it is bound to the `non-nullable integer` or other number type. In this case, the widget retrieves the default value which is `0` and sets it, and it is a perfectly valid value. When the widget is initialized on the client, it cannot find such a data item and considers the value as a custom one. This is why it is displayed in the visible input.

**Solution**

To avoid this default behavior, clear the value of the widget using its `Value` method.

###### Example

        @model int
        @(Html.Kendo().ComboBoxFor(m)
              .Value(m == 0 ? "" : m.ToString())

        @* other options are omitted for breavity *@

<!--*-->
### Only One Widget Instance Works on Page

This happens if two or more widgets or MVC server wrappers have the same `Name()`. The value specified via the `Name()` method is used as the `id` HTML attribute of the widget. The latter must be unique in the page.

**Solution**

Always use unique widget or MVC server wrappers names. For example, append an index to make the name unique.

### Loading Partial Views Containing Widgets Work Only the First Time

This happens because there is more than one Kendo UI widget with the same `Name()`.

**Solution**

Check the solution of the previous problem.

### MVC Wrappers Cause Double AJAX Postback in Debug Mode Using Ajax.Beginform()

**Solution**

Add the line from the example below to the `bundleconfig.cs` file.

###### Example

    bundles.IgnoreList.Ignore("*.unobtrusive-ajax.min.js", OptimizationMode.WhenDisabled)

<!--*-->
This prevents the unobtrusive Ajax script from loading twice&mdash;the minified and non-minified&mdash;in debug mode, which is what causes the double postback.

Alternatively, just remove the non-minified script from the project. Obviously, this has implications for debugging, if you are inclined to debug the scripts included in the project template.

### Theme Images Do Not Appear When Using CSS Bundling

**Solution**

When the Kendo UI theme images do not appear in this case, refer to the [article on CSS bundling]({% slug fundamentals_aspnetmvc %}#css-bundling).

### MVC Wrapper with Ajax Binding Shows Outdated Data

If a widget does not show the updated data on a page visit, the most common reason for this is a cached Ajax request. The Internet Explorer is notorious with its requests caching, which returns the cached `XmlHttpRequest` result instead of making a new request.

**Solution**

Choose either of the options to overcome this behavior:

* Force the `check for newer versions of stored pages` [(link)](https://support.microsoft.com/en-us/kb/263070).
* Disable caching using HTTP headers.

###### Example

    [OutputCache(Duration=0,NoStore=true,VaryByParam="None")]
    public JsonResult Index()
    {
        //TODO: return the updated data here!
        return Json(new string[] {});
    }

## Date Picker HtmlHelpers

### Display the DateTimeOffset Value in a Widget

The DatePicker, DateTimePicker, and TimePicker widgets support only the `DateTime` structure.

**Solution**

Convert [`DateTimeOffset`](http://msdn.microsoft.com/en-us/library/system.datetimeoffset.aspx) into a DatePicker, DateTimePicker, or TimePicker to show the date and time correctly.

### Client Validation Fails with Invalid Date

By default, the ASP.NET MVC project uses jQuery validate framework, which does not provide support for internationalized dates. This means that every string which [`Date.parse`](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/parse) is not able to define as a valid date, is reported as invalid.

**Solution**

As extending open source libraries is outside the Kendo UI scope, you need to resolve this issue manually. For more information, check [this link](http://www.dotnet-programming.com/post/2011/12/14/Globalization-Validation-and-DateNumber-Formats-in-AspNet-MVC.aspx), or use the [Kendo UI Validator](http://demos.telerik.com/kendo-ui/web/validator/index.html), which supports the validation of internationalized dates.

## Editor HtmlHelper

### Editor Shows HTML Tags after Validation

After the server-side validation, the Editor displays the posted `encoded` value from the `ModelState`. The Razor view engine encodes it once again and, as a result,
HTML tags appear inside the widget content area. More information about this behavior related to ASP.NET MVC is available at
the blog post on [wrong value rendering by ASP.NET MVC's HtmlHelpers](http://blogs.msdn.com/b/simonince/archive/2010/05/05/asp-net-mvc-s-html-helpers-render-the-wrong-value.aspx).

**Solution**

You have two alternative options to tackle this scenario:

* Clear the `ModelState` in the controller's action method after the `POST`.
* Set `Encode(false)` for the Editor and set an `[AllowHtml]` attribute to the model property, so that the Editor's value is submitted non-encoded.

For additional tips on the Editor widget, refer to the [troubleshooting article on common Kendo UI Editor issues]({% slug troubleshooting_editor_widget %}).

## See Also

Other articles on troubleshooting:

* [Validation Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_validation_aspnetmvc %})
* [Scaffolding Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_scaffolding_aspnetmvc %})
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [Excel Export with the Grid ASP.NET MVC HtmlHelper Extension]({% slug excelissues_gridhelper_aspnetmvc %})
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_uploadhelper_aspnetmvc %})
* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [Kendo UI JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
* [Kendo UI Performance Issues]({% slug troubleshooting_system_memory_symptoms_kendoui %})
* [Kendo UI Content Security Policy]({% slug troubleshooting_content_security_policy_kendoui %})
* [Common Issues in Kendo UI Excel Export]({% slug troubleshooting_excel_export_kendoui %})
* [Common Issues in Kendo UI Charts]({% slug troubleshooting_chart_widget %})
* [Performance Issues in Kendo UI Widgets for Data Visualization]({% slug tipsandtricks_kendouistyling %})
* [Common Issues in Kendo UI ComboBox]({% slug troubleshooting_common_issues_combobox_kendoui %})
* [Common Issues in Kendo UI Diagram]({% slug troubleshooting_diagram_widget %})
* [Common Issues in Kendo UI DropDownList]({% slug troubleshooting_common_issues_dropdownlist_kendoui %})
* [Common Issues in Kendo UI Editor]({% slug troubleshooting_editor_widget %})
* [Common Issues in Kendo UI MultiSelect]({% slug troubleshooting_common_issues_multiselect_kendoui %})
* [Common Issues in Kendo UI Scheduler]({% slug troubleshooting_scheduler_widget %})
* [Common Issues in Kendo UI Upload]({% slug troubleshooting_upload_widget %})
* [Common Issues Related to Styling, Appearance, and Rendering]({% slug commonissues_troubleshooting_kendouistyling %})
