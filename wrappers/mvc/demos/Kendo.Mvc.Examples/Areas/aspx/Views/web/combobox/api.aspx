<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="configuration-horizontal">
    <div class="config-section">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            <button id="enable" class="k-button">Enable</button> <button id="disable" class="k-button">Disable</button>
        </li>
        <li>
            <button id="readonly" class="k-button">Readonly</button>
        </li>
        <li>
            <button id="open" class="k-button">Open</button> <button id="close" class="k-button">Close</button>
        </li>
        <li>
            <button id="getValue" class="k-button">Get value</button> <button id="getText" class="k-button">Get text</button>
        </li>
    </ul>
    </div>
    <div class="config-section">
    <span class="configHead">Filter</span>
    <ul class="options">
        <li>
            <select id="filter">
                <option value="none">None</option>
                <option value="startswith">Starts with</option>
                <option value="contains">Contains</option>
                <option value="eq">Equal</option>
            </select>
        </li>
        <li>
            <input id="word" value="The" class="k-textbox" style="width: 149px; margin: 0;" />
        </li>
        <li>
            <button id="find" class="k-button">Find item</button>
        </li>
    </ul>
    </div>
    <div class="config-section">
    <span class="configHead">Select</span>
    <ul class="options">
        <li>
            <input id="index" value="0" class="k-textbox" style="width: 40px; margin: 0;" /> <button id="select" class="k-button">Select by index</button>
        </li>
        <li>
            <input id="value" value="1" class="k-textbox" style="width: 40px; margin: 0;" /> <button id="setValue" class="k-button">Select by value</button>
        </li>
    </ul>
    </div>
</div>

<div class="demo-section">
    <label for="movies">Select movie: </label>
    <%= Html.Kendo().ComboBox()
        .Name("movies")
        .DataTextField("Text")
        .DataValueField("Value")
        .HtmlAttributes(new { style = "width: 250px" })
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
                    .attr("id", "movies_wrapper");

        $("#filter").kendoDropDownList({
            change: filterTypeOnChanged
        });

        var combobox = $("#movies").data("kendoComboBox"),
            setValue = function(e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                    combobox.value($("#value").val());
            },
            setIndex = function(e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    var index = parseInt($("#index").val());
                    combobox.select(index);
                }
            },
            setSearch = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                    combobox.search($("#word").val());
            };

        $("#enable").click(function() {
            combobox.enable();
        });

        $("#disable").click(function() {
            combobox.enable(false);
        });

        $("#readonly").click(function () {
            combobox.readonly();
        });

        $("#open").click(function() {
            combobox.open();
        });

        $("#close").click(function() {
            combobox.close();
        });

        $("#getValue").click(function() {
            alert(combobox.value());
        });

        $("#getText").click(function() {
            alert(combobox.text());
        });

        $("#setValue").click(setValue);
        $("#value").keypress(setValue);

        $("#select").click(setIndex);
        $("#index").keypress(setIndex);

        $("#find").click(setSearch);
        $("#word").keypress(setSearch);

        function filterTypeOnChanged() {
            combobox.options.filter = $("#filter").val();
        }
    });
</script>
<style scoped>
    .configuration .k-textbox {
        width: 40px;
    }
    .demo-section {
        width: 660px;
        padding: 30px;
        text-align: center;
    }
    .k-button {
        min-width: 80px;
    }
    .configuration-horizontal .options li {
        padding: 3px 0;
    }
</style>
</asp:Content>