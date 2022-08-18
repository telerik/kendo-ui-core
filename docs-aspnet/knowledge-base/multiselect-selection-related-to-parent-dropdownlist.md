---
title: MultiSelect selection in a window, related to a DropDownList item.
description: How can I relate a MultiSelect selection from a window to an item from a DropDownList?
type: how-to
page_title: MultiSelect selection in a window, related to a DropDownList item
slug: multiselect-selection-related-to-parent-dropdownlist
tags: multiselect, dropdownlist, window, selection, relation
res_type: kb
component: dropdownlist
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2022.2.621</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>DropDownList for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I implement a DropDownList where every item is related to a MultiSelect array of items? The selection of the MultiSelect values per a DropDownList item should happen in a Window.

## Solution

* Let's say we have an implementation of a Telerik UI DropDownList(DDL) for a Preference string and a Telerik UI MultiSelect for string array of Projects. They are placed in the Main View along with a custom button for opening a Telerik UI Window. In the Window we have another DDL and MultiSelect:

```
@(Html.Kendo().DropDownList()
          .Name("preference")
          .BindTo(new List<string>() {
              "Preference 1",
              "Preference 2",
              "Preference 3",
              "Preference 4",
              "Preference 5"
          })
          .Events(e => e.Change("onParentPreferenceChange"))
        )

<br />
<br />

@(Html.Kendo().MultiSelect()
          .Name("projects")
          .AutoClose(false)
          .Placeholder("Select projects...")
          .BindTo(new List<string>() {
              "Project 1",
              "Project 2",
              "Project 3",
              "Project 4",
              "Project 5",
              "Project 6",
              "Project 7",
              "Project 8",
              "Project 9",
              "Project 10"
          })
          .Enable(false)
        )

<br />
<br />

<span id="undo" style="display:none" class="k-button hide-on-narrow">Click here to open the window.</span>

<br />
<br />

@(Html.Kendo().Window()
    .Name("window")
    .Title("Select Project and preferences")
    .Content(@<text>
          @(Html.Kendo().DropDownList()
          .Name("preferenceInWindow")
          .BindTo(new List<string>() {
              "Preference 1",
              "Preference 2",
              "Preference 3",
              "Preference 4",
              "Preference 5"
          })
          .Events(e => e.Change("onPreferenceWindowChange"))
        )
          <br />
          <br />

          @(Html.Kendo().MultiSelect()
                    .Name("projectsInWindow")
                    .AutoClose(false)
                    .Placeholder("Select projects...")
                    .BindTo(new List<string>() {
                        "Project 1",
                        "Project 2",
                        "Project 3",
                        "Project 4",
                        "Project 5",
                        "Project 6",
                        "Project 7",
                        "Project 8",
                        "Project 9",
                        "Project 10"
                    })
                    .Events(e => e.Change("onMultiInWindowChange"))
                  )

    </text>)
    .Draggable()
    .Resizable()
    .Width(600)
    .Modal(true)
    .Actions(actions => actions.Close())
    .Events(e => e.Close("onClose"))
)
```

* In the global scope of the JavaScript, implement variables for the arrays of Projects selections per Preference. 
* Implement a function(named "populateMulti") for populating the values of the current MultiSelect(Projects) which stands for the DDL(Preference) value.
* Use the [`Change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/events/change) Event of the MultiSelect(Projects) in the Window.
* In the Event handler("onMultiInWindowChange"), get the current selection of the MultiSelect(Projects selected in the Window) and aasing them to the proper array variable in the global scope depending on the value of the DDL(Preference) selected in the Window. 
* Use the [`Change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/events/change) Event of the Preference DDL in the Window.
* In the Event handler("onPreferenceWindowChange"), get the current selection of the DDL and the instance of the MultiSelect in the Window. Call the "populateMulti" function by using the pointed values as parameters.
* Use the [`Change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/events/change) Event of the Preference DDL of the Main View.
* In the Event handler("onPreferenceWindowChange"), get the current selection of the DDL and the instance of the MultiSelect of the Main View. Call the "populateMulti" function by using the pointed values as parameters.
* Use the [`Close`](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/events/close) Event of the Window.
* In the Event handler, show the custom button by using the [`show`](https://api.jquery.com/show/) method. Get the current selection of the DDL and the instance of the MultiSelect of the Main View. Call the "populateMulti" function by using the pointed values as parameters.
* In the [`document.ready`](https://learn.jquery.com/using-jquery-core/document-ready/) scope, [`hide`](https://api.jquery.com/hide/) the button and [`open`](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/methods/open) the Window.
* Here is an example of the JavaScript needed:

```
    var preference1 = [];
    var preference2 = [];
    var preference3 = [];
    var preference4 = [];
    var preference5 = [];


    function onClose() {
        $("#undo").show();

        var preferenceValue = $("#preference").data("kendoDropDownList").value();
        var multi = $("#projects").data("kendoMultiSelect");

        populateMulti(preferenceValue, multi);
    }

    function onParentPreferenceChange() {
        var preferenceValue = $("#preference").data("kendoDropDownList").value();
        var multi = $("#projects").data("kendoMultiSelect");

        populateMulti(preferenceValue, multi);
    }

    function onPreferenceWindowChange() {
        var preferenceInWindow = $("#preferenceInWindow").data("kendoDropDownList").value();
        var multi = $("#projectsInWindow").data("kendoMultiSelect");

        populateMulti(preferenceInWindow, multi);
    }

    function populateMulti(preferenceValue, multi) {

        switch (preferenceValue) {
            case 'Preference 1':
                multi.value(preference1);
                break;
            case 'Preference 2':
                multi.value(preference2);
                break;
            case 'Preference 3':
                multi.value(preference3);
                break;
            case 'Preference 4':
                multi.value(preference4);
                break;
            case 'Preference 5':
                multi.value(preference5);
                break;
        }
    }

    $(document).ready( function() {
        $("#undo").bind("click", function() {
                $("#window").data("kendoWindow").open();
                $("#undo").hide();
            });
    });

    function onMultiInWindowChange() {
        var multiValue = this.value();
        var preferenceValue = $("#preferenceInWindow").data("kendoDropDownList").value();

        switch (preferenceValue) {
            case 'Preference 1':
                preference1 = multiValue;
                break;
            case 'Preference 2':
                preference2 = multiValue;
                break;
            case 'Preference 3':
                preference3 = multiValue;
                break;
            case 'Preference 4':
                preference4 = multiValue;
                break;
            case 'Preference 5':
                preference5 = multiValue;
                break;
        }
    }
```

Here is a REPL example of the implementation above: [Example](https://netcorerepl.telerik.com/QwksPSlS24dfJjqy29)

## See Also
* [Demo of the Telerik UI for ASP.NET MVC DropDownList](https://demos.telerik.com/aspnet-mvc/dropdownlist)
* [Demo of the Telerik UI for ASP.NET MVC MultiSelect](https://demos.telerik.com/aspnet-mvc/multiselect)
* [Demo of the Telerik UI for ASP.NET MVC Window](https://demos.telerik.com/aspnet-mvc/window)