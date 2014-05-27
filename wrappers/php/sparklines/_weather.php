<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $db = new PDO('sqlite:..//sample.db');
    $station = $_GET['station'];
    $year = $_GET['year'];
    $month = $_GET['month'];

    $sql = ' select';
    $sql .= '   w.Date,';
    $sql .= '   w.TMax,';
    $sql .= '   w.TMin,';
    $sql .= '   w.Rain,';
    $sql .= '   w.Wind ';
    $sql .= 'from ';
    $sql .= '   Weather w ';
    $sql .= 'where ';
    $sql .= '   w.Station == :station and ';
    $sql .= '   cast(strftime(\'%Y\', w.Date) as integer) == :year and ';
    $sql .= '   cast(strftime(\'%m\', w.Date) as interger) == :month';

    $statement = $db->prepare($sql);
    $statement->execute(array(
        ':station' => $station,
        ':year' => $year,
        ':month' => $month
    ));

    echo json_encode(
        $statement->fetchAll(PDO::FETCH_ASSOC),
        JSON_NUMERIC_CHECK
    );

    exit;
}

