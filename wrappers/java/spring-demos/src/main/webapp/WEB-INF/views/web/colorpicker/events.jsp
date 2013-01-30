<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />

<div class="demo-section">
    <dl>
        <dt><label for="palette-picker">ColorPicker (palette):</label></dt>
        <dd>
        	<kendo:colorPicker name="palette-picker" value="#cc2222" palette="basic"
        		select="pickerSelect"
        		change="pickerChange"
        		open="pickerOpen"
        		close="pickerClose">
        	</kendo:colorPicker>
        </dd>

        <dt><label for="hsv-picker">ColorPicker (HSV):</label></dt>
        <dd>
        	<kendo:colorPicker name="hsv-picker" value="#22cc22"
        		select="pickerSelect"
        		change="pickerChange"
        		open="pickerOpen"
        		close="pickerClose">
        	</kendo:colorPicker>
        </dd>

        <dt>ColorPalette:</dt>
        <dd>
        	<kendo:colorPalette name="palette"
        		change="paletteChange">
        	</kendo:colorPalette>
        </dd>

        <dt>FlatColorPicker:</dt>
        <dd>
        	<kendo:flatColorPicker name="flatcolorpicker"
        		change="flatChange">
        	</kendo:flatColorPicker>
        </dd>
    </dl>
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

<div class="demo-section">
    <h3 class="title">Console log</h3>
    <div class="console"></div>
</div>

<style scoped>
    .demo-section {
        width: 500px;
    }

    .demo-section dl {
        display: inline-block;
    }

    .demo-section dl:after {
        content: " ";
        clear: both;
        font: 0/0;
    }

    .demo-section dt,
    .demo-section dd {
        float: left;
        margin: 0;
        padding: 0 0 1em;
    }

    .demo-section dt {
        width: 45%;
        padding-top: .3em;
        padding-right: 5%;
        clear: left;
        text-align: right;
    }

    .demo-section dd {
        width: 50%;
    }
</style>

<demo:footer />