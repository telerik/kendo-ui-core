---
publish: false
layout: false
---

{% capture site_url %}{% if site.url %}{{ site.url }}{% else %}{{ site.github.url }}{% endif %}{% endcapture %}
{% for page in site.html_pages %}{% if page.is_api == true and page.is_main != true %}{% continue %}{% endif %}
{{ site.all_pages_domain }}/kendo-ui{{ page.url | replace:'.html','' }}
{% endfor %}
