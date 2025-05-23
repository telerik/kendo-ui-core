---
title: AI Integration
page_title: AI Integration
description: "Learn how to utilize the AI Prompt integration in the Telerik UI Editor component for {{ site.framework }}."
slug: htmlhelpers_editor_ai_integration_aspnetcore
position: 5
---

# AI Integration

The Editor features AI integration through the [AIPrompt]({% slug htmlhelpers_overview_aiprompt %}) component, enabling a smarter and more efficient content creation experience.

You can enable the functionality by using the `AI()` configuration and specifying the endpoint that will request an answer from the desired LLM service. For that, use the `Service()` method and pass the respective Action and Controller.

The following example demonstrates the basic AI configuration for the Editor.

```HtmlHelper
    @(Html.Kendo().Editor()
        .Name("editor")
        .AI(ai => ai
            .AIPrompt(true)
            .Service(s => s.Url("AIChatCompletion", "AIPrompt"))
            .InlineAIPrompt(true)
            .Commands(c =>
            {
                c.Add().Id("rewrite").Text("Rewrite").Icon("arrow-rotate-cw").Prompt(@<text>function(context) {return `Rewrite the selected text while preserving its original meaning and intent. Selected Text: ${context}` }</text>);
                c.Add().Id("fix-spelling").Text("Fix spelling").Icon("spell-checker").Prompt(@<text>function(context) {return `Correct any spelling, grammar, or punctuation mistakes in the selected text while preserving its original meaning and intent. Selected Text: ${context}` }</text>);
                c.Add().Id("change-tone-neutral").Text("Change to neutral tone").Icon("tell-a-friend").Prompt(@<text>function(context) {return `Adjust the tone of the following text to be more neutral while preserving its original meaning and intent. Selected Text: ${context}` }</text>);
                c.Add().Id("change-tone-friendly").Text("Change to friendly tone").Icon("tell-a-friend").Prompt(@<text>function(context) {return `Adjust the tone of the following text to be more friendly while preserving its original meaning and intent. Selected Text: ${context}` }</text>);

                c.Add().Id("adjust-length-shorten").Text("Shorten Length").Icon("col-resize").Prompt(@<text>function(context) {return `Shorten the following text while preserving its original meaning and intent. Selected Text: ${context}` }</text>);
            })
        
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-editor name="editor">
        <ai ai-prompt="true" inline-ai-prompt="true">
        <service action="AIChatCompletion" controller="AIPrompt" />
        <commands>
            <command id="rewrite" text="Rewrite" icon="arrow-rotate-cw" prompt="function(context) {return `Rewrite the selected text while preserving its original meaning and intent. Selected Text: ${context}` }"></command>
            <command id="fix-spelling" text="Fix spelling" icon="spell-checker" prompt="function(context) {return `Correct any spelling, grammar, or punctuation mistakes in the selected text while preserving its original meaning and intent. Selected Text: ${context}` }"></command>
            <command id="change-tone-neutral" text="Change to neutral tone" icon="tell-a-friend" prompt="function(context) {return `Adjust the tone of the following text to be more neutral while preserving its original meaning and intent. Selected Text: ${context}` }"></command>
            <command id="change-tone-friendly" text="Change to friendly tone" icon="tell-a-friend" prompt="function(context) {return `Adjust the tone of the following text to be more friendly while preserving its original meaning and intent. Selected Text: ${context}` }"></command>
            <command id="adjust-length-shorten" text="Shorten Length" icon="col-resize" prompt="function(context) {return `Shorten the following text while preserving its original meaning and intent. Selected Text: ${context}` }"></command>
        </commands>
        </pane>
        </ai>
    </kendo-editor>
```
{% endif %}
```C#
    [HttpPost]
    [RateLimit(10, 60)]
    public async Task<IActionResult> AIChatCompletion()
    {
        try
        {
            var aiServiceUrl = "Link to LLM service";
            var forwardedRequest = new HttpRequestMessage(HttpMethod.Post, aiServiceUrl);
            
            // pass the key for using the LLM service
            forwardedRequest.Headers.Add("X-Api-Key", _configuration["AI:ApiKey"]);

            using (var requestStream = new StreamReader(Request.Body))
            {
                var body = await requestStream.ReadToEndAsync();
                forwardedRequest.Content = new StringContent(body, System.Text.Encoding.UTF8, Request.ContentType);
            }

            var response = await _httpClient.SendAsync(forwardedRequest);
            var responseContent = await response.Content.ReadAsStringAsync();


            return new ContentResult
            {
                Content = responseContent,
                ContentType = "application/json",
                StatusCode = (int)response.StatusCode
            };
        }
        catch (System.Exception e)
        {

            return new ContentResult
            {
                Content = e.Message,
                ContentType = "application/json",
                StatusCode = 200
            };
        }
    }
```
For a live example, visit the [AI Integration Demo of the Editor](https://demos.telerik.com/{{ site.platform }}/editor/ai-integration).
## See Also

* [AI Integration in Editor for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/ai-integration)
* [Server-Side API of the Editor](/api/editor)
{% if site.core %}* [Server-Side API of the Editor TagHelper](/api/taghelpers/editor){% endif %}
