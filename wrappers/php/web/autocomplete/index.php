<?php require_once '../../include/header.php' ?>

<?php require_once '../../lib/kendo/Autoload.php' ?>

<p>Start typing the name of a European country</p>
<label for="country">Shipping countries:</label>
<?php
    $countries = array('Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium',
        'Bosnia & Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia',
        'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy',
        'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta', 'Moldova',
        'Monaco', 'Montenegro', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia',
        'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey',
        'Ukraine', 'United Kingdom', 'Vatican City');

    $dataSource = new \kendo\data\DataSource();
    $dataSource->setData($countries);

    $autoComplete = new \kendo\ui\AutoComplete('country');

    $autoComplete->setDataSource($dataSource)
                 ->setFilter('startswith')
                 ->setPlaceholder('Select country...')
                 ->setSeparator(', ');

    echo $autoComplete->render();
?>

<style scoped="scoped">
    .k-autocomplete
    {
        width: 250px;
    }
</style>
<?php require_once '../../include/footer.php' ?>
