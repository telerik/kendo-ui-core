#gs-adding-directives
The first step is to add the required directives at the top of the `.cshtml` document:

* To use the Telerik UI for {{ site.framework }} HtmlHelpers:

    ```cshtml
    @using Kendo.Mvc.UI
    ```

{% if site.core %}

* To use the Telerik UI for {{ site.framework }} TagHelpers:

    ```cshtml
    @addTagHelper *, Kendo.Mvc
    ```

{% endif %}

#end