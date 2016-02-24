---
title: Encodings
page_title: Encodings | Kendo UI Barcode
description: "Learn more about the character set and length, and check the digits of the Barcode symbologies when configuring the Kendo UI Barcode widget."
slug: encodings_kendoui_barcode_widget
position: 2
---

# Encodings

The mapping between messages and barcodes is called symbology (encoding). The symbology specification includes the encoding of the individual digits/characters of the message, the start and stop markers into bars and space, the size of the quiet zone required to be before and after the barcode, as well as the computation of a checksum.

## Supported Symbologies

The [Kendo UI Barcode widget](http://demos.telerik.com/kendo-ui/barcode/index) supports the symbologies and their specifications as listed in the table below.

<style scoped>
    .stripes
    {
        border: 1px solid #E15613;
        border-collapse: collapse;
    }
    .stripes th
    {
        background: #E15613;
        color: #fff;
    }
    .stripes tr:nth-child(2n+1) td
    {
        background: #fed;
    }
    .stripes td:nth-child(n+2)
    {
        text-align: center;
    }
    .stripes th,
    .stripes td
    {
        padding: 3px 5px;
    }
</style>

> **Important**
>
> If the value for a particular encoding you provide does not meet the expected length or character set, it is going to throw an error.

<table class="stripes" style="margin-top: 1.2em;">
   <tbody>
        <tr>
            <th>Symbology</th>
            <th>Character set</th>
            <th>Length</th>
            <th>Check digits</th>
        </tr>
        <tr>
           <td><a href="https://en.wikipedia.org/wiki/Code_128">Code 39 (default)</a></td>
           <td>[A-Z]; [0-9]; [ - . $ / + % ]</td>
           <td>variable (avg. up to 20 chars)</td>
           <td>optional (Mod. 43)</td>
        </tr>
        <tr>
           <td><a href="http://en.wikipedia.org/wiki/Code_39#Full_ASCII_Code_39">Code39Extended</a></td>
           <td>ASCII (128 characters)</td>
           <td>variable</td>
           <td>optional (Mod. 43)</td>
        </tr>
        <tr>
           <td><a href="http://www.barcodeisland.com/code93.phtml">Code 93</a></td>
           <td>[0-9];[A-Z];[SPACE . + - / % $]</td>
           <td>variable</td>
           <td>2 check digits</td>
        </tr>
        <tr>
           <td><a href="http://en.wikipedia.org/wiki/Code_93">Code93Extended</a></td>
           <td>ASCII(128 characters)</td>
           <td>variable</td>
           <td>2 check digits</td>
        </tr>
        <tr>
           <td><a href="http://en.wikipedia.org/wiki/International_Article_Number_(EAN)">EAN-13</a></td>
           <td>numeric [0..9]</td>
           <td>12 usable digits</td>
           <td>1 check digit</td>
        </tr>
        <tr>
           <td><a href="http://en.wikipedia.org/wiki/EAN-8">EAN-8</a></td>
           <td>numeric [0..9]</td>
           <td>7 usable digits</td>
           <td>1 check digit</td>
        </tr>
        <tr>
           <td><a href="http://en.wikipedia.org/wiki/Universal_Product_Code">UPC-A</a></td>
           <td>numeric [0..9]</td>
           <td>11 usable digits (first is always 0)</td>
           <td>1 check digit</td>
        </tr>
        <tr>
           <td><a href="http://en.wikipedia.org/wiki/Universal_Product_Code">UPC-E</a></td>
           <td>numeric [0..9]</td>
           <td>6 usable digits (first is always 0)</td>
           <td>1 check digit</td>
        </tr>
        <tr>
           <td><a href="http://en.wikipedia.org/wiki/POSTNET">POSTNET</a></td>
           <td>numeric [0..9]</td>
           <td>variable</td>
           <td>1 check digit</td>
        </tr>
        <tr>
           <td><a href="http://www.barcodeisland.com/code11.phtml">Code 11</a></td>
           <td>[0-9]; [-]</td>
           <td>variable</td>
           <td>1 or 2 based on length</td>
        </tr>
        <tr>
           <td><a href="https://en.wikipedia.org/wiki/Code_128">Code128</a></td>
           <td>LATIN-1 (<a href="http://en.wikipedia.org/wiki/ISO/IEC_8859-1">ISO-8859-1</a>)</td>
           <td>variable</td>
           <td>1 check digit</td>
        </tr>
        <tr>
           <td><a href="https://en.wikipedia.org/wiki/Code_128">Code128A</a></td>
           <td>ASCII 00 to 95 (0-9, A-Z and control codes), special characters</td>
           <td>variable</td>
           <td>1 check digit</td>
        </tr>
        <tr>
           <td><a href="https://en.wikipedia.org/wiki/Code_128">Code128B</a></td>
           <td>ASCII 32 to 127 (0-9, A-Z, a-z), special characters</td>
           <td>variable</td>
           <td>1 check digit</td>
        </tr>
        <tr>
           <td><a href="https://en.wikipedia.org/wiki/Code_128">Code128C</a></td>
           <td>ASCII 00-99 (encodes each two digits with one code)</td>
           <td>variable</td>
           <td>1 check digit</td>
        </tr>
        <tr>
           <td><a href="http://en.wikipedia.org/wiki/GS1-128">GS1-128</a></td>
           <td>depending on Application Identifier</td>
           <td>variable</td>
           <td>1 check digit</td>
        </tr>
        <tr>
           <td><a href="http://en.wikipedia.org/wiki/MSI_Barcode">MSImod10</a></td>
           <td>numeric [0..9]</td>
           <td>variable</td>
           <td>1 check digit</td>
        </tr>
        <tr>
           <td><a href="http://en.wikipedia.org/wiki/MSI_Barcode">MSImod11</a></td>
           <td>numeric [0..9]</td>
           <td>variable</td>
           <td>1 check digit</td>
        </tr>
        <tr>
           <td><a href="http://en.wikipedia.org/wiki/MSI_Barcode">MSImod1010</a></td>
           <td>numeric [0..9]</td>
           <td>variable</td>
           <td>1 check digit</td>
        </tr>
        <tr>
           <td><a href="http://en.wikipedia.org/wiki/MSI_Barcode">MSImod1110</a></td>
           <td>numeric [0..9]</td>
           <td>variable</td>
           <td>1 check digit</td>
        </tr>
    </tbody>
</table>

## See Also

Other articles on Kendo UI Barcode:

* [Overview of the Barcode Widget]({% slug overview_kendoui_barcode_widget %})
* [Barcode JavaScript API Reference](/api/javascript/dataviz/ui/barcode)
