<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <%:Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(e => e.FirstName);
            columns.Bound(e => e.LastName);
            columns.Bound(e => e.Title);
            columns.Command(command => command.Custom("ViewDetails").Click("showDetails"));
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("CustomCommand_Read", "Grid"))
         )
    %>

    <%: Html.Kendo().Window().Name("Details")
        .Title("Customer Details")
        .Visible(false)
        .Modal(true)
        .Draggable(true)
        .Width(300)       
    %>

     <script type="text/x-kendo-template" id="template">
        <div id="details-container">
            <h2>#= FirstName # #= LastName #</h2>
            <em>#= Title #</em>
            <dl>
                <dt>City: #= City #</dt>
                <dt>Address: #= Address #</dt>
            </dl>
        </div>
    </script>

    <script type="text/javascript">
        var detailsTemplate = kendo.template($("#template").html());

        function showDetails(e) {
            e.preventDefault();
            
            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
            var wnd = $("#Details").data("kendoWindow");

            wnd.content(detailsTemplate(dataItem));
            wnd.center().open();
        }
    </script>
</asp:Content>
