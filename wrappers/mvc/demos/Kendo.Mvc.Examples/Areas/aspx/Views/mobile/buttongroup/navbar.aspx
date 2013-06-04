<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<IEnumerable<dynamic>>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("buttongroup-navbar")
        .Title("Badges")
        .Header(() =>
        {
            Html.Kendo().MobileNavBar()
                .Content(() =>
                {
                %>

                <%: Html.Kendo().MobileButtonGroup()
                    .Index(0)
                    .Events(events => events.Select("regroup"))
                    .Items(items =>
                    {
                        items.Add().Text("By Name");
                        items.Add().Text("By Family");
                    })
                    %>

                <%: Html.Kendo().MobileButton()
                    .Align(MobileButtonAlign.Right)
                    .Href("#index")
                    .Text("Index")
                    .HtmlAttributes(new { @class = "nav-button" })
                %>

                <%
                })
                .Render();
        })
        .Content(() =>
        {
            %>            
            <%: Html.Kendo().MobileListView(Model)
                    .Name("listView")
                    .DataSource(dataSource =>
                    {
                        dataSource.ServerOperation(false);
                        dataSource.Group(group => group.Add("firstLetter", typeof(string)));
                    })
                    .Template("nameTemplate")
                    .FixedHeaders(true)
            %>
            <%
        })
        .Render();
%>


<script>    
    function regroup() {
        var dataSource = $("#listView").data("kendoMobileListView").dataSource;

        dataSource.group(this.selectedIndex ? "lastLetter" : "firstLetter");
    }
</script>

<script id="nameTemplate" type="text/x-kendo-template">
    <h2>#:firstName# #:lastName#</h2><img src="#:photo#" />
</script>

<style scoped>
    #buttongroup-navbar h2 {
        display: inline-block;
        font-size: 1.1em;
        margin: 1em 0 .5em 1em;
    }
    #buttongroup-navbar img {
    	float: left;
        width: 4em;
        height: 4em;
        margin: 0;
        -webkit-box-shadow: 0 1px 3px #333;
        box-shadow: 0 1px 3px #333;
        -webkit-border-radius: 8px;
        border-radius: 8px;
    }
</style>

</asp:Content>
