<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div class="configuration k-widget k-header" style="width: 200px;">
    <span class="configHead">Slider API Functions</span>
    <ul class="options">
        <li>
            <input type="text" id="newValue" value="1" class="k-textbox" />
            <button class="k-button" id="setSliderValue">Set value</button>
        </li>
        <li>
            <button class="k-button" id="getSliderValue">Get value</button>
        </li>
        <li>
            <button class="k-button" id="enableSlider">Enable</button> or <button class="k-button" id="disableSlider">Disable</button>
        </li>
    </ul>
    <span class="configTitle">RangeSlider API Functions</span>
    <ul class="options">
        <li>
            <input type="text" id="startValue" value="1" class="k-textbox" />
            <button class="k-button" id="setStartValue">Set selection start</button>
        </li>
        <li>
            <input type="text" id="endValue" value="1" class="k-textbox" />
            <button class="k-button" id="setEndValue">Set selection end</button>
        </li>
        <li>
            <button class="k-button" id="getRangeSliderValue">Get value</button>
        </li>
        <li>
            <button class="k-button" id="enableRangeSlider">Enable</button> or <button class="k-button" id="disableRangeSlider">Disable</button>
        </li>
    </ul>
</div>

<div id="wrapper" class="climateCtrl">
    <%= Html.Kendo().Slider()
            .Name("slider")
            .HtmlAttributes(new { @class = "temperature" })
    %>

    <%= Html.Kendo().RangeSlider()
            .Name("rangeslider")
            .HtmlAttributes(new { @class = "humidity" })
    %>
</div>
<script>
    $(document).ready(function () {
        var slider = $("#slider").data("kendoSlider"),
            rangeSlider = $("#rangeslider").data("kendoRangeSlider"),
            setValue = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    var value = parseInt($("#newValue").val(), 10);

                    if (isNaN(value) || value < 0 || value > 10) {
                        alert("Value must be a number between 0 and 10");
                        return;
                    }

                    slider.value(value);
                }
            },
            setStartValue = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    var startValue = parseInt($("#startValue").val(), 10);

                    if (isNaN(startValue) || startValue < 0 || startValue > 10) {
                        alert("Value must be a number between 0 and 10");
                        return;
                    }

                    var endValue = getValue()[1];
                    rangeSlider.value([startValue, endValue]);
                }
            },
            setEndValue = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    var startValue = getValue()[0];
                    var endValue = parseInt($("#endValue").val(), 10);

                    if (isNaN(endValue) || endValue < 0 || endValue > 10) {
                        alert("Value must be a number between 0 and 10");
                        return;
                    }

                    rangeSlider.values(startValue, endValue);
                }
            };

        $("#getSliderValue").click(function () {
            alert(slider.value());
        });

        $("#enableSlider").click(function () {
            slider.enable();
        });

        $("#disableSlider").click(function () {
            slider.disable();
        });

        function getValue() {
            return rangeSlider.value();
        }

        $("#setSliderValue").click(setValue);
        $("#newValue").keypress(setValue);

        $("#setStartValue").click(setStartValue);
        $("#startValue").keypress(setStartValue);

        $("#setEndValue").click(setEndValue);
        $("#endValue").keypress(setEndValue);

        $("#getRangeSliderValue").click(function () {
            alert(getValue());
        });

        $("#enableRangeSlider").click(function () {
            rangeSlider.enable();
        });

        $("#disableRangeSlider").click(function () {
            rangeSlider.disable();
        });
    });
</script>

<style>
    .climateCtrl {
        display: inline-block;
        width: 245px;
        height: 167px;
        margin: 20px 20px 20px 40px;
        padding: 102px 0 0 156px;
        background: url(<%= Url.Content("~/Content/web/slider/climateController.png") %>) transparent no-repeat 0 0;
    }
    .humidity {
        margin: 67px 0 0 15px;
        width: 170px;
    }
</style>
</asp:Content>