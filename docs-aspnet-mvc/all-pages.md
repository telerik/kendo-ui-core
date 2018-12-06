---
publish: false
---

{% capture site_url %}{% if site.url %}{{ site.url }}{% else %}{{ site.github.url }}{% endif %}{% endcapture %}
{% for post in site.html_pages %}
<a href="https://kendobuild.telerik.com/aspnet-mvc{{ post.url | replace:'.html','' }}">https://kendobuild.telerik.com/aspnet-mvc{{ post.url | replace:'.html','' }}</a>
{% endfor %}