<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Kendo.Mvc.Examples.Models.ClientCategoryViewModel>" %>

<%= Html.Kendo().DropDownListFor(m => m)
        .DataValueField("CategoryID")
        .DataTextField("CategoryName")
        .BindTo((System.Collections.IEnumerable)ViewData["categories"])
%>