---
title: Use Subscript Indicators
description: An example on how to use subscript indicators in the Kendo UI ComboBox.
type: how-to
page_title: Use Subscript Indicators | Kendo UI ComboBox for jQuery
slug: combobox-use-subscript-indicators
tags: subscript, indicators, combobox
res_type: kb
component: combobox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ComboBox</td>
 </tr>
</table>


## Description

How can I use subscript indicators in the ComboBox widget?

## Solution

1. Provide a new jQuery instance method by extending the jQuery prototype (`$.fn`) object.
1. Check for `<sup>` tags in the input string, parse the group content, and replace it with the corresponding subscript character.
1. Transform the input in the `change` event of the ComboBox.

```dojo
<div id="example">
    <input id="combobox" />
</div>

<script>
    $(document).ready(function() {
        $("#combobox").kendoComboBox({
            dataTextField: "name",
            dataValueField: "id",
            template:"#= name#",
            dataSource: [
                { id: 1, name: "TEST<sup>3</sup>" },
                { id: 1, name: "TEST<sup>™</sup>" }
            ],
            change: function(e) {
                this.input.superScript();
            }
        });
    })

    $.fn.superScript = function() {
        var chars = '+−=()0123456789®™',
            sup   = '⁺⁻⁼⁽⁾⁰¹²³⁴⁵⁶⁷⁸⁹®™';

        return this.each(function() {
            this.value = this.value.replace(/<sup[^>]*>(.*?)<\/sup>/g, function(x) {
                var str = '',
                    txt = $.trim($(x).unwrap().text());

                for (var i=0; i<txt.length; i++) {
                    var n = chars.indexOf(txt[i]);
                    str += (n!=-1 ? sup[n] : txt[i]);
                }

                return str;
            });
        });
    }
  </script>
```

## See Also

* [API Reference of the ComboBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
