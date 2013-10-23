<?php

namespace Kendo\Dataviz\UI;

class ChartLegendInactiveItems extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The chart legend label configuration.
    * @param \Kendo\Dataviz\UI\ChartLegendInactiveItemsLabels|array $value
    * @return \Kendo\Dataviz\UI\ChartLegendInactiveItems
    */
    public function labels($value) {
        return $this->setProperty('labels', $value);
    }

//<< Properties
}

?>
