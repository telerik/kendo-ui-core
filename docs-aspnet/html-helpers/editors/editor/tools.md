---
title: Tools
page_title: Tools
description: "Learn which tools are available in the Telerik UI Editor HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_editor_tools_aspnetcore
position: 3
---

# Tools

The Editor provides a predefined collection of tools that are used to interact with the control.

You can enable any of these tools by using the `Tools()` HtmlHelper method and configure it with the specific tool method. Custom tools and tools that require configuration are defined using inner methods for the tool.

## Default Tools

The default tools in the Editor are included in the toolbar of the Editor upon setting the respective tool method. For a runnable example, refer to the [demo on the built-in tools in the Editor](https://demos.telerik.com/{{ site.platform }}/editor/all-tools).

The following example demonstrates the default tool methods of the Editor.

```
@(Html.Kendo().Editor()
    .Name("editor")
    .Tools(tools => tools
        .Clear()
        .Bold()
        .Italic()
        .Underline()
        .Strikethrough()
        .JustifyLeft()
        .JustifyCenter()
        .JustifyRight()
        .JustifyFull()
        .InsertUnorderedList()
        .InsertOrderedList()
        .Outdent()
        .Indent()
        .CreateLink()
        .Unlink()
        .InsertImage()
        .InsertFile()
        .SubScript()
        .SuperScript()
        .TableEditing()
        .ViewHtml()
        .Formatting()
        .CleanFormatting()
        .FontName()
        .FontSize()
        .ForeColor()
        .BackColor()
        .Pdf()
        .Print()
        .Snippets(snippets => snippets
            .Add("Signature", "<p>Regards,<br /> John Doe,<br /><a href='mailto:john.doe@example.com'>john.doe@example.com</a></p>")
            .Add("Kendo online demos", " <a href='https://demos.telerik.com/kendo-ui'>Kendo online demos</a> ")
        )
    )
)
```

## Custom Tools

To define the custom tools of the Editor, use the `CustomButton()` and `CustomTemplate()` methods. You can use `CustomButton()` for scenarios where only a single action has to be executed upon a button click. The custom template allows you to define a more complicated tool and also embed other widgets within the Editor toolbar. You can use `CustomTemplate()` for creating a DropDownList which changes the background color for the editable area of the Editor.

The following example demonstrates these scenarios. Note the `Name()` method that is used for the `CustomButton()` configuration. The passed string value will be later used to populate the class for the `<span>` element for whose tool icon the `:before` pseudo element is used. In this case, the final result for that class will be `k-i-custom`. As the `k-i-custom` class is used by one of the Kendo UI for jQuery icons, the respective icon will be displayed for the tool button. Note that the `undo` and `redo` tool names are reserved (forbidden). For a runnable example, refer to the [demo on custom tools in the Editor](https://demos.telerik.com/{{ site.platform }}/editor/custom-tools).

```
@(Html.Kendo().Editor()
    .Name("editor")
    .Tools(t => t
        .CustomTemplate(x => x
            .Template("<label for='templateTool' style='vertical-align:middle;'>Background:</label>" +
                "<select id='templateTool'>" +
                    "<option value=''>none</option>" +
                    "<option value='\\#ff9'>yellow</option>" +
                    "<option value='\\#dfd'>green</option>"+
                "</select>")
        )
        .CustomButton(x => x
            .Name("custom")
            .Tooltip("Insert a horizontal rule")
            .Exec("onCustomButtonExec")
        )
    )
)

<script>
    function onCustomButtonExec(e) {
        var editor = $(this).data("kendoEditor");
        editor.exec("inserthtml", { value: "<hr />" });
    }

    $(document).ready(function () {
        $("#templateTool").kendoDropDownList({
            change: function (e) {
                var editor = $("#editor").data("kendoEditor")
                editor.body.style.backgroundColor = e.sender.value();
            }
        });
    });
</script>
```

## See Also

* [Default Tools by the Editor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/all-tools)
* [Custom Tools by the Editor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/custom-tools)
* [Server-Side API](/api/editor)
