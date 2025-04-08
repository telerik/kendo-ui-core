---
title: Selecting MultiSelect Items When Holding Shift Button
description: How can I select one item in the MultiSelect and then, if the shift button is held down, select another item and all items between them?
type: how-to
page_title: Selecting MultiSelect Items When Holding Shift Button
slug: multiselect-select-multiple-items-shift-is-down
tags: multiselect, select, many, items, when, shift, key, button, hold
res_type: kb
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Progress® Telerik® UI MultiSelect for {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I select one item in the MultiSelect and then, if the shift button is held down, select another item and all items between them?

## Solution

* Set the [AutoClose(false)](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/configuration/autoclose) configuration.

* Set a handler for the [Select](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/events/select) event

```Razor
.Events(ev=>ev.Select("onSelect"))
```

* Initialize a variable, the value of which will indicate that the shift button is down.

```JS
var isShiftDown = false;
window.onmousemove = function (e) {
    if (e.shiftKey) {
        isShiftDown = true;
    }
    else {
        isShiftDown = false;
    }
}
```

* Initialize two variables that hold as value the indexes of the selected elements. After the first select get the index of the first element. If the shift button is held down get the offset-index for the second element.

* Iterate through all the elements between those indexes and push their values into an array. 

* Check if the first index is smaller than the second one, if not change their values.

```JS
  if (firstIndex > secondIndex) { 
        var temp = firstIndex;
        firstIndex = secondIndex
        secondIndex = temp;
        // check which index is bigger (first should be smaller)
    }
```

* Use the [value()](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/methods/value) method to set the new value of the MultiSelect as you pass the temporary array as a parameter.

Example:

```View
@(Html.Kendo().MultiSelect()
          .Name("multiselect2")
          .Placeholder("Select attendees...")
          .BindTo(new List<string>() {
                    "Andrew Suyama",
                    "Nige Buchanan",
                    "Laura Fuller",
                    "Laura Fuller2",
                    "Laura Fuller3"
            })
          .Events(ev=>ev.Select("onSelect"))
          .AutoClose(false)
          .Value(new string[] { "Anne King", "Andrew Fuller" }
          )
        )
```
```JS script.js
    var isShiftDown = false;
    window.onmousemove = function (e) {
        if (e.shiftKey) {
            isShiftDown = true;
        }
        else {
            isShiftDown = false;
        }
    }

    var firstIndex = null; //variables to store the indexes
    var secondIndex = null;
    function onSelect(e) {

        var firstItem = e.item
        if (firstIndex == null) {
            firstIndex = firstItem.data('offset-index');  //get first option index
        }

        if (isShiftDown) {
            e.preventDefault()
            var secondItem = e.item;
            secondIndex = secondItem.data('offset-index'); //get second option index

            if (firstIndex > secondIndex) { // check which index is bigger (first should be smaller)
                var temp = firstIndex;
                firstIndex = secondIndex
                secondIndex = temp;
            }

            if (secondIndex != null && firstIndex != null) {

                var tempArray = [];

                for (let i = firstIndex; i <= secondIndex; i++) {
                    var currElement = $('#multiselect2_listbox').find('li' + `[data-offset-index=${i}]`)[0];
                    tempArray.push(currElement.textContent)
                } // iterate the elements and push their text in array

                e.sender.value(tempArray) // set the choices
                e.sender.close() // close the dropdown
                firstIndex = null;
                secondIndex = null;
            }
        }
    }
```

## More {{ site.framework }} MultiSelect Resources

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
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
