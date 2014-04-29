<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("two-drawer-home")
        .Title("Friends")
        .Header(() =>
        {
            %>
            <% Html.Kendo().MobileNavBar()
                   .Content(navbar => 
                    {
                        %>

                        <%: Html.Kendo().MobileButton()
                            .Align(MobileButtonAlign.Left)
                            .Icon("comments")
                            .Rel(MobileButtonRel.Drawer)
                            .Url("#left-drawer")
                        %> 

                        <%:navbar.ViewTitle("")%>

                        <%: Html.Kendo().MobileButton()
                            .Align(MobileButtonAlign.Right)
                            .Text("Index")
                            .HtmlAttributes(new { @class = "nav-button" })
                            .Url(Url.RouteUrl(new { controller = "suite" }))
                        %>

                        <%: Html.Kendo().MobileButton()
                            .Align(MobileButtonAlign.Right)
                            .Icon("share")
                            .Rel(MobileButtonRel.Drawer)
                            .Url("#right-drawer")
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
            <% Html.Kendo().MobileListView().Type("group")
                   .Items(root =>
                   {
                        root.Add().Text("A").Items(items =>
                        {
                            items.Add().Content(() =>
                            {
                                %>
                                <h2>Ann Devon</h2><img src="<%=Url.Content("~/content/mobile/overview/ann.jpg")%>" />
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                <h2>Annette Roulet</h2><img src="<%=Url.Content("~/content/mobile/overview/annette.jpg")%>" />
                                <%
                            });  
                            
                            items.Add().Content(() =>
                            {
                                %>
                                <h2>Antonio Moreno</h2><img src="<%=Url.Content("~/content/mobile/overview/antonio.jpg")%>" />
                                <%
                            });                           
                        });
                        
                        root.Add().Text("C").Items(items =>
                        {
                            items.Add().Content(() =>
                            {
                                %>
                                <h2>Carine Schmitt</h2><img src="<%=Url.Content("~/content/mobile/overview/carine.jpg")%>" />
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                <h2>Catherine Dewey</h2><img src="<%=Url.Content("~/content/mobile/overview/catherine.jpg")%>" />
                                <%
                            });                            
                        });
                        
                        root.Add().Text("D").Items(items =>
                        {
                            items.Add().Content(() =>
                            {
                                %>
                                <h2>Daniel Tonini</h2><img src="<%=Url.Content("~/content/mobile/overview/daniel.jpg")%>" />
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                <h2>Diego Roel</h2><img src="<%=Url.Content("~/content/mobile/overview/diego.jpg")%>" />
                                <%
                            });                            
                        });
                                
                        root.Add().Text("E").Items(items =>
                        {
                            items.Add().Content(() =>
                            {
                                %>
                                <h2>Eduardo Saavedra</h2><img src="<%=Url.Content("~/content/mobile/overview/eduardo.jpg")%>" />
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                <h2>Elizabeth Brown</h2><img src="<%=Url.Content("~/content/mobile/overview/elizabeth.jpg")%>" />
                                <%
                            });                            
                        });
                        
                        root.Add().Text("F").Items(items =>
                        {
                            items.Add().Content(() =>
                            {
                                %>
                                <h2>Felipe Izquierdo</h2><img src="<%=Url.Content("~/content/mobile/overview/felipe.jpg")%>" />
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                <h2>Fran Wilson</h2><img src="<%=Url.Content("~/content/mobile/overview/fran.jpg")%>" />
                                <%
                            });  
                            
                            items.Add().Content(() =>
                            {
                                %>
                                <h2>Francisco Chang</h2><img src="<%=Url.Content("~/content/mobile/overview/francisco.jpg")%>" />
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

<% Html.Kendo().MobileDrawer()
       .Name("left-drawer")
       .Title("Communities")
       .HtmlAttributes(new { style = "width: 270px" })
       .Views("two-drawer-home")
       .Header(() =>
        {
            %>
            <%  
            Html.Kendo().MobileNavBar()
                 .Content(navbar =>
                 {
                    %>
                    <%:navbar.ViewTitle("")%>
                    <%
                 })
                 .Render();
            %>
            <%
        })
        .Content(obj =>
            Html.Kendo().MobileListView()
                .Items(items =>
                {
                    items.Add().Icon("camera").Text("Nature Photography");
                    items.Add().Icon("camera").Text("Wildlife Photography");
                    items.Add().Icon("camera").Text("Night Photography");
                    items.Add().Icon("camera").Text("Fine Art Photography");
                    items.Add().Icon("camera").Text("Portrait Photography");
                    items.Add().Icon("printer").Text("3D Printing");
                    items.Add().Icon("camera").Text("CSS3 Community");
                    items.Add().Icon("camera").Text("HTML5 Community");
                    items.Add().Icon("camera").Text("Java User Groups");
                    items.Add().Icon("camera").Text("Graphic Design");
                    items.Add().Icon("camera").Text("Bodybuilding");
                    items.Add().Icon("camera").Text("JavaScript");
                    items.Add().Icon("camera").Text("C#");
                    items.Add().Icon("graph").Text("DataViz");
                })
        )
        .Render();
       
%>

<% Html.Kendo().MobileDrawer()
       .Name("right-drawer")
       .Title("Share")
       .HtmlAttributes(new { style = "width: 80px" })
       .Views("two-drawer-home")
       .Position(MobileDrawerPosition.Right)
       .Header(() =>
        {
            %>
            <%  
            Html.Kendo().MobileNavBar()
                 .Content(navbar =>
                 {
                    %>
                    <%:navbar.ViewTitle("")%>
                    <%
                 })
                 .Render();
            %>
            <%
        })
        .Content(() =>
        {
            %>
            <img src="<%:Url.Content("~/content/mobile/shared/share.png")%>" width="100%"/>
            <%
        })
        .Render();      
%>

<style>
    .km-ios #left-drawer .km-content, .km-android #left-drawer .km-content, .km-blackberry #left-drawer .km-content,
    .km-ios #left-drawer .km-list > li, .km-android #left-drawer .km-list > li, .km-blackberry #left-drawer .km-list > li,
    .km-ios #left-drawer .km-listview-link > .km-icon, .km-android #left-drawer .km-listview-link > .km-icon, .km-blackberry #left-drawer .km-listview-link > .km-icon,
    .km-ios #left-drawer .km-list li > .km-icon, .km-android #left-drawer .km-list li > .km-icon, .km-blackberry #left-drawer .km-list li > .km-icon,
    #right-drawer .km-content
    {
        background-color: #4e4e4e;
        color: #fff;
    }

    .km-ios #left-drawer .km-group-title,
    .km-blackberry #left-drawer .km-group-title
    {
        background-color: #6e6e6e;
        color: #fff;
    }

    #left-drawer .km-navbar, #right-drawer .km-navbar,
    .km-tablet .km-ios #left-drawer .km-view-title,
    .km-tablet .km-ios #right-drawer .km-view-title
    {
	background-color: #2e2e2e;
        color: #fff;
        text-shadow: 0 -1px rgba(0,0,0,.5);
    }

    .km-drawer-button:before, .km-drawer-button:after { content: "\E077"; }
    .km-contacts:before, .km-contacts:after { content: "\E0E4"; }
    .km-camera:before, .km-camera:after { content: "\E0D0"; }
    .km-printer:before, .km-printer:after { content: "\E07E"; }
    .km-comments:before, .km-comments:after { content: "\E093"; }
    .km-graph:before, .km-graph:after { content: "\E04B"; }


    #two-drawer-home h2
    {
        display: inline-block;
        font-size: 1em;
        line-height: 3em;
        margin: 0 0 0 1em;
    }

    #two-drawer-home img
    {
        float: left;
        width: 3em;
        height: 3em;
        margin: 0;
        border: 2px solid rgba(0,0,0,.1);
    }

    .km-ios #two-drawer-home .km-listview
    {
        background-color: #eaf1f5;
    }
</style>

</asp:Content>
