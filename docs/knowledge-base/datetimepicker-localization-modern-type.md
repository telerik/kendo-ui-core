---
title: DateTimePicker Localization in Modern Content Type
description: How to Implement DateTimePicker Localization in Modern Mode
type: how-to
page_title: How to Implement DateTimePicker Localization in Modern Mode | Kendo UI DateTimePicker for jQuery
slug: datetimepicker-localization-modern-type
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
			<td>DateTimePicker for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

This sample demonstrates how to implement Dutch Culture and Localization for Kendo DateTimePicker in Modern ContentType.

## Solution

```dojo
  
    <p>Modern Picker with Dutch Localization</p>
    
    <input id="datetimepicker" />
    
    <script>
      kendo.culture("nl-NL");

      var picker = $("#datetimepicker").kendoDateTimePicker({
        componentType: "modern",
        culture: "nl-NL",
      }).data().kendoDateTimePicker;

      var localization = {};
      localization["Date"]= "Datum";
      localization["Time"]= "Tijd";
      localization["Today"]= "Vandaag";
      localization["Cancel"]= "Annuleren";
      localization["Set"]= "Bewaren";
      localization["Now"]= "Nu";
      localization["hour"]= "uur";
      localization["minute"]= "minuut";

      $(".k-datetimepicker .k-select").on("click",function(e){
        setTimeout(function(){
          for(var key in localization){
            picker.popup.element.find("button, a, .k-title").each(function(i,e){
              var element = $(e);

              if(element.text().trim() == key)
              {
                element.text(localization[key]);
              }
            });
          };
        });
      });
    </script>
``` 
