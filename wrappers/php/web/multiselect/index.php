<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>

<div id="tshirt-view" class="k-header">
    <h2>Customers:</h2>
    <div id="options">
<?php

$select = new \Kendo\UI\MultiSelect('select');
$select->dataSource(array('Maria Anders',
                          'Ana Trujillo',
                          'Antonio Moreno',
                          'Thomas Hardy',
                          'Christina Berglund',
                          'Hanna Moos',
                          'Frédérique Citeaux',
                          'Laurence Lebihan',
                          'Elizabeth Lincoln'))

       ->placeholder('Choose customers...');

echo $select->render();
?>
    </div>
</div>
<style scoped>
#example h2 {
    font-weight: normal;
}
#tshirt-view {
    border-radius: 10px 10px 10px 10px;
    border-style: solid;
    border-width: 1px;
    overflow: hidden;
    width: 500px;
    margin: 30px auto;
    padding: 20px 20px 0 20px;
    background-position: 0 -255px;
}
#tshirt {
    float: left;
    margin: 30px 40px 30px 20px;
}
#options {
    padding: 30px;
}
#options h3 {
    font-size: 1em;
    font-weight: bold;
    margin: 25px 0 8px 0;
}
#get {
    margin-top: 25px;
}

.k-readonly
{
    color: gray;
}
</style>

<?php require_once '../../include/footer.php'; ?>
