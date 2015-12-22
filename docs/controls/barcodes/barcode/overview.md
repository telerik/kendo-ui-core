---
title: Overview
page_title: Documentation Guide for Kendo UI Barcode widget
description: How to create and set a Barcode widget in Kendo UI DataViz.
position: 1
---

# Barcode Overview

The Barcode widget is used to represent data in a machine-readable format.
All graphics are rendered on the client using SVG with a fallback to VML for legacy browsers.


## Basic setup

### 1\. Create a simple HTML div (optionally set a height and width with CSS)

    <div id="barcode"></div>

### 2\. Initialize the Kendo UI Barcode with default configuration. Default Encoding is "code39".

    $(document).ready(function() {
        $("#barcode").kendoBarcode({
            value:"FOO"
        });
    });

### 3\. Specifying the type

The most important setting when configuring the Barcode widget after specifying the value is to choose the encoding type (symbology).

    $(document).ready(function() {
        $("#barcode").kendoBarcode({
            value:"1234567",
            type:"ean8"
        });
    });

Refer to the [encodings](dataviz/barcode/overview) section to choose the right encoding.

### 4\. Fine tune the color, background, padding margin of the text and more.

Refer to the complete [API reference](/api/dataviz/barcode) for examples and complete list of settings that the Barcode provides.
