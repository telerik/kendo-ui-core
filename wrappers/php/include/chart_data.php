<?php

function chart_april_sales() {
    return array(array('current' => 2373, 'target' => 5000, 'category' => 1),
        array('current' => 3283, 'target' => 5250, 'category' => 2),
        array('current' => 4532, 'target' => 5500, 'category' => 3),
        array('current' => 4620, 'target' => 5750, 'category' => 4),
        array('current' => 6504, 'target' => 6000, 'category' => 5),
        array('current' => 6715, 'target' => 6250, 'category' => 6),
        array('current' => 6234, 'target' => 6500, 'category' => 7),
        array('current' => 6750, 'target' => 6750, 'category' => 8),
        array('current' => 6300, 'target' => 7000, 'category' => 9),
        array('current' => 6459, 'target' => 7250, 'category' => 10),
        array('current' => 8305, 'target' => 7500, 'category' => 11),
        array('current' => 7222, 'target' => 7750, 'category' => 12),
        array('current' => 6734, 'target' => 8000, 'category' => 13),
        array('current' => 7863, 'target' => 8250, 'category' => 14),
        array('current' => 8743, 'target' => 8500, 'category' => 15),
        array('current' => 8846, 'target' => 8750, 'category' => 16),
        array('current' => 8567, 'target' => 9000, 'category' => 17),
        array('current' => 8193, 'target' => 9250, 'category' => 18),
        array('current' => 9458, 'target' => 9500, 'category' => 19),
        array('current' => 9254, 'target' => 9750, 'category' => 20),
        array('current' => 10234, 'target' => 10000, 'category' => 21),
        array('current' => 9608, 'target' => 10250, 'category' => 22),
        array('current' => 9350, 'target' => 10500, 'category' => 23),
        array('current' => 8842, 'target' => 10500, 'category' => 24),
        array('current' => 8349, 'target' => 10500, 'category' => 25),
        array('current' => 8846, 'target' => 10500, 'category' => 26),
        array('current' => 9567, 'target' => 10500, 'category' => 27),
        array('current' => 10734, 'target' => 10500, 'category' => 28),
        array('current' => 10124, 'target' => 10500, 'category' => 29),
        array('current' => 9680, 'target' => 10500, 'category' => 30));
}

function chart_grand_slam() {
    return array(
        array('year' => 2003, 'win' => 13, 'extremum' => 'MIN: 13', 'loss' => 3),
        array('year' => 2004, 'win' => 22, 'extremum' => null, 'loss' => 1),
        array('year' => 2005, 'win' => 24, 'extremum' => null, 'loss' => 2),
        array('year' => 2006, 'win' => 27, 'extremum' => 'MAX: 27', 'loss' => 1),
        array('year' => 2007, 'win' => 26, 'extremum' => null, 'loss' => 1),
        array('year' => 2008, 'win' => 24, 'extremum' => null, 'loss' => 3),
        array('year' => 2009, 'win' => 26, 'extremum' => null, 'loss' => 2),
        array('year' => 2010, 'win' => 20, 'extremum' => null, 'loss' => 3),
        array('year' => 2011, 'win' => 20, 'extremum' => null, 'loss' => 4),
        array('year' => 2012, 'win' => 19, 'extremum' => null, 'loss' => 3)
    );
}

function chart_price_performance() {
    return array(
        array('family' => 'Pentium', 'model' => 'D 820', 'price' => 105, 'performance' => 100),
        array('family' => 'Pentium', 'model' => 'D 915', 'price' => 120, 'performance' => 102),
        array('family' => 'Pentium', 'model' => 'D 945', 'price' => 160, 'performance' => 118),
        array('family' => 'Pentium', 'model' => 'XE 965', 'price' => 1000, 'performance' => 137),
        array('family' => 'Core 2 Duo', 'model' => 'E6300', 'price' => 185, 'performance' => 134),
        array('family' => 'Core 2 Duo', 'model' => 'E6400', 'price' => 210, 'performance' => 143),
        array('family' => 'Core 2 Duo', 'model' => 'E6600', 'price' => 305, 'performance' => 163),
        array('family' => 'Core 2 Duo', 'model' => 'E6700', 'price' => 530, 'performance' => 177),
        array('family' => 'Core 2 Extreme', 'model' => 'X6800', 'price' => 1000, 'performance' => 190),
        array('family' => 'Athlon 64', 'model' => 'X2 3800+', 'price' => 148, 'performance' => 115),
        array('family' => 'Athlon 64', 'model' => 'X2 4200+', 'price' => 170, 'performance' => 125),
        array('family' => 'Athlon 64', 'model' => 'X2 4600+', 'price' => 205, 'performance' => 138),
        array('family' => 'Athlon 64', 'model' => 'X2 5000+', 'price' => 290, 'performance' => 143),
        array('family' => 'Athlon 64', 'model' => 'FX-62', 'price' => 800, 'performance' => 147)
    );
}
function chart_screen_resolution() {
    return array(
        array('year' => 2000, 'resolution' => '1024x768', 'share' => 25, 'visibleInLegend' => false, 'order' => 1),
        array('year' => 2000, 'resolution' => 'Other', 'share' => 75, 'visibleInLegend' => false, 'order' => 2, 'color' => '#ccc'),
        array('year' => 2001, 'resolution' => '1024x768', 'share' => 29, 'visibleInLegend' => false, 'order' => 1),
        array('year' => 2001, 'resolution' => 'Other', 'share' => 71, 'visibleInLegend' => false, 'order' => 2, 'color' => '#ccc'),
        array('year' => 2002, 'resolution' => '1024x768', 'share' => 34, 'visibleInLegend' => false, 'order' => 1),
        array('year' => 2002, 'resolution' => 'Other', 'share' => 66, 'visibleInLegend' => false, 'order' => 2, 'color' => '#ccc'),
        array('year' => 2003, 'resolution' => '1024x768', 'share' => 40, 'visibleInLegend' => false, 'order' => 1),
        array('year' => 2003, 'resolution' => 'Other', 'share' => 60, 'visibleInLegend' => false, 'order' => 2, 'color' => '#ccc'),
        array('year' => 2004, 'resolution' => '1024x768', 'share' => 47, 'visibleInLegend' => false, 'order' => 1),
        array('year' => 2004, 'resolution' => 'Other', 'share' => 53, 'visibleInLegend' => false, 'order' => 2, 'color' => '#ccc'),
        array('year' => 2005, 'resolution' => '1024x768', 'share' => 53, 'visibleInLegend' => false, 'order' => 1),
        array('year' => 2005, 'resolution' => 'Other', 'share' => 47, 'visibleInLegend' => false, 'order' => 2, 'color' => '#ccc'),
        array('year' => 2006, 'resolution' => '1024x768', 'share' => 57, 'visibleInLegend' => false, 'order' => 1, 'color' => '#c00'),
        array('year' => 2006, 'resolution' => 'Other', 'share' => 43, 'visibleInLegend' => false, 'order' => 2, 'color' => '#ccc'),
        array('year' => 2007, 'resolution' => '1024x768', 'share' => 54, 'visibleInLegend' => false, 'order' => 1),
        array('year' => 2007, 'resolution' => 'Other', 'share' => 46, 'visibleInLegend' => false, 'order' => 2, 'color' => '#ccc'),
        array('year' => 2008, 'resolution' => '1024x768', 'share' => 48, 'visibleInLegend' => false, 'order' => 1),
        array('year' => 2008, 'resolution' => 'Other', 'share' => 52, 'visibleInLegend' => false, 'order' => 2, 'color' => '#ccc'),
        array('year' => 2009, 'resolution' => '1024x768', 'share' => 36, 'visibleInLegend' => false, 'order' => 1),
        array('year' => 2009, 'resolution' => 'Other', 'share' => 64, 'visibleInLegend' => false, 'order' => 2, 'color' => '#ccc')
   );
}

