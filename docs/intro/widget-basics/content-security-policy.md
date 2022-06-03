---
title: Content Security Policy
page_title: Content Security Policy | Working with Widgets | Kendo UI for jQuery
description: "Learn more about the Content Security Policy (CSP) mode and how to work with it in Kendo UI for jQuery controls."
slug: troubleshooting_content_security_policy_kendoui
previous_url: /troubleshoot/content-security-policy
position: 70
---

# Content Security Policy

If the strict `Content-Security-Policy` (CSP) mode is enabled, it disables the following browser features by default:

* Inline JavaScript, such as `<script></script>`, or DOM event attributes, such as `onclick`, are blocked. All script code must reside in separate files that are served from a white-listed domain.

* Dynamic code evaluation through `eval()` and string arguments for both `setTimeout` and `setInterval` are blocked.

## Working with Kendo UI for jQuery

Kendo UI for jQuery uses `eval()` calls for its templates to work internally. Thus, Kendo UI for jQuery does not currently support the strict CSP mode.

If CSP is enabled for a Kendo UI application, you have to add at least the `unsafe-eval` keyword as a part of the `meta` tag that is used for enabling the CSP mode.

    <meta http-equiv="Content-Security-Policy" content="script-src 'unsafe-eval' 'self' https://kendo.cdn.telerik.com;">
