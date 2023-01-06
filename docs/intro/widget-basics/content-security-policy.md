---
title: Content Security Policy
page_title: Content Security Policy - Working with Components 
description: "Learn more about the Content Security Policy (CSP) mode and how to work with it in Kendo UI for jQuery controls."
slug: troubleshooting_content_security_policy_kendoui
previous_url: /troubleshoot/content-security-policy
position: 70
---

# Content Security Policy

If the strict `Content-Security-Policy` (CSP) mode is enabled, it disables the following browser features by default:

* Inline JavaScript, such as `<script></script>`, or DOM event attributes, such as `onclick`, are blocked. All script code must reside in separate files that are served from a white-listed domain.
* Dynamic code evaluation through `eval()` and string arguments for both `setTimeout` and `setInterval` are blocked.

## (For R1 2023 and Later) Working with Kendo UI for jQuery

The Kendo UI for jQuery R1 2023 release addresses the `unsafe-eval` directive for all components except for the [Spreadsheet]({% slug overview_spreadsheet_widget %}). For the bigger part of its core engine, the Kendo UI for jQuery Spreadsheet uses the `Function` evaluation and rewriting the logic of the component will lead to a great number of breaking changes.

The rest of the Kendo UI components and internal mechanisms have been completely rewritten to discard the usage of the `eval()` and `new Function()` calls.

To avoid including the `unsafe-eval` keyword in the `meta` tag of your project pages, in this way preventing the components from being dependent on `unsafe-eval`, you must rewrite all [inline]({% slug getting_started_inline_templates %}) and [external]({% slug getting_started_external_templates %}) templates into [CSP-compatible]({% slug csp_templates %}) functional templates.

The engine for the [inline]({% slug getting_started_inline_templates %}) and [external]({% slug getting_started_external_templates %}) templates will remain available. However, if you are using the previous template syntax, you must include the `usafe-eval` directive in the `meta` tag.

## (Prior to R1 2023) Working with Kendo UI for jQuery

The Kendo UI for jQuery releases prior to the R1 2023 one use `eval()` calls for their templates to work internally. Thus, in these previous versions, Kendo UI for jQuery does not support the strict CSP mode.

If CSP is enabled for a Kendo UI application, you have to add at least the `unsafe-eval` keyword as a part of the `meta` tag that is used for enabling the CSP mode.

    <meta http-equiv="Content-Security-Policy" content="script-src 'unsafe-eval' 'self' https://kendo.cdn.telerik.com;">


## See Also 

* [Getting Started with Content Security Policy (CSP-Compatible) Templates]({% slug csp_templates %})
* [Templates Essentials]({% slug essentials_templates %})
* [Templates Demos](https://demos.telerik.com/kendo-ui/templates/index)