function chart_japan_medals() {
    return array(
        array('year' => 1984, 'standing' => 1, 'number' => 10, 'country' => 'Japan', 'medalColor' => '#f3ac32'),
        array('year' => 1988, 'standing' => 1, 'number' => 4, 'country' => 'Japan', 'medalColor' => '#f3ac32'),
        array('year' => 1992, 'standing' => 1, 'number' => 3, 'country' => 'Japan', 'medalColor' => '#f3ac32'),
        array('year' => 1996, 'standing' => 1, 'number' => 3, 'country' => 'Japan', 'medalColor' => '#f3ac32'),
        array('year' => 2000, 'standing' => 1, 'number' => 5, 'country' => 'Japan', 'medalColor' => '#f3ac32'),
        array('year' => 2004, 'standing' => 1, 'number' => 16, 'country' => 'Japan', 'medalColor' => '#f3ac32'),
        array('year' => 2008, 'standing' => 1, 'number' => 9, 'country' => 'Japan', 'medalColor' => '#f3ac32'),
        array('year' => 2012, 'standing' => 1, 'number' => 7, 'country' => 'Japan', 'medalColor' => '#f3ac32'),
        array('year' => 1984, 'standing' => 2, 'number' => 8, 'country' => 'Japan', 'medalColor' => '#b8b8b8'),
        array('year' => 1988, 'standing' => 2, 'number' => 3, 'country' => 'Japan', 'medalColor' => '#b8b8b8'),
        array('year' => 1992, 'standing' => 2, 'number' => 8, 'country' => 'Japan', 'medalColor' => '#b8b8b8'),
        array('year' => 1996, 'standing' => 2, 'number' => 6, 'country' => 'Japan', 'medalColor' => '#b8b8b8'),
        array('year' => 2000, 'standing' => 2, 'number' => 8, 'country' => 'Japan', 'medalColor' => '#b8b8b8'),
        array('year' => 2004, 'standing' => 2, 'number' => 9, 'country' => 'Japan', 'medalColor' => '#b8b8b8'),
        array('year' => 2008, 'standing' => 2, 'number' => 6, 'country' => 'Japan', 'medalColor' => '#b8b8b8'),
        array('year' => 2012, 'standing' => 2, 'number' => 14, 'country' => 'Japan', 'medalColor' => '#b8b8b8'),
        array('year' => 1984, 'standing' => 3, 'number' => 14, 'country' => 'Japan', 'medalColor' => '#bb6e36'),
        array('year' => 1988, 'standing' => 3, 'number' => 7, 'country' => 'Japan', 'medalColor' => '#bb6e36'),
        array('year' => 1992, 'standing' => 3, 'number' => 11, 'country' => 'Japan', 'medalColor' => '#bb6e36'),
        array('year' => 1996, 'standing' => 3, 'number' => 5, 'country' => 'Japan', 'medalColor' => '#bb6e36'),
        array('year' => 2000, 'standing' => 3, 'number' => 5, 'country' => 'Japan', 'medalColor' => '#bb6e36'),
        array('year' => 2004, 'standing' => 3, 'number' => 12, 'country' => 'Japan', 'medalColor' => '#bb6e36'),
        array('year' => 2008, 'standing' => 3, 'number' => 10, 'country' => 'Japan', 'medalColor' => '#bb6e36'),
        array('year' => 2012, 'standing' => 3, 'number' => 17, 'country' => 'Japan', 'medalColor' => '#bb6e36')
   );
}

function chart_crime_stats() {
    return array(
        array('state' => 'Alabama', 'murder' => 8.2, 'burglary' => 953.8, 'population' => 4627851),
        array('state' => 'Alaska', 'murder' => 4.8, 'burglary' => 622.5, 'population' => 686293),
        array('state' => 'Arizona', 'murder' => 7.5, 'burglary' => 948.4, 'population' => 6500180),
        array('state' => 'Arkansas', 'murder' => 6.7, 'burglary' => 1084.6, 'population' => 2855390),
        array('state' => 'California', 'murder' => 6.9, 'burglary' => 693.3, 'population' => 36756666),
        array('state' => 'Colorado', 'murder' => 3.7, 'burglary' => 744.8, 'population' => 4861515),
        array('state' => 'Connecticut', 'murder' => 2.9, 'burglary' => 437.1, 'population' => 3501252),
        array('state' => 'Delaware', 'murder' => 4.4, 'burglary' => 688.9, 'population' => 873092),
        array('state' => 'Florida', 'murder' => 5, 'burglary' => 926.3, 'population' => 18328340),
        array('state' => 'Georgia', 'murder' => 6.2, 'burglary' => 931, 'population' => 9685744),
        array('state' => 'Hawaii', 'murder' => 1.9, 'burglary' => 767.9, 'population' => 1288198),
        array('state' => 'Idaho', 'murder' => 2.4, 'burglary' => 564.4, 'population' => 1523816),
        array('state' => 'Illinois', 'murder' => 6, 'burglary' => 606.9, 'population' => 12901563),
        array('state' => 'Indiana', 'murder' => 5.7, 'burglary' => 697.6, 'population' => 6376792),
        array('state' => 'Iowa', 'murder' => 1.3, 'burglary' => 606.4, 'population' => 3002555),
        array('state' => 'Kansas', 'murder' => 3.7, 'burglary' => 689.2, 'population' => 2802134),
        array('state' => 'Kentucky', 'murder' => 4.6, 'burglary' => 634, 'population' => 4269245),
        array('state' => 'Louisiana', 'murder' => 9.9, 'burglary' => 870.6, 'population' => 4410796),
        array('state' => 'Maine', 'murder' => 1.4, 'burglary' => 478.5, 'population' => 1316456),
        array('state' => 'Maryland', 'murder' => 9.9, 'burglary' => 641.4, 'population' => 5633597),
        array('state' => 'Massachusetts', 'murder' => 2.7, 'burglary' => 541.1, 'population' => 6497967),
        array('state' => 'Michigan', 'murder' => 6.1, 'burglary' => 696.8, 'population' => 10003422),
        array('state' => 'Minnesota', 'murder' => 2.2, 'burglary' => 578.9, 'population' => 5220393),
        array('state' => 'Mississippi', 'murder' => 7.3, 'burglary' => 919.7, 'population' => 2938618),
        array('state' => 'Missouri', 'murder' => 6.9, 'burglary' => 738.3, 'population' => 5911605),
        array('state' => 'Montana', 'murder' => 1.9, 'burglary' => 389.2, 'population' => 967440),
        array('state' => 'Nebraska', 'murder' => 2.5, 'burglary' => 532.4, 'population' => 1783432),
        array('state' => 'Nevada', 'murder' => 8.5, 'burglary' => 972.4, 'population' => 2600167),
        array('state' => 'New Hampshire', 'murder' => 1.4, 'burglary' => 317, 'population' => 1315809),
        array('state' => 'New Jersey', 'murder' => 4.8, 'burglary' => 447.1, 'population' => 8682661),
        array('state' => 'New Mexico', 'murder' => 7.4, 'burglary' => 1093.9, 'population' => 1984356),
        array('state' => 'New York', 'murder' => 4.5, 'burglary' => 353.3, 'population' => 19490297),
        array('state' => 'North Carolina', 'murder' => 6.7, 'burglary' => 1201.1, 'population' => 9222414),
        array('state' => 'North Dakota', 'murder' => 1.1, 'burglary' => 311.9, 'population' => 641481),
        array('state' => 'Ohio', 'murder' => 5.1, 'burglary' => 872.8, 'population' => 11485910),
        array('state' => 'Oklahoma', 'murder' => 5.3, 'burglary' => 1006, 'population' => 3642361),
        array('state' => 'Oregon', 'murder' => 2.2, 'burglary' => 758.6, 'population' => 3790060),
        array('state' => 'Pennsylvania', 'murder' => 6.1, 'burglary' => 451.6, 'population' => 12448279),
        array('state' => 'Rhode Island', 'murder' => 3.2, 'burglary' => 494.2, 'population' => 1050788),
        array('state' => 'South Carolina', 'murder' => 7.4, 'burglary' => 1000.9, 'population' => 4479800),
        array('state' => 'South Dakota', 'murder' => 2.3, 'burglary' => 324.4, 'population' => 804194),
        array('state' => 'Tennessee', 'murder' => 7.2, 'burglary' => 1026.9, 'population' => 6214888),
        array('state' => 'Texas', 'murder' => 6.2, 'burglary' => 961.6, 'population' => 24326974),
        array('state' => 'Utah', 'murder' => 2.3, 'burglary' => 606.2, 'population' => 2736424),
        array('state' => 'Vermont', 'murder' => 1.3, 'burglary' => 491.8, 'population' => 621270),
        array('state' => 'Virginia', 'murder' => 6.1, 'burglary' => 392.1, 'population' => 7769089),
        array('state' => 'Washington', 'murder' => 3.3, 'burglary' => 959.7, 'population' => 6549224),
        array('state' => 'West Virginia', 'murder' => 4.4, 'burglary' => 621.2, 'population' => 1814468),
        array('state' => 'Wisconsin', 'murder' => 3.5, 'burglary' => 440.8, 'population' => 5627967),
        array('state' => 'Wyoming', 'murder' => 2.7, 'burglary' => 476.3, 'population' => 532668)
   );
}

