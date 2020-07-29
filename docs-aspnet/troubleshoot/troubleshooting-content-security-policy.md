---
title: Content Security Policy
page_title: Content Security Policy | Kendo UI Troubleshooting
description: "Learn about the issues that may occur when using the strict Content Security Policy with UI for ASP.NET Core HTML helpers and Tag Helpers."
slug: troubleshooting_content_security_policy_aspnetmvc
---

# Content Security Policy

If the strict `Content-Security-Policy` (CSP) mode is enabled, some browser features are disabled by default:

- Inline JavaScript, such as <script></script> or DOM event attributes like `onclick`, is blocked. All script code must reside in separate files, served from a whitelisted domain.
- Dynamic code evaluation via `eval()` and string arguments for both `setTimeout` and `setInterval` are blocked.

Kendo UI uses `eval()` calls. This is how the Kendo UI templates work internally. Therefore, Kendo UI does not currently support the strict CSP mode.

If CSP mode is enabled for a Kendo UI application, the unsafe-eval keyword should be added as part of the meta tag used for enabling the CSP mode:

	<meta http-equiv="Content-Security-Policy" content="script-src 'unsafe-eval' 'self' https://kendo.cdn.telerik.com;">

{% if site.core %}

When Kendo widgets are initialized from Html helpers or Tag Helpers there are inline scripts that are automatically injected. When `Content-Security-Policy` (CSP) is enabled the following error will be thrown:

{% else %}

When Kendo widgets are initialized from Html helpers there are inline scripts that are automatically injected. When `Content-Security-Policy` (CSP) is enabled the following error will be thrown:

{% endif %}

* `Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'unsafe-eval' 'self' https://kendo.cdn.telerik.com".`  

**Solution**

Use the [Deferred initialization](https://docs.telerik.com/aspnet-mvc/getting-started/helper-basics/fundamentals#deferred-initialization)

	@(Html.Kendo().PanelBar()
        .Name("IntroPanelBar")
        .Items(items =>
        {
		...
        })
        .Deferred()
    )
	
Render the initialization logic in a script using `nonce`

	<script type="text/javascript" nonce="kendoInlineScript">
		@Html.Kendo().DeferredScripts(false)
	</script>

Extend the Content-Security-Policy `meta` tag to include the `unsafe-eval` keyword and the `nonce` signature for enabling the CSP mode:

	<meta http-equiv="Content-Security-Policy" content="script-src 'unsafe-eval' 'self' 'nonce-kendoInlineScript' https://kendo.cdn.telerik.com;">
	
## See Also
{% if site.mvc %}
* [Common Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_aspnetmvc %})
* [Scaffolding Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_scaffolding_aspnetmvc %})
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [Excel Export with the Grid ASP.NET MVC HtmlHelper Extension]({% slug excelissues_gridhelper_aspnetmvc %})
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_uploadhelper_aspnetmvc %})
{% endif %}
* [Common Issues in Kendo UI](https://docs.telerik.com/kendo-ui/troubleshoot/troubleshooting-common-issues)
* [JavaScript Errors](https://docs.telerik.com/kendo-ui/troubleshoot/troubleshooting-js-errors)
* [Performance Issues](https://docs.telerik.com/kendo-ui/troubleshoot/troubleshooting-memory-leaks)
* [Content Security Policy in Kendo UI](https://docs.telerik.com/kendo-ui/troubleshoot/content-security-policy)
* [Common Issues in Kendo UI Excel Export](https://docs.telerik.com/kendo-ui/framework/excel/troubleshoot/common-issues)
* [Common Issues in Kendo UI Charts](https://docs.telerik.com/kendo-ui/controls/charts/troubleshoot/common-issues)
* [Performance Issues in Kendo UI Widgets for Data Visualization](https://docs.telerik.com/kendo-ui/troubleshoot/troubleshooting-memory-leaks)
* [Common Issues in Kendo UI ComboBox](https://docs.telerik.com/kendo-ui/controls/editors/combobox/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Diagram](https://docs.telerik.com/kendo-ui/controls/diagrams-and-maps/diagram/troubleshoot/common-issues)
* [Common Issues in Kendo UI DropDownList](https://docs.telerik.com/kendo-ui/controls/editors/dropdownlist/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Editor](https://docs.telerik.com/kendo-ui/controls/editors/editor/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI MultiSelect](https://docs.telerik.com/kendo-ui/controls/editors/multiselect/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Scheduler](https://docs.telerik.com/kendo-ui/controls/scheduling/scheduler/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Upload](https://docs.telerik.com/kendo-ui/controls/editors/upload/troubleshoot/troubleshooting)
* [Common Issues Related to Styling, Appearance, and Rendering](https://docs.telerik.com/kendo-ui/styles-and-layout/troubleshoot/troubleshooting)
