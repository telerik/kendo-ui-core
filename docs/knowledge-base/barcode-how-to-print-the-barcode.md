---
title: Print the Barcode
page_title: Print the Barcode - Kendo UI Barcode for jQuery
description: Learn how to print a Kendo UI for jQuery Barcode component.
type: how-to
slug: barcode-how-to-print-the-barcode
tags: barcode, print
ticketid: 1136001
res_type: kb
component: barcode
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Barcode for jQuery</td>
 </tr>
</table>


## Description

How can I print the Kendo UI Barcode?

## Solution

Open a new window and place the Barcode DOM elements on the page.

```dojo
    <button class="k-button">Print</button>
    <div id="toPrint">
    <span id="manchego"></span>
    </div>
    <script>
      $(document).ready(function () {
        $("#manchego").kendoBarcode({
          value: "2346722",
          type: "ean8"            
        });
        $('button').click(function(){
          var divToPrint=document.getElementById('toPrint');
          var newWin=window.open('','Print-Window');
          newWin.document.open();
          newWin.document.write('<head> <link href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" rel="stylesheet" /></head>  <body onload="window.print()">'+divToPrint.innerHTML+'</body>');
          newWin.document.close();
        })
      });
    </script>
    <style>
      #manchego svg{
        width: 102mm !important;
        height: 192mm !important;;
      }
      @media print{
        #manchego svg{
          width: 102mm !important;;
          height: 192mm !important;;
        }  
      }           
    </style>
```
