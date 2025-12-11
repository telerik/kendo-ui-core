---
title: Tools
page_title: Tools
description: "Learn which tools are available in the Telerik UI Editor component for {{ site.framework }}."
components: ["editor"]
slug: htmlhelpers_editor_tools_aspnetcore
position: 3
---

# Tools

The Editor provides a predefined collection of tools that are used to interact with the control.

You can enable any of these tools by using the `Tools()` method and configure it with the specific tool method. Custom tools and tools that require configuration are defined using inner methods for the tool.

## Default Tools

The default tools in the Editor are included in the toolbar of the Editor upon setting the respective tool method. For a runnable example, refer to the [demo on the built-in tools in the Editor](https://demos.telerik.com/{{ site.platform }}/editor/all-tools).

The following example demonstrates the default tool methods of the Editor.

```HtmlHelper
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
            .FormatPainter()
            .BackColor()
            .Pdf()
            .Print()
            .Snippets(snippets => snippets
                .Add("Signature", "<p>Regards,<br /> John Doe,<br /><a href='mailto:john.doe@example.com'>john.doe@example.com</a></p>")
                .Add("Telerik UI for ASP.NET Core Demos", " <a href='https://demos.telerik.com/aspnet-core/'>Telerik UI for ASP.NET Core Online Demos</a> ")
            )
        )
    )
```
{% if site.core %}
```TagHelper
        <kendo-editor name="editor">
        <tools>
            <tool name="bold">
            </tool>
            <tool name="italic">
            </tool>
            <tool name="underline">
            </tool>
            <tool name="strikethrough">
            </tool>
            <tool name="undo">
            </tool>
            <tool name="redo">
            </tool>
            <tool name="justifyLeft">
            </tool>
            <tool name="justifyCenter">
            </tool>
            <tool name="justifyRight">
            </tool>
            <tool name="justifyFull">
            </tool>
            <tool name="insertUnorderedList">
            </tool>
            <tool name="insertOrderedList">
            </tool>
            <tool name="insertUpperRomanList">
            </tool>
            <tool name="insertLowerRomanList">
            </tool>
            <tool name="outdent">
            </tool>
            <tool name="indent">
            </tool>
            <tool name="createLink">
            </tool>
            <tool name="unlink">
            </tool>
            <tool name="insertImage">
            </tool>
            <tool name="insertFile">
            </tool>
            <tool name="subscript">
            </tool>
            <tool name="superscript">
            </tool>
            <tool name="tableWizard">
            </tool>
            <tool name="createTable">
            </tool>
            <tool name="addColumnLeft">
            </tool>
            <tool name="addColumnRight">
            </tool>
            <tool name="addRowAbove">
            </tool>
            <tool name="addRowBelow">
            </tool>
            <tool name="deleteColumn">
            </tool>
            <tool name="deleteRow">
            </tool>
            <tool name="mergeCellsHorizontally">
            </tool>
            <tool name="mergeCellsVertically">
            </tool>
            <tool name="splitCellHorizontally">
            </tool>
            <tool name="splitCellVertically">
            </tool>
            <tool name="tableAlignLeft">
            </tool>
            <tool name="tableAlignCenter">
            </tool>
            <tool name="tableAlignRight">
            </tool>
            <tool name="viewHtml">
            </tool>
            <tool name="formatting">
            </tool>
            <tool name="cleanFormatting">
            </tool>
            <tool name="copyFormat">
            </tool>
            <tool name="applyFormat">
            </tool>
            <tool name="fontName">
            </tool>
            <tool name="fontSize">
            </tool>
            <tool name="foreColor">
            </tool>
            <tool name="formatPainter">
            </tool>
            <tool name="backColor">
            </tool>
            <tool name="print">
            </tool>
            <tool name="insertHtml">
                <tool-items>
                    <tool-item text="Signature" value="<p>Regards,<br /> John Doe,<br /><a href='mailto:john.doe@example.com'>john.doe@example.com</a></p>"> </tool-item>
                    <tool-item text="Telerik UI for ASP.NET Core Demo" value="<a href='https://demos.telerik.com/aspnet-core/'>Telerik UI for ASP.NET Core Online Demos</a>"></tool-item>
                </tool-items>
            </tool>
        </tools>
    </kendo-editor>
```
{% endif %}

## Custom Tools

To define the custom tools of the Editor, use the `CustomButton()` and `CustomTemplate()` methods. You can use `CustomButton()` for scenarios where only a single action has to be executed upon a button click. The custom template allows you to define a more complicated tool and also embed other widgets within the Editor toolbar. You can use `CustomTemplate()` for creating a DropDownList which changes the background color for the editable area of the Editor.

### Using the Template Component

The {{ site.product }} v2023.2.606 introduced the new [Template Component]({% slug htmlhelpers_overview_template %}). You can use it to define custom Tools for the Toolbar. The following example demonstrates how to add a custom Button and custom DropDownList as tools using the Template Component.

```HtmlHelper
    @(Html.Kendo().Editor()
          .Name("editor")
          .Tools(tools => tools
            .Clear()
            .CustomTemplate(x => x
                .Name("customDropDownList")
                .Template(
                    Html.Kendo().Template()
                        .AddHtml("<label for='templateTool' style='vertical-align:middle;'>Background:</label>")
                        .AddComponent(c=>c.DropDownList()
                            .Name("templateTool")
                            .BindTo(new List<SelectListItem>() {
                                new SelectListItem() {
                                    Text = "none",
                                    Value = ""
                                },
                                new SelectListItem() {
                                    Text = "yellow",
                                    Value = "#ff9"
                                },
                                new SelectListItem() {
                                    Text = "green",
                                    Value = "#dfd"
                                }
                            })
                            .Events(ev=>ev.Change("templateToolChange"))
                        )
                    )
            )
            .CustomButton(x => x.Name("customButton").ToolTip("Insert a horizontal rule").Exec(@<text>
                    function(e) {
                    var editor = this;
                    editor.exec("inserthtml", { value: "<hr />" });
                    }
            </text>))
          )
    )

    <script>
        function templateToolChange(e){
            $("#editor").data("kendoEditor").body.style.backgroundColor = e.sender.value();
        }
    </script>
```

{% if site.core %}
```TagHelper
    @{
        var dropDownListOptions = new List<SelectListItem>() {
                                new SelectListItem() {
                                    Text = "none",
                                    Value = ""
                                },
                                new SelectListItem() {
                                    Text = "yellow",
                                    Value = "#ff9"
                                },
                                new SelectListItem() {
                                    Text = "green",
                                    Value = "#dfd"
                                }
                            };
    }

    <kendo-editor name="editor">
        <tools>
            <tool name="customDropDownList">
                <tool-template>
                    <label for='templateTool' style='vertical-align:middle;'>Background:</label>
                    <kendo-dropdownlist name="templateTool"
                        bind-to="@dropDownListOptions"
                        on-change="onTemplateToolChange">
                    </kendo-dropdownlist>
                </tool-template>
            </tool>
            <tool name="custom" tooltip="Insert a horizontal rule" exec="@{<text>
                    function(e) {
                    var editor = $(this).data("kendoEditor");
                    editor.exec("inserthtml", { value: "<hr />" });
                    }
            </text>}">
            </tool>
        </tools>
    </kendo-editor>

    <script>
        function onTemplateToolChange(e) {
            $("#editor").data("kendoEditor").body.style.backgroundColor = e.sender.value();
        }
    </script>
```
{% endif %}

### Using Kendo Template

The following example demonstrates the same scenarios implemented using Kendo Templates. Note the `Name()` method that is used for the `CustomButton()` configuration. The passed string value will be later used to populate the class for the `<span>` element for whose tool icon the `:before` pseudo element is used. In this case, the final result for that class will be `k-i-custom`. As the `k-i-custom` class is used by one of the Kendo UI for jQuery icons, the respective icon will be displayed for the tool button. Note that the `undo` and `redo` tool names are reserved (forbidden). For a runnable example, refer to the [demo on custom tools in the Editor](https://demos.telerik.com/{{ site.platform }}/editor/custom-tools).

```HtmlHelper
    @(Html.Kendo().Editor()
        .Name("editor")
        .Tools(t => t
            .CustomTemplate(x => x
                .Name("customDropDownList)
                .Template("<label for='templateTool' style='vertical-align:middle;'>Background:</label>" +
                    "<select id='templateTool'>" +
                        "<option value=''>none</option>" +
                        "<option value='\\#ff9'>yellow</option>" +
                        "<option value='\\#dfd'>green</option>"+
                    "</select>")
            )
            .CustomButton(x => x
                .Name("customButton")
                .Tooltip("Insert a horizontal rule")
                .Exec("onCustomButtonExec")
            )
        )
    )

    <script>
        function onCustomButtonExec(e) {
            var editor = this;
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

{% if site.core %}
```TagHelper
    <kendo-editor name="editor">
        <tools>
            <tool template="<label for='templateTool' style='vertical-align:middle;'>Background:</label> <select id='templateTool'><option value=''>none</option><option value='\#ff9'>yellow</option><option value='\#dfd'>green</option></select>">
            </tool>
            <tool name="custom" tooltip="Insert a horizontal rule" exec="@{<text>
                    function(e) {
                    var editor = $(this).data("kendoEditor");
                    editor.exec("inserthtml", { value: "<hr />" });
                    }
            </text>}">
            </tool>
        </tools>
    </kendo-editor>

    <script>
        $(document).ready(function () {
            $("#templateTool").kendoDropDownList({
                change: function (e) {
                    $("#editor").data("kendoEditor").body.style.backgroundColor = e.sender.value();
                }
            });
        });
    </script>
```
{% endif %}

## Extending the Editor with a Custom Tool

To extend the Editor with a custom tool:

1. Create a custom command through the `kendo.ui.editor.Command.extend` method

    ```JS
         var MyCustomCommand = kendo.ui.editor.Command.extend({
           exec: function (e) {
              // Custom Logic.
           }
         });
    ```

1. Insert the Command in the Editor widget object instance.

    ```JS
        kendo.ui.editor.MyCustomCommand = MyCustomCommand;
    ```
1. Register the tool by using the built-in `registerTool()` method.

    ```JS
          kendo.ui.editor.EditorUtils.registerTool(
           'MyCustomCommand', new kendo.ui.editor.Tool({
               command: MyCustomCommand, 
               ui:{
                   type:"button",
                   component: "Button",
                   componentOptions: {
                   		 themeColor: "success",
                         click: () => $("#editor").getKendoEditor().exec    ("MyCustomCommand", "test")
                   }
               }
           }));
    ```

1. Use either the `CustomButton()` or `CustomTemplate()` configurations for single or multiple action scenario.

    ```HtmlHelper
       @(Html.Kendo().Editor()
        .Name("editor")
        .HtmlAttributes(new { style = "width: 100%; height:790px" })
        .Tools(tools => tools
          .Clear()
          .CustomButton(button => button
              .Name("ToggleFullScreen")
              .Template(Html.Kendo().Template()
                  .AddComponent(component => component
                      .Button()
                      .Name("toggleFullScreen")
                      .Icon("toggle-full-screen-mode")
                      .Events(events => events.Click("onClick"))
                  )                
              )
          )
        )
      )
    ```
    {% if site.core %}
    ```TagHelper
      <kendo-editor name="editor">
             <tools>
                 <tool name="ToggleFullScreen">
                     <tool-template>
                         <kendo-button name="toggleFullScreen"
                                       icon="toggle-full-screen-mode"
                                       on-click="onClick">
                         </kendo-button>
                     </tool-template>
                 </tool>
             </tools>
      </kendo-editor>
    ```
    {% endif %}

1. Within an event handler in the custom tool, execute the required command by using the [`exec()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/methods/exec) method.

    ```JS
    <script>
        function onClick(e){
        
            $("#editor").getKendoEditor().exec("ToggleFullScreen");
        }
    </script>
    ```

