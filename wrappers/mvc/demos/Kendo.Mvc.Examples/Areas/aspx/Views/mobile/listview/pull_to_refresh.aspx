<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
       .Title("Pull to refresh")
       .Header(() =>
        {
            Html.Kendo().MobileNavBar()
                .Name("navbar")                        
                .Content((navbar) => 
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
                                .Icon("add")         
                                .Rel(MobileButtonRel.ModalView)                       
                                .Url("#modalview-add")                                
                        %>                    
                        <%
                    })
                .Render();                  
        })       
       .Content(() => 
        {
            %>            
            <%: Html.Kendo().MobileListView<Kendo.Mvc.Examples.Models.ProductViewModel>() 
                    .Name("pull-to-refresh-listview")
                    .TemplateId("pull-to-refresh-template")
                    .PullToRefresh(true)                    
                    .DataSource(dataSource => 
                        dataSource
                            .Read("Pull", "ListView")                         
                            .PageSize(40)                            
                    )
            %>

            <%
        })
       .Render();
%>

<% Html.Kendo().MobileModalView()
       .Name("modalview-add")
       .HtmlAttributes(new { style = "width: 85%; height: 12em;" })
       .Header(() =>
        {
           %>   
           <%Html.Kendo().MobileNavBar()
                .Content(() =>
                {
                    %>
                    <span>Add New Product</span>
                    <%: Html.Kendo().MobileButton()
                            .Align(MobileButtonAlign.Right)
                            .Text("Cancel")
                            .Events(events => events.Click("closeModalViewAdd"))
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
                    .Style("inset")
                    .Items(items =>
                        items.Add().Content(() =>
                        {
                            %>
                            <label for="name">Product Name:</label> <input type="text" id="name" />
                            <%
                        })
                    )
                    .Render();
            %>

            <%: Html.Kendo().MobileButton()
                    .Text("Add Product")
                    .HtmlAttributes(new { @class = "addNew" })
                                .Events(events => events.Click("addNew"))
            %>            

            <%
        })
        .Render();        
%>

<script type="text/x-kendo-tmpl" id="pull-to-refresh-template">
    <div class="product-item">        
        <h3>#:ProductName#</h3>
        <p>#:kendo.toString(UnitPrice, "c")#</p>
    </div>
</script>

<script>    
    function closeModalViewAdd() {
        $("#modalview-add").kendoMobileModalView("close");
    }

    function addNew() {
        addProductDataSource.add({
            ProductName: $("#name").val(),
            UnitPrice: Math.floor((Math.random() * 10) + 1)
        });

        closeModalViewAdd();
    }

    var addProductDataSource = new kendo.data.DataSource({
        type: "aspnetmvc-ajax",
        transport: {
            create: {
                url: '<%=Url.Action("Create", "ListView") %>'
            }
        },
        schema: {
            model: {
                id: "ProductID",
                fields: {
                    ProductID: { editable: false, nullable: true },
                    ProductName: { type: "string" }
                }
            }
        },
        autoSync: true,
        requestEnd: function () {          
            $("#name").val("");
        }
    });
</script>

<style scoped>
    .product-item {
        font-size: 1.2;
    }
    .product-item h3 {
        float: left;
        margin: 0;
        padding: 0;
        height: 1.3em;
        overflow: hidden;
    }
    .product-item p {
        float: right;
        margin: 0;
        padding: 0;
    }
    .pullImage {
        width: 64px;
        height: 64px;
        border-radius: 3px;
        float: left;
        margin-right: 10px;
    }
    .addNew {
        display: block;
        text-align: center;
        margin: 0 3em;
        padding: .5em;
        font-size: 1.2em;
    }
</style>

</asp:Content>
