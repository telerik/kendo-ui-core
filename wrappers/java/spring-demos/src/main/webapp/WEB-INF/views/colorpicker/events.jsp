<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />

<div class="demo-section k-header">
    <div class="box-col" style="width: 260px;">
	<h4>FlatColorPicker:</h4>
	<kendo:flatColorPicker name="flatcolorpicker"
		change="flatChange">
	</kendo:flatColorPicker>     
    </div>
    <div class="box-col">
	<h4>ColorPicker (palette):</h4>
	<kendo:colorPicker name="palette-picker" value="#cc2222" palette="basic"
		select="pickerSelect"
		change="pickerChange"
		open="pickerOpen"
		close="pickerClose">
	</kendo:colorPicker>       
    </div>
    <div class="box-col">
	<h4>ColorPicker (HSV):</h4>
	<kendo:colorPicker name="hsv-picker" value="#22cc22"
		select="pickerSelect"
		change="pickerChange"
		open="pickerOpen"
		close="pickerClose">
	</kendo:colorPicker>      
    </div>
    <div class="box-col">
	<h4>ColorPalette:</h4>
	<kendo:colorPalette name="palette"
		change="paletteChange">
	</kendo:colorPalette>     
    </div>
</div>

<script>

    function pickerSelect(e) {
        kendoConsole.log("Select in picker #" + this.element.attr("id") + " :: " + e.value);
    }

    function pickerChange(e) {
        kendoConsole.log("Change in picker #" + this.element.attr("id") + " :: " + e.value);
    }

    function pickerOpen(e) {
        kendoConsole.log("Open in picker #" + this.element.attr("id"));
    }

    function pickerClose(e) {
        kendoConsole.log("Close in picker #" + this.element.attr("id"));
    }

    function paletteChange(e) {
        kendoConsole.log("Change in color palette :: " + e.value);
    }

    function flatChange(e) {
        kendoConsole.log("Change in flat color picker :: " + e.value);
    }
</script>

<div class="box">
    <h4>Console log</h4>
    <div class="console"></div>
</div>

<demo:footer />