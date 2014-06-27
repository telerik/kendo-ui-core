<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<div id="example">
    <div class="demo-section k-header">
        <h4>Customize the element</h4>
        
        <kendo:toolBar name="toolbar" toggle="onToggle" resizable="false">
		   	<kendo:toolBar-items>
		   		<kendo:toolBar-item template="<label>SHAPE:</label><input id='shape' />"></kendo:toolBar-item>
		   		<kendo:toolBar-item type="separator"></kendo:toolBar-item>
		   		<kendo:toolBar-item template="<label>H:</label><input id='height' style='width: 70px;' type='text' />"></kendo:toolBar-item>
		   		<kendo:toolBar-item template="<label>W:</label><input id='width' style='width: 70px;' type='text' />"></kendo:toolBar-item>
		   		<kendo:toolBar-item type="separator"></kendo:toolBar-item>
		   		<kendo:toolBar-item template="<label>POSITION:</label>"></kendo:toolBar-item>
				<kendo:toolBar-item type="buttonGroup">
					<kendo:toolBar-item-buttons>
						<kendo:toolBar-item-button text="Left" togglable="true" group="position"></kendo:toolBar-item-button>
						<kendo:toolBar-item-button text="Center" togglable="true" group="position" selected="true"></kendo:toolBar-item-button>
						<kendo:toolBar-item-button text="Right" togglable="true" group="position"></kendo:toolBar-item-button>
					</kendo:toolBar-item-buttons>
				</kendo:toolBar-item>
				<kendo:toolBar-item type="separator"></kendo:toolBar-item>
				<kendo:toolBar-item template="<label>BACKGROUND:</label><div type='color' id='background-picker'></div>"></kendo:toolBar-item>
				<kendo:toolBar-item type="separator"></kendo:toolBar-item>
				<kendo:toolBar-item template="<label>BORDER:</label><div type='color' id='border-picker'></div>"></kendo:toolBar-item>
				<kendo:toolBar-item template="<input id='border-style' style='width: 100px;' />"></kendo:toolBar-item>
			</kendo:toolBar-items>
		</kendo:toolBar>
        
    </div>
    <div class="box">
        <div id="target"></div>
    </div>
</div>

<script>
    function onToggle(e) {
        var position = e.target.text().toLowerCase();

        if (position == "center") {
            position = "none";
        }

        target.css("float", position);
    }

    var target;

    $(document).ready(function() {
        target = $("#target");

        $("#shape").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Rectangle", value: 0 },
                { text: "Rounded rectangle", value: 30 },
                { text: "Circle/Ellipse", value: 300 }
            ],
            change: function() {
                target.css("border-radius", parseInt(this.value()));
            }
        });

        $("#border-style").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Solid", value: "solid" },
                { text: "Dashed", value: "dashed" },
                { text: "Dotted", value: "dotted" }
            ],
            change: function() {
                target.css("border-style", this.value());
            }
        });

        $("#background-picker").kendoColorPicker({
            value: "#ffffff",
            buttons: false,
            change: function() {
                target.css("background-color", this.value());
            }
        });

        $("#border-picker").kendoColorPicker({
            value: "#333333",
            buttons: false,
            change: function() {
                target.css("border-color", this.value());
            }
        });

        $("#height, #width").kendoNumericTextBox({
            value: 150,
            decimals: 0,
            format: "n0",
            max: 300,
            min: 50,
            change: function() {
                var dimension = this.element.attr("id");

                target.css(dimension, this.value());
            }
        });
    });
</script>

<style>
    #toolbar {
        margin: 1em 0;
        padding: 0 .9em;
    }

    #toolbar label {
        font-size: .85em;
        font-weight: bold;
    }
    #toolbar .k-separator {
        margin: 0 .9em;
    }
    #target {
        border: 3px solid #333333;
        border-radius: 0;
        background-color: #ffffff;
        height: 150px;
        width: 150px;
        margin: 0 auto;
    }
</style>

<demo:footer />