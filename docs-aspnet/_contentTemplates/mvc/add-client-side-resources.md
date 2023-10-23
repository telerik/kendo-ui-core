#including-client-side-resources

## Including the Client-Side Resources

Before you can use a Telerik UI component, you must include the theme, the jQuery script, and the Kendo UI scripts:

1. Go to `~\Views\Shared\_Layout.cshtml` and add the Kendo UI theme of your choice to the `<head>` of the document. Since Microsoft's project template uses Bootstrap, you can use the Kendo UI SASS Bootstrap theme to match it.

		<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>@ViewBag.Title - My ASP.NET Application</title>
		@Styles.Render("~/Content/css")
		@Scripts.Render("~/bundles/modernizr")

		@* Add the Kendo SASS Bootstrap theme: *@
		<link href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-main.css" rel="stylesheet" type="text/css" />
		</head>

1. In the `_Layout.cshtml` file, locate the `@Scripts.Render("~/bundles/jquery")` line in the `<body>` of the document and delete it. This jQuery script reference comes with the Microsoft ASP.NET Web Application template. 

	Removing this script is crucial because in the next step you add the jQuery script provided by Telerik. Having more than one script references causes errors.  

1. Add the jQuery script to the `<head>` tag.

		<head>
		...
		<link href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-main.css" rel="stylesheet" type="text/css" />
		
		@* Add the jQuery script from the jQuery CDN: *@
		<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
		</head>

1. Add the Kendo UI scripts. The Kendo UI script files required by UI for ASP.NET MVC must be loaded in the `<head>` tag *after* the jQuery script.

		<head>
		...
		<link href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-main.css" rel="stylesheet" type="text/css" />
		<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>

		@* Add the Kendo UI scripts: *@
		<script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/jszip.min.js"></script>
		<script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
		<script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>
		</head>

1. Finally, add the `bootstrap.min.js` script available in Microsoft's ASP.NET Web Application template, and the `<head>` will look like this.

		<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>@ViewBag.Title - My Telerik MVC Application</title>
		@Styles.Render("~/Content/css")
		@Scripts.Render("~/bundles/modernizr")
		<link href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-main.css" rel="stylesheet" type="text/css" />
		<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
		<script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/jszip.min.js"></script>
		<script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
		<script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>
		
		@* Add the bootstrap.min.js script: *@
		<script src="@Url.Content("~/Scripts/bootstrap.min.js")"></script>
		</head>

>Always observe the following rules when adding client-side resources to your project:
> * Put the Kendo UI script files (`kendo.all.min.js` and `kendo.aspnetmvc.min.js`) after the `jquery.min.js` script.
> * A jQuery script must be loaded only once. It must be placed only in the `<head>` tag of the `_Layout.cshtml` file. Make sure there are no duplicate jQuery references elsewhere in the `_Layout` file.
> * The Kendo UI scripts, the Kendo UI CSS file must use a compatible version of the theme, and the `Kendo.Mvc.dll` referenced in the project must be the same version as the Kendo UI script files.

If you prefer to include the Kendo UI scripts and styles from a local source instead of CDNs, refer to the [Local Client-Side Resources]({% slug using_local_client_side_resources %}) article.

#end