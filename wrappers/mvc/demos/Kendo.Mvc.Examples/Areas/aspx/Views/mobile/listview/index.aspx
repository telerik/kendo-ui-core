<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("listview-home")       
        .Title("Destinations")
        .Content(() =>
        {
            %>
            <% Html.Kendo().MobileListView().Style("inset").Type("group")
                   .Items(root => {
                       root.Add().Text("Africa").Items(items =>
                       {
                           items.AddLink().Text("Nairobi").Icon("toprated");
                       });

                       root.Add().Text("America").Items(items =>
                       {
                           items.AddLink().Text("Boston").Icon("globe");
                           items.AddLink().Text("Ottawa").Icon("globe");
                           items.AddLink().Text("San Francisco").Icon("toprated");
                       });

                       root.Add().Text("Asia").Items(items =>
                       {
                           items.AddLink().Text("Bombay").Icon("globe");
                       });

                       root.Add().Text("Australia").Items(items =>
                       {
                           items.AddLink().Text("Melbourne").Icon("globe");
                           items.AddLink().Text("Sydney").Icon("toprated");
                       });

                       root.Add().Text("Europe").Items(items =>
                       {
                           items.AddLink().Text("Cannes").Icon("globe");
                           items.AddLink().Text("Liverpool").Icon("globe");
                           items.AddLink().Text("London").Icon("toprated");
                       });
                   })
                   .Render();
            %>         
            <%
        })
        .Render();
%>

<style>
    .km-ios #listview-home .km-content {
        background: url(<%=Url.Content("~/content/shared/images/patterns/pattern2.png")%>);
        box-shadow: inset 0 0 30px #95764D;
        -webkit-box-shadow: inset 0 0 30px #95764D;
    }
    .km-ios #listview-home .km-listview .km-list {
        border-radius: 10px;
        -webkit-border-radius: 10px;
        box-shadow: 0 1px 5px #95764D;
        -webkit-box-shadow: 0 1px 5px #95764D;
    }
    .km-ios #listview-home .km-listview .km-list > li {
        border: none;
    }
    .km-ios #listview-home .km-listview .km-list > li:last-child {
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .km-ios #listview-home .km-navbar {
        background: url(<%=Url.Content("~/content/shared/images/patterns/pattern9.png")%>);
    }
    .km-tablet .km-ios #listview-home .km-view-title {
        color: #fff;
        text-shadow: 0 -1px rgba(0,0,0,.5);
    }
    .km-ios #listview-home .km-navbar .km-button
    {
        background-color: #974d2e;
    }

</style>

</asp:Content>
