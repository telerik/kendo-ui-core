---
title: Change the Background Color of the ProgressBar Based on the Value
description: Set the color of the ProgressBar conditionally
type: how-to
page_title: Modify the Color Dynamically | Kendo UI ProgressBar
slug: progressbar-change-color-depending-value
position: 
tags: progressbar, change, modify, color, values, value
ticketid: 1430605
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.917</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>ProgressBar for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
How can I show different colors in the Kendo UI ProgressBar based on the value?

## Solution
Use the [change](https://docs.telerik.com/kendo-ui/api/javascript/ui/progressbar/events/change) event which fires every time the value changes. After comparing the value, use the [progressWrapper](https://docs.telerik.com/kendo-ui/api/javascript/ui/progressbar/fields/progresswrapper) to set the background and the border color. For example:

```javascript
$("#progressbar").kendoProgressBar({
    change: change
  });
  
  function change(e) {
    switch(true){
    case (e.value<=25):
      this.progressWrapper.css({"background-color": "#e32424", "border-color": "#e32424"});
    }
  }
```

#### Example

```dojo
<div id="progressbar"></div>
<script>
  $("#progressbar").kendoProgressBar({
    change: change
  });
  
  function change(e) {
    switch(true){
      case (e.value<=25):
        this.progressWrapper.css({"background-color": "#e32424", "border-color": "#e32424"});
        break;
          
      case (e.value>25 && e.value<=50):
        this.progressWrapper.css({"background-color": "#e68e1c", "border-color": "#e68e1c"});
        break;
      
      case (e.value>51 && e.value<=75):
        this.progressWrapper.css({"background-color": "#e6dc1c", "border-color": "#e6dc1c"});
        break;
      
      case (e.value>76 && e.value<=100):
        this.progressWrapper.css({"background-color": "#32c728", "border-color": "#32c728"});
        break;
    }
  }
  
  
  $(document).ready(function() {
   var x = 1;
   while(x<=100){
    x+=1;
    $("#progressbar").data("kendoProgressBar").value(x); 
   }
  });  
</script>
```

## See Also
- [change](https://docs.telerik.com/kendo-ui/api/javascript/ui/progressbar/events/change)
- [progressWrapper](https://docs.telerik.com/kendo-ui/api/javascript/ui/progressbar/fields/progresswrapper)
