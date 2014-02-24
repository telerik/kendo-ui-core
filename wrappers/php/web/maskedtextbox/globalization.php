<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>

<script src="../../content/js/cultures/kendo.culture.en-US.min.js"></script>
<script src="../../content/js/cultures/kendo.culture.en-GB.min.js"></script>
<script src="../../content/js/cultures/kendo.culture.de-DE.min.js"></script>
<script src="../../content/js/cultures/kendo.culture.fr-FR.min.js"></script>
<script src="../../content/js/cultures/kendo.culture.bg-BG.min.js"></script>

<div id="product-view" class="k-header">
    <div class="right">
        <label for="culture">Choose culture:</label>
        <input id="culture" value="en-US" />
    </div>

    <h2>Product promotion</h2>
    <ul id="fieldlist">
        <li>
            <label for="initial">Initial price:</label>
            <?php
            $initial = new \Kendo\UI\MaskedTextBox('initial');

            $initial->mask('9,999.99 $');
            $initial->value('1234.56');

            echo $initial->render();
            ?>
        </li>
    </ul>
</div>

    <style scoped>
        #example h2 {
            padding: 5px 0;
            font-weight: normal;
            border-bottom: 1px solid #999;
        }
        #product-view {
            border-radius: 10px 10px 10px 10px;
            border-style: solid;
            border-width: 1px;
            overflow: hidden;
            width: 500px;
            padding: 20px 20px 0 20px;
            margin: 30px auto;
            background-position: 0 -255px;
        }

        .right
        {
            float:right;
        }

        #fieldlist
        {
            width: 100%;
            float:left;
            margin:0;
            padding: 20px 0 20px 0;
        }

        #fieldlist li
        {
            list-style:none;
            padding:5px 0;
        }
        #fieldlist label {
            display: inline-block;
            text-align: right;
            margin-right: 5px;
        }

</style>

<script>
    $(document).ready(function() {
        var initial = $("#initial").data("kendoMaskedTextBox");

        function changeCulture() {
            kendo.culture(this.value());

            initial.setOptions(initial.options);
        }

        $("#culture").kendoDropDownList({
            change: changeCulture,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "de-DE"},
                {text: "en-US"},
                {text: "en-GB"},
                {text: "fr-FR"},
                {text: "bg-BG"}
            ]
        });
    });
</script>

<?php require_once '../../include/footer.php'; ?>
