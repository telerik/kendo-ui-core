---
title: Add Close Button to Tabs
page_title: Add Close Button to Tabs | Kendo UI TabStrip Widget
description: Learn how to add close buttons in the Kendo UI TabStrip tabs.
slug: howto_addclosebuttontotabs_tabstrip
---

# Add Close Button to Tabs

TabStrip tabs can be removed programmatically via JavaScript. The following example shows how to add buttons inside the tabs that do this.

The milestones of the approach are:

* The buttons must be placed in a `<span>` element, which wraps the whole tab text.
* When adding a new tab with a button programmatically, `encoded` should be set to `false`.
* The [`tabGroup`](/api/javascript/ui/tabstrip#fields-tabGroup) field. and the [`append`](/api/javascript/ui/tabstrip#methods-append) and [`remove`](/api/javascript/ui/tabstrip#methods-remove) TabStrip methods are used.

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
    <li><span>Item 2 <button class="k-button k-button-icon"><span class="k-icon k-i-close"></span></button></span></li>
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
    var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");

    function attachRemoveHandlers() {
      tabstrip.tabGroup.children().each(function() {
        var element = $(this);
        element.find(".k-button").off().click(function(e){
          e.preventDefault();
          e.stopPropagation();
          tabstrip.remove(element.index());
        });
      });          
    }

    attachRemoveHandlers();

    var tabCounter = tabstrip.items().length;

    $("#appendButton").click(function(){
      tabstrip.append({
        text: 'Item ' + (++tabCounter) + ' <button class="k-button k-button-icon"><span class="k-icon k-i-close"></span></button>',
        encoded: false,
        content: "Appended Item Content"
      });
      attachRemoveHandlers();
    });

  });
</script>
```

## See Also

Other articles on Kendo UI TabStrip:

* [TabStrip JavaScript API Reference](/api/javascript/ui/tabstrip)
* [How to Display Buttons at the Bottom]({% slug howto_displaybuttonsatthebottom_tabstrip %})
* [How to Expand to 100% Height and Auto-Resize]({% slug howto_expandto100percentheightautoresize_tabstrip %})
* [How to Initialize the Grid in Kendo UI TabStrip]({% slug initialize_thegrid_tabstrip_widget %})
* [How to Scroll TabStrip with Keyboard]({% slug howto_scrolltabstripwithkeyboard_tabstrip %})
