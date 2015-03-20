---
title: Expand background of long list items
page_title: Expand background of long list items
description: Example that shows how to expand background of long list items of Kendo UI ComboBox
---

# How to expand the background of long list items

The example below is applicable to the **AutoComplete**, **DropDownList** and **MultiSelect** widgets as well.

Normally, long items in the widget dropdown wrap to multiple lines. However, if the list item content is non-wrappable (e.g. a very long word or string with no spaces),
a horizontal scrollbar will apppear. In this situation, the hover and selected state's background will not expand beyond the 100% width of the dropdown, due to the way
HTML elements expand in general. There are two ways to overcome this phenomenon.

#### Example:

```html
<div id="example" role="application">
    <style>
        /* the first part of the ID matches the ID of the widget */
        #combo1-list .k-item
        {
            display: inline-block;
            min-width: 100%;
        }
    </style>

    <p>Expand backgrounds (widths) of long items only, via CSS:
        <select id="combo1">
            <option>foo</option>
            <option>bar</option>
            <option>baz baz baz baz baz baz bazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz</option>
        </select>
    </p>

    <p>Expand backgrounds (widths) of all items, via Javascript:
        <select id="combo2">
            <option>foo</option>
            <option>bar</option>
            <option>baz baz baz baz baz baz bazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz</option>
        </select>
    </p>
          
    <script>
        $(document).ready(function() {
          $("#combo1").kendoComboBox();
          
          $("#combo2").kendoComboBox({
            open: function(e){
              setTimeout(function(){
                var list = e.sender.list.children("ul");
                var w = list[0].scrollWidth;
                list.children().width(w);
              });
            }
          });
        });
    </script>
</div>
```
