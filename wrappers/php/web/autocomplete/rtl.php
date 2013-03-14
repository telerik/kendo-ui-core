<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>

<div class="demo-section">
    <div class="k-rtl">
        <h2>USA STATES:</h2>
<?php

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
$autoComplete->dataSource($dataSource);

echo $autoComplete->render();
?>
    </div>
</div>
<style scoped>
    .demo-section {
        width: 250px;
        margin: 35px auto 50px;
        padding: 30px;
    }
    .demo-section h2 {
        text-transform: uppercase;
        font-size: 1.2em;
        margin-bottom: 10px;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
