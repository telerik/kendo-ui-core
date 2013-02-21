<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" 
    Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%=Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
    .Name("grid")
    .HtmlAttributes(new { style = "width: 750px;height:430px;" })
    .Columns(columns =>
    {
        columns.Template(e => { }).ClientTemplate(" ").Width(140).Title("Picture");
        columns.Bound(e => e.Title).Width(400).Title("Details");
        columns.Bound(e=> e.EmployeeID).Title("ID");
    })
    .ClientRowTemplate(
        "<tr>" +
            "<td class='photo'>" +
               "<img src='" + Url.Content("~/Content/web/Employees/") +"#:data.EmployeeID#.jpg' alt='#: data.EmployeeID #' />" +
            "</td>" +
            "<td class='details'>" +
                "<span class='title'>#: Title #</span>" +
                "<span class='description'>Name : #: FirstName# #: LastName#</span>" +
                "<span class='description'>Country : #: Country# </span>" +
            "</td>" +
            "<td class='employeeID'>" +
                "#: EmployeeID #" +
            "</td>" +
         "</tr>"       
    )
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("RowTemplate_Read", "Grid"))
    )        
    .Scrollable()
%>

</asp:Content>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
    <style>           
        .title {
            display: block;
            font-size: 1.6em; 
        }
        .description {
            display: block;
            padding-top: 1.6em;
        }
        .employeeID {
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
            font-size: 50px;
            font-weight: bold;
            color: #898989;
        }
        td.photo, .employeeID {
            text-align: center;
        }
        .k-grid-header .k-header {
            padding: 10px 20px;
        }
        .k-grid td {
            background: -moz-linear-gradient(top,  rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%);
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.05)), color-stop(100%,rgba(0,0,0,0.15)));
            background: -webkit-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
            background: -o-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
            background: -ms-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
            background: linear-gradient(to bottom,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
            padding: 20px;
        }
    </style>

</asp:Content>
