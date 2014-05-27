<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.CustomValidationProductViewModel>()
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(140);
            columns.Command(command => command.Edit()).Width(200);
        })
        .Editable(editable => editable.Mode(GridEditMode.InLine))
        .Pageable()
        .Scrollable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .Events(events => events.Error("error_handler"))
            .Model(model => model.Id(p => p.ProductID))
            .Read(read => read.Action("EditingCustomValidation_Read", "Grid"))
            .Update(update => update.Action("EditingCustomValidation_Update", "Grid"))
        )
    %>
    <script type="text/javascript">

        //register custom validation rules
        (function ($, kendo) {
            $.extend(true, kendo.ui.validator, {
                rules: { // custom rules
                    productnamevalidation: function (input, params) {
                        //check for the rule attribute 
                        if (input.filter("[data-val-productnamevalidation]").length && input.val()) {
                            return /^[A-Z]/.test(input.val());
                        }
                        return true;
                    }
                },
                messages: { //custom rules messages
                    productnamevalidation: function (input) {
                        // return the message text
                        return input.attr("data-val-productnamevalidation");
                    }
                }
            });
        })(jQuery, kendo);

        //show server errors if any
        function error_handler(e) {
            if (e.errors) {
                var message = "Errors:\n";
                $.each(e.errors, function (key, value) {
                    if ('errors' in value) {
                        $.each(value.errors, function () {
                            message += this + "\n";
                        });
                    }
                });
                alert(message);
            }
        }
    </script>
</asp:Content>
