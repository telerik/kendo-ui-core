---
title: Show Tab text in Android skin
page_title: Show Tab text in Android skin
description: Example that shows how to show TabStrip's Tab text in Android skin
---

# How to show tab text in Android skin

The example below demonstrates how to show TabStrip's Tab text in Android skin.

#### Example:

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
