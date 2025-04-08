---
title: Create Checkbox Custom Item Templates in the MultiSelect
description: How can I create a {{ site.product }} MultiSelect with checkboxes?
type: how-to
page_title: Create Checkbox Custom Item Templates in the MultiSelect
slug: multiselect-checkbox-items
tags: multiselect, dropdownlist, checkbox , custom, template, item, mvc, core
ticketid: 1662766
res_type: kb
component: MultiSelect
---

## Environment

<table>
	<tr>
  		<td>Product</td>
  		<td>{{ site.product }} MultiSelect</td>
 	</tr>
 	<tr>
		<td>Product Version</td>
		<td>2024.3.806</td>
	</tr>
</table>

## Description

How can I create a {{ site.product }} MultiSelect with checkboxes for each of the constructed items within the items list?

## Solution

1. Use the [`ItemTemplate()`](/api/kendo.mvc.ui.fluent/multiselectbuilder#itemtemplatesystemstring) API configuration to add an input field to each item in the MultiSelect.
2. Subscribe to the [`Change()`](/api/kendo.mvc.ui.fluent/multiselecteventbuilder#changesystemstring) and [`DataBound()`](/api/kendo.mvc.ui.fluent/multiselecteventbuilder#databoundsystemstring) events to manage the functionality for the checkboxes.
3. Include JavaScript code to control the toggle of the [`'checked'`](https://api.jquery.com/prop/) property of the newly created checkboxes.

```HtmlHelper
	@(Html.Kendo().MultiSelect()
		.Name("movies")
		.ItemTemplate("<input class='k-checkbox k-checkbox-md k-rounded-md' type='checkbox' /><span>#: data.Text #</span>")
		.DataTextField("Text")
		.DataValueField("Value")
		.AutoClose(false)
		.DownArrow()
		.Placeholder("Select movie...")
		.Events(e => e.Change("onChange").DataBound("onDataBound"))
		.Value("1")
		.BindTo(new List<SelectListItem>()
		{
			new SelectListItem() {
			Text = "12 Angry Men", Value ="1"
			},
			new SelectListItem() {
			Text = "Il buono, il brutto, il cattivo.", Value ="2"
			},
			new SelectListItem() {
			Text = "Inception", Value ="3"
			},
			new SelectListItem() {
			Text = "One Flew Over the Cuckoo's Nest", Value ="4"
			},
			new SelectListItem() {
			Text = "Pulp Fiction", Value ="5"
			},
			new SelectListItem() {
			Text = "Schindler's List", Value ="6"
			},
			new SelectListItem() {
			Text = "The Dark Knight", Value ="7"
			},
			new SelectListItem() {
			Text = "The Godfather", Value ="8"
			},
			new SelectListItem() {
			Text = "The Godfather: Part II", Value ="9"
			},
			new SelectListItem() {
			Text = "The Shawshank Redemption", Value ="10"
			},
			new SelectListItem() {
			Text = "The Shawshank Redemption 2", Value ="11"
			}
		})
	)
```
 {% if site.core %}
 ```TagHelper
       	@addTagHelper *, Kendo.Mvc
	@{
		var movies = new List<SelectListItem>()
		{
			new SelectListItem() {
			Text = "12 Angry Men", Value ="1"
			},
			new SelectListItem() {
			Text = "Il buono, il brutto, il cattivo.", Value ="2"
			},
			new SelectListItem() {
			Text = "Inception", Value ="3"
			},
			new SelectListItem() {
			Text = "One Flew Over the Cuckoo's Nest", Value ="4"
			},
			new SelectListItem() {
			Text = "Pulp Fiction", Value ="5"
			},
			new SelectListItem() {
			Text = "Schindler's List", Value ="6"
			},
			new SelectListItem() {
			Text = "The Dark Knight", Value ="7"
			},
			new SelectListItem() {
			Text = "The Godfather", Value ="8"
			},
			new SelectListItem() {
			Text = "The Godfather: Part II", Value ="9"
			},
			new SelectListItem() {
			Text = "The Shawshank Redemption", Value ="10"
			},
			new SelectListItem() {
			Text = "The Shawshank Redemption 2", Value ="10"
			}
		};
	}

    <kendo-multiselect name="movies"
        on-data-bound="onDataBound"
        on-change="onChange"
        datatextfield="Text"
        datavaluefield="Value"
		auto-close="false"
        placeholder="Select movie..."
        value='new string[] { "1" }'
        bind-to="movies"
        item-template="<input class='k-checkbox k-checkbox-md k-rounded-md' type='checkbox' /><span>#: data.Text #</span>">
    </kendo-multiselect>
 ```
{% endif %}
```JS script.js
	<script>
		function checkInputs(elements) { // Toggle 'checked' property, based on the selected items.
			elements.each(function() {
				var element = $(this);     
				var input = element.find("input");
				input.prop("checked", element.hasClass("k-selected"));
			});
		};
		function onDataBound(e){ // Triggers the checked action for pre defined selections.
			var items = this.ul.find("li");
			setTimeout(function() {
				checkInputs(items);
			});
		}
		function onChange(e) { // Listens for changes over the component.
			var items = this.ul.find("li");
				checkInputs(items);
		}
	</script>
```
{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Create Checkbox Custom Item Templates in the MultiSelect HtmlHelper](https://netcorerepl.telerik.com/mSPEkobb20oEc5KA55)
* [Create Checkbox Custom Item Templates in the MultiSelect TagHelper](https://netcorerepl.telerik.com/cIluEolb21qNJO5j52)

{% else %}
For a runnable example based on the code above, refer to the [REPL example on Create Checkbox Custom Item Templates in the MultiSelect](https://netcorerepl.telerik.com/mSPEkobb20oEc5KA55).
{% endif %}


## More {{ site.framework }} MultiSelect Resources

* [{{ site.framework }} MultiSelect Item Template](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/multiselect/templates#item-template)

* [{{ site.framework }} MultiSelect Documentation]({%slug htmlhelpers_multiselect_aspnetcore%})

* [{{ site.framework }} MultiSelect Demos](https://demos.telerik.com/{{ site.platform }}/multiselect)

{% if site.core %}
* [{{ site.framework }} MultiSelect Product Page](https://www.telerik.com/aspnet-core-ui/multiselect)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} MultiSelect Product Page](https://www.telerik.com/aspnet-mvc/multiselect)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the MultiSelect for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
* [Server-Side API Reference of the MultiSelect for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/multiselect)
* [Telerik UI for {{ site.framework }} Breaking Changes](https://docs.telerik.com/{{ site.platform }}/backwards-compatibility/overview)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
