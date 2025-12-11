---
title: Globalization
page_title: Globalization
description: "Learn about the globalization options of the Telerik UI Editor component for {{ site.framework }}."
components: ["editor"]
slug: htmlhelpers_editor_globalization_aspnetcore
position: 16
---

# Globalization

The globalization process combines the translation of component messages (localization) with adapting them to specific cultures (internationalization and right-to-left support).

The globalization functionality of the Editor is enabled through:

1. Adding a reference to the specific culture file:

    ```
        <script src="@Url.Content("~/lib/kendo/js/cultures/kendo.culture.bg-BG.min.js")"></script>
    ```

1. Apply the culture to all Telerik UI components:

    ```
        <script type="text/javascript">
            //set the Kendo UI culture
            kendo.culture("@culture");
        </script> 
    ```

> The `culture()` method has to be called before the declaration of the Telerik UI components

## See Also

* [Globalization in the Editor HtmlHelper for ASP.NET {{site.framework}} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/globalization)
* [Editor Server-Side API](/api/editor)