function chart_blog_comments() {
    return array(
        array('blog'=> 'My blog', 'day'=> '1', 'value'=> 3, 'userColor'=> '#ffd600'),
        array('blog' => 'My blog', 'day' => '2', 'value' => 7, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '3', 'value' => 12, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '4', 'value' => 15, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '5', 'value' => 6, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '6', 'value' => 23, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '7', 'value' => 12, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '8', 'value' => 10, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '9', 'value' => 17, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '10', 'value' => 13, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '11', 'value' => 14, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '12', 'value' => 15, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '13', 'value' => 3, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '14', 'value' => 6, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '15', 'value' => 23, 'userColor' => '#565656'),
        array('blog' => 'My blog', 'day' => '16', 'value' => 25, 'userColor' => '#565656'),
        array('blog' => 'My blog', 'day' => '17', 'value' => 21, 'userColor' => '#565656'),
        array('blog' => 'My blog', 'day' => '18', 'value' => 18, 'userColor' => '#565656'),
        array('blog' => 'My blog', 'day' => '19', 'value' => 17, 'userColor' => '#565656'),
        array('blog' => 'My blog', 'day' => '20', 'value' => 16, 'userColor' => '#565656'),
        array('blog' => 'My blog', 'day' => '21', 'value' => 11, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '22', 'value' => 3, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '23', 'value' => 8, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '24', 'value' => 5, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '25', 'value' => 4, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '26', 'value' => 1, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '27', 'value' => 7, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '28', 'value' => 6, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '29', 'value' => 3, 'userColor' => '#ffd600'),
        array('blog' => 'My blog', 'day' => '30', 'value' => 6, 'userColor' => '#ffd600')
   );
}

function chart_spain_electricity_production() {
    return array(
        array('country' => 'Spain', 'year' => '2008', 'unit' => 'GWh',  'hydro' => 26112, 'wind' => 32203, 'nuclear' => 58973),
        array('country' => 'Spain', 'year' => '2007', 'unit' => 'GWh',  'hydro' => 30522, 'wind' => 27568, 'nuclear' => 55103),
        array('country' => 'Spain', 'year' => '2006', 'unit' => 'GWh',  'hydro' => 29831, 'wind' => 23297, 'nuclear' => 60126),
        array('country' => 'Spain', 'year' => '2005', 'unit' => 'GWh',  'hydro' => 23025, 'wind' => 21176, 'nuclear' => 57539),
        array('country' => 'Spain', 'year' => '2004', 'unit' => 'GWh',  'hydro' => 34439, 'wind' => 15700, 'nuclear' => 63606),
        array('country' => 'Spain', 'year' => '2003', 'unit' => 'GWh',  'hydro' => 43897, 'wind' => 12075, 'nuclear' => 61875),
        array('country' => 'Spain', 'year' => '2002', 'unit' => 'GWh',  'hydro' => 26270, 'wind' => 9342, 'nuclear' => 63016),
        array('country' => 'Spain', 'year' => '2001', 'unit' => 'GWh',  'hydro' => 43864, 'wind' => 6759, 'nuclear' => 63708),
        array('country' => 'Spain', 'year' => '2000', 'unit' => 'GWh',  'hydro' => 31807, 'wind' => 4727, 'nuclear' => 62206)
   );
}

function chart_united_states_internet_usage() {
    return array(
        array('country'=> 'United States', 'year'=> '1994', 'value'=> 4.9),
        array('country'=> 'United States', 'year'=> '1995', 'value'=> 9.2),
        array('country'=> 'United States', 'year'=> '1996', 'value'=> 16.4),
        array('country'=> 'United States', 'year'=> '1997', 'value'=> 21.6),
        array('country'=> 'United States', 'year'=> '1998', 'value'=> 30.1),
        array('country'=> 'United States', 'year'=> '1999', 'value'=> 35.9),
        array('country'=> 'United States', 'year'=> '2000', 'value'=> 43.1),
        array('country'=> 'United States', 'year'=> '2001', 'value'=> 49.2),
        array('country'=> 'United States', 'year'=> '2002', 'value'=> 59.0),
        array('country'=> 'United States', 'year'=> '2003', 'value'=> 61.9),
        array('country'=> 'United States', 'year'=> '2004', 'value'=> 65),
        array('country'=> 'United States', 'year'=> '2005', 'value'=> 68.3),
        array('country'=> 'United States', 'year'=> '2006', 'value'=> 69.2),
        array('country'=> 'United States', 'year'=> '2007', 'value'=> 75.3),
        array('country'=> 'United States', 'year'=> '2008', 'value'=> 74.2),
        array('country'=> 'United States', 'year'=> '2009', 'value'=> 71.2),
        array('country'=> 'United States', 'year'=> '2010', 'value'=> 74.2),
        array('country'=> 'United States', 'year'=> '2011', 'value'=> 78.2)
   );
}

