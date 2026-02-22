---
title: Overview
page_title: Overview
description: "The Telerik UI for {{ site.framework }} SpeechToTextButton component automatically transforms voice input into written text."
components: ["speechtotextbutton"]
slug: htmlhelpers_overview_speechtotextbutton
position: 0
---

# {{ site.framework }} SpeechToTextButton Overview

{% if site.core %}
The Telerik UI SpeechToTextButton TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI SpeechToTextButton widget.
{% else %}
The Telerik UI SpeechToTextButton HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI SpeechToTextButton widget.
{% endif %}

The SpeechToTextButton is an interactive UI component that converts spoken words into written text using the browser's built-in speech recognition capabilities. This powerful tool enhances user experience by providing an alternative input method valuable for accessibility, mobile applications, and scenarios where hands-free interaction is preferred. Users click the button to activate voice recording, speak naturally, and watch their words automatically transcribed into editable text. The component is suitable for form filling, content creation, search functionality, and any application requiring efficient voice-to-text conversion.

* [Demo page for the SpeechToTextButton](https://demos.telerik.com/{{ site.platform }}/speechtotextbutton)

## Initializing the SpeechToTextButton

The following example demonstrates how to define the SpeechToTextButton component.

```HtmlHelper
@(Html.Kendo().SpeechToTextButton()
    .Name("speechButton")
    .IntegrationMode(IntegrationMode.WebSpeech)
    .Icon("microphone-outline")
    .StopIcon("stop-sm")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-speechtotextbutton name="speechButton"
    integration-mode="IntegrationMode.WebSpeech"
    icon="microphone-outline"
    stop-icon="stop-sm">
</kendo-speechtotextbutton>
```
{% endif %}

## Basic Configuration

Usually, the SpeechToTextButton is integrated with other input UI components, such as [TextBox]({% slug htmlhelpers_overview_textbox%}), [TextArea]({% slug htmlhelpers_overview_textarea%}), or [NumericTextBox]({% slug htmlhelpers_numerictextbox_aspnetcore%}), to display the converted speech-to-text results, enabling direct voice-to-text input functionality within the editors.

Handle the `Result` client-side event to update an input field with the recognized text. For example, you can enable users to fill out a feedback form by speaking instead of typing. When the user clicks the button, the component captures the speech and updates the value of the editor with the recognized text.

The following example demonstrates a basic integration of the SpeechToTextButton into a TextBox component. The SpeechToTextButton is displayed in the suffix adornment of the TextBox using the [Template]({% slug htmlhelpers_overview_template%}) component.

```HtmlHelper
@(Html.Kendo().TextBox()
    .Name("txtBox")
    .SuffixOptions(suffix =>
    {
        suffix.Template(Html.Kendo().Template()
        .AddHtml("<div class='description k-ml-xs'>Click the mic to speak</div>")
        .AddComponent(btn => btn
        .SpeechToTextButton()
        .Name("speechButton")
        .FillMode(ButtonFillMode.Flat)
        .Events(ev => ev.Result("onResult"))
        ));
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-textbox name="txtBox">
    <suffix-options>
        <suffix-template>
            <div class='description k-ml-xs'>Click the mic to speak</div>
            <kendo-speechtotextbutton name="speechButton" on-result="onResult"
                fill-mode="ButtonFillMode.Flat">
            </kendo-speechtotextbutton
        </suffix-template>
    </suffix-options>
</kendo-textbox>
```
{% endif %}
```JS Scripts
<script>
    function onResult(e) {
        var transcript = e.alternatives[0].transcript; // Access the array of alternative transcripts. 
        $("#txtBox").data("kendoTextBox").value(`${transcript}`);
    }
</script>
```

## Functionality and Features

* [Appearance]({% slug speechtotextbutton_appearance %})&mdash;You can control the appearance of the SpeechToTextButton by configuring its styling options.
* [Events]({% slug speechtotextbutton_events %})&mdash;The component emits a variety of events that allow you to implement custom functionality.
* [Accessibility]({% slug htmlhelpers_speechtotextbutton_accessibility %})&mdash;The SpeechToTextButton is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug htmlhelpers_speechtotextbutton_keynav%}) for faster navigation.

## Button States

The SpeechToTextButton component operates in three distinct states that reflect the current status of the speech recognition process:

* Inactive State&mdash;The state before speech recognition begins. The default button's icon is `microphone-outline`.
* Active State (listening)&mdash;Indicates that speech recognition is currently in progress. The button's icon changes to the default `stop-sm` icon.
* Error State&mdash;Triggers when speech recognition encounters an error or when the Web Speech API is not supported by the browser.

## Browser Support

By default, the SpeechToTextButton component relies on the Web Speech API to perform speech recognition. For a list of supported browsers, refer to the [Web Speech API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#browser_compatibility).

>important The [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) requires a secure context (HTTPS) in most browsers. Ensure your application is served over HTTPS for optimal functionality.

## Next Steps

* [Getting Started with the SpeechToTextButton]({% slug speechtotextbutton_getting_started %})
* [Basic Usage of the SpeechToTextButton for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/speechtotextbutton)

## See Also

* [Using the API of the SpeechToTextButton (Demo)](https://demos.telerik.com/{{ site.platform }}/speechtotextbutton/api)
* [Server-Side API of the SpeechToTextButton](/api/speechtotextbutton)
{% if site.core %}
* [Server-Side API of the SpeechToTextButton TagHelper](/api/taghelpers/speechtotextbutton)
{% endif %}
* [Knowledge Base Section](/knowledge-base)
