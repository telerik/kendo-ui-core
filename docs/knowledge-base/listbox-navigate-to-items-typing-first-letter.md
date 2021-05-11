---
title: Navigate to Items Typing First Letter
description: How to Navigate to Items Typing Capital Letter
type: how-to
page_title: How to Navigate to Items Using First Letter | Kendo UI ListBox for jQuery
slug: listbox-navigate-to-items-typing-first-letter
position: 
tags: 
ticketid: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>ListBox for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

This sample demonstrates how you can select and scroll to the item corresponding to the typed Key on the keyboard.

## Solution

```dojo
  
    <div id="example" role="application">
      <div class="demo-section k-content wide">
        <select id="listbox"  >
          <option>Andrew Callahan</option>
          <option>bndrew Callahan</option>
          <option>bndrew allahan</option>
          <option>bndrew Calahan</option>
          <option>cndrew Callahan</option>
          <option>cndrew Callhan</option>
          <option>cndrew Calahan</option>
          <option>dichael Suyama</option>
          <option>dichael Leverlin</option>
          <option>Michael Leverling</option>
          <option>Michael Leverlng</option>
          <option>Michael Levering</option>
          <option>Michael Levrling</option>
          <option>Michael Lverling</option>
          <option>Nancy King</option>
          <option>Nancy Davolio</option>
          <option>Nancy Kig</option>
          <option>Nancy avolio</option>
          <option>Nancy Kin</option>
          <option>Nancy Davoli</option>
          <option>Robert Dalio</option>
          <option>Steven White</option>
          <option>tteven White</option>
          <option>wteven White</option>
          <option>xteven White</option>
        </select>
        <select id="listbox2"></select>
      </div>

      <script>
        $(document).ready(function() {
          $("#listbox").kendoListBox({
            selectable: "single",
            connectWith:"listbox2",
            navigatable: true,
            toolbar: {
              tools: ["moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"]
            }
          });

          $("#listbox2").kendoListBox({
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            dataSource: [],
            selectable: "single",
            navigatable: true
          });

          $(document).on("keydown.examples", function (e) {
            var listBox =  $("#listbox").data().kendoListBox;

            if (e.altKey && e.keyCode === 87) {
              listBox.focus();
            }
            else{
              listBox.items().each(function(i,element){
                if($(element).text().toLowerCase().startsWith(e.key))
                {

                  listBox.select($(element)); 
                  $(".k-list-scroller").scrollTop($(element).position().top);
                  return;
                }
              })
            }
          });
        });
      </script>
    </div>
    <style>
      #example .demo-section {
        max-width: none;
        width: 605px;
      }

      #example .k-listbox {
        width: 255px;
        height: 250px;
      }

      #example .k-listbox:first-of-type {
        margin-right: 1px;
      }
    </style>
      
``` 
