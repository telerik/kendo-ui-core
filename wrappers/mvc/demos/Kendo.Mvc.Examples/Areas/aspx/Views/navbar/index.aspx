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
                        <%: Html.Kendo().MobileBackButton()
                                .Align(MobileButtonAlign.Left) 
                                .HtmlAttributes(new { @class = "nav-button" })
                                .Url(Url.RouteUrl(new { controller = "suite" }))
                                .Text("Back")
                        %>    
                        <%: navbar.ViewTitle("") %>                        
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
            <% Html.Kendo().MobileListView()
                   .Items(items => {
                       items.Add().Content(() =>
                       {
                           %>
                           <h2>Francisco Chang</h2><img src="<%=Url.Content("~/content/mobile/overview/francisco.jpg")%>" />
                           <%
                       });
                       
                       items.Add().Content(() =>
                       {
                           %>
                           <h2>Daniel Tonini</h2><img src="<%=Url.Content("~/content/mobile/overview/daniel.jpg")%>" />
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
                           <h2>Carine Schmitt</h2><img src="<%=Url.Content("~/content/mobile/overview/carine.jpg")%>" />
                           <%
                       });
                       
                       items.Add().Content(() =>
                       {
                           %>
                           <h2>Ann Devon</h2><img src="<%=Url.Content("~/content/mobile/overview/ann.jpg")%>" />
                           <%
                       });
                                                      
                       items.Add().Content(() =>
                       {
                           %>
                           <h2>Catherine Dewey</h2><img src="<%=Url.Content("~/content/mobile/overview/catherine.jpg")%>" />
                           <%
                       });
                       
                       items.Add().Content(() =>
                       {
                           %>
                           <h2>Diego Roel</h2><img src="<%=Url.Content("~/content/mobile/overview/diego.jpg")%>" />
                           <%
                       });
                           
                       items.Add().Content(() =>
                       {
                           %>
                           <h2>Elizabeth Brown</h2><img src="<%=Url.Content("~/content/mobile/overview/elizabeth.jpg")%>" />
                           <%
                       });
                       
                       items.Add().Content(() =>
                       {
                           %>
                           <h2>Eduardo Saavedra</h2><img src="<%=Url.Content("~/content/mobile/overview/eduardo.jpg")%>" />
                           <%
                       });
                       
                       items.Add().Content(() =>
                       {
                           %>
                           <h2>Antonio Moreno</h2><img src="<%=Url.Content("~/content/mobile/overview/antonio.jpg")%>" />
                           <%
                       });
                       
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
                   })
                   .Render();
            %>           
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
                        <%: Html.Kendo().MobileBackButton()
                                .Align(MobileButtonAlign.Left) 
                                .HtmlAttributes(new { @class = "nav-button" })
                                .Url(Url.RouteUrl(new { controller = "suite" }))
                                .Text("Back")
                        %>
                        <%: navbar.ViewTitle("Contacts") %>                        
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
    
    .km-flat #navbar-home img,
    .km-flat #navbar-grouped img {
        -webkit-box-shadow: 0 0 0 1px rgba(0,0,0,.1);
        box-shadow: 0 0 0 1px rgba(0,0,0,.1);
        -webkit-border-radius: 4px;
        border-radius: 4px;
    }

    .km-ios #navbar-home .km-listview,
    .km-ios #navbar-grouped .km-list {
        background-color: #eaf1f5;
    }
</style>

</asp:Content>