function chart_stock_prices() {
    return array(
        array('date'=> '12/30/2011', 'close'=> 405, 'volume'=> 6414369, 'open'=> 403.51, 'high'=> 406.28, 'low'=> 403.49, 'symbol'=> '2. AAPL'),
        array('date'=> '11/30/2011', 'close'=> 382.2, 'volume'=> 14464710, 'open'=> 381.29, 'high'=> 382.276, 'low'=> 378.3, 'symbol'=> '2. AAPL'),
        array('date'=> '10/31/2011', 'close'=> 404.78, 'volume'=> 13762250, 'open'=> 402.42, 'high'=> 409.33, 'low'=> 401.05, 'symbol'=> '2. AAPL'),
        array('date'=> '9/30/2011', 'close'=> 381.32, 'volume'=> 19553550, 'open'=> 387.12, 'high'=> 388.89, 'low'=> 381.18, 'symbol'=> '2. AAPL'),
        array('date'=> '8/31/2011', 'close'=> 384.83, 'volume'=> 18643770, 'open'=> 390.57, 'high'=> 392.08, 'low'=> 381.86, 'symbol'=> '2. AAPL'),
        array('date'=> '7/29/2011', 'close'=> 390.48, 'volume'=> 22550900, 'open'=> 387.64, 'high'=> 395.15, 'low'=> 384, 'symbol'=> '2. AAPL'),
        array('date'=> '6/30/2011', 'close'=> 335.67, 'volume'=> 11526680, 'open'=> 334.7, 'high'=> 336.13, 'low'=> 332.84, 'symbol'=> '2. AAPL'),
        array('date'=> '5/31/2011', 'close'=> 347.83, 'volume'=> 14869200, 'open'=> 341.1, 'high'=> 347.83, 'low'=> 341, 'symbol'=> '2. AAPL'),
        array('date'=> '4/29/2011', 'close'=> 350.13, 'volume'=> 29776300, 'open'=> 346.78, 'high'=> 353.95, 'low'=> 346.666, 'symbol'=> '2. AAPL'),
        array('date'=> '3/31/2011', 'close'=> 348.5075, 'volume'=> 9779020, 'open'=> 346.36, 'high'=> 349.8, 'low'=> 346.06, 'symbol'=> '2. AAPL'),
        array('date'=> '2/28/2011', 'close'=> 353.21, 'volume'=> 14356740, 'open'=> 351.24, 'high'=> 355.05, 'low'=> 351.12, 'symbol'=> '2. AAPL'),
        array('date'=> '1/31/2011', 'close'=> 339.32, 'volume'=> 13457510, 'open'=> 335.8, 'high'=> 340.04, 'low'=> 334.3, 'symbol'=> '2. AAPL'),
        array('date'=> '12/30/2011', 'close'=> 173.1, 'volume'=> 4279069, 'open'=> 173.36, 'high'=> 175.17, 'low'=> 172.49, 'symbol'=> '3. AMZN'),
        array('date'=> '11/30/2011', 'close'=> 192.29, 'volume'=> 7700490, 'open'=> 194.76, 'high'=> 195.3, 'low'=> 188.75, 'symbol'=> '3. AMZN'),
        array('date'=> '10/31/2011', 'close'=> 213.51, 'volume'=> 7336799, 'open'=> 215.79, 'high'=> 218.89, 'low'=> 213.04, 'symbol'=> '3. AMZN'),
        array('date'=> '9/30/2011', 'close'=> 216.23, 'volume'=> 6549641, 'open'=> 218.19, 'high'=> 223, 'low'=> 215.21, 'symbol'=> '3. AMZN'),
        array('date'=> '8/31/2011', 'close'=> 215.23, 'volume'=> 7397287, 'open'=> 212.27, 'high'=> 216.17, 'low'=> 211.35, 'symbol'=> '3. AMZN'),
        array('date'=> '7/29/2011', 'close'=> 222.52, 'volume'=> 5166268, 'open'=> 221.29, 'high'=> 225.75, 'low'=> 219.51, 'symbol'=> '3. AMZN'),
        array('date'=> '6/30/2011', 'close'=> 204.49, 'volume'=> 4446007, 'open'=> 200.78, 'high'=> 205.2, 'low'=> 200.5, 'symbol'=> '3. AMZN'),
        array('date'=> '5/31/2011', 'close'=> 196.69, 'volume'=> 3405698, 'open'=> 195.94, 'high'=> 198.44, 'low'=> 195.03, 'symbol'=> '3. AMZN'),
        array('date'=> '4/29/2011', 'close'=> 195.81, 'volume'=> 5697726, 'open'=> 194.38, 'high'=> 196.59, 'low'=> 193.78, 'symbol'=> '3. AMZN'),
        array('date'=> '3/31/2011', 'close'=> 180.13, 'volume'=> 4824628, 'open'=> 179.31, 'high'=> 181.57, 'low'=> 178.5, 'symbol'=> '3. AMZN'),
        array('date'=> '2/28/2011', 'close'=> 173.29, 'volume'=> 6781774, 'open'=> 173.91, 'high'=> 175.89, 'low'=> 172.15, 'symbol'=> '3. AMZN'),
        array('date'=> '1/31/2011', 'close'=> 169.64, 'volume'=> 6716002, 'open'=> 170.16, 'high'=> 171.44, 'low'=> 167.41, 'symbol'=> '3. AMZN'),
        array('date'=> '12/30/2011', 'close'=> 645.9, 'volume'=> 1780941, 'open'=> 642.02, 'high'=> 646.76, 'low'=> 642.02, 'symbol'=> '1. GOOG'),
        array('date'=> '11/30/2011', 'close'=> 599.39, 'volume'=> 3390173, 'open'=> 597.95, 'high'=> 599.51, 'low'=> 592.09, 'symbol'=> '1. GOOG'),
        array('date'=> '10/31/2011', 'close'=> 592.64, 'volume'=> 2557538, 'open'=> 595.09, 'high'=> 599.69, 'low'=> 591.67, 'symbol'=> '1. GOOG'),
        array('date'=> '9/30/2011', 'close'=> 515.04, 'volume'=> 2723353, 'open'=> 520.21, 'high'=> 524, 'low'=> 514.38, 'symbol'=> '1. GOOG'),
        array('date'=> '8/31/2011', 'close'=> 540.96, 'volume'=> 2689989, 'open'=> 544.74, 'high'=> 546.3, 'low'=> 536, 'symbol'=> '1. GOOG'),
        array('date'=> '7/29/2011', 'close'=> 603.69, 'volume'=> 4133695, 'open'=> 604.23, 'high'=> 614.96, 'low'=> 603.69, 'symbol'=> '1. GOOG'),
        array('date'=> '6/30/2011', 'close'=> 506.38, 'volume'=> 2427330, 'open'=> 501.99, 'high'=> 506.67, 'low'=> 501.5, 'symbol'=> '1. GOOG'),
        array('date'=> '5/31/2011', 'close'=> 529.02, 'volume'=> 2685830, 'open'=> 525, 'high'=> 529.05, 'low'=> 523.5, 'symbol'=> '1. GOOG'),
        array('date'=> '4/29/2011', 'close'=> 544.1, 'volume'=> 3522997, 'open'=> 540, 'high'=> 544.1, 'low'=> 538.51, 'symbol'=> '1. GOOG'),
        array('date'=> '3/31/2011', 'close'=> 586.76, 'volume'=> 2028228, 'open'=> 583, 'high'=> 588.1612, 'low'=> 581.74, 'symbol'=> '1. GOOG'),
        array('date'=> '2/28/2011', 'close'=> 613.4, 'volume'=> 2281411, 'open'=> 610, 'high'=> 616.49, 'low'=> 608.01, 'symbol'=> '1. GOOG'),
        array('date'=> '1/31/2011', 'close'=> 600.36, 'volume'=> 2804332, 'open'=> 603.6, 'high'=> 604.47, 'low'=> 595.55, 'symbol'=> '1. GOOG')
   );
}

