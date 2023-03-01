---
title: Razor Page
page_title: Razor Page
description: "An example on how to configure the Telerik UI Toolbar component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_toolbar_aspnetcore_razor_page
---

# Razor Page

This article demonstrates how to add the Telerik UI Toolbar for {{ site.framework }} to a RazorPage.

For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-HtmlHelper(csthml)        
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    @(Html.Kendo().ToolBar()
        .Name("ToolBar")
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("Button");
            items.Add().Type(CommandType.Button).Text("Toggle Button").Togglable(true);
            items.Add().Type(CommandType.SplitButton).Text("Insert").MenuButtons(menuButtons =>
            {
                menuButtons.Add().Text("Insert above").Icon("insert-top");
                menuButtons.Add().Text("Insert between").Icon("insert-middle");
                menuButtons.Add().Text("Insert below").Icon("insert-bottom");
            });
            items.Add().Type(CommandType.Separator);
            items.Add().Template("<label for='dropdown'>Format:</label>");
            items.Add().Template("<input id='dropdown' style='width: 150px;' />").Overflow(ShowInOverflowPopup.Never);
            items.Add().Type(CommandType.Separator);
            items.Add().Type(CommandType.ButtonGroup).Buttons(buttons =>
            {
                buttons.Add().Text("Left").Togglable(true).Group("text-align").Icon("align-left");
                buttons.Add().Text("Center").Togglable(true).Group("text-align").Icon("align-center");
                buttons.Add().Text("Right").Togglable(true).Group("text-align").Icon("align-right");
            });
            items.Add().Type(CommandType.ButtonGroup).Buttons(buttons =>
            {
                buttons.Add().Text("Bold").Togglable(true).Icon("bold");
                buttons.Add().Text("Italic").Togglable(true).Icon("italic");
                buttons.Add().Text("Underline").Togglable(true).Icon("underline");
            });
            items.Add().Type(CommandType.Button).Text("Action").Overflow(ShowInOverflowPopup.Always);
            items.Add().Type(CommandType.Button).Text("Another Action").Overflow(ShowInOverflowPopup.Always);
            items.Add().Type(CommandType.Button).Text("Something else here").Overflow(ShowInOverflowPopup.Always);
        })
    )

    <script>
        $(document).ready(function () {
            $("#dropdown").kendoDropDownList({
                optionLabel: "Paragraph",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "Heading 1", value: 1 },
                    { text: "Heading 2", value: 2 },
                    { text: "Heading 3", value: 3 },
                    { text: "Title", value: 4 },
                    { text: "Subtitle", value: 5 },
                ]
            });
        });
    </script>
	
```
{% if site.core %}
```tab-TagHelper(cshtml)
    @addTagHelper *, Kendo.Mvc
    <kendo-toolbar name="ToolBar">
        <toolbar-items>
            <item text="Button" type="CommandType.Button" sprite-css-class="">
            </item>
            <item text="Toggle Button" togglable="true" type="CommandType.Button">
            </item>
            <item text="Insert" type="CommandType.SplitButton">
                <menu-buttons>
                    <toolbar-button icon="insert-up" text="Insert above" />
                    <toolbar-button icon="insert-middle" text="Insert between" />
                    <toolbar-button icon="insert-down" text="Insert below" />
                </menu-buttons>
            </item>
            <item type="CommandType.Separator">
            </item>
            <item template="<label for='dropdown'>Format:</label>">
            </item>
            <item template="<input id='dropdown' style='width: 150px;' />" overflow="ShowInOverflowPopup.Never">
            </item>
            <item type="CommandType.Separator">
            </item>
            <item type="CommandType.ButtonGroup">
                <buttons>
                    <toolbar-button group="text-align" icon="align-left" togglable="true" text="Left" />
                    <toolbar-button group="text-align" icon="align-center" togglable="true" text="Center" />
                    <toolbar-button group="text-align" icon="align-right" togglable="true" text="Right" />
                </buttons>
            </item>
            <item type="CommandType.ButtonGroup">
                <buttons>
                    <toolbar-button icon="bold" togglable="true" text="Bold" />
                    <toolbar-button icon="italic" togglable="true" text="Italic" />
                    <toolbar-button icon="underline" togglable="true" text="Underline" />
                </buttons>
            </item>
            <item text="Action" type="CommandType.Button" overflow="ShowInOverflowPopup.Always">
            </item>
            <item text="Another Action" type="CommandType.Button" overflow="ShowInOverflowPopup.Always">
            </item>
            <item text="Something else here" type="CommandType.Button" overflow="ShowInOverflowPopup.Always">
            </item>
        </toolbar-items>
    </kendo-toolbar>
    
    <script>
        $(document).ready(function () {
            $("#dropdown").kendoDropDownList({
                optionLabel: "Paragraph",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "Heading 1", value: 1 },
                    { text: "Heading 2", value: 2 },
                    { text: "Heading 3", value: 3 },
                    { text: "Title", value: 4 },
                    { text: "Subtitle", value: 5 },
                ]
            });
        });
    </script>
```
{% endif %}
```tab-PageModel(cshtml.cs)      
	
    public void OnGet()
    {

    }
    
```
