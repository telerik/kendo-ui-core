---
title: Printing of Barcode
description: An example on how to print the Barcode
type: how-to
page_title: How to Print the Barcode
slug: barcode-how-to-print-the-barcode
tags: barcode, print
ticketid: 1136001
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Barcode for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Edge</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>Microsoft Edge 40.15063.0.0</td>
 </tr> <tr>
  <td>Made with version</td>
  <td>2017.3.1018</td>
 </tr>
</table>


## Description

I need an example on how to print the Barcode.

## Solution

The Barcode can be printed on another page by opening a new window and placing the Barcode DOM elements on the page.

Please check the following example demonstrating this:

````html
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

          newWin.document.write('<html><head> <link href="http://kendo.cdn.telerik.com/' + kendo.version + '/styles/kendo.common.min.css" rel="stylesheet" /></head>  <body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');

          newWin.document.close();


        })

      });
    </script>
    <style scoped>

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
````
