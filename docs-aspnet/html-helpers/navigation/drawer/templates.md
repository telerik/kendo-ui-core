---
title: Templates
page_title: Templates
description: "Use the available templates of the Telerik UI Drawer component for {{ site.framework }}."
components: ["drawer"]
previous_url: /helpers/navigation/drawer/templates
slug: templates_drawer_aspnetcore
position: 4
---

# Templates

The Drawer component provides [items configuration]({% slug htmlhelpers_drawer_items_aspnetcore %}) to define Drawer items declaratively. For full control over the item markup the Drawer component  exposes the template configuration options described in this article. A configured `Template()` or `TemplateId()` takes precedence over `Items()`.

To distinguish the items within the template when the user interacts with the Drawer, add the `data-role="drawer-item"` attribute to each item HTML template.

To add a separator between the Drawer items, use the `data-role="drawer-separator"` attribute.

The Drawer provides the following configurable templates:
* The main `Template()` method.
* The `Mini(m=>m.Template("<div>Mini Template</div>"))` template.

## Render Razor Content

Use the Razor delegate overload of `Content()` when the Drawer page content contains Razor markup. The content is rendered in the associated page area, not in the Drawer item template.

```HtmlHelper
@(Html.Kendo().Drawer()
    .Name("drawer")
    .Template("<ul><li data-role='drawer-item'>Inbox</li></ul>")
    .Content(@<text>
        <main>
            <h2>Inbox</h2>
            <p>Your messages appear here.</p>
        </main>
    </text>)
)
```

{% if site.core %}
With the TagHelper, place the page markup inside the `<content>` element. Use the `template-id` attribute to reference the Drawer item template.

```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-drawer name="drawer" template-id="drawerTemplate">
    <content>
        <main>
            <h2>Inbox</h2>
            <p>Your messages appear here.</p>
        </main>
    </content>
</kendo-drawer>

<script id="drawerTemplate" type="text/x-kendo-template">
    <ul>
        <li data-role="drawer-item">Inbox</li>
    </ul>
</script>
```
{% endif %}

You can add icons with a span with the `k-icon` class combined with the desired [Kendo UI for jQuery web font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web#list-of-font-icons) class. To ensure that the icons and text have a sufficient padding, wrap the item template text in a span with class `k-item-text`.

    @"<ul>
        <li data-role='drawer-item'>
          <span class='k-icon k-i-eye'></span>
          <span class='k-item-text'>See More</span>
        </li>
    </ul>"

  {% if site.core %}
  ## Navigating to Another Page

  To navigate with a regular link, keep the `data-role="drawer-item"` attribute on the `<li>` and place the anchor inside the item. Set `auto-collapse` to `false` so the Drawer does not prevent the browser from following the link.

  ```TagHelper
  <kendo-drawer name="appNav"
          mode="overlay"
          position="left"
          template-id="appNavTemplate"
          auto-collapse="false">
    <content>
    </content>
  </kendo-drawer>

  <script id="appNavTemplate" type="text/x-kendo-template">
    <ul>
      <li data-role="drawer-item">
        <a class="k-link" href="@webApiCredentialsUrl">
          <span class="k-item-text">Web API Credentials</span>
        </a>
      </li>
    </ul>
  </script>
  ```

  The browser performs the navigation through the `href` attribute, and the Drawer applies its selection state to the `<li>`. After the page loads, render the item for the current route with the `k-selected` class to preserve the selected state across pages.
  {% endif %}

## See Also

* [Server-Side API](/api/drawer)
