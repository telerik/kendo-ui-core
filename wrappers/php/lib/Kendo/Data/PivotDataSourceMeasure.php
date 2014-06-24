<?php

namespace Kendo\Data;

class PivotDataSourceMeasure extends \Kendo\SerializableObject {
//>> Properties

    /**
    * An string array which values are interpreted as the name of the measures to be loaded.
    * @param array $value
    * @return \Kendo\Data\PivotDataSourceMeasure
    */
    public function values($value) {
        return $this->setProperty('values', $value);
    }

    /**
    * The name of the axis on which the measures will be displayed. Supported values are rows or columns. This option is applicable if multiple measures are used.
    * @param string $value
    * @return \Kendo\Data\PivotDataSourceMeasure
    */
    public function axis($value) {
        return $this->setProperty('axis', $value);
    }

//<< Properties
}

?>
