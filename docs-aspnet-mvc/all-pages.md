---
publish: false
layout: false
---

{% capture site_url %}{% if site.url %}{{ site.url }}{% else %}{{ site.github.url }}{% endif %}{% endcapture %}
{% for post in site.html_pages %}
{{ site.all_pages_domain }}/aspnet-mvc{{ post.url | replace:'.html','' }}
{% endfor %}
