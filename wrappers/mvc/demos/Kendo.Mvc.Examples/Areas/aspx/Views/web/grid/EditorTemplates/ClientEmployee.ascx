<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<%:Html.Kendo().DropDownList()
        .Name("Employee")
        .DataValueField("EmployeeID")
        .DataTextField("EmployeeName")
        .BindTo((System.Collections.IEnumerable)ViewData["employees"])
 %>