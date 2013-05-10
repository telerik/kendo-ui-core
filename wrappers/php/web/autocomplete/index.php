<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>
<div id="shipping">
    <label for="countries" class="info">Shipping countries:</label>
    <?php
    $countries = array('Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium',
        'Bosnia & Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia',
        'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy',
        'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta', 'Moldova',
        'Monaco', 'Montenegro', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia',
        'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey',
        'Ukraine', 'United Kingdom', 'Vatican City');

    $dataSource = new \Kendo\Data\DataSource();
    $dataSource->data($countries);

    $autoComplete = new \Kendo\UI\AutoComplete('countries');

    $autoComplete->dataSource($dataSource)
                 ->filter('startswith')
                 ->placeholder('Select country...')
                 ->separator(', ');

    echo $autoComplete->render();
    ?>
    <div class="hint">Start typing the name of an European country</div>
</div>

<style scoped="scoped">
    .info {
        display: block;
        line-height: 22px;
        padding: 0 5px 5px 0;
        color: #36558e;
    }

    #shipping {
        width: 482px;
        height: 152px;
        padding: 110px 0 0 30px;
        background: url('../../content/web/autocomplete/shipping.png') transparent no-repeat 0 0;
        margin: 30px auto;
    }

    .k-autocomplete
    {
        width: 250px;
        vertical-align: middle;
    }

    .hint {
        line-height: 22px;
        color: #aaa;
        font-style: italic;
        font-size: .9em;
        color: #7496d4;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
