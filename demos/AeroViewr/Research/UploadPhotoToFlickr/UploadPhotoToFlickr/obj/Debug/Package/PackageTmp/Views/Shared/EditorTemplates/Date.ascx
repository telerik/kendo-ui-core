<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<DateTime?>" %>

<%= Html.Telerik().DatePicker()
        .Name(ViewData.TemplateInfo.GetFullHtmlFieldName(string.Empty))
        .HtmlAttributes(new { id = ViewData.TemplateInfo.GetFullHtmlFieldName(string.Empty) + "_wrapper"})
        .Value(Model > DateTime.MinValue? Model : DateTime.Today)
%>