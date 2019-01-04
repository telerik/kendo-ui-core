---
title: Tools
page_title: Editor Tools | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn which tools are available in the Kendo UI Editor HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_editor_tools_aspnetcore
position: 3
---

# Editor Tools

The Editor provides a predefined collection of tools that are used to interact with the widget.

Any tool can be switched on (enabled) by using the `Tools()` HTML helper method and configure it with the specific tool method.

Custom tools and tools that require configuration are defined using inner methods for the tool.

## Default Tools

The default tools in the Editor will be included in the widget toolbar, when the respective tool method is used. Below example demonstrates the available default tool methods.

###### Example

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
            .Add("Kendo online demos", " <a href='http://demos.telerik.com/kendo-ui'>Kendo online demos</a> ")
        )
    )
)
```

## Custom Tools

The custom tools in the Editor widget could be defined using two methods in the HTML helper: `CustomButton()` and `CustomTemplate()`. The custom button is appropriate for simple scenarios in which only a single action should be executed upon button click. The custom template allows the developer to define a more complicated tool and also embed another widgets within the Editor toolbar.

The below example demonstrates the above two scenarios:

###### Example

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

Note the `Name()` method used for the `CustomButton()` configuration. The string value passed there will be later used to populate the class for the `<span>` element, which `:before` pseudo element is used for the tool icon. In the above case, the final result for that class would be `k-i-custom`. As the `k-i-custom` class is used by one of the Kendo icons, the respective icon will be displayed for the tool button. Note that the `undo` and `redo` tool names are reserved (forbidden).

As per the `CustomTemplate()`, it is used to create a Kendo DropDownList widget, which changes the background color for the Editor editable area.

## See Also

* [Overview of the Editor HtmlHelper]({% slug htmlhelpers_editor_aspnetcore %})
* [Modes of Operation]({% slug htmlhelpers_editor_modes_aspnetcore %})
* [Pasting Content]({% slug htmlhelpers_editor_pasting_aspnetcore %})
* [Serialize / Deserialize Content]({% slug htmlhelpers_editor_serialize_aspnetcore %})
* [Image Browser]({% slug htmlhelpers_editor_image_browser_aspnetcore %})
* [Immutable Elements]({% slug htmlhelpers_editor_immutable_aspnetcore %})
* [Styling Content]({% slug htmlhelpers_editor_styling_aspnetcore %})
