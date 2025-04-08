---
title: Copy Text from TextBox to Clipboard
description: Learn how to copy text from the {{ site.product }} TextBox to the Clipboard.
page_title: Copy Text from {{ site.product }} TextBox to Clipboard
slug: copy-text-from-textbox-to-clipboard
tags: textbox, clipboard, copy, button, suffix, telerik, core, mvc, aspnet, kendo
res_type: kb
component: textbox
---


## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} TextBox</td> 
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2024.1.130</td>
 </tr>
</table>

## Description

How can I copy text from the TextBox component directly within the Clipboard?

## Solution

To achieve the desired result:

1. Utilize the TextBox's [`SuffixOptions()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/textboxbuilder#suffixoptionssystemaction) configuration and define a template.
1. Within the template, create a Button component and wire to its [`Click`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/buttonbuilder#eventssystemaction) event.
1. Within the event handler, use the [Clipboard](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard) interface's [`writeText()`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText) method to copy the text from the TextBox.

{% if site.core %}
```HtmlHelper
     @(Html.Kendo().TextBox()
        .Name("email")
        .Label(l => l.Content("Email Address").Floating(false))
        .Value("test@mail.com")
        .SuffixOptions(suffix => suffix
             .Template(Html.Kendo().Template()
                .AddComponent(component => component
                    .Button()
                    .Name("copyBtn")
                    .Icon("copy")
                    .Events(events => events.Click("onClick"))
                )
             )
        
        )
        .HtmlAttributes(new { style = "width: 100%;", type = "email" })
    )
```
```TagHelper
    <script id="buttonTemplate" type="text/html">
        <kendo-button name="copyBtn"
                      icon="copy"
                      on-click="onClick"
                      is-in-client-template="true">
        </kendo-button>
    </script>

    <kendo-textbox name="email" type="email">
        <suffix-options template-id="buttonTemplate" />
    </kendo-textbox>
```
{% else %}
```Razor Index.cshtml
     @(Html.Kendo().TextBox()
        .Name("email")
        .Label(l => l.Content("Email Address").Floating(false))
        .Value("test@mail.com")
        .SuffixOptions(suffix => suffix
             .Template(Html.Kendo().Template()
                .AddComponent(component => component
                    .Button()
                    .Name("copyBtn")
                    .Icon("copy")
                    .Events(events => events.Click("onClick"))
                )
             )

        )
        .HtmlAttributes(new { style = "width: 100%;", type = "email" })
    )
```
{% endif %}

```JS script.js
    <script>
        function onClick(e){
            var textBoxValue = $("#email").getKendoTextBox().value();
            navigator.clipboard.writeText(textBoxValue);
        }
    </script>    
```

{% if site.core %}
To see an extended example of the aforementioned approach, refer to the following Telerik REPL example:

* [Telerik REPL for ASP.NET Core HtmlHelper Example](https://netcorerepl.telerik.com/woaxlyFM36koF7hy56)
* [Telerik REPL for ASP.NET Core TagHelper Example](https://netcorerepl.telerik.com/QSOnPoFC36r2eszS26)

{% else %}
To see an extended example of the aforementioned approach, refer to the [REPL example on copying text from the TextBox within the Clipboard](https://netcorerepl.telerik.com/woaxlyFM36koF7hy56).
{% endif %}

## More {{ site.framework }} TextBox Resources

* [{{ site.framework }} TextBox Documentation]({%slug htmlhelpers_overview_textbox %})

* [{{ site.framework }} TextBox Demos](https://demos.telerik.com/{{ site.platform }}/textbox/index)

{% if site.core %}
* [{{ site.framework }} TextBox Product Page](https://www.telerik.com/aspnet-core-ui/textbox)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} TextBox Product Page](https://www.telerik.com/aspnet-mvc/textbox)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}


## See Also


* [Telerik REPL (HtmlHelper): Copy Text from TextBox to Clipboard ](https://netcorerepl.telerik.com/woaxlyFM36koF7hy56)
{% if site.core %}
* [Telerik REPL (TagHelper): Copy Text from TextBox to Clipboard](https://netcorerepl.telerik.com/QSOnPoFC36r2eszS26)
{% endif %}
* [Client-Side API Reference of the TextBox for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/textbox)
* [Server-Side API Reference of the TextBox for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/textbox)
{% if site.core %}
* [TagHelper API Reference of the TextBox for {{ site.framework }}](https://docs.telerik.com/aspnet-core/api/taghelpers/textbox)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)