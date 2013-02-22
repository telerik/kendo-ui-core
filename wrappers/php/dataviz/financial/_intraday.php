<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

class BaseUnit {
    const Years = 0;
    const Months = 1;
    const Weeks = 2;
    const Days = 3;
    const Hours = 4;
    const Minutes = 5;
}

define('MIN_DATE', '1990-01-01');
define('TIME_PER_MINUTE', 1000 * 60);
define('TIME_PER_HOUR', 60 * TIME_PER_MINUTE);
define('TIME_PER_DAY', 24 * TIME_PER_HOUR);
define('DAYS_PER_WEEK', 7);
define('DAYS_PER_MONTH', 31);
define('TARGET_RESULT_SIZE', 100);
define('DEFAULT_UNIT', BaseUnit::Months);

function rangeBaseUnit($from, $to) {
    $diff = strtotime($to) - strtotime($from);
    $minutes = $diff / TIME_PER_MINUTE;
    $hours = $diff / TIME_PER_HOUR;
    $days = $diff / TIME_PER_DAY;
    $result = BaseUnit::Years;

    // Try to maintain groups count below TARGET_RESULT_SIZE
    if ($minutes < TARGET_RESULT_SIZE)
    {
        $result = BaseUnit::Minutes;
    }
    else if ($hours < TARGET_RESULT_SIZE)
    {
        $result = BaseUnit::Hours;
    }
    else if ($days < TARGET_RESULT_SIZE)
    {
        $result = BaseUnit::Days;
    }
    else if ($days / DAYS_PER_WEEK < TARGET_RESULT_SIZE)
    {
        $result = BaseUnit::Weeks;
    }
    else if ($days / DAYS_PER_MONTH < TARGET_RESULT_SIZE)
    {
        $result = BaseUnit::Months;
    }

    return $result;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $request = json_decode(file_get_contents('php://input'));
    $from = MIN_DATE;
    $to = 'now';
    $baseUnit = DEFAULT_UNIT;

    if (isset($request->filter)) {
        $filters = $request->filter->filters;

        if (count($filters) == 2) {
            $from = $filters[0]->value;
            $to = $filters[1]->value;
            $baseUnit = rangeBaseUnit($from, $to);
        }
    }

    $db = new PDO('sqlite:../../sample.db');

    $sql = ' select';
    $sql .= '   strftime(\'%Y-%m-%d %H:%M\', i.Date) as Date,';
    $sql .= '   max(i.Open) as Open,';
    $sql .= '   max(i.High) as High,';
    $sql .= '   min(i.Low) as Low,';
    $sql .= '   max(i.Close) as Close,';
    $sql .= '   sum(i.Volume) as Volume ';
    $sql .= 'from ';
    $sql .= '   Intraday i ';
    $sql .= 'where ';
    $sql .= '   i.Date between date(:from) and date(:to) ';
    $sql .= 'group by ';
    $sql .= '   strftime(\'%Y\', i.Date) ';

    // Group only by the date parts that are significant for the specified base unit
    if ($baseUnit >= BaseUnit::Months) {
        $sql .= ', (strftime(\'%m\', i.Date) - 1)';
    }

    if ($baseUnit >= BaseUnit::Weeks) {
        $sql .= ', strftime(\'%d\', i.Date)';
    }

    if ($baseUnit >= BaseUnit::Hours) {
        $sql .= ', strftime(\'%H\', i.Date)';
    }

    if ($baseUnit >= BaseUnit::Minutes) {
        $sql .= ', strftime(\'%M\', i.Date)';
    }

    $statement = $db->prepare($sql);
    $statement->execute(array(':from' => $from, ':to' => $to));

    echo json_encode(
        $statement->fetchAll(PDO::FETCH_ASSOC),
        JSON_NUMERIC_CHECK
    );

    exit;
}

