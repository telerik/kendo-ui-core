<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <div id="example" class="k-content">
        <%= Html.Kendo().NumericTextBox()
                .Name("numerictextbox")
                .ClientEvents(e => {
                    e.OnChange("onChange")
                     .OnSpin("onSpin");
                })
        %>
        <script>
            function onChange() {
                kendoConsole.log("Change :: " + this.value());
            }

            function onSpin() {
                kendoConsole.log("Spin :: " + this.value());
            }
        </script>
    </div>
    <div class="console"></div>
</asp:Content>
