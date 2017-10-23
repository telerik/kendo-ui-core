---
title: Show spinning icon in Button
description: An example on how to add spinning icon to the Kendo UI Button.
type: how-to
page_title: Show Spinning Icon | Kendo UI Button
slug: show-spinning-icon-in-button
tags: icon, spinning, button
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Button</td>
 </tr>
</table>

## Description

How can I sort add spinning icon to the Kendo UI Button?

## Solution

* Use `icon` option of the Button to define a name of an existing icon in the Kendo UI theme sprite. This will apply the icon as a background image of a `span` element inside the Button.

* Define a spinnning keyframe and apply the animation on the .k-icon class.

```html
<div id="example">
    <div class="demo-section k-content">
        <button id="primaryTextButton" class="k-primary">Primary Button</button>
    </div>
</div>

<style>
    @-moz-keyframes spin {
        from { -moz-transform: rotate(0deg); }
        to { -moz-transform: rotate(360deg); }
    }
    @-webkit-keyframes spin {
        from { -webkit-transform: rotate(0deg); }
        to { -webkit-transform: rotate(360deg); }
    }
    @keyframes spin {
        from {transform:rotate(0deg);}
        to {transform:rotate(360deg);}
    }

    .k-icon {
        -webkit-animation: spin 2s infinite linear;
        animation: spin 2s infinite linear;
    }
</style>

<script>
    $(document).ready(function() {
        $("#primaryTextButton").kendoButton({
        icon: "refresh"
        });
    });
</script>

```