> Note that the tool name should correspond with the registered command.

## Toolbar Overflow

When the [`Toolbar()`](/api/kendo.mvc.ui.fluent/editorresizablesettingsbuilder#toolbarsystemboolean) option of the `Resizable()` configuration is enabled, the Editor will detect changes in the viewport's width and hide the overflowing controls in the tool overflow popup. Also, you can use the `Toolbar()` properties to customize the default overflow behavior and appearance.

The following example demonstrates how to modify the default overflow settings of the toolbar through the `Toolbar()` configuration.


```Razor
    @(Html.Kendo().Editor()
        .Name("editor")
        .Resizable(r=> r.Toolbar(t => t
               .Mode(ToolBarOverflowMode.Scroll)
               .ScrollButtons(ScrollButtonsType.Auto)
               .ScrollButtonsPosition(ScrollButtonsPositionType.Start)
               .ScrollDistance(50))
         )
        ... // Additional configuration.
      )
```
{% if site.core %}
```TagHelper
    <kendo-editor name="editor">
        <resizable>
            <toolbar mode="ToolBarOverflowMode.Scroll" scroll-buttons="ScrollButtonsType.Auto" scroll-buttons-position="ScrollButtonsPositionType.Start" scroll-distance="50" />
        </resizable>
    </kendo-editor>
```
{% endif %} 

For more information on the available overflow options, refer to the [Appearance documentation of the ToolBar component]({% slug toolbar_appearance %}).

## See Also

* [Default Tools by the Editor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/all-tools)
* [Custom Tools by the Editor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/custom-tools)
* [Server-Side API](/api/editor)
