<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
<style>
    #pivotgrid
    {
        display: inline-block;
        vertical-align: top;
        width: 70%;
    }

    #configurator
    {
        display: inline-block;
        vertical-align: top;
    }
</style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <%= Html.Kendo().PivotConfigurator()
        .Name("configurator")
        .Filterable(true)
    %>

    <%= Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .ColumnWidth(200)
        .Filterable(true)
        .Height(494)
        .Configurator("#configurator")
        .DataSource(dataSource => dataSource.
            Xmla()
            .Columns(columns => {
                columns.Add("[Date].[Calendar]").Expand(true);
                columns.Add("[Geography].[City]");
            })
            .Rows(rows => rows.Add("[Product].[Product]"))
            .Measures(measures => measures.Values(new string[]{"[Measures].[Internet Sales Amount]"}))
            .Transport(transport => transport
                .Connection(connection => connection
                    .Catalog("Adventure Works DW 2008R2")
                    .Cube("Adventure Works"))
                .Read(read => read
                    .Url("http://demos.telerik.com/olap/msmdpump.dll")
                    .DataType("text")
                    .ContentType("text/xml")
                    .Type(HttpVerbs.Post)
                )
            )
            .Events(e => e.Error("onError"))
        )
    %>

<script>
    function onError(e) {
        alert("error: " + kendo.stringify(e.errors[0]));
    }
</script>
</asp:Content>
