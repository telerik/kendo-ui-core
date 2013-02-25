<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="configuration k-widget k-header" style="width: 210px">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            <button id="enable" class="k-button">Enable</button> or <button id="disable" class="k-button">Disable</button>
        </li>
        <li>
            <button id="open" class="k-button">Open</button> or <button id="close" class="k-button">Close</button> the drop-down
        </li>
        <li>
            <button id="getValue" class="k-button">Get value</button>
        </li>
        <li>
            <label for="filter" style="display: block; ">Filter type:</label>
            <select id="filter" style="width: 120px; float: right; margin-bottom: 3px; margin-top: -3px;">
                <option value="startswith">Starts with</option>
                <option value="contains">Contains</option>
                <option value="eq">Equal</option>
            </select>
        </li>
        <li>
            <input id="word" value="The" class="k-textbox" /> <button id="find" class="k-button">Find item</button>
        </li>
        <li>
            <input id="value" value="1,2" class="k-textbox" /> <button id="setValue" class="k-button">Set value</button>
        </li>
    </ul>
</div>

<div class="demo-section">
<%= Html.Kendo().MultiSelect()
    .Name("movies")
    .BindTo(new List<SelectListItem>()
    {
        new SelectListItem() {
        Text = "12 Angry Men", Value ="1"
        },
        new SelectListItem() {
        Text = "Il buono, il brutto, il cattivo.", Value ="2"
        },
        new SelectListItem() {
        Text = "Inception", Value ="3"
        },
        new SelectListItem() {
        Text = "One Flew Over the Cuckoo's Nest", Value ="4"
        },
        new SelectListItem() {
        Text = "Pulp Fiction", Value ="5"
        },
        new SelectListItem() {
        Text = "Schindler's List", Value ="6"
        },
        new SelectListItem() {
        Text = "The Dark Knight", Value ="7"
        },
        new SelectListItem() {
        Text = "The Godfather", Value ="8"
        },
        new SelectListItem() {
        Text = "The Godfather: Part II", Value ="9"
        },
        new SelectListItem() {
        Text = "The Shawshank Redemption", Value ="10"
        },
        new SelectListItem() {
        Text = "The Shawshank Redemption 2", Value ="10"
        }
    })
%>
</div>

<script>
    $(document).ready(function() {
        $("#movies").closest(".k-widget")
                    .attr("id", "products_wrapper");

        $("#filter").kendoDropDownList({
            change: filterTypeOnChanged
        });

        var multiselect = $("#movies").data("kendoMultiSelect"),
            setValue = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                    multiselect.value($("#value").val().split(","));
            },
            setSearch = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                    multiselect.search($("#word").val());
            };

        $("#enable").click(function() {
            multiselect.enable();
        });

        $("#disable").click(function() {
            multiselect.enable(false);
        });

        $("#open").click(function() {
            multiselect.open();
        });

        $("#close").click(function() {
            multiselect.close();
        });

        $("#getValue").click(function() {
            alert(multiselect.value());
        });

        $("#setValue").click(setValue);
        $("#value").keypress(setValue);

        $("#find").click(setSearch);
        $("#word").keypress(setSearch);

        function filterTypeOnChanged() {
            multiselect.options.filter = $("#filter").val();
        }
    });
</script>
<style scoped>
    .configuration .k-textbox {
        width: 40px;
    }
    .demo-section {
        float: left;
        width: 450px;
        margin-left: 0;
    }
</style>
</asp:Content>
