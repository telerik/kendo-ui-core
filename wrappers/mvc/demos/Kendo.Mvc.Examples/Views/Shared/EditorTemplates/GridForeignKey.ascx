<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<object>" %>

<%= Html.Kendo().DropDownListFor(m => m)    
    .BindTo((SelectList)ViewData[ViewData.TemplateInfo.GetFullHtmlFieldName("") + "_Data"])
%>