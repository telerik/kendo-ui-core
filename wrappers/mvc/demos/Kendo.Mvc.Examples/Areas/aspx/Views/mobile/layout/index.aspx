<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("layoutView")
        .Layout("layout")        
        .Content(() =>
        {
            %>
            <p>
                This examples shows the platform specific layouts. Change the OS to see how the header and footer changes.
            </p>  
            <%
        })
        .Render();
%>
 
<% Html.Kendo().MobileLayout()
       .Name("layout")
       .Platform("ios")
       .Header(() =>
        {
           Html.Kendo().MobileNavBar()
            .Content(navbar =>
            {
                %>
                <%: Html.Kendo().MobileBackButton()
                        .Align(MobileButtonAlign.Left) 
                        .HtmlAttributes(new { @class = "nav-button" })
                        .Href(Url.RouteUrl(new { controller = "suite" }))
                        .Text("Back")
                %>    
                <%: navbar.ViewTitle("iOS Platform")%>
                <%
            })
            .Render();
        })
        .Footer(() =>
        {
            Html.Kendo().MobileTabStrip()
                .Items(items => {
                    items.Add().Icon("contacts").Text("Profile");
                    items.Add().Icon("settings").Text("Settings");
                })
                .Render();
        })
       .Render();
%>

<% Html.Kendo().MobileLayout()
       .Name("layout")
       .Platform("android")
       .Header(() =>
        {
           Html.Kendo().MobileNavBar()
            .Content(navbar =>
            {
                %>
                <%: Html.Kendo().MobileBackButton()
                        .Align(MobileButtonAlign.Left) 
                        .HtmlAttributes(new { @class = "nav-button" })
                        .Href(Url.RouteUrl(new { controller = "suite" }))
                        .Text("Back")
                %> 
                <%: navbar.ViewTitle("Android Platform")%>
                <%
            })
            .Render();
        })
        .Footer(() =>
        {
            Html.Kendo().MobileTabStrip()
                .Items(items => {
                    items.Add().Icon("history").Text("Sales");
                    items.Add().Icon("settings").Text("Settings");
                })
                .Render();
        })
       .Render();
%>

<% Html.Kendo().MobileLayout()
       .Name("layout")
       .Platform("blackberry")
       .Header(() =>
        {
           Html.Kendo().MobileNavBar()
            .Content(navbar =>
            {
                %>
                <%: Html.Kendo().MobileBackButton()
                        .Align(MobileButtonAlign.Left) 
                        .HtmlAttributes(new { @class = "nav-button" })
                        .Href(Url.RouteUrl(new { controller = "suite" }))
                        .Text("Back")
                %> 
                <%: navbar.ViewTitle("BlackBerry Platform")%>
                <%
            })
            .Render();
        })
        .Footer(() =>
        {
            Html.Kendo().MobileTabStrip()
                .Items(items => {
                    items.Add().Icon("favorites").Text("Rating");
                    items.Add().Icon("settings").Text("Settings");
                })
                .Render();
        })
       .Render();
%>

<% Html.Kendo().MobileLayout()
       .Name("layout")
       .Platform("wp")
       .Header(() =>
        {
           Html.Kendo().MobileNavBar()
            .Content(navbar =>
            {
                %>
                <%: Html.Kendo().MobileBackButton()
                        .Align(MobileButtonAlign.Left) 
                        .HtmlAttributes(new { @class = "nav-button" })
                        .Href(Url.RouteUrl(new { controller = "suite" }))
                        .Text("Back")
                %> 
                <%: navbar.ViewTitle("Windows Phone Platform")%>
                <%
            })
            .Render();
        })
        .Footer(() =>
        {
            Html.Kendo().MobileTabStrip()
                .Items(items => {
                    items.Add().Icon("home").Text("Home");
                    items.Add().Icon("globe").Text("Global");
                })
                .Render();
        })
       .Render();
%>

<style scoped>
    #layoutView .km-view-title
    {
        visibility: inherit;
    }

    .km-android #layoutView .km-view-title
    {
        display: block;
        position: static;
    }
</style>

</asp:Content>
