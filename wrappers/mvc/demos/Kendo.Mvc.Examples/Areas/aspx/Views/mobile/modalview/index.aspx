<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("modalview-camera")
        .Title("HTML5 Camera")        
        .Content(() =>
        {
            %>            
            <img src="<%=Url.Content("~/content/mobile/modalview/lens.png")%>" class="camera-image" /><br />            
            <%: Html.Kendo().MobileButton()
                    .Text("Login")
                    .Name("modalview-open-button")
                    .Rel(MobileButtonRel.ModalView)
                    .Href("#modalview-login")
            %>
            <%
        })
        .Render();
%>

<% Html.Kendo().MobileModalView()
       .Name("modalview-login")
       .HtmlAttributes(new { style = "width: 95%; height: 18em;"  })
       .Header(() => 
        {
            %>
            <% Html.Kendo().MobileNavBar()
                   .Content(() =>
                    {
                        %>
                        <span>Login</span>
                        <%: Html.Kendo().MobileButton()
                                .Text("Cancel")
                                .Align(MobileButtonAlign.Right)
                                .Events(events => events.Click("closeModalViewLogin"))
                        %>
                        <%
                    })
                   .Render();
            %>
            <%
        })
        .Content(() =>
        {
            %>
            <ul data-role="listview" data-style="inset">
                <li><label for="username">Username:</label> <input type="text" id="username" /></li>
                <li><label for="password">Password:</label> <input type="password" id="password" /></li>
            </ul>
            <%: Html.Kendo().MobileButton()
                    .Text("Login")
                    .Name("modalview-login-button")
                    .Events(events => events.Click("closeModalViewLogin"))
            %>
            <%: Html.Kendo().MobileButton()
                    .Text("Register")
                    .Name("modalview-reg-button")
                    .Events(events => events.Click("closeModalViewLogin"))
            %>
            <%           
        })
       .Render();
%>

<style scoped>
    #modalview-login-button,
    #modalview-reg-button,
    #modalview-open-button {
        display: block;
        text-align: center;
        margin: .6em .8em 0;
        font-size: 1.2em;
    }

    #modalview-open-button {
        margin: 0 3em;
        padding: .5em;
    }

    #modalview-camera {
        text-align: center;
    }

    #modalview-camera img {
        display: block;
        margin: 30px auto;
    }

    #modalview-camera .km-content,
    .km-ios #modalview-login .km-content {
        background: url(<%=Url.Content("~/content/shared/images/patterns/pattern1.png")%>) repeat 0 0;
    }

    .km-ios #modalview-camera .km-button,
    .km-ios #modalview-login .km-button,
    .km-ios #modalview-camera .km-navbar,
    .km-ios #modalview-login .km-header {
        background-color: #000;
    }

    .km-ios #modalview-camera .km-button:active,
    .km-ios #modalview-camera .km-state-active,
    .km-ios #modalview-login .km-button:active,
    .km-ios #modalview-login .km-state-active {
        background-color: #2e2e2e;
    }

    .km-ios #modalview-login #modalview-login-button {
        background-color: Green;
    }

    .km-tablet .km-ios #modalview-camera .km-view-title, .km-tablet .km-ios #modalview-login .km-view-title {
        color: #fff;
        text-shadow: 0 -1px rgba(0,0,0,.5);
    }

</style>

<script>
    function closeModalViewLogin() {
        $("#modalview-login").kendoMobileModalView("close");
    }
</script>

</asp:Content>
