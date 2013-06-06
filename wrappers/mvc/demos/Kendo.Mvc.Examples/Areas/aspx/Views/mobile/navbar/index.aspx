<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("navbar-home")        
        .Title("Us")
        .Header(() =>
        {
            %>
            <% Html.Kendo().MobileNavBar()
                   .Content(navbar => 
                    {
                        %>
                        <a id="A1" class="nav-button" data-align="left" data-role="backbutton">Back</a>
                        <%: navbar.ViewTitle("") %>
                        <a data-align="right" data-role="button" class="nav-button" href="#index">Index</a>                        
                        <%: Html.Kendo().MobileButton()
                                .Align(MobileButtonAlign.Right)
                                .Icon("organize")
                                .Text("Group")
                                .Url("#navbar-grouped")
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
            <ul data-role="listview">
                <li><h2>Francisco Chang</h2><img src="<%=Url.Content("~/content/mobile/overview/francisco.jpg")%>" /></li>
                <li><h2>Daniel Tonini</h2><img src="<%=Url.Content("~/content/mobile/overview/daniel.jpg")%>" /></li>
                <li><h2>Annette Roulet</h2><img src="<%=Url.Content("~/content/mobile/overview/annette.jpg")%>" /></li>
                <li><h2>Carine Schmitt</h2><img src="<%=Url.Content("~/content/mobile/overview/carine.jpg")%>" /></li>
                <li><h2>Ann Devon</h2><img src="<%=Url.Content("~/content/mobile/overview/ann.jpg")%>" /></li>
                <li><h2>Catherine Dewey</h2><img src="<%=Url.Content("~/content/mobile/overview/catherine.jpg")%>" /></li>
                <li><h2>Diego Roel</h2><img src="<%=Url.Content("~/content/mobile/overview/diego.jpg")%>" /></li>
                <li><h2>Elizabeth Brown</h2><img src="<%=Url.Content("~/content/mobile/overview/elizabeth.jpg")%>" /></li>
                <li><h2>Eduardo Saavedra</h2><img src="<%=Url.Content("~/content/mobile/overview/eduardo.jpg")%>" /></li>
                <li><h2>Antonio Moreno</h2><img src="<%=Url.Content("~/content/mobile/overview/antonio.jpg")%>" /></li>
                <li><h2>Felipe Izquierdo</h2><img src="<%=Url.Content("~/content/mobile/overview/felipe.jpg")%>" /></li>
                <li><h2>Fran Wilson</h2><img src="<%=Url.Content("~/content/mobile/overview/fran.jpg")%>" /></li>
            </ul>
            <%
        })
        .Render();
%>

<% Html.Kendo().MobileView()
        .Name("navbar-grouped")
        .Title("Contacts")
        .Header(() =>
        {
            %>
            <% Html.Kendo().MobileNavBar()
                   .Content(navbar => 
                    {
                        %>
                        <a id="A2" class="nav-button" data-align="left" data-role="backbutton">Back</a>
                        <%: navbar.ViewTitle("Contacts") %>
                        <a data-align="right" data-role="button" class="nav-button" href="#index">Index</a>                        
                        <%: Html.Kendo().MobileButton()
                                .Align(MobileButtonAlign.Right)
                                .Icon("stop")
                                .Text("Ungroup")
                                .Url("#navbar-home")
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
            <ul data-role="listview" data-type="group">
                <li>
                    A
                    <ul>
                        <li><h2>Ann Devon</h2><img src="<%=Url.Content("~/content/mobile/overview/ann.jpg")%>" /></li>
                        <li><h2>Annette Roulet</h2><img src="<%=Url.Content("~/content/mobile/overview/annette.jpg")%>" /></li>
                        <li><h2>Antonio Moreno</h2><img src="<%=Url.Content("~/content/mobile/overview/antonio.jpg")%>" /></li>
                    </ul>
                </li>
                <li>
                    C
                    <ul>
                        <li><h2>Carine Schmitt</h2><img src="<%=Url.Content("~/content/mobile/overview/carine.jpg")%>" /></li>
                        <li><h2>Catherine Dewey</h2><img src="<%=Url.Content("~/content/mobile/overview/catherine.jpg")%>" /></li>
                    </ul>
                </li>
                <li>
                   D
                    <ul>
                        <li><h2>Daniel Tonini</h2><img src="<%=Url.Content("~/content/mobile/overview/daniel.jpg")%>" /></li>
                        <li><h2>Diego Roel</h2><img src="<%=Url.Content("~/content/mobile/overview/diego.jpg")%>" /></li>
                    </ul>
                </li>
                <li>
                    E
                    <ul>
                        <li><h2>Eduardo Saavedra</h2><img src="<%=Url.Content("~/content/mobile/overview/eduardo.jpg")%>" /></li>
                        <li><h2>Elizabeth Brown</h2><img src="<%=Url.Content("~/content/mobile/overview/elizabeth.jpg")%>" /></li>
                    </ul>
                </li>
                <li>
                    F
                    <ul>
                        <li><h2>Felipe Izquierdo</h2><img src="<%=Url.Content("~/content/mobile/overview/felipe.jpg")%>" /></li>
                        <li><h2>Fran Wilson</h2><img src="<%=Url.Content("~/content/mobile/overview/fran.jpg")%>" /></li>
                        <li><h2>Francisco Chang</h2><img src="<%=Url.Content("~/content/mobile/overview/francisco.jpg")%>" /></li>
                    </ul>
                </li>
            </ul>
            <%
        })
        .Render();
%>

<style scoped>
    #navbar-home h2,
    #navbar-grouped h2 {
        display: inline-block;
        font-size: 1.1em;
        margin: 1em 0 1.5em 1em;
    }

    #navbar-home img,
    #navbar-grouped img {
	    float: left;
        width: 4em;
        height: 4em;
        margin: 0;
        -webkit-box-shadow: 0 1px 3px #333;
        box-shadow: 0 1px 3px #333;
        -webkit-border-radius: 8px;
        border-radius: 8px;
    }

    .km-ios #navbar-home .km-listview,
    .km-ios #navbar-grouped .km-list {
        background-color: #eaf1f5;
    }
</style>

</asp:Content>
