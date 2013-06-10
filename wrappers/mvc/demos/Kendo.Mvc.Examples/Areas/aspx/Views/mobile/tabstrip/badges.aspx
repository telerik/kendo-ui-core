<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("badges-profile")
        .Layout("mobile-tabstrip")
        .Title("Profile")
        .Events(events => events.Show("addTimer").Hide("removeTimer"))
        .Content(() =>
        {
            %>
            <% Html.Kendo().MobileListView().Style("inset").Type("group")
                   .Items(root =>
                   {
                       root.Add().Text("Profile").Items(items =>
                       {
                           items.Add().Content(() =>
                            {
                                %>
                                <h2>Carine <span>Callahan</span></h2><img src="<%=Url.Content("~/content/mobile/overview/carine.jpg") %>" />
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                Weekly average sales <span class="sales-up">$ 8,250</span>
                                <%
                            });
                                
                            items.Add().Content(() =>
                            {
                                %>
                                Monthly average sales <span class="sales-up">$ 32,000</span>
                                <%
                            });
                       });

                       root.Add().Text("Languages").Items(items =>
                       {
                           items.Add().Content(() =>
                            {
                                %>
                                English <span class="value">Native</span>
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                Hungarian <span class="value">Advanced</span>
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                French <span class="value">Advanced</span>
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                Chinese <span class="value">Beginner</span>
                                <%                                    
                            });
                       });

                       root.Add().Text("Sales commodity").Items(items =>
                       {
                           items.Add().Text("Beverages");
                           items.Add().Text("Condiments");
                           items.Add().Text("Confections");
                           items.Add().Text("Diary Products");
                           items.Add().Text("Grains/Cereals");
                           items.Add().Text("Meat/Poultry");
                           items.Add().Text("Produce");
                           items.Add().Text("Seafood");
                       });

                       root.Add().Text("PC Skills").Items(items =>
                       {
                           items.Add().Text("MS Word");
                           items.Add().Text("MS Excel");
                           items.Add().Text("MS Outlook");
                           items.Add().Text("MS PowerPoint");
                           items.Add().Text("MS Project");
                           items.Add().Text("Meat/Poultry");
                           items.Add().Text("Windows (XP, Vista)");
                           items.Add().Text("Internet");
                           items.Add().Text("SAP - Sales and Marketing Module");
                           items.Add().Text("MS Visual Studio");
                           items.Add().Text("Adobe Acrobat");
                           items.Add().Text("CorelDraw");
                       });
                   })
                   .Render();
            %>           
            <%
        })
        .Render();
%>

<% Html.Kendo().MobileView()
        .Name("badges-sales")
        .Layout("mobile-tabstrip")
        .Title("Sales History")
        .Events(events => events.Show("addTimer").Hide("removeTimer"))
        .Content(() =>
        {
            %>
            <% Html.Kendo().MobileListView().Style("inset").Type("group")
                   .Items(root =>
                   {
                       root.Add().Text("Sales 2011").Items(items =>
                       {
                           items.Add().Content(() =>
                            {
                                %>
                                January <span class="sales-up">&uarr; $ 35,000</span>
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>
                                February <span class="sales-down">&darr; $ 25,000</span>
                                <%
                            });
                                
                            items.Add().Content(() =>
                            {
                                %>
                                March <span class="sales-down">&darr; $ 23,000</span>
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>   
                                April <span class="sales-up">&uarr; $ 30,000</span>                             
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>     
                                May <span class="sales-up">&uarr; $ 31,000</span>                           
                                <%
                            });
                                
                            items.Add().Content(() =>
                            {
                                %>   
                                June <span class="sales-down">&darr; $ 29,000</span>                             
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>    
                                July <span class="sales-up">&uarr; $ 35,000</span>                            
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>     
                                August <span class="sales-up">&uarr; $ 37,000</span>                           
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>  
                                September <span class="sales-hold">&rarr; $ 37,000</span>                              
                                <%
                            });
                            
                            items.Add().Content(() =>
                            {
                                %>    
                                October <span class="sales-hold">&rarr; $ 37,000</span>                            
                                <%
                            });
                            
                             items.Add().Content(() =>
                            {
                                %>  
                                November <span class="sales-up">&uarr; $ 38,000</span>                              
                                <%
                            });
                            
                             items.Add().Content(() =>
                            {
                                %>      
                                December <span class="sales-up">&uarr; $ 40,000</span>                          
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

<% Html.Kendo().MobileLayout()
    .Name("mobile-tabstrip")
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
                .Name("badges-tabs")
                .Items(items => 
                {
                    items.Add().Icon("home").Text("Home").Url("#badges-profile");
                    items.Add().Icon("edit").Text("Mail").Url("#badges-sales").Badge("10");                  
                })
        %>
        <%
    })
    .Render();
%>

<script>
    var timer;

    function changeTabBadge() {
        var tabstrip = $("#badges-tabs").data("kendoMobileTabStrip");
        if (!tabstrip) {
            removeTimer();
            return;
        }

        tabstrip.badge("a:last", +tabstrip.badge("a:last") + 5);
    }

    function addTimer() {
        timer = setInterval(changeTabBadge, 1000);
    }

    function removeTimer() {
        clearInterval(timer);
    }
</script>

<style scoped>
    #tabstrip-profile h2 {
        display: inline-block;
        font-size: 1.1em;
        margin: 1.5em 0 0 1em;
    }
    #tabstrip-profile h2 span {
        display: block;
        clear: both;
        font-size: 2em;
        margin: .2em 0 0 0;
    }
    #tabstrip-profile img {
        width: 5em;
        height: 5em;
        float: left;
        margin: 1em;
        -webkit-box-shadow: 0 1px 3px #333;
        box-shadow: 0 1px 3px #333;
        -webkit-border-radius: 8px;
        border-radius: 8px;
    }
    .sales-down,
    .sales-hold,
    .sales-up,
    .value {
        float: right;
    }
    .sales-up { color: green; }
    .sales-down { color: red; }
    .sales-hold { color: blue; }
    .value { color: #bbb; }
</style>

</asp:Content>