function mmHg_data() {
    return array(
        array('current' => 750, 'target' => 762.5, 'category' => 1 ),
        array('current' => 754, 'target' => 768.5, 'category' => 2 ),
        array('current' => 762, 'target' => 770, 'category' => 3 ),
        array('current' => 764, 'target' => 773, 'category' => 4 ),
        array('current' => 753, 'target' => 760, 'category' => 5 ),
        array('current' => 748, 'target' => 765, 'category' => 6 ),
        array('current' => 740, 'target' => 760, 'category' => 7 ),
        array('current' => 755, 'target' => 758, 'category' => 8 ),
        array('current' => 765, 'target' => 768, 'category' => 9 ),
        array('current' => 776, 'target' => 783, 'category' => 10 ),
        array('current' => 768, 'target' => 770, 'category' => 11 ),
        array('current' => 760, 'target' => 762.5, 'category' => 12 ),
        array('current' => 763, 'target' => 768, 'category' => 13 ),
        array('current' => 758, 'target' => 766, 'category' => 14 )
    );
}

function hPa_data() {
    return array(
        array('current' => 1001, 'target' => 1017, 'category' => 1 ),
        array('current' => 1005, 'target' => 1024, 'category' => 2 ),
        array('current' => 1016, 'target' => 1026, 'category' => 3 ),
        array('current' => 1019, 'target' => 1030, 'category' => 4 ),
        array('current' => 1004, 'target' => 1013, 'category' => 5 ),
        array('current' => 998, 'target' => 1020, 'category' => 6 ),
        array('current' => 987, 'target' => 1013, 'category' => 7 ),
        array('current' => 1006.5, 'target' => 1010, 'category' => 8 ),
        array('current' => 1020, 'target' => 1023, 'category' => 9 ),
        array('current' => 1035, 'target' => 1044, 'category' => 10 ),
        array('current' => 1025, 'target' => 1026, 'category' => 11 ),
        array('current' => 1013, 'target' => 1017, 'category' => 12 ),
        array('current' => 1017, 'target' => 1023, 'category' => 13 ),
        array('current' => 1010, 'target' => 1021, 'category' => 14 )
    );
}

function sparkline_compensation_data() {
    return array(
        array('year' => '2011', 'hourly' => 46.29, 'change' => 16.69, 'direct' => 32.09,
            'benefits' => array(
                 array('type' => 'Social', 'value' => 9.25),
                 array('type' => 'Direct', 'value' => 4.41)
            )
        ),
        array('year' => '2010', 'hourly' => 39.67, 'change' => 18.7, 'direct' => 29.73,
            'benefits' => array(
                 array('type' => 'Social', 'value' => 7.93),
                 array('type' => 'Direct', 'value' => 3.78)
            )
        ),
        array('year' => '2009', 'hourly' => 33.42, 'change' => -6.93, 'direct' => 31.69,
            'benefits' => array(
                 array('type' => 'Social', 'value' => 6.78),
                 array('type' => 'Direct', 'value' => 3.17)
            )
        ),
        array('year' => '2008', 'hourly' => 35.91, 'change' => 7.61, 'direct' => 31.87,
            'benefits' => array(
                 array('type' => 'Social', 'value' => 7.39),
                 array('type' => 'Direct', 'value' => 3.39)
            )
        ),
        array('year' => '2007', 'hourly' => 33.37, 'change' => 14.4, 'direct' => 28.41,
            'benefits' => array(
                 array('type' => 'Social', 'value' => 6.86),
                 array('type' => 'Direct', 'value' => 3.15)
            )
        ),
        array('year' => '2006', 'hourly' => 29.17, 'change' => 2.17, 'direct' => 25.1,
            'benefits' => array(
                 array('type' => 'Social', 'value' => 6.07),
                 array('type' => 'Direct', 'value' => 2.75)
            )
        ),
        array('year' => '2005', 'hourly' => 28.55, 'change' => 6.73, 'direct' => 24.2,
            'benefits' => array(
                 array('type' => 'Social', 'value' => 6.08),
                 array('type' => 'Direct', 'value' => 2.67)
            )
        ),
        array('year' => '2004', 'hourly' => 26.75, 'change' => 18.1, 'direct' => 23.34,
            'benefits' => array(
                 array('type' => 'Social', 'value' => 5.74),
                 array('type' => 'Direct', 'value' => 2.5)
            )
        ),
        array('year' => '2003', 'hourly' => 22.65, 'change' => 30.02, 'direct' => 21.16,
            'benefits' => array(
                 array('type' => 'Social', 'value' => 4.79),
                 array('type' => 'Direct', 'value' => 2.12)
            )
        ),
        array('year' => '2002', 'hourly' => 17.42, 'change' => 15.98, 'direct' => 17.37,
            'benefits' => array(
                 array('type' => 'Social', 'value' => 3.61),
                 array('type' => 'Direct', 'value' => 1.64)
            )
        ),
        array('year' => '2001', 'hourly' => 15.02, 'change' => -8.69, 'direct' => 16.06,
            'benefits' => array(
                 array('type' => 'Social', 'value' => 2.92),
                 array('type' => 'Direct', 'value' => 1.44)
            )
        ),
        array('year' => '2000', 'hourly' => 16.45, 'change' => -9.32, 'direct' => 16.06,
            'benefits' => array(
                 array('type' => 'Social', 'value' => 3.08),
                 array('type' => 'Direct', 'value' => 1.59)
            )
        ),
        array('year' => '1999', 'hourly' => 18.14, 'change' => 5.77, 'direct' => 18.13,
            'benefits' => array(
                 array('type' => 'Social', 'value' => 3.42),
                 array('type' => 'Direct', 'value' => 1.75)
            )
        ),
        array('year' => '1998', 'hourly' => 17.15, 'change' => -9.4, 'direct' => 18.37,
            'benefits' => array(
                 array('type' => 'Social', 'value' => 3.17),
                 array('type' => 'Direct', 'value' => 1.66)
            )
        ),
        array('year' => '1997', 'hourly' => 18.93, 'change' => -1.25, 'direct' => 18.17,
            'benefits' => array(
                 array('type' => 'Social', 'value' => 3.46),
                 array('type' => 'Direct', 'value' => 1.84)
            )
        )
    );
}

