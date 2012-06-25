<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<decimal?>" %>

<%: Html.Kendo().CurrencyTextBoxFor(m => m)      
      .HtmlAttributes(new {style="width:100%"})
      .Min(0)
%>