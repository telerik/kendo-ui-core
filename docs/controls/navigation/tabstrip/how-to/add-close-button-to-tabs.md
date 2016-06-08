---
title: Add Close Button to Tabs
page_title: Add Close Button to Tabs | Kendo UI TabStrip
description: Learn how to add close buttons in the Kendo UI TabStrip tabs.
slug: howto_addclosebuttontotabs_tabstrip
---

# Add Close Button to Tabs

TabStrip tabs can be removed programmatically via JavaScript. The following example shows how to add buttons inside the tabs that do this.

The milestones of the approach are:

* The buttons must be placed in a `<span>` element, which wraps the whole tab text.
* When adding a new tab with a button programmatically, `encoded` should be set to `false`.
* The [`tabGroup`](/api/javascript/ui/tabstrip#fields-tabGroup) field. and the [`append`](/api/javascript/ui/tabstrip#methods-append) and [`remove`](/api/javascript/ui/tabstrip#methods-remove) TabStrip methods are used.
* A `data-type="remove"` attribute is used to distinguish the tab remove buttons.

###### Example

```html
<style>

  .k-tabstrip-items li .k-button {
    line-height: 1;
    padding: 0;
    vertical-align: top;
    margin-bottom: -2px;
  }

  .k-tabstrip-items li .k-icon {
    margin: 0;
  }

</style>

<div id="tabstrip">
  <ul>
    <li class="k-state-active">Item 1</li>
    <li><span>Item 2 <button data-type="remove" class="k-button k-button-icon"><span class="k-icon k-i-close"></span></button></span></li>
  </ul>
  <div>
    Content 1
    <p><button type="button" class="k-button" id="appendButton">Append Item</button></p>
  </div>
  <div>
    Content 2
  </div>
</div>

<script>
  $(function(){
    // initialize the TabStrip. Server wrappers will generate the below line automatically
    $("#tabstrip").kendoTabStrip();

    // get the widget reference
    var tabstrip = $("#tabstrip").data("kendoTabStrip");

    tabstrip.tabGroup.on("click", "[data-type='remove']", function(e) {
        e.preventDefault();
        e.stopPropagation();

        var item = $(e.target).closest(".k-item");
        tabstrip.remove(item.index());
    });

    var tabCounter = tabstrip.items().length;

    $("#appendButton").click(function(){
      tabstrip.append({
        text: 'Item ' + (++tabCounter) + ' <button data-type="remove" class="k-button k-button-icon"><span class="k-icon k-i-close"></span></button>',
        encoded: false,
        content: "<p>Appended item " + tabCounter + " content</p>"
      });
    });

  });
</script>
```

## See Also

Other articles on Kendo UI TabStrip:

* [TabStrip JavaScript API Reference](/api/javascript/ui/tabstrip)
* [How to Disable TabStrip Content Scrolling]({% slug howto_disablecontentscrolling_tabstrip %})
* [How to Display Buttons at the Bottom]({% slug howto_displaybuttonsatthebottom_tabstrip %})
* [How to Expand to 100% Height and Auto-Resize]({% slug howto_expandto100percentheightautoresize_tabstrip %})
* [How to Initialize the Grid in Kendo UI TabStrip]({% slug initialize_thegrid_tabstrip_widget %})
* [How to Scroll TabStrip with Keyboard]({% slug howto_scrolltabstripwithkeyboard_tabstrip %})
