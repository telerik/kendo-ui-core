<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>

<div class="demo-section">
    <h2>Invite Attendees</h2>
    <label for="required">Required</label>
<?php
$select = new \Kendo\UI\MultiSelect('required');
$select->dataSource(array('Steven White',
                          'Nancy King',
                          'Anne King',
                          'Nancy Davolio',
                          'Robert Davolio',
                          'Michael Leverling',
                          'Andrew Callahan',
                          'Michael Suyama',
                          'Anne King',
                          'Laura Peacock',
                          'Robert Fuller',
                          'Janet White',
                          'Nancy Leverling',
                          'Robert Buchanan',
                          'Andrew Fuller',
                          'Anne Davolio',
                          'Andrew Suyama',
                          'Nige Buchanan',
                          'Laura Fuller'))
       ->placeholder('Choose attendees...');

echo $select->render();
?>
<label for="optional">Optional</label>
<?php

$select = new \Kendo\UI\MultiSelect('optional');
$select->dataSource(array('Steven White',
                          'Nancy King',
                          'Anne King',
                          'Nancy Davolio',
                          'Robert Davolio',
                          'Michael Leverling',
                          'Andrew Callahan',
                          'Michael Suyama',
                          'Anne King',
                          'Laura Peacock',
                          'Robert Fuller',
                          'Janet White',
                          'Nancy Leverling',
                          'Robert Buchanan',
                          'Andrew Fuller',
                          'Anne Davolio',
                          'Andrew Suyama',
                          'Nige Buchanan',
                          'Laura Fuller'))
       ->placeholder('Choose attendees...');

echo $select->render();
?>
<button class="k-button" id="get">Send Invitation</button>
</div>
<style scoped>
    .demo-section {
        width: 350px;
        height: 200px;
        padding: 30px;
    }
    .demo-section h2 {
        font-weight: normal;
    }
    .demo-section label {
        display: inline-block;
        margin: 15px 0 5px 0;
    }
    .demo-section select {
        width: 350px;
    }
    #get {
        float: right;
        margin: 25px auto 0;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
