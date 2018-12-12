---
title: Bind RGBA Hexadecimal Color Value to ColorPicker
description: An example on how to create a custom MVVM binding to allow the Kendo UI ColorPicker to accept RGBA hexadecimal values.
type: how-to
page_title: Bind RGBA Hexadecimal Color Value to ColorPicker | Kendo UI ColorPicker
slug: bind-rgba-hexadecimal-color-value-to-colorpicker
tags: colorpicker, mvvm, rgba, hexadecimal, color
res_type: kb
component: color-picker
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ColorPicker</td>
 </tr>
</table>

## Description

How can I make a custom MVVM binding to bind a RGBA hexadecimal color value to the Kendo UI ColorPicker widget?

## Solution

Create a custom MVVM binding that converts the hexadecimal color value to RGBA and vice versa.

```dojo
<div id="example">
    <input id="colorpicker"
         type="color"
         data-messages="{ cancel: 'Discard', apply: 'Select' }"
         data-role="colorpicker"
         data-opacity="true"
         class="form-control"
         data-bind="hexColor: color" />
    <div data-bind="text: color"></div>
</div>

<script>
    function hexToRgbA(hex) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');

            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
        }
        throw new Error('Bad Hex');
    }

    function trim(str) {
        return str.replace(/^\s+|\s+$/gm, '');
    }

    function rgbaToHex(rgba) {
        var parts = rgba.substring(rgba.indexOf("(")).split(","),
            r = parseInt(trim(parts[0].substring(1)), 10),
            g = parseInt(trim(parts[1]), 10),
            b = parseInt(trim(parts[2]), 10),
            a = parseFloat(trim(parts[3].substring(0, parts[3].length - 1))).toFixed(2);

        return ('#' + r.toString(16) + g.toString(16) + b.toString(16) + (a * 255).toString(16).substring(0, 2));
    }

    kendo.data.binders.widget.hexColor = kendo.data.Binder.extend({
        init: function(widget, bindings, options) {
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);

            this.widget = widget;
            this._change = $.proxy(this.change, this);
            this.widget.first("change", this._change);
            this._initChange = false;
        },
        refresh: function() {
            if (!this._initChange) {
                var value = this.bindings.hexColor.get();
                var hex = value.substring(0, 6);
                var rgba = hexToRgbA("#" + hex);

            this.widget.value(rgba);
            }
        },
        change: function() {
            var that = this;
            var value = that.widget.value();
            var toHex = rgbaToHex(value);

            that._initChange = true;
            that.bindings["hexColor"].set(toHex);
            that._initChange = false;
        }
    });

    var viewModel = kendo.observable({
        color: "DD5566FF"
    });

    kendo.bind(document.body, viewModel);
  </script>

```
