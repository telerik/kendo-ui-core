---
title: Using strict Content Security Policy(CSP)
description: Using strict Content Security Policy(CSP) with Kendo UI
---
{% raw %}

# Using strict Content Security Policy(CSP) with Kendo UI

If the strict `Content-Security-Policy` mode is enabled, some browser features are disabled by default:

- Inline JavaScript (e.g. <script></script>, DOM event attributes like onclick) is blocked - all script code must reside in separate files, served from a whitelisted domain
- Dynamic code evaluation (via eval() and string arguments for both setTimeout and setInterval) are blocked

Kendo UI uses `eval()` calls. This is how the Kendo UI templates work internally, and therefore currently Kendo UI does not support strict CSP mode.

If CSP mode is enabled for a Kendo UI application the `unsafe-eval` keyword should be added as part of the `meta` tag used for enabling the CSP mode.

    <meta http-equiv="Content-Security-Policy" content="script-src 'unsafe-eval' 'self' https://cdn.kendostatic.com;">

{% endraw %}
