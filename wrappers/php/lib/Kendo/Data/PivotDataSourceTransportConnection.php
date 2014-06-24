<?php

namespace Kendo\Data;

class PivotDataSourceTransportConnection extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The catalog name.
    * @param string $value
    * @return \Kendo\Data\PivotDataSourceTransportConnection
    */
    public function catalog($value) {
        return $this->setProperty('catalog', $value);
    }

    /**
    * The cube name in the current data source.
    * @param string $value
    * @return \Kendo\Data\PivotDataSourceTransportConnection
    */
    public function cube($value) {
        return $this->setProperty('cube', $value);
    }

//<< Properties
}

?>
