---
publish: false
---

{% capture site_url %}{% if site.url %}{{ site.url }}{% else %}{{ site.github.url }}{% endif %}{% endcapture %}
{% for post in site.html_pages %}
<a href="{{ site.all_pages_domain }}/aspnet-mvc{{ post.url | replace:'.html','' }}">{{ site.all_pages_domain }}/aspnet-mvc{{ post.url | replace:'.html','' }}</a>
{% endfor %}