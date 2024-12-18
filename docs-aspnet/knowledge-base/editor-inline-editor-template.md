---
title: Use an Inline Editor in Editor Templates
description: Learn how to use an inline Telerik UI for {{ site.framework }} Editor in an editor template.
type: how-to
page_title: Use an Inline Editor in Editor Templates
slug: editor-inline-editor-template
tags: editor, inline, template, core, mvc, telerik
previous_url: /helpers/editors/editor/how-to/inline-editor-in-editor-template, /html-helpers/editors/editor/how-to/inline-editor-in-editor-template
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Editor</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>2024.4.1112</td>
 </tr>
</table>

## Description

How can I use an inline Editor in an editor template and submit its value?

## Solution

When you add the inline Editor component in a form through an {{ site.framework }} Editor template, its value will not be posted with the form. The reason for that is the inline mode that renders a DOM element, which is not a form field. Therefore, the value is not submitted with the form. To handle this scenario, customize the Editor template by adding a hidden input and update it when the content of the Editor changes.

```HtmlHelper
    @model string

    @(Html.Kendo().EditorFor(model => model)
        .Name(Html.NameFor(model => model) + "_Editor")
        .Tag("div")
        .Tools(tools => tools.Clear().Bold().Italic().Underline())
        .Events(events => events.Change(@"function (ev){
            var hiddenInput =  $('#" + Html.NameFor(model => model) + @"');
            hiddenInput.val(ev.sender.value());
            hiddenInput.change();
        }"))
    )

    @Html.HiddenFor(model => model)
```

## More {{ site.framework }} Editor Resources

* [{{ site.framework }} Editor Documentation]({%slug htmlhelpers_editor_aspnetcore%})

* [{{ site.framework }} Editor Demos](https://demos.telerik.com/{{ site.platform }}/editor/index)

{% if site.core %}
* [{{ site.framework }} Editor Product Page](https://www.telerik.com/aspnet-core-ui/editor)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Editor Product Page](https://www.telerik.com/aspnet-mvc/editor)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Editor for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
* [Server-Side API Reference of the Editor for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/editor)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Editor for {{ site.framework }}](https://docs.telerik.com/aspnet-core/api/taghelpers/editor)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)