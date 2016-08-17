---
title: Save Content Scroll Position
page_title: Save Content Scroll Position | Kendo UI TabStrip
description: "Learn how to save the scroll position of the Kendo UI TabStrip content."
slug: howto_savecontentscrollposition_tabstrip
---

# Save Content Scroll Position

The scroll position of the TabStrip content might be reset when changing the active tab. This depends on the browser behavior. If persisting the scroll position is required, use the [`select`](/api/javascript/ui/tabstrip#events-select) event to save the current scroll position, and the [`activate`](/api/javascript/ui/tabstrip#events-activate) event to restore it.

###### Example

```html
    <div id="tabstrip" style="width:600px">
      <ul>
        <li class="k-state-active">
          One
        </li>
        <li>
          Two
        </li>
      </ul>
      <div style="height:150px">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer felis libero, lobortis ac rutrum quis, varius a velit. Donec lacus erat, cursus sed porta quis, adipiscing et ligula. Duis volutpat, sem pharetra accumsan pharetra, mi ligula cursus felis, ac aliquet leo diam eget risus. Integer facilisis, justo cursus venenatis vehicula, massa nisl tempor sem, in ullamcorper neque mauris in orci.</p>
        <p>Ut orci ligula, varius ac consequat in, rhoncus in dolor. Mauris pulvinar molestie accumsan. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean velit ligula, pharetra quis aliquam sed, scelerisque sed sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam dui mi, vulputate vitae pulvinar ac, condimentum sed eros.</p>
        <p>Aliquam at nisl quis est adipiscing bibendum. Nam malesuada eros facilisis arcu vulputate at aliquam nunc tempor. In commodo scelerisque enim, eget sodales lorem condimentum rutrum. Phasellus sem metus, ultricies at commodo in, tristique non est. Morbi vel mauris eget mauris commodo elementum. Nam eget libero lacus, ut sollicitudin ante. Nam odio quam, suscipit a fringilla eget, dignissim nec arcu. Donec tristique arcu ut sapien elementum pellentesque.</p>
      </div>
      <div style="height:150px">
        <p>Ut orci ligula, varius ac consequat in, rhoncus in dolor. Mauris pulvinar molestie accumsan. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean velit ligula, pharetra quis aliquam sed, scelerisque sed sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam dui mi, vulputate vitae pulvinar ac, condimentum sed eros.</p>
        <p>Aliquam at nisl quis est adipiscing bibendum. Nam malesuada eros facilisis arcu vulputate at aliquam nunc tempor. In commodo scelerisque enim, eget sodales lorem condimentum rutrum. Phasellus sem metus, ultricies at commodo in, tristique non est. Morbi vel mauris eget mauris commodo elementum. Nam eget libero lacus, ut sollicitudin ante. Nam odio quam, suscipit a fringilla eget, dignissim nec arcu. Donec tristique arcu ut sapien elementum pellentesque.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer felis libero, lobortis ac rutrum quis, varius a velit. Donec lacus erat, cursus sed porta quis, adipiscing et ligula. Duis volutpat, sem pharetra accumsan pharetra, mi ligula cursus felis, ac aliquet leo diam eget risus. Integer facilisis, justo cursus venenatis vehicula, massa nisl tempor sem, in ullamcorper neque mauris in orci.</p>
      </div>
    </div>

    <script>
      $(function () {
        $("#tabstrip").kendoTabStrip({
        	select: function(e) {
            var oldContentDiv = e.sender.wrapper.children(".k-content:visible");
            oldContentDiv.data("scrolltop", oldContentDiv.scrollTop());
          },
          activate: function(e) {
            var newContentDiv = $(e.contentElement);
          	newContentDiv.scrollTop(newContentDiv.data("scrolltop"));
          }
        });
      });
    </script>
```

## See Also

Other articles on the Kendo UI TabStrip:

* [TabStrip JavaScript API Reference](/api/javascript/ui/tabstrip)
* [How to Add Close Button to Tabs]({% slug howto_addclosebuttontotabs_tabstrip %})
* [How to Expand to 100% Height and Auto-Resize]({% slug howto_expandto100percentheightautoresize_tabstrip %})
* [How to Initialize the Grid in Kendo UI TabStrip]({% slug initialize_thegrid_tabstrip_widget %})

For more runnable examples on the Kendo UI TabStrip widget, browse its [**How To** documentation folder]({% slug howto_disablecontentscrolling_tabstrip %}).
