<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()                
        .Name("view-transitions")
        .Title("Camera App")
        .Content(() =>
        {
            %>
            <img src="../../content/mobile/shared/color-lens.png" class="camera-image" /><br />
            <% Html.Kendo().MobileButton()
                   .Name("signUp")
                   .Text("Login/Sign-up")
                   .HtmlAttributes(new { @class = "transitions-button" })
                   .Href("#view-transitions-login")
                   .Render();
            %>
            <%
        })
        .Render();
%>

<% Html.Kendo().MobileView()
        .Layout("examples")
        .Name("view-transitions-login")
        .Transition("overlay:up")        
        .Title("Login/Sign-up")
        .Content(() =>
        {
            %>
            <img src="../../content/mobile/shared/color-lens.png" class="camera-image" /><br />

            <ul data-role="listview" data-style="inset">
                <li><label for="username">Username:</label> <input type="text" id="username" /></li>
                <li><label for="password">Password:</label> <input type="password" id="password" /></li>
            </ul>         
            <% Html.Kendo().MobileButton()
                   .Name("login")
                   .Text("Login")
                   .Transition("overlay:down reverse")
                   .HtmlAttributes(new { @class = "transitions-button" })
                   .Href("#view-transitions-welcome")
                   .Render();
            %>
            <br />
            <% Html.Kendo().MobileButton()
                   .Name("cancel")
                   .Text("Cancel")
                   .Transition("overlay:up reverse")
                   .HtmlAttributes(new { @class = "transitions-cancel" })
                   .Href("#view-transitions")
                   .Render();
            %>            
            <%
        })
        .Render();
%>

<% Html.Kendo().MobileView()
        .Layout("examples")
        .Name("view-transitions-welcome")
        .Title("Welcome")
        .Content(() =>
        {
            %>
            <img src="../../content/mobile/modalview/lens.png" class="camera-image" /><br />            
            <% Html.Kendo().MobileButton()
                   .Name("SignOut")
                   .Text("Sign out")
                   .Transition("slide:right")
                   .HtmlAttributes(new { @class = "transitions-button" })
                   .Href("#view-transitions")
                   .Render();
            %>
            <%
        })
        .Render();
%>
<style scoped>
    .transitions-button,
    .transitions-cancel {
        display: block;
        text-align: center;
        margin: .6em .8em 0;
        font-size: 1.2em;
    }

    #view-transitions,
    #view-transitions-welcome p {
    	color: #fff;
        text-align: center;
    }

    #view-transitions img,
    #view-transitions-welcome img {
        display: block;
        margin: 30px auto;
    }
    
    #view-transitions .km-content,
    #view-transitions-login .km-content,
    #view-transitions-welcome .km-content {
        background: url(../../content/shared/images/patterns/pattern1.png) repeat 0 0;
    }

    .km-ios #view-transitions-welcome .km-button {
        background-color: DarkRed;
    }
    
    .km-ios #view-transitions-login .km-button {
        background-color: Green;
    }
    
    .km-ios #view-transitions .km-button,
    .km-ios #view-transitions-login .transitions-cancel {
        background-color: #000;
    }
    
    .km-ios #view-transitions .km-navbar,
    .km-ios #view-transitions-login .km-navbar,
    .km-ios #view-transitions-welcome .km-navbar {
        background-color: #000;
    }
</style>

</asp:Content>
