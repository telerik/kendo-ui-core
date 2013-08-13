<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<object>" %>

<%= Html.TextBoxFor(model => model, new {@class="k-textbox", type="password" })%>