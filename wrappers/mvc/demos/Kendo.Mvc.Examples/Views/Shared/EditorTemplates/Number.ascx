<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<double?>" %>

<%: Html.Kendo().NumericTextBoxFor(m => m)
       .HtmlAttributes(new { style = "width:100%" })
%>