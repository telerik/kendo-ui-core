---
title: Highlight a Search Entry in the Editor Content
description: How can I highlight a search entry in the content of the Telerik UI for {{ site.framework }} Editor?
type: how-to
page_title: Highlight a Search Entry in the Editor Content
slug: editor-highlight-search-entry
tags: editor, highlight, search, entry, grid, window
res_type: kb
component: editor
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2024.1.130</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Editor for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I highlight all occurrences of a search entry into the Editor's content?

This article uses the following use case to demonstrate this functionality&#8212;A [Grid](https://demos.telerik.com/{{ site.platform }}/grid/search-panel) component contains a custom command that opens a [Window](https://demos.telerik.com/{{ site.platform }}/window) with an [Editor](https://demos.telerik.com/{{ site.platform }}/editor) that binds to a specified Grid property. When the user searches through the Grid's data and opens the Window that holds the Editor, all occurrences of the search entry must be highlighted in the Editor.

## Solution

The example below relies on the following key steps:

1. Select the search entry entered in the search panel.
1. Access the Editor's HTML content and split it by empty space to create an array of substrings.
1. Loop through the array and check if any of its elements contains the search entry.
1. Wrap each occurrence in a `span` element with a class `highlight` and store the new content in a string variable.
1. Update the Editor content based on the string variable.
1. Set a background color to the `highlight` class.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
    .Name("NotesAudit")
    .Columns(columns => {
        columns.Bound(e => e.FirstName);
        columns.Bound(e => e.LastName);
        columns.Bound(e => e.Title);
        columns.Command(command => command.Custom("Notes").Click("showDetails")).Title("Notes").Width(70);
    })
    .ToolBar(toolbar =>
    {
        toolbar.Search().Text("Search Notes...");
    })
    .Search(s =>
    {
        s.Field(f => f.Title, "contains");
    })
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("CustomCommand_Read", "Grid"))
    )
    )

    @(Html.Kendo().Window()
    .Name("Notes")
    .Title("Notes")
    .Visible(false)
    .Modal(true)
    .Draggable(true)
    .Content(@<text>
        @(Html.Kendo().Editor()
        .Name("NotesEditor")
        .Encoded(true)
        .HtmlAttributes(new { data_bind = "value: Title", style = "width:100%; height:720px" })
        )
    </text>)
    .Width(1300)
    .Height(900)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="NotesAudit">
        <datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("CustomCommand_Read", "Grid")"/>
            </transport>
        </datasource>
        <columns>
            <column field="FirstName"/>
            <column field="LastName"/>
            <column field="Title"/>
            <column width="70" title="Notes">
                <commands>
                    <column-command text="Notes" click="showDetails"/>
                </commands>
            </column>
        </columns>
        <toolbar>
            <toolbar-button name="search"></toolbar-button> 
        </toolbar>
        <search fields-extended="@(new object[] { new { Name = "Title", Operator = "contains"}})"></search>
    </kendo-grid>

    <kendo-window name="Notes"
        title="Notes"
        visible="false"
        modal="true"
        draggable="true" 
        width="1300"
        height="900">
        <content>
        <kendo-editor name="NotesEditor" encoded="true" data-bind="value: Title" style="width:100%; height:720px">
        </kendo-editor>
        </content>
    </kendo-window>
```
{% endif %}
```Scripts
<script type="text/javascript">
    function showDetails(event) {
        var grid = $("#NotesAudit").getKendoGrid(); // Get a reference to the Grid.
        let dataItem = grid.dataItem($(event.target).closest("tr")); //Get the data item of the respective row.
        var window = $("#Notes").data("kendoWindow"); // Get a reference to the Window.
        var editor = $("#NotesEditor").data("kendoEditor"); // Get a reference to the Editor.
        kendo.bind(editor.element, dataItem); // Bind the Editor to the data item.
        let searchedText = $(".k-searchbox input").val().toLowerCase(); // Access the search panel entry.
        var editorBody = $(editor.body); // Get the Editor's body element.

        window.open().center(); // Open the Window.
        highlight(searchedText, editorBody); // Call the "highlight" function.
    }

    function highlight(text, editorBody) {
        var editorBodyHTML= $(editorBody).html();
        var splittedContent = $(editorBody).html().split(" "); // Convert the Editor's content into an array of substrings.
        var newContent = "";
        for(var i = 0; i < splittedContent.length; i++){ // Loop through the array.
            var index = splittedContent[i].toLowerCase().indexOf(text);
            if(index >= 0) { // Check for an occurrence.
                splittedContent[i] = splittedContent[i].substring(0,index) + "<span class='highlight'>" + splittedContent[i].substring(index,index+text.length) + "</span>" + splittedContent[i].substring(index + text.length); // Wrap each occurrence in a "span" element.
            }
            newContent += (" " + splittedContent[i]);
        }

        $(editorBody).html(newContent); // Update the Editor's content.
        $(editorBody).find('.highlight').css('background-color', 'yellow'); // Highlight the occurrences.
    }
</script>
```
    
{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Editor HtmlHelper](https://netcorerepl.telerik.com/meOHnFvd41L6YZkY45)
* [Sample code with the Editor TagHelper](https://netcorerepl.telerik.com/QIanHFbH44hh6jUB16)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on highlighting the search entry within Editor's content](https://netcorerepl.telerik.com/meOHnFvd41L6YZkY45).
{% endif %}

## More {{ site.framework }} Editor Resources

* [{{ site.framework }} Editor Documentation]({%slug htmlhelpers_editor_aspnetcore%})

* [{{ site.framework }} Editor Demos](https://demos.telerik.com/{{ site.platform }}/editor)

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
* [Server-Side TagHelper API Reference of the Editor for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/editor)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)