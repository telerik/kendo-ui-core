<?php

namespace Kendo\UI;

class PivotConfigurator extends \Kendo\UI\Widget {
    public function name() {
        return 'PivotConfigurator';
    }
//>> Properties

    /**
    * Sets the data source of the PivotConfigurator.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\UI\PivotConfigurator
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * The text messages displayed in the fields sections.
    * @param \Kendo\UI\PivotConfiguratorMessages|array $value
    * @return \Kendo\UI\PivotConfigurator
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }


//<< Properties
}

?>
