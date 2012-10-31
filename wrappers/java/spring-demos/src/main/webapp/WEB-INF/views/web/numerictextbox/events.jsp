<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<kendo:numericTextBox name="numerictextbox" change="change" spin="spin"></kendo:numericTextBox>

<script>
    function change() {
        kendoConsole.log("Change :: " + this.value());
    }

    function spin() {
        kendoConsole.log("Spin :: " + this.value());
    }
</script>

<div class="console"></div>

<demo:footer />