<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
     <div class="demo-section">
        <h3>What is Everlive?</h3>
        <p>Everlive is a set of cloud-based services that enable developer to build and manage mobile apps in significantly faster, easier and more scalable way. Everlive can significantly speed-up development by providing your app with data storage, user management and server-code execution. Unlike other products, Everlive is the integrated cloud-storage provider for all Telerik products.</p>
        <p>&raquo; <a class="hyperlink" href="http://docs.everlive.com/what-is-everlive" title="Getting started with Everlive">More about Everlive</a></p>
        <p>&raquo; <a class="hyperlink" href="http://docs.everlive.com/development/javascript-sdk/kendoui/kendo-uiintegration" title="Introduction to Kendo UI and Everlive JavaScript integration">Integration with Kendo UI</a></p>
    </div>
    <!--[if gte IE 9]>-->
    <script src="<%= Url.Content("~/Scripts/everlive.all.js") %>"></script>
    <script>
        var everlive = new Everlive({
            apiKey: "3q4sHgIqESXbpvOp",
            scheme: "http"
        });
    </script>

    <%:Html.Kendo().Grid<Kendo.Mvc.Examples.Models.Order>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(o => o.Freight).Width(100);
            columns.Bound(o => o.OrderDate).Width(120).Format("{0:MM/dd/yyyy}");
            columns.Bound(o => o.ShipName);
            columns.Bound(o => o.ShipCity).Width(150);
        })
        .Pageable()
        .Sortable()
        .Scrollable()
        .DataSource(dataSource => dataSource
            .Custom()
            .PageSize(20)
            .Type("everlive")
            .Schema(s => s.Model(m => {
                m.Field("CreatedBy", typeof(string));
                m.Field("CreatedAt", typeof(DateTime));
                m.Field("ModifiedAt", typeof(DateTime));
            }))
            .Transport(new { typeName = "Order" }))
    %>

    <br />
     <!--<![endif]-->
    <div class="demo-section">
        <p>Note: The Everlive datasource is not supported on IE8 and below yet, because it relies on <a class="hyperlink" href="http://en.wikipedia.org/wiki/Cross-origin_resource_sharing">cross-origin resource sharing</a>.</p>
    </div>

</asp:Content>