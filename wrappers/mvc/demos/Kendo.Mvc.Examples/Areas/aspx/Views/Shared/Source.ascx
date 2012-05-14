<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<%
    var viewPath = ((BuildManagerCompiledView) ViewContext.View).ViewPath;
    var viewSource = File.ReadAllText(Server.MapPath(viewPath));
%>
<pre class="prettyprint"><%= viewSource %></pre>
<script>
    $(function() {
        prettyPrint();
    });
</script>