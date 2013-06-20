<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("switch-home")        
        .Title("User Settings")
        .Content(() =>
        {
            %>
            <% Html.Kendo().MobileListView().Type("group").Style("inset")
                   .Items(root => {
                       root.Add().Text("Profile").Items(items => 
                           {
                               items.Add().Content(() =>
                               {
                                   %>
                                   <h2>Eduardo <span>Saavedra</span></h2><img src="<%= Url.Content("~/content/mobile/overview/eduardo.jpg") %>" />
                                   <%
                               });
                               
                               items.Add().Text("Brand Manager at Marketing Team");
                           });
                       
                        root.Add().Text("Password").Items(items => 
                           {
                               items.Add().Content(() =>
                               {
                                   %>
                                   User cannot change pasword
                                   <%: Html.Kendo().MobileSwitch()
                                            .Name("email-switch")
                                            .Checked(true)
                                   %>
                                   <%
                               });
                               
                               items.Add().Content(() =>
                               {
                                   %>
                                   Password never expires 
                                   <%: Html.Kendo().MobileSwitch()
                                        .Name("wink-switch")                                
                                   %>
                                   <%
                               });
                           });
                          
                        root.Add().Text("Newsletter Subscription").Items(items => 
                           {
                               items.Add().Content(() =>
                               {
                                   %>
                                    Subscribed
                                    <%: Html.Kendo().MobileSwitch()
                                            .Name("subscription-switch")
                                            .Checked(true)
                                            .OnLabel("YES")
                                            .OffLabel("NO")
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
    #switch-home h2 {
        display: inline-block;
        font-size: 1.1em;
        margin: 1.5em 0 0 1em;
    }
    #switch-home h2 span {
        display: block;
        clear: both;
        font-size: 2em;
        margin: .2em 0 0 0;
    }
    #switch-home img {
        width: 5em;
        height: 5em;
        float: left;
        margin: 1em;
        -webkit-box-shadow: 0 1px 3px #333;
        box-shadow: 0 1px 3px #333;
        -webkit-border-radius: 8px;
        border-radius: 8px;
    }
</style>
</asp:Content>
