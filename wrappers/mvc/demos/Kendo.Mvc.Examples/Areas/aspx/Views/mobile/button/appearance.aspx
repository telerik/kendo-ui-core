<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()                
        .Title("Button Appearance")
        .HtmlAttributes(new { @class = "buttonAppearance" })
        .Content(() =>
        {
            %>
            <ul data-role="listview" data-type="group" data-style="inset">
                <li>
                    Background color
                    <ul>
                        <li>
                            <i></i> 
                            <%= Html.Kendo().MobileButton()
                                    .HtmlAttributes(new { style = "background-color: green" })
                                    .Text("Green")                                    
                            %>                            
                        </li>
                        <li>
                            <i></i>
                            <%= Html.Kendo().MobileButton()
                                    .HtmlAttributes(new { style = "background-color: darkred" })
                                    .Text("Red")
                            %> 
                        </li>
                    </ul>
                </li>
                <li>
                    Font Size
                    <ul>
                        <li>
                            <i></i>
                            <%= Html.Kendo().MobileButton()
                                    .HtmlAttributes(new { style = "font-size: 0.6em" })
                                    .Text("Small")
                            %> 
                        </li>
                        <li>
                            <i></i> 
                            <%= Html.Kendo().MobileButton().Text("Normal") %> 
                        </li>
                        <li>
                            <i></i>
                            <%= Html.Kendo().MobileButton()
                                    .HtmlAttributes(new { style = "font-size: 1.2em" })
                                    .Text("Large")
                            %> 
                        </li>
                    </ul>
                </li>
                <li>
                    Button icons / check help for more
                    <ul>
                        <li>
                            <i></i>
                            <%= Html.Kendo().MobileButton()
                                    .Icon("featured")
                                    .Text("Featured")
                            %> 
                        </li>
                        <li>
                            <i></i>
                            <%= Html.Kendo().MobileButton()
                                    .Icon("toprated")
                                    .Text("Top Rated")
                            %> 
                        </li>
                    </ul>
                </li>
            </ul>
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
