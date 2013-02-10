<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<String>" %>

<%= Html.TextBoxFor(model => model, new {@class="k-textbox" })%>
