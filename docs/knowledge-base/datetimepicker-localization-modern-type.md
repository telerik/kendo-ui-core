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

This sample demonstrates how to implement Globalization and Localization for Kendo DateTimePicker in Modern ContentType.

## Solution

The first step is to include the culture resource script for the given language:
https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker/configuration/culture

More info you can find here:
https://docs.telerik.com/kendo-ui/framework/globalization/overview

Setting the culture will localize values like Month names, Day names, Date formatting, etc. For the rest of the values like Today, Cancel, Now, you may use one of the Localization options below:

### Option 1 (Recommended)

Use kendo-messages. These resource files are community-driven and we appreciate our users contributing to them:
https://github.com/telerik/kendo-ui-core/tree/master/src/messages

More info you can find here:
https://docs.telerik.com/kendo-ui/globalization/localization

Here is a full sample:

```dojo 
    <script src="https://kendo.cdn.telerik.com/2020.3.1021/js/cultures/kendo.culture.bg-BG.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2020.3.1021/js/messages/kendo.messages.bg-BG.min.js"></script>

    <p>Modern Picker with Bulgarian Localization</p>

    <input id="datetimepicker" />

    <script>
      kendo.culture("bg-BG");

      var picker = $("#datetimepicker").kendoDateTimePicker({
        componentType: "modern",
      }).data().kendoDateTimePicker;
    </script>
``` 

### Option 2

This is a custom approach by modifying the values directly in the DOM elements using JavaScript:

```dojo 
    <script src="https://kendo.cdn.telerik.com/2020.3.1021/js/cultures/kendo.culture.nl-NL.min.js">     </script>

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
