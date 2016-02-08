---
title: Show Tab Text in Android Skin
page_title: Show Tab Text in Android Skin | Hybrid UI ScrollView
description: "Learn how to show the tab text of the TabStrip in Android skin."
slug: howto_showtabtextandroidskin_hybridtabstrip
---

# Show Tab Text in Android Skin

The example below demonstrates how to show the tab text of a Hybrid UI TabStrip widget in Android skin.

###### Example

```html
  <div data-role="view" data-layout="mobile-tabstrip">
  </div>

  <div data-role="layout" data-id="mobile-tabstrip">
    <div data-role="footer">
      <div data-role="tabstrip">
        <a href="#tabstrip-profile" data-icon="contacts">Profile
        </a><a href="#tabstrip-sales" data-icon="history">Sales
        </a><a href="#tabstrip-rating" data-icon="favorites">Rating
        </a><a href="#tabstrip-settings" data-icon="settings">Settings</a>
      </div>
    </div>
  </div>

  <style scoped>


    .km-android .km-tabstrip a
    {
      color: #a8a8a8;
    }
    .km-android .km-tabstrip .km-text
    {
      text-indent: 0;
      height: 3.7rem;
      margin-top: -2.5rem;
      padding-top: 1.8rem;
      font-size: 1em;
    }
  </style>


  <script>
    var app = new kendo.mobile.Application(document.body, { skin: "android-dark" });
  </script>
```

## See Also

Other articles on the Hybrid UI TabStrip:

* [Hybrid UI TabStrip JavaScript API Reference](/api/javascript/mobile/ui/tabstrip)
* [Overview of the Hybrid UI TabStrip]({% slug overview_hybridtabstrip %})