function chart_date_points() {
    return array(
        array('date'=> '2011/12/20', 'value'=> 30),
        array('date'=> '2011/12/21', 'value'=> 50),
        array('date'=> '2011/12/22', 'value'=> 45),
        array('date'=> '2011/12/23', 'value'=> 40),
        array('date'=> '2011/12/24', 'value'=> 35),
        array('date'=> '2011/12/25', 'value'=> 40),
        array('date'=> '2011/12/26', 'value'=> 42),
        array('date'=> '2011/12/27', 'value'=> 40),
        array('date'=> '2011/12/28', 'value'=> 35),
        array('date'=> '2011/12/29', 'value'=> 43),
        array('date'=> '2011/12/30', 'value'=> 38),
        array('date'=> '2011/12/31', 'value'=> 30),
        array('date'=> '2012/01/01', 'value'=> 48),
        array('date'=> '2012/01/02', 'value'=> 50),
        array('date'=> '2012/01/03', 'value'=> 55),
        array('date'=> '2012/01/04', 'value'=> 35),
        array('date'=> '2012/01/05', 'value'=> 30)
   );
}

function chart_budget_report() {
    return array(
        array('unit' => 'Sales', 'budget' => 40000, 'spending' => 52800),
        array('unit' => 'Marketing', 'budget' => 20000, 'spending' => 42000),
        array('unit' => 'Development', 'budget' => 60000, 'spending' => 21400),
        array('unit' => 'Customer Support', 'budget' => 30000, 'spending' => 28500),
        array('unit' => 'IT', 'budget' => 25000, 'spending' => 18900),
        array('unit' => 'Administration', 'budget' => 10000, 'spending' => 11100)
   );
}

function chart_protein_data() {
    return array(
        array('name' => 'Tryptophan', 'abbr' => 'Trp', 'score' => 3),
        array('name' => 'Threonine', 'abbr' => 'Thr', 'score' => 4),
        array('name' => 'Isoleucine', 'abbr' => 'Iso', 'score' => 5),
        array('name' => 'Leucine', 'abbr' => 'Leu', 'score' => 5),
        array('name' => 'Lysine', 'abbr' => 'Lys', 'score' => 5),
        array('name' => 'Methionine + Cystine', 'abbr' => 'M+C', 'score' => 2),
        array('name' => 'Phenylalanine + Tyrosine', 'abbr' => 'p+T', 'score' => 3),
        array('name' => 'Valine', 'abbr' => 'Val', 'score' => 5),
        array('name' => 'Histidine', 'abbr' => 'Hys', 'score' => 4)
    );
}

function chart_wind_data() {
    return array(
        array('dir' => 0, 'dirText' => 'N', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0),
        array('dir' => 0, 'dirText' => 'N', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 2),
        array('dir' => 0, 'dirText' => 'N', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 3),
        array('dir' => 0, 'dirText' => 'N', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 2.5),
        array('dir' => 0, 'dirText' => 'N', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 1),
        array('dir' => 0, 'dirText' => 'N', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 0.5),
        array('dir' => 0, 'dirText' => 'N', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0.1),
        array('dir' => 1, 'dirText' => 'NNE', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0),
        array('dir' => 1, 'dirText' => 'NNE', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 0.1),
        array('dir' => 1, 'dirText' => 'NNE', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 0.1),
        array('dir' => 1, 'dirText' => 'NNE', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 0),
        array('dir' => 1, 'dirText' => 'NNE', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 0),
        array('dir' => 1, 'dirText' => 'NNE', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 0),
        array('dir' => 1, 'dirText' => 'NNE', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0),
        array('dir' => 2, 'dirText' => 'NE', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0),
        array('dir' => 2, 'dirText' => 'NE', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 0.2),
        array('dir' => 2, 'dirText' => 'NE', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 0),
        array('dir' => 2, 'dirText' => 'NE', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 0),
        array('dir' => 2, 'dirText' => 'NE', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 0),
        array('dir' => 2, 'dirText' => 'NE', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 0),
        array('dir' => 2, 'dirText' => 'NE', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0),
        array('dir' => 3, 'dirText' => 'ENE', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0),
        array('dir' => 3, 'dirText' => 'ENE', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 0.2),
        array('dir' => 3, 'dirText' => 'ENE', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 0.1),
        array('dir' => 3, 'dirText' => 'ENE', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 0),
        array('dir' => 3, 'dirText' => 'ENE', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 0),
        array('dir' => 3, 'dirText' => 'ENE', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 0),
        array('dir' => 3, 'dirText' => 'ENE', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0),
        array('dir' => 4, 'dirText' => 'E', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0),
        array('dir' => 4, 'dirText' => 'E', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 0.2),
        array('dir' => 4, 'dirText' => 'E', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 0.3),
        array('dir' => 4, 'dirText' => 'E', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 0),
        array('dir' => 4, 'dirText' => 'E', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 0),
        array('dir' => 4, 'dirText' => 'E', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 0),
        array('dir' => 4, 'dirText' => 'E', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0),
        array('dir' => 5, 'dirText' => 'ESE', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0),
        array('dir' => 5, 'dirText' => 'ESE', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 0.4),
        array('dir' => 5, 'dirText' => 'ESE', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 0.4),
        array('dir' => 5, 'dirText' => 'ESE', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 0.1),
        array('dir' => 5, 'dirText' => 'ESE', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 0.1),
        array('dir' => 5, 'dirText' => 'ESE', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 0),
        array('dir' => 5, 'dirText' => 'ESE', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0),
        array('dir' => 6, 'dirText' => 'SE', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0),
        array('dir' => 6, 'dirText' => 'SE', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 0.8),
        array('dir' => 6, 'dirText' => 'SE', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 1.4),
        array('dir' => 6, 'dirText' => 'SE', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 1.4),
        array('dir' => 6, 'dirText' => 'SE', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 1),
        array('dir' => 6, 'dirText' => 'SE', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 0.1),
        array('dir' => 6, 'dirText' => 'SE', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0),
        array('dir' => 7, 'dirText' => 'SSE', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0.1),
        array('dir' => 7, 'dirText' => 'SSE', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 6),
        array('dir' => 7, 'dirText' => 'SSE', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 2),
        array('dir' => 7, 'dirText' => 'SSE', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 0.8),
        array('dir' => 7, 'dirText' => 'SSE', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 0.5),
        array('dir' => 7, 'dirText' => 'SSE', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 0),
        array('dir' => 7, 'dirText' => 'SSE', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0),
        array('dir' => 8, 'dirText' => 'S', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0.2),
        array('dir' => 8, 'dirText' => 'S', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 10),
        array('dir' => 8, 'dirText' => 'S', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 1),
        array('dir' => 8, 'dirText' => 'S', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 0),
        array('dir' => 8, 'dirText' => 'S', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 0),
        array('dir' => 8, 'dirText' => 'S', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 0),
        array('dir' => 8, 'dirText' => 'S', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0),
        array('dir' => 9, 'dirText' => 'SSW', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0.1),
        array('dir' => 9, 'dirText' => 'SSW', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 8),
        array('dir' => 9, 'dirText' => 'SSW', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 1),
        array('dir' => 9, 'dirText' => 'SSW', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 0),
        array('dir' => 9, 'dirText' => 'SSW', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 0),
        array('dir' => 9, 'dirText' => 'SSW', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 0),
        array('dir' => 9, 'dirText' => 'SSW', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0),
        array('dir' => 10, 'dirText' => 'SW', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0),
        array('dir' => 10, 'dirText' => 'SW', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 6),
        array('dir' => 10, 'dirText' => 'SW', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 3),
        array('dir' => 10, 'dirText' => 'SW', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 1),
        array('dir' => 10, 'dirText' => 'SW', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 0.1),
        array('dir' => 10, 'dirText' => 'SW', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 0),
        array('dir' => 10, 'dirText' => 'SW', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0),
        array('dir' => 11, 'dirText' => 'WSW', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0),
        array('dir' => 11, 'dirText' => 'WSW', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 3),
        array('dir' => 11, 'dirText' => 'WSW', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 4),
        array('dir' => 11, 'dirText' => 'WSW', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 1),
        array('dir' => 11, 'dirText' => 'WSW', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 0),
        array('dir' => 11, 'dirText' => 'WSW', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 0),
        array('dir' => 11, 'dirText' => 'WSW', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0),
        array('dir' => 12, 'dirText' => 'W', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0),
        array('dir' => 12, 'dirText' => 'W', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 2),
        array('dir' => 12, 'dirText' => 'W', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 3),
        array('dir' => 12, 'dirText' => 'W', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 1),
        array('dir' => 12, 'dirText' => 'W', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 0),
        array('dir' => 12, 'dirText' => 'W', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 0),
        array('dir' => 12, 'dirText' => 'W', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0.1),
        array('dir' => 13, 'dirText' => 'WNW', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0),
        array('dir' => 13, 'dirText' => 'WNW', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 1),
        array('dir' => 13, 'dirText' => 'WNW', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 5),
        array('dir' => 13, 'dirText' => 'WNW', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 2),
        array('dir' => 13, 'dirText' => 'WNW', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 0.5),
        array('dir' => 13, 'dirText' => 'WNW', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 0),
        array('dir' => 13, 'dirText' => 'WNW', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0.1),
        array('dir' => 14, 'dirText' => 'NW', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0),
        array('dir' => 14, 'dirText' => 'NW', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 2),
        array('dir' => 14, 'dirText' => 'NW', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 5),
        array('dir' => 14, 'dirText' => 'NW', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 2),
        array('dir' => 14, 'dirText' => 'NW', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 1),
        array('dir' => 14, 'dirText' => 'NW', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 0.1),
        array('dir' => 14, 'dirText' => 'NW', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0.1),
        array('dir' => 15, 'dirText' => 'NNW', 'category' => 0, 'categoryText' => '< 0.5', 'frequency' => 0),
        array('dir' => 15, 'dirText' => 'NNW', 'category' => 1, 'categoryText' => '0.5 to 2', 'frequency' => 4),
        array('dir' => 15, 'dirText' => 'NNW', 'category' => 2, 'categoryText' => '2 to 4', 'frequency' => 5),
        array('dir' => 15, 'dirText' => 'NNW', 'category' => 3, 'categoryText' => '4 to 6', 'frequency' => 5),
        array('dir' => 15, 'dirText' => 'NNW', 'category' => 4, 'categoryText' => '6 to 8', 'frequency' => 3),
        array('dir' => 15, 'dirText' => 'NNW', 'category' => 5, 'categoryText' => '8 to 10', 'frequency' => 1),
        array('dir' => 15, 'dirText' => 'NNW', 'category' => 6, 'categoryText' => '> 10', 'frequency' => 0.2)
    );
}

