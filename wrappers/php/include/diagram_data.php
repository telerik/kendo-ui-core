<?php

function orgchart_items() {
    return array(array(
        'firstName' => 'Antonio',
        'lastName' => 'Moreno',
        'image' => 'antonio.jpg',
        'title' => 'Team Lead',
        'colorScheme' => '#1696d3',
        'items' => array(array(
                'firstName' => 'Elizabeth',
                'image' => 'elizabeth.jpg',
                'lastName' => 'Brown',
                'title' => 'Design Lead',
                'colorScheme' => '#ef6944',
                'items' => array(array(
                    'firstName' => 'Ann',
                    'lastName' => 'Devon',
                    'image' => 'ann.jpg',
                    'title' => 'UI Designer',
                    'colorScheme' => '#ef6944'
                ))
        ), array(
            'firstName' => 'Diego',
            'lastName' => 'Roel',
            'image' => 'diego.jpg',
            'title' => 'QA Engineer',
            'colorScheme' => '#ee587b',
            'items' => array(array(
                'firstName' => 'Fran',
                'lastName' => 'Wilson',
                'image' => 'fran.jpg',
                'title' => 'QA Intern',
                'colorScheme' => '#ee587b'
            ))
        ), array(
            'firstName' => 'Felipe',
            'lastName' => 'Izquiedro',
            'image' => 'felipe.jpg',
            'title' => 'Senior Developer',
            'colorScheme' => '#75be16',
            'items' => array(array(
                'firstName' => 'Daniel',
                'lastName' => 'Tonini',
                'image' => 'daniel.jpg',
                'title' => 'Developer',
                'colorScheme' => '#75be16'
            ))
        ))
    ));
}

function _node($index) {
    return array('name' => $index, 'items' => array());
}

function _make_nodes(&$root, $levels) {
    if (!empty($levels)) {
        for ($i = 0; $i < $levels[0]; $i++) {
            $node = _node($root['name'] . '.' . $i);
            _make_nodes($node, array_slice($levels, 1));

            $root['items'][] = $node;
        }
    }
}

function diagram_nodes() {
    $root = _node('0');
    _make_nodes($root, array(3, 2, 2));

    return array($root);
}

?>
