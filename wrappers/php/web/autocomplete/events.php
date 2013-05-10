<?php
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$states = array('Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California',
            'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia',
            'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
            'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
            'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
            'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
            'Northern Marianas Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
            'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
            'Texas', 'Utah', 'Vermont', 'Virginia', 'Virgin Islands', 'Washington',
            'West Virginia', 'Wisconsin', 'Wyoming');

$dataSource = new \Kendo\Data\DataSource();
$dataSource->data($states);

$autoComplete = new \Kendo\UI\AutoComplete('states');
$autoComplete->dataSource($dataSource)
    ->change('change')
    ->select('select')
    ->open('open')
    ->close('close')
    ->dataBound('dataBound');

?>
<div id="taxi">
    <label for="states">Select a state in USA:</label>
<?php
echo $autoComplete->render();
?>
</div>
<div class="demo-section">
    <h3 class="title">Console log</h3>
    <div class="console"></div>
</div>

<script>
    function open() {
        kendoConsole.log("event :: open");
    };

    function close() {
        kendoConsole.log("event :: close");
    };

    function change() {
        kendoConsole.log("event :: change");
    };

    function dataBound() {
        kendoConsole.log("event :: dataBound");
    };

    function select(e) {
        if ("kendoConsole" in window) {
            var dataItem = this.dataItem(e.item.index());
            kendoConsole.log("event :: select (" + dataItem + ")" );
        }
    };
</script>
<style scoped>
    #taxi {
        width: 240px;
        height: 160px;
        padding: 80px 0 0 200px;
        background: url('../../content/web/autocomplete/taxi.png') transparent no-repeat 0 0;
        margin: 20px auto;
    }
    #taxi label {
        display: block;
        color: #333;
        padding-bottom: 5px;
    }
    .k-autocomplete {
        display: block;
        clear: left;
        width: 200px;
        vertical-align: middle;
    }
    .demo-section {
        width: 500px;
        text-align: center;
    }
    .console {
        margin: 0;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
