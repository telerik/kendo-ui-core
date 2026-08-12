---
title: Citation
page_title: jQuery Citation Documentation - LLM Kit Citation
description: "Learn how to use the Kendo UI for jQuery Citation component to attach inline sources to AI-generated content."
slug: citation_kendoui_llmkit
position: 5
components: ["citation"]
---

# {{ site.product }} Citation

In applications powered by Retrieval-Augmented Generation (RAG), such as legal research, medical information, or financial analysis, users must be able to trace every AI claim to a real source.

The [Citation](/api/javascript/ui/citation) component places an inline reference chip directly within AI-generated text. Clicking or hovering the chip opens a popover with complete details for each cited resource, giving readers evidence without leaving the page.

## Configuration

Place the Citation component directly after the claim it supports so the relationship between the statement and its evidence is immediately clear. Provide an array of `CitationSource` objects to the [`sources`](/api/javascript/ui/citation/configuration/sources) property to populate the popover with source titles, URLs, and optional descriptions.

Use the [`svgIcon`](/api/javascript/ui/citation/configuration/svgicon) and [`sourceIcon`](/api/javascript/ui/citation/configuration/sourceicon) properties to customize the chip and popover icons. Set [`showOn`](/api/javascript/ui/citation/configuration/showon) to control whether the popover opens on hover or click.

```html
<p>
    Revenue increased in every enterprise segment
    <span id="citation"></span>.
</p>

<script>
    $("#citation").kendoCitation({
        showOn: "click",
        sources: [{
            title: "Quarterly Revenue Report",
            url: "https://example.com/reports/q1-2025",
            description: "Summary of enterprise revenue by quarter."
        }]
    });
</script>
```

Add [`description`](/api/javascript/ui/citation/configuration/sources.description) to each source so users have enough context to decide whether to open the link. Replace the default globe icon with a domain-specific icon, such as a document for internal wikis or a database for data sources, to help users identify the source type before hovering.

```javascript
$("#citation").kendoCitation({
    label: "Sources",
    sources: [
        { title: "Report A", url: "https://example.com/a" },
        { title: "Report B", url: "https://example.com/b" }
    ]
});
```


## See Also

* [Citation Demo](https://demos.telerik.com/kendo-ui/llm-kit/citation)
* [LLM Kit Overview]({% slug overview_kendoui_llmkit %})
* [Checkpoint]({% slug checkpoint_kendoui_llmkit %})
* [JavaScript API Reference of the Citation](/api/javascript/ui/citation)
