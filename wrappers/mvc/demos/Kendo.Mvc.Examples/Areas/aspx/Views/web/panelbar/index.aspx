<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<% Html.Kendo().PanelBar()
    .Name("panelbar")
    .ExpandMode(PanelBarExpandMode.Single)
    .HtmlAttributes(new { style = "width:300px" })
    .Items(panelbar =>
    {
        panelbar.Add().Text("My Teammates")
            .Expanded(true)
            .Content(() => 
            {
                %>
                <div style="padding: 10px;">
                    <div class="teamMate">
                        <img src="<%= Url.Content("~/Content/web/panelbar/andrew.jpg") %>" alt="Andrew Fuller">
                        <h2>Andrew Fuller</h2>
                        <p>Team Lead</p>
                    </div>
                    <div class="teamMate">
                        <img src="<%= Url.Content("~/Content/web/panelbar/nancy.jpg") %>" alt="Nancy Leverling">
                        <h2>Nancy Leverling</h2>
                        <p>Sales Associate</p>
                    </div>
                    <div class="teamMate">
                        <img src="<%= Url.Content("~/Content/web/panelbar/robert.jpg") %>" alt="Robert King">
                        <h2>Robert King</h2>
                        <p>Business System Analyst</p>
                    </div>
                </div>
                <%
            });

        panelbar.Add().Text("Projects")
            .Items(projects =>
            {
                projects.Add().Text("New Business Plan");
                        
                projects.Add().Text("Sales Forecasts")
                    .Items(forecasts =>
                    {
                        forecasts.Add().Text("Q1 Forecast");
                        forecasts.Add().Text("Q2 Forecast");
                        forecasts.Add().Text("Q3 Forecast");
                        forecasts.Add().Text("Q4 Forecast");
                    });

                projects.Add().Text("Sales Reports");
            });

        panelbar.Add().Text("Programs")
            .Items(programs =>
            {
                programs.Add().Text("Monday");
                programs.Add().Text("Tuesday");
                programs.Add().Text("Wednesday");
                programs.Add().Text("Thursday");
                programs.Add().Text("Friday");
            });

        panelbar.Add().Text("Communication").Enabled(false);
    })
    .Render();
%>

<style scoped="scoped">
    .teamMate:after {
        content: ".";
        display: block;
        height: 0;
        line-height: 0;
        clear: both;
        visibility: hidden;
    }
    .teamMate h2 {
        font-size: 1.4em;
        font-weight: normal;
        padding-top: 20px;
    }
    .teamMate p {
        margin: 5px 0;
    }
    .teamMate img {
        float: left;
        margin: 5px 15px 5px 5px;
        border: 1px solid #ccc;
    }
</style>
</asp:Content>