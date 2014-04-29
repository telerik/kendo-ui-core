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
                       root.Add().Text("Default button styles").Items(items =>
                       {
                           items.Add().Content(() =>
                            {
                                %>
                                Contact Add
                                <%: Html.Kendo().MobileDetailButton().Style(MobileDetailButtonStyle.Contactadd) %>
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                Detail Disclose
                                <%: Html.Kendo().MobileDetailButton().Style(MobileDetailButtonStyle.Detaildisclose) %>
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                Row Insert
                                <%: Html.Kendo().MobileDetailButton().Style(MobileDetailButtonStyle.Rowinsert) %>
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                Row Delete
                                <%: Html.Kendo().MobileDetailButton().Style(MobileDetailButtonStyle.Rowdelete) %>
                                <%
                            });
                       });

                       root.Add().Text("Custom icons").Items(items =>
                       {
                           items.Add().Content(() =>
                            {
                                %>
                                More info
                                <%: Html.Kendo().MobileDetailButton().Icon("more")%>
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                Battery level
                                <%: Html.Kendo().MobileDetailButton().Icon("battery")%>
                                <%
                            });
                       });

                       root.Add().Text("Link Items &amp; Detail Buttons").Items(items =>
                       {
                           items.Add().Content(() =>
                            {
                                %>
                                Row Insert
                                <%: Html.Kendo().MobileDetailButton().Style(MobileDetailButtonStyle.Rowinsert) %>
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                Row Delete
                                <%: Html.Kendo().MobileDetailButton().Style(MobileDetailButtonStyle.Rowdelete) %>
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                More info
                                <%: Html.Kendo().MobileDetailButton().Icon("more")%>
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                Battery level
                                <%: Html.Kendo().MobileDetailButton().Icon("battery")%>
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

</asp:Content>