function chart_antenna_gain() {
    return array(
        array('azimuth' => 0, 'gain' => 0),
        array('azimuth' => 10, 'gain' => 0),
        array('azimuth' => 20, 'gain' => 0),
        array('azimuth' => 30, 'gain' => -1),
        array('azimuth' => 40, 'gain' => -2),
        array('azimuth' => 50, 'gain' => -3),
        array('azimuth' => 60, 'gain' => -5),
        array('azimuth' => 70, 'gain' => -7),
        array('azimuth' => 80, 'gain' => -10),
        array('azimuth' => 90, 'gain' => -13),
        array('azimuth' => 100, 'gain' => -16),
        array('azimuth' => 110, 'gain' => -20),
        array('azimuth' => 120, 'gain' => -19),
        array('azimuth' => 130, 'gain' => -18),
        array('azimuth' => 140, 'gain' => -17),
        array('azimuth' => 150, 'gain' => -16),
        array('azimuth' => 160, 'gain' => -15),
        array('azimuth' => 170, 'gain' => -14),
        array('azimuth' => 180, 'gain' => -13),
        array('azimuth' => 190, 'gain' => -14),
        array('azimuth' => 200, 'gain' => -15),
        array('azimuth' => 210, 'gain' => -16),
        array('azimuth' => 220, 'gain' => -17),
        array('azimuth' => 230, 'gain' => -18),
        array('azimuth' => 240, 'gain' => -19),
        array('azimuth' => 250, 'gain' => -20),
        array('azimuth' => 260, 'gain' => -16),
        array('azimuth' => 270, 'gain' => -13),
        array('azimuth' => 280, 'gain' => -10),
        array('azimuth' => 290, 'gain' => -7),
        array('azimuth' => 300, 'gain' => -5),
        array('azimuth' => 310, 'gain' => -3),
        array('azimuth' => 320, 'gain' => -2),
        array('azimuth' => 330, 'gain' => -1),
        array('azimuth' => 340, 'gain' => 0),
        array('azimuth' => 350, 'gain' => 0),
        array('azimuth' => 0, 'gain' => 0)
    );
}

function chart_sun_position() {
    return array(
        array('time' => '08:00', 'altitude' => 4.9, 'azimuth' => 92.7),
        array('time' => '09:00', 'altitude' => 17.6, 'azimuth' => 100.6),
        array('time' => '10:00', 'altitude' => 30.1, 'azimuth' => 109.7),
        array('time' => '11:00', 'altitude' => 41.8, 'azimuth' => 121.3),
        array('time' => '12:00', 'altitude' => 51.8, 'azimuth' => 137.7),
        array('time' => '13:00', 'altitude' => 58.5, 'azimuth' => 161.5),
        array('time' => '14:00', 'altitude' => 59.4, 'azimuth' => 190.7),
        array('time' => '15:00', 'altitude' => 54.1, 'azimuth' => 216.6),
        array('time' => '16:00', 'altitude' => 44.8, 'azimuth' => 234.8),
        array('time' => '17:00', 'altitude' => 33.5, 'azimuth' => 247.6),
        array('time' => '18:00', 'altitude' => 21.2, 'azimuth' => 257.2),
        array('time' => '19:00', 'altitude' => 8.4, 'azimuth' => 265.3)
    );
}

