---
title: Use Kendo UI Templates with Server-Side Template Engines
page_title: Use Kendo UI Templates with Server-Side Template Engines
description: "Learn how to prevent a server-side template engine, such as Smarty, from breaking the JavaScript blocks of Kendo UI for jQuery templates."
slug: howto_use_templates_with_server_side_template_engines
tags: telerik, kendo, jquery, templates, server-side, template, engine, smarty, literal, ldelim, rdelim
type: troubleshooting
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Templates for jQuery</td>
 </tr>
 <tr>
  <td>Version</td>
  <td>2026.3.811</td>
 </tr>
</table>

## Description

When I use a Kendo UI template with conditional JavaScript blocks in a page processed by a server-side template engine such as Smarty, the template does not render or throws a template compilation error.

## Cause

Server-side template engines process the page before the browser receives it, so they can interpret the `{` and `}` characters of the Kendo UI template JavaScript blocks as their own syntax. The Kendo UI template parser only sees the final output, so the engine-specific syntax must resolve to plain `# if (...) { #` and `# } #` blocks.

## Solution

To prevent the server-side engine from processing the Kendo UI template, use the escaping mechanism of the engine, for example, a literal or raw block, or output the braces as plain text. The exact syntax depends on the engine, so refer to its documentation.

Smarty, for example, supports the following approaches:

* Wrap the template in `{literal}` and `{/literal}` tags.
* Output the braces with `{ldelim}` and `{rdelim}`.

Both approaches render the same Kendo UI template.

The following example demonstrates the Smarty `{literal}` approach.

```html
    <script id="statusTemplate" type="text/x-kendo-template">
        {literal}
        # if (complete === true) { #
            <span class="badge rounded-pill badge-success">Complete</span>
        # } else { #
            <span class="badge rounded-pill badge-warning">Incomplete</span>
        # } #
        {/literal}
    </script>
```

The following example demonstrates the same template with `{ldelim}` and `{rdelim}`.

```html
    <script id="statusTemplate" type="text/x-kendo-template">
        #if(complete === true){ldelim}#
            <span class="badge rounded-pill badge-success">Complete</span>
        #{rdelim}else{ldelim}#
            <span class="badge rounded-pill badge-warning">Incomplete</span>
        #{rdelim}#
    </script>
```

## See Also

* [Templates Essentials]({% slug essentials_templates %})
* [Templates Overview]({% slug overview_kendoui_templatescomponent %})
* [Templates JavaScript API Reference](/api/kendo/methods/template)
