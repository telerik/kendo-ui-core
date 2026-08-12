---
title: Citation
page_title: Citation
description: "Learn how to use the Telerik UI Citation component for {{ site.framework }} to show inline sources in AI-generated content."
slug: htmlhelpers_citation_llmkit_aspnetcore
position: 5
components: ["citation"]
---

# {{ site.framework }} Citation

In applications powered by Retrieval-Augmented Generation (RAG), such as legal research, medical information, or financial analysis, users must be able to trace every AI claim to a real source.

The [Citation component](/api/citation) places an inline reference chip directly within AI-generated text. Clicking or hovering the chip opens a popover with complete details for each cited resource, giving readers evidence without leaving the page.

## Configuration

Place the Citation component directly after the claim it supports so the relationship between the statement and its evidence is immediately clear. Provide an array of `CitationSource` objects to the [`Sources`](/api/citation/sources) property to populate the popover with source titles, URLs, and optional descriptions.

Use the [`SvgIcon`](/api/citation/svgicon) and [`SourceSVGIcon`](/api/citation/sourcesvgicon) properties to customize the chip and popover icons. Set [`DisplayMode`](/api/citation/displaymode) to control whether the popover opens on hover or click.

Add [`Description`](/api/citation/sources) to each source so users have enough context to decide whether to open the link. Replace the default globe icon with a domain-specific icon, such as a document for internal wikis or a database for data sources, to help users identify the source type before hovering.

```HtmlHelper
    @(Html.Kendo().Citation()
        .Name("citation")
        .Sources(sources =>
        {
            sources.Add().Title("Quarterly Revenue Report").Url("https://example.com/reports/q1-2025").Description("Summary of enterprise revenue by quarter.");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-citation name="citation">
        <sources>
            <source title="Quarterly Revenue Report"
                url="https://example.com/reports/q1-2025"
                description="Summary of enterprise revenue by quarter.">
            </source>
        </sources>
    </kendo-citation>
```
{% endif %}

## See Also


* [Citation Demo for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/llm_kit/citation)
* [LLM Kit Overview]({% slug htmlhelpers_llmkit_aspnetcore %})
* [Server-Side API of the Citation HtmlHelper](/api/citation)
{% if site.core %}
* [Server-Side API of the Citation TagHelper](/api/taghelpers/citation)
{% endif %}
* [JavaScript API Reference of the Citation](/api/javascript/ui/citation)