<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()                
        .Title("Button Appearance")
        .HtmlAttributes(new { @class = "buttonAppearance" })
        .Content(() =>
        {
            %>
            <% Html.Kendo().MobileListView().Style("inset").Type("group")
                    .Items(root =>
                    {
                        root.Add().Text("Background color").Items(items =>
                        {
                            items.Add().Content(() =>
                            {
                                %>
                                <i></i> 
                                <%= Html.Kendo().MobileButton()
                                        .HtmlAttributes(new { style = "background-color: green" })
                                        .Text("Green")
                                %>
                                <%
                            });

                            items.Add().Content(() =>
                            {
                                %>
                                <i></i> 
                                <%= Html.Kendo().MobileButton()
                                    .HtmlAttributes(new { style = "background-color: darkred" })
                                    .Text("Red")
                                %> 
                                <%
                            });
                        });
                        
                        root.Add().Text("Font Size").Items(items =>
                        {
                            items.Add().Content(() =>
                            {
                                %>
                                <i></i> 
                                <%= Html.Kendo().MobileButton()
                                    .HtmlAttributes(new { style = "font-size: 0.6em" })
                                    .Text("Small")
                                %>
                                <%
                            });

                            items.Add().Content(() =>
                            {
                                %>
                                <i></i> 
                                <%= Html.Kendo().MobileButton().Text("Normal") %> 
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                <i></i> 
                                <%= Html.Kendo().MobileButton()
                                    .HtmlAttributes(new { style = "font-size: 1.2em" })
                                    .Text("Large")
                                %> 
                                <%
                            });
                        });
                        
                        root.Add().Text("Button icons / check help for more").Items(items =>
                        {
                            items.Add().Content(() =>
                            {
                                %>
                                <i></i> 
                                <%= Html.Kendo().MobileButton()
                                    .Icon("featured")
                                    .Text("Featured")
                                %>
                                <%
                            });

                            items.Add().Content(() =>
                            {
                                %>
                                <i></i> 
                                <%= Html.Kendo().MobileButton()
                                    .Icon("toprated")
                                    .Text("Top Rated")
                                %>  
                                <%
                            });                            
                        });
                    })
                    .Render();                
            %>            
            <%
        })
        .Render();
%>

<style scoped>
    .buttonAppearance .km-button:not(.km-back)
    {
        width: 90%;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
</style>

</asp:Content>
