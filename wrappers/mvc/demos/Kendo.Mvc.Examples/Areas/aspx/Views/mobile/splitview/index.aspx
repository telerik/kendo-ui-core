<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileSplitView()
       .Panes(panes => 
       {
           panes.Add().Transition("slide").Layout("side-default")
               .Content(() =>
                {
                    %>
                    <% Html.Kendo().MobileView()
                           .Name("side-root")
                           .Title("Categories")
                           .Content(obj =>
                               Html.Kendo().MobileListView()
                                    .Style("inset")
                                    .Template("categoriesTemplate")
                                    .DataSource(dataSource => dataSource.Read("Categories", "SplitView"))
                            )
                           .Render();
                    %>

                    <script id="categoriesTemplate" type="text/x-kendo-template">
                        <a href="\#side-inbox?CategoryID=#: CategoryID#">#: CategoryName #</a>
                    </script>

                    <% Html.Kendo().MobileView()
                           .Name("side-inbox")
                           .Title("Products")
                           .Events(events => events.Show("filterProducts"))
                           .Content(obj =>
                               Html.Kendo().MobileListView()
                                    .Name("productsListView")
                                    .AutoBind(false)
                                    .Template("productsTemplate")
                                    .DataSource(dataSource => dataSource.Read("Products", "SplitView"))
                            )
                           .Render();
                    %>

                    <script id="productsTemplate" type="text/x-kendo-template">
                        <a href="\#orders?ProductID=#: ProductID #" data-target="main-pane">
                            <span class="date">$#: UnitPrice#</span>
                            <h3>#: ProductName #</h3>
                            <span class="excerpt">#: QuantityPerUnit #</span>
                        </a>
                    </script>

                    <% Html.Kendo().MobileLayout()
                           .Name("side-default")
                           .Events(events => events.Show("toggleBackButton"))
                           .Header(() =>
                            {
                                %>
                                <% Html.Kendo().MobileNavBar()
                                        .Content(navbar =>
                                        {
                                            %>                                           
                                            <%: Html.Kendo().MobileBackButton()
                                                    .Name("back-button")
                                                    .Align(MobileButtonAlign.Left) 
                                                    .HtmlAttributes(new { @class = "nav-button" })                                                    
                                                    .Text("Back")
                                            %> 
                                            <%:navbar.ViewTitle("") %>
                                            <%
                                        })
                                        .Render();
                                %>
                                <%
                            })
                            .Render();
                    %>
                    <%
                });

           panes.Add().Layout("main-default").Id("main-pane")
               .Content(() =>
                {
                    %>

                    <% Html.Kendo().MobileView()
                           .Title("Orders")
                           .Content("No product selected")
                           .Render();
                    %>

                    <script type="text/x-kendo-template" id="ordersTemplate">
                        <dl>
                            <dt>Discount</dt>
                            <dd>#: Discount #</dd>
                            <dt>Quantity</dt>
                            <dd>#: Quantity #</dd>
                            <dt>UnitPrice</dt>
                            <dd>#: UnitPrice #</dd>
                        </dl>
                    </script>

                    <% Html.Kendo().MobileView()
                           .Name("orders")
                           .Title("Orders")
                           .Events(events => events.Show("displayOrder"))
                           .Content(() =>
                            {
                                %>
                                <div id="product-details"></div>
                                <%
                            })
                           .Render();
                    %>

                    <% Html.Kendo().MobileLayout()
                           .Name("main-default")
                           .Events(events => events.Show("toggleBackButton"))
                           .Header(() =>
                            {
                                %>
                                <% Html.Kendo().MobileNavBar()
                                        .Content(navbar =>
                                        {
                                            %>                                            
                                            <%:navbar.ViewTitle("") %>                                            
                                            <%: Html.Kendo().MobileButton()
                                                    .Align(MobileButtonAlign.Right) 
                                                    .Target("_top")
                                                    .Url(Url.RouteUrl(new { controller = "suite" }))
                                                    .Text("Index")
                                            %>
                                            <%
                                        })
                                        .Render();
                                %>
                                <%
                            })
                            .Render();
                    %>
                    <%
                });
       })
       .Render();
%>

<script>
    var splitViewOrderDetails = new kendo.data.DataSource({
        type: "aspnetmvc-ajax",
        serverFiltering: true,
        transport: {
            read: {
                url: '<%=Url.Action("Order_Details", "SplitView") %>'
            }
        },
        schema: {
            data: "Data",
            total: "Total"
        },
        change: function () {
            var template = kendo.template($("#ordersTemplate").text());
            $("#product-details").html(kendo.render(template, this.data()));            
        }
    });

    function displayOrder(e) {
        splitViewOrderDetails.filter({
            field: "ProductID",
            operator: "eq",
            value: parseInt(e.view.params.ProductID)
        });        
    }

    function filterProducts(e) {        
        var splitViewProducts = $("#productsListView").data("kendoMobileListView").dataSource;

        splitViewProducts.filter({
            field: "CategoryID",
            operator: "eq",
            value: parseInt(e.view.params.CategoryID)
        });        
    }

    function toggleBackButton(e) {
        if (e.view.id === "#side-root") {
            e.view.element.find("[data-role=backbutton]").css("visibility", "hidden");
        } else {
            e.view.element.find("[data-role=backbutton]").css("visibility", "visible");
        }
    }
</script>

<style scoped>
    #side-inbox .date {
       float: right;
       color: rgba(200,200,200,.8);
       font-size: .7em;
       font-weight: normal;
    }

    #side-inbox .excerpt {
       clear: both;
       font-size: .7em;
       font-weight: normal;
    }

    #side-inbox .km-content h3 {
       margin-left: 0;
    }
    #main-pane .km-content{
    	padding: 30px;
    }

    #main-pane dl {
    	float: left;
    	margin: 0;
    	padding: 0 0 20px 0;
    }

    #main-pane dl:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }

    #main-pane dt, #main-pane dd {
    	display: block;
    	float: left;
    	margin: 0;
    	padding: 0;
    }

    #main-pane dt {
    	clear: left;
    	text-align: right;
    	padding: 0 10px;
    }
</style>

</asp:Content>
