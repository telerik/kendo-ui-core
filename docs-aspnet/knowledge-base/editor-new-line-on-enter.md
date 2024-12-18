---
title: Add a New Line instead of a New Paragraph in the Editor when Pressing Enter Key
description: Learn how to customize the Telerik UI for {{ site.framework }} Editor to add a new line when pressing the Enter key.
type: how-to
page_title: Add a New Line instead of a New Paragraph in the Editor when Pressing Enter Key
slug: editor-new-line-on-enter
tags: editor, new, line, br, paragraph, enter, press, key, core, mvc, telerik
previous_url: /helpers/editors/editor/how-to/add-new-line-on-enter, /html-helpers/editors/editor/how-to/add-new-line-on-enter
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

How can I configure the Editor to add a new line instead of a paragraph when pressing the Enter key?

## Solution

By default, the Editor adds a paragraph (`p` element) when the focus is in the Editor's content area and you press the `Enter` key. Pressing `Shift + Enter` adds a new line (`br` element). You can reverse the default behavior by customizing the Editor's tools.   

1. Add a script that customizes the `insertLineBreak` and `insertParagraph` tools. As a result, a new line is added when pressing the `Enter` key, and a paragraph is inserted by pressing `Shift + Enter`.  
1. Declare the Editor after the script tag with the custom logic.

```Script
    <script>
        var editorNS = kendo.ui.editor,
            registerTool = editorNS.EditorUtils.registerTool,
            Tool = editorNS.Tool;
        registerTool("insertLineBreak", new Tool({ key: 13, command: editorNS.NewLineCommand }));
        registerTool("insertParagraph", new Tool({ key: 13, shift: true, command: editorNS.ParagraphCommand }));
    </script>
```
```HtmlHelper
    @(Html.Kendo().Editor()
      .Name("Editor")
      .HtmlAttributes(new { style = "height:300px" })
      .Value(@<text>
            <p>
               Some content
            </p>
      </text>)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-editor tag="textarea" name="editor" style="height:300px" value="@{<text>
            <p>
                Some content
            </p>
        </text> }">
    </kendo-editor>
```
{% endif %}


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