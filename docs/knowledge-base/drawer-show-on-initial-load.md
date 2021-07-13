---
title: Show Drawer on Initial Load
description: How to Show Drawer on Initial Load
type: how-to
page_title: How to Show Drawer on Initial Load | Kendo UI Drawer for jQuery
slug: drawer-show-on-initial-load
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
			<td>Drawer for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

This sample demonstrates how you can show the Drawer initially.
## Solution

```dojo
  
    <div id="example">
      <div class="demo-section k-content">

        <div id="drawer">
        </div>

      </div>
      <script>
        $(document).ready(function () {
          var drawer = $("#drawer").kendoDrawer({
            template: "<ul> \
<li data-role='drawer-item'><span class='k-item-text'>First Item</span></li> \
<li data-role='drawer-separator'></li> \
<li data-role='drawer-item'><span class='k-item-text'>Second Item</span></li> \
<li data-role='drawer-item' class='k-state-selected'><span class='k-item-text'>Third Item</span></li> \
<li data-role='drawer-separator'></li> \
<li data-role='drawer-item'><span class='k-item-text'>Last Item</span></li> \
        </ul><button id='hide' class='k-button'>Hide</button>",
            position: 'left',
            swipeToOpen: false,
            hide: function(e){
            e.preventDefault();
          }
        }).data().kendoDrawer;

        drawer.show();

        $("#hide").click(function (e) {
          $("#drawer").data().kendoDrawer.hide();
        });
        });
      </script>
      <style>
        .fieldlist {
          margin: 0 0 -1em;
          padding: 0;
        }

        .fieldlist li {
          list-style: none;
          padding-bottom: 1em;
        }

        #overlay-drawer {
          border: 0;
        }

        .k-drawer-content {
          padding: 1em;
        }

        #example .demo-section {
          max-width: 640px;
        }
      </style>
    </div>
      
``` 