function ozone_oncentration() {
    return array(
        array('year' => 1990, 'lower' => 1.3, 'q1' => 2.15, 'median' => 2.95, 'q3' => 3.725, 'upper' => 4.7, 'mean' => 2.9, 'outliers' => array(1, 9)),
        array('year' => 1991, 'lower' => 2, 'q1' => 3.825, 'median' => 5.45, 'q3' => 6.425, 'upper' => 8.2, 'mean' => 5.2, 'outliers' => array(1.5, 2, 8.9)),
        array('year' => 1992, 'lower' => 3.8, 'q1' => 4.725, 'median' => 5.55, 'q3' => 5.75, 'upper' => 8.7, 'mean' => 5.5),
        array('year' => 1993, 'lower' => 3, 'q1' => 4.375, 'median' => 4.95, 'q3' => 5.85, 'upper' => 8, 'mean' => 5.2, 'outliers' => array(3, 9.5)),
        array('year' => 1994, 'lower' => 2.5, 'q1' => 3.925, 'median' => 4.15, 'q3' => 4.45, 'upper' => 5.1, 'mean' => 4.1),
        array('year' => 1995, 'lower' => 2.4, 'q1' => 3.725, 'median' => 4.95, 'q3' => 5.85, 'upper' => 7.7, 'mean' => 4.9, 'outliers' => array(2.1, 8.3, 9.8)),
        array('year' => 1996, 'lower' => 1.7, 'q1' => 2.3, 'median' => 3.9, 'q3' => 5, 'upper' => 5.5, 'mean' => 3.7, 'outliers' => array(1.1, 9.1)),
        array('year' => 1997, 'lower' => 2.2, 'q1' => 2.5, 'median' => 3.1, 'q3' => 3.975, 'upper' => 4.3, 'mean' => 3.2, 'outliers' => array(1.6, 1.8, 9.8)),
        array('year' => 1998, 'lower' => 1.9, 'q1' => 2.7, 'median' => 3.35, 'q3' => 4.575, 'upper' => 5.7, 'mean' => 3.6, 'outliers' => array(1.1, 8.3)),
        array('year' => 1999, 'lower' => 1.7, 'q1' => 2.65, 'median' => 3.3, 'q3' => 4.05, 'upper' => 5, 'mean' => 3.4),
        array('year' => 2000, 'lower' => 1.4, 'q1' => 2.25, 'median' => 3.3, 'q3' => 4.65, 'upper' => 5.7, 'mean' => 3.4),
        array('year' => 2001, 'lower' => 1.9, 'q1' => 2.85, 'median' => 4, 'q3' => 4.45, 'upper' => 6.1, 'mean' => 3.9, 'outliers' => array(1, 1.2)),
        array('year' => 2002, 'lower' => 1.5, 'q1' => 2.35, 'median' => 4.1, 'q3' => 5.225, 'upper' => 5.7, 'mean' => 3.9, 'outliers' => array(9, 9.5)),
        array('year' => 2003, 'lower' => 1.8, 'q1' => 2.325, 'median' => 3.35, 'q3' => 4, 'upper' => 5.4, 'mean' => 3.3, 'outliers' => array(1, 6)),
        array('year' => 2004, 'lower' => 1.8, 'q1' => 2.75, 'median' => 3.35, 'q3' => 3.825, 'upper' => 4.9, 'mean' => 3.4),
        array('year' => 2005, 'lower' => 1.7, 'q1' => 2.275, 'median' => 3.2, 'q3' => 3.825, 'upper' => 5.5, 'mean' => 3.2, 'outliers' => array(0.5, 6.7)),
        array('year' => 2006, 'lower' => 1.2, 'q1' => 1.95, 'median' => 2.45, 'q3' => 3.075, 'upper' => 3.5, 'mean' => 2.5),
        array('year' => 2007, 'lower' => 1.3, 'q1' => 1.9, 'median' => 3.05, 'q3' => 3.425, 'upper' => 4, 'mean' => 2.7, 'outliers' => array(7, 8.5))
    );
}

function ozone_oncentration_remote() {
    return array(
        array('year' => 1996, 'lower' => 1.3, 'q1' => 2.15, 'median' => 2.95, 'q3' => 3.725, 'upper' => 4.7, 'mean' => 2.9, 'outliers' => array(1, 9)),
        array('year' => 1997, 'lower' => 2, 'q1' => 3.825, 'median' => 5.45, 'q3' => 6.425, 'upper' => 8.2, 'mean' => 5.2, 'outliers' => array(1.5, 2, 8.9)),
        array('year' => 1998, 'lower' => 3.8, 'q1' => 4.725, 'median' => 5.55, 'q3' => 5.75, 'upper' => 8.7, 'mean' => 5.5),
        array('year' => 1999, 'lower' => 3, 'q1' => 4.375, 'median' => 4.95, 'q3' => 5.85, 'upper' => 8, 'mean' => 5.2, 'outliers' => array(3, 9.5)),
        array('year' => 2000, 'lower' => 2.5, 'q1' => 3.925, 'median' => 4.15, 'q3' => 4.45, 'upper' => 5.1, 'mean' => 4.1),
        array('year' => 2001, 'lower' => 2.4, 'q1' => 3.725, 'median' => 4.95, 'q3' => 5.85, 'upper' => 7.7, 'mean' => 4.9, 'outliers' => array(2.1, 8.3, 9.8)),
        array('year' => 2002, 'lower' => 1.7, 'q1' => 2.3, 'median' => 3.9, 'q3' => 5, 'upper' => 5.5, 'mean' => 3.7, 'outliers' => array(1.1, 9.1)),
        array('year' => 2003, 'lower' => 2.2, 'q1' => 2.5, 'median' => 3.1, 'q3' => 3.975, 'upper' => 4.3, 'mean' => 3.2, 'outliers' => array(1.6, 1.8, 9.8)),
        array('year' => 2004, 'lower' => 1.9, 'q1' => 2.7, 'median' => 3.35, 'q3' => 4.575, 'upper' => 5.7, 'mean' => 3.6, 'outliers' => array(1.1, 8.3)),
        array('year' => 2005, 'lower' => 1.7, 'q1' => 2.65, 'median' => 3.3, 'q3' => 4.05, 'upper' => 5, 'mean' => 3.4),
        array('year' => 2006, 'lower' => 1.4, 'q1' => 2.25, 'median' => 3.3, 'q3' => 4.65, 'upper' => 5.7, 'mean' => 3.4),
        array('year' => 2007, 'lower' => 1.9, 'q1' => 2.85, 'median' => 4, 'q3' => 4.45, 'upper' => 6.1, 'mean' => 3.9, 'outliers' => array(1, 1.2)),
        array('year' => 2008, 'lower' => 1.5, 'q1' => 2.35, 'median' => 4.1, 'q3' => 5.225, 'upper' => 5.7, 'mean' => 3.9, 'outliers' => array(9, 9.5)),
        array('year' => 2009, 'lower' => 1.8, 'q1' => 2.325, 'median' => 3.35, 'q3' => 4, 'upper' => 5.4, 'mean' => 3.3, 'outliers' => array(1, 6)),
        array('year' => 2010, 'lower' => 1.8, 'q1' => 2.75, 'median' => 3.35, 'q3' => 3.825, 'upper' => 4.9, 'mean' => 3.4),
        array('year' => 2011, 'lower' => 1.7, 'q1' => 2.275, 'median' => 3.2, 'q3' => 3.825, 'upper' => 5.5, 'mean' => 3.2, 'outliers' => array(0.5, 6.7)),
        array('year' => 2012, 'lower' => 1.2, 'q1' => 1.95, 'median' => 2.45, 'q3' => 3.075, 'upper' => 3.5, 'mean' => 2.5),
        array('year' => 2013, 'lower' => 1.3, 'q1' => 1.9, 'median' => 3.05, 'q3' => 3.425, 'upper' => 4, 'mean' => 2.7, 'outliers' => array(7, 8.5))
    );
}

?>
