<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<div class="configuration k-widget k-header">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            <button class="toggleEnabled k-button">Toggle enabled state</button>
        </li>
        <li>
            <button class="enable k-button">Enable</button>
        </li>
        <li>
            <button class="disable k-button">Disable</button>
        </li>
    </ul>
</div>

<form method="post" style="width:45%">
    <div>
        <kendo:upload name="files" />
    </div>
</form>

<script>
    function getUpload() {
        return $("#files").data("kendoUpload");
    }

    $(document).ready(function() {
        $(".toggleEnabled").click(function() {
            getUpload().toggle();
        });

        $(".enable").click(function() {
            getUpload().enable();
        });

        $(".disable").click(function() {
            getUpload().disable();
        });
    });
</script>

<demo:footer />
