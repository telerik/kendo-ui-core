#including-client-side-resources

## Including the Client-Side Resources

To enable the Telerik UI for ASP.NET MVC components, you must add several [client-side]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}) dependencies to the application, like scripts and a [theme file]({% slug sassbasedthemes_overview%})

Before adding a Telerik UI component, you must include the theme, the jQuery script, and the Kendo UI scripts:

1. Go to `~\Views\Shared\_Layout.cshtml` and add the theme of your choice to the `<head>` of the document. Since ASP.NET Web Application template uses Bootstrap, you can use the [Telerik UI Bootstrap theme]({% slug sassbasedthemes_overview%}#built-in-themes) to match it:

	```HTML
	<head>
		...
		@Styles.Render("~/Content/css")
		@Scripts.Render("~/bundles/modernizr")

		@* Add the Telerik UI Bootstrap Main theme: *@
		<link href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-main.css" rel="stylesheet" type="text/css" />
		...
	</head>
	```

1. The ASP.NET Web Application template comes with a jQuery script reference at the end of `_Layout.cshtml` file. Locate the `@Scripts.Render("~/bundles/jquery")` line in the `<body>` of the document and move it to the `<head>`. Alterantively, use the jQuery script hosted on the jQuery CDN.

	```HTML
	<head>
		...
		<link href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-main.css" rel="stylesheet" type="text/css" />
	
		@* Add the jQuery script from the jQuery CDN: *@
		<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
	</head>
	```

1. Add the required Kendo UI script files in the `<head>` tag after the `jQuery` script reference:

	```HTML
	<head>
		...
		<link href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-main.css" rel="stylesheet" type="text/css" />
		<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

		@* Add the Kendo UI scripts: *@
		<script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
		<script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>
	</head>
	```

	> The installed {{ site.product }} NuGet package and the required [client-side assets]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}) must have identical versions.

1. Finally, add the `bootstrap.min.js` script available in ASP.NET Web Application template. The `<head>` tag must contain the following sylesheets and scripts:

	```HTML

		@Styles.Render("~/Content/css")
		@Scripts.Render("~/bundles/modernizr")
		<link href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-main.css" rel="stylesheet" type="text/css" />
		<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
		<script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
		<script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>
		
		@* Add the bootstrap.min.js script: *@
		<script src="@Url.Content("~/Scripts/bootstrap.min.js")"></script>
	</head>
	```
>Always observe the following rules when adding client-side resources to your project:
> * Register the Kendo UI script files (`kendo.all.min.js` and `kendo.aspnetmvc.min.js`) after the `jquery.min.js` script.
> * The jQuery script must be loaded only once. It must be placed only in the `<head>` tag of the `_Layout.cshtml` file. Ensure there are no duplicate jQuery references elsewhere in the `_Layout` file.
> * The Telerik UI for ASP.NET MVC version and the version of the included Telerik UI theme must be mutually compatible. For more information, refer to the [compatibility table]({% slug sass_themes_compatibility_aspnetmvc6_aspnetmvc %}).
> * The `Kendo.Mvc.dll` and the referenced Kendo UI scripts must have identical versions.

If you prefer to include the client-side resources from a local source instead of CDNs, refer to the [Local Client-Side Resources]({% slug using_local_client_side_resources %}) article.

#end