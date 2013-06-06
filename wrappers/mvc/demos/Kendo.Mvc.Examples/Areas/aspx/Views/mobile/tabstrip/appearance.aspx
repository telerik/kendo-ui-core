<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("tabstrip-gallery")
        .Layout("tabstrip-appearance")
        .Title("Gallery")
        .Content(() =>
        {
            %>
            <ul data-role="listview" data-style="inset">
                <li><h2>Boston</h2><img src="<%= Url.Content("~/content/mobile/overview/boston.jpg")%>" /></li>
                <li><h2>Ottawa</h2><img src="<%= Url.Content("~/content/mobile/overview/ottawa.jpg")%>" /></li>
                <li><h2>San Francisco</h2><img src="<%= Url.Content("~/content/mobile/overview/san-francisco.jpg")%>" /></li>
                <li><h2>Liverpool</h2><img src="<%= Url.Content("~/content/mobile/overview/liverpool.jpg")%>" /></li>
                <li><h2>London</h2><img src="<%= Url.Content("~/content/mobile/overview/london.jpg")%>" /></li>
            </ul>
            <%
        })
        .Render();
%>

<% Html.Kendo().MobileView()
        .Name("tabstrip-cities")
        .Layout("tabstrip-appearance")
        .Title("Cities")
        .Content(() =>
        {
            %>
            <ul data-role="listview" data-style="inset" data-type="group">
                <li>
                    Africa
                    <ul>
                        <li data-icon="toprated"><a>Nairobi</a></li>
                    </ul>
                </li>
                <li>
                    America
                    <ul>
                        <li data-icon="globe"><a>Boston</a></li>
                        <li data-icon="globe"><a>Ottawa</a></li>
                        <li data-icon="toprated"><a>San Francisco</a></li>
                    </ul>
                </li>
                <li>
                    Asia
                    <ul>
                        <li data-icon="globe"><a>Bombay</a></li>
                    </ul>
                </li>
                <li>
                    Australia
                    <ul>
                        <li data-icon="globe"><a>Melbourne</a></li>
                        <li data-icon="toprated"><a>Sydney</a></li>
                    </ul>
                </li>
                <li>
                    Europe
                    <ul>
                        <li data-icon="globe"><a>Cannes</a></li>
                        <li data-icon="globe"><a>Liverpool</a></li>
                        <li data-icon="toprated"><a>London</a></li>
                    </ul>
                </li>
            </ul>
            <%
        })
        .Render();
%>

<% Html.Kendo().MobileView()
        .Name("tabstrip-favourites")
        .Layout("tabstrip-appearance")
        .Title("Favourites")
        .Content(() =>
        {
            %>
            <ul data-role="listview" data-style="inset" data-type="group">
                <li>
                    Favourite Cities
                    <ul>
                        <li data-icon="toprated"><a>Nairobi</a></li>
                        <li data-icon="toprated"><a>San Francisco</a></li>
                        <li data-icon="toprated"><a>Sydney</a></li>
                        <li data-icon="toprated"><a>London</a></li>
                    </ul>
                </li>
            </ul>
            <%
        })
        .Render();
%>

<% Html.Kendo().MobileLayout()
    .Name("tabstrip-appearance")
    .HeaderHtmlAttributes(new { id = "tabstrip-appearance-header" })
    .Header(() =>
    {
        Html.Kendo().MobileNavBar()                                   
            .Content((navbar) => 
                {                                
                    %>                                
                    <%: navbar.ViewTitle("") %>                                
                    <%: Html.Kendo().MobileBackButton()
                            .Align(MobileButtonAlign.Left) 
                            .HtmlAttributes(new { @class = "nav-button" })
                            .Url(Url.RouteUrl(new { controller = "suite" }))
                            .Text("Back")
                    %>                                   
                    <%
                })
            .Render();                  
    })
    .Footer(() =>
    {
        %>
        <%: Html.Kendo().MobileTabStrip()
                .Name("custom-tabstrip")
                .Items(items => 
                {
                    items.Add().Icon("camera").Text("Gallery").Url("#tabstrip-gallery");
                    items.Add().Icon("globe").Text("Cities").Url("#tabstrip-cities");
                    items.Add().Icon("favorites").Text("Favourites").Url("#tabstrip-favourites");                  
                })
        %>
        <%
    })
    .Render();
%>

<style scoped>
    #custom-tabstrip,
    #tabstrip-appearance-header .km-navbar,
    #custom-tabstrip .km-state-active .km-icon,
    #tabstrip-appearance-header .km-navbar .km-button
    {
        background-color: #228b22;
    }
    
    #custom-tabstrip,
    #custom-tabstrip .km-button
    {
        background: url(<%= Url.Content("~/content/shared/images/patterns/pattern3.png") %>);
    }
	
	#tabstrip-appearance-header .km-navbar
    {
        background: -webkit-gradient(linear, 50% 0, 50% 100%, color-stop(0, rgba(255, 255, 255, 0.5)), color-stop(0.06, rgba(255, 255, 255, 0.45)), color-stop(0.5, rgba(255, 255, 255, 0.2)), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(1, rgba(100, 100, 100, 0))), url(<%= Url.Content("~/content/shared/images/patterns/pattern4.png") %>);
        background: -moz-linear-gradient(center top , rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.45) 6%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.15) 50%, rgba(100, 100, 100, 0)), url(<%= Url.Content("~/content/shared/images/patterns/pattern4.png") %>);
	}
	
    #tabstrip-appearance-header .km-navbar .km-button
    {
        background-color: rgba(131,81,42,.4);
    }

	#tabstrip-appearance-header .km-navbar .km-view-title,
	#tabstrip-appearance-header .km-navbar .km-text
	{
        color: #83512a;
        text-shadow: 0 1px 0 #fff;
	}
   
    #custom-tabstrip .km-text,
    #custom-tabstrip .km-icon
    {
    	color: #d9be8c;
    }
    
    #custom-tabstrip .km-state-active .km-text,
    #custom-tabstrip .km-state-active .km-icon
    {
    	color: #62cb62;
        background-color: transparent;
    }

    .km-ios #tabstrip-gallery .km-listview .km-list, 
    .km-ios #tabstrip-cities .km-listview .km-list, 
    .km-ios #tabstrip-favourites .km-listview .km-list
    {
    	border: none;
    }
    
    .km-ios #custom-tabstrip .km-button:active,
    .km-ios #custom-tabstrip .km-state-active {
    	box-shadow: inset 0 0 20px #230e04;
    }
    
    #tabstrip-gallery .km-insetcontent,
    #tabstrip-cities .km-insetcontent,
    #tabstrip-favourites .km-insetcontent
    {
        color: #000;
        background: url(<%= Url.Content("~/content/shared/images/patterns/pattern4.png") %>);
    }

    #custom-tabstrip .km-state-active
    {
        background-color: transparent;
    }

    #tabstrip-gallery h2 {
        display: inline-block;
        font-size: 1.1em;
        margin: 1em 0 1.5em 1em;
    }

    #tabstrip-gallery img {
	    float: left;
        width: 4em;
        height: 4em;
        margin: 0;
        -webkit-box-shadow: 0 1px 3px #333;
        box-shadow: 0 1px 3px #333;
        -webkit-border-radius: 8px;
        border-radius: 8px;
    }
</style>

</asp:Content>
