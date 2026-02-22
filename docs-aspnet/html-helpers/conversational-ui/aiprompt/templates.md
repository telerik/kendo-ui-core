---
title: Templates
page_title: Templates
description: "Use templates and customize the appearance of the prompt suggestion and view items of the Telerik UI AIPrompt component for {{ site.framework }}."
components: ["aiprompt"]
slug: htmlhelpers_templates_aiprompt
position: 4
---

# Templates

The AIPrompt allows you to control the appearance of the prompt suggestion and view items by using template options.

For more information on the capabilities and syntax of the templates, see the [Using Client Templates]({% slug client_templates_overview %}) article. For a runnable example, refer to the [demo on customizing the templates in the AIPrompt](https://demos.telerik.com/{{ site.platform }}/aiprompt/templates).

## Prompt Suggestion Items Template

The list of prompt suggestions is displayed in the `Prompt` view. You can customize the appearance of the suggestion items through different template methods like `PromptSuggestionItemTemplate()`, `PromptSuggestionItemTemplateHandler()`, and `PromptSuggestionItemTemplateId()`.

The following example demonstrates how to use the `PromptSuggestionItemTemplateHandler()` option to style each prompt suggestion item based on its content.

```HtmlHelper
    @(Html.Kendo().AIPrompt()
        .Name("aiprompt")
        .PromptSuggestionItemTemplateHandler("promptSuggestionTemplate")
        .Views(views =>
        {
            views.Add().Type(ViewType.Prompt)
            .PromptSuggestions(new string[] { "Out of office (contact colleague)", "LinkedIn post for work/life balance and well-being" });
            views.Add().Type(ViewType.Output);
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    @{
        var promptSuggestions = new string[] { "Out of office (contact colleague)", "LinkedIn post for work/life balance and well-being" };
    }

    <kendo-aiprompt name="aiprompt"
        prompt-suggestion-item-template-handler="promptSuggestionTemplate">
        <aiprompt-views>
            <aiprompt-view type="ViewType.Prompt" prompt-suggestions="promptSuggestions"></aiprompt-view>
            <aiprompt-view type="ViewType.Output"></aiprompt-view>
        </aiprompt-views>
    </kendo-aiprompt>
```
{% endif %}
```JS scripts
<script>
    var promptSuggestionsData = [
    {
        suggestion: "Out of office (contact colleague)",
        color:"yellow",
        background: "red"
    },
    {
        suggestion: "LinkedIn post for work/life balance and well-being",
        color: "darkgreen",
        background: "lightblue"
    }];

    function promptSuggestionTemplate(data) {
        let suggestionText = data.suggestion;
        let getSuggestionData = $.grep(promptSuggestionsData, function (item) {
            return item.suggestion == suggestionText;
        });
        return `<span role="listitem" class="k-suggestion" style="color:${getSuggestionData[0].color}; background-color: ${getSuggestionData[0].background}">${getSuggestionData[0].suggestion}</span>`;
    }
</script>
```

## Output Items Template

Use the `OutputTemplate()` option to control how each generated output card is rendered in the `Output` view. The specified template is applied after the output has finished streaming to render the final content.

The option has a various overloads like `OutputTemplateHandler()`, `OutputTemplateId()`, `OutputTemplate()` that accepts a [Template component](slug:htmlhelpers_overview_template), and `OutputTemplateView()`.

The following example demonstrates how to customize the default appearance of the output cards.

```HtmlHelper
@(Html.Kendo().AIPrompt()
    .Name("aiprompt")
    .OutputTemplateHandler("outputTemplate")
    ... // Additional configuration.
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-aiprompt name="aiprompt" output-template-handler="outputTemplate">
    <!-- Additional configuration. -->
</kendo-aiprompt>
```
{% endif %}
```JS scripts
<script>
    function outputTemplate({output, content}) {
        return `<div class="ai-response">
                    <small>Prompt: ${kendo.htmlEncode(output.prompt)}</small><br/>
                    <strong>AI:</strong> ${content}
                </div>`;
    }
</script>
```

## View Content Templates

The AIPrompt supports custom views through the `Views()` configuration. By using the `ViewTemplate()` and the `FooterTemplate()` methods, you can specify the content and footer of that custom view.

The following example demonstrates how to add a custom view in the AIPrompt component.

```HtmlHelper
    @(Html.Kendo().AIPrompt()
        .Name("aiprompt")
        .Views(views =>
        {
            views.Add().Type(ViewType.Custom).Name("myCustomView")
            .ButtonText("Additional options")
            .ViewTemplate("<div><p>Custom View content</p></div>")
            .FooterTemplate("<div class='custom-footer'>Custom View footer</div>");
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-aiprompt name="aiprompt">
        <aiprompt-views>
            <aiprompt-view type="ViewType.Custom" name="myCustomView"
                button-text="Additional options" 
                view-template="<div><p>Custom View content</p></div>" 
                footer-template="<div class='custom-footer'>Custom View footer</div>">
            </aiprompt-view>
        </aiprompt-views>
    </kendo-aiprompt>
```
{% endif %}

## See Also

* [Templates in the AIPrompt for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/aiprompt/templates)
* [Using Client Templates]({% slug client_templates_overview %})
