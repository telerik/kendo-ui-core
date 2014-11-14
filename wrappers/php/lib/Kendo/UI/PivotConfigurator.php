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
    * If set to true the user will be able to filter by using the field menu.
    * @param boolean $value
    * @return \Kendo\UI\PivotConfigurator
    */
    public function filterable($value) {
        return $this->setProperty('filterable', $value);
    }

    /**
    * If set to true the user could sort the widget by clicking the dimension fields. By default sorting is disabled.Can be set to a JavaScript object which represents the sorting configuration.
    * @param boolean|\Kendo\UI\PivotConfiguratorSortable|array $value
    * @return \Kendo\UI\PivotConfigurator
    */
    public function sortable($value) {
        return $this->setProperty('sortable', $value);
    }

    /**
    * The height of the PivotConfigurator. Numeric values are treated as pixels.
    * @param float|string $value
    * @return \Kendo\UI\PivotConfigurator
    */
    public function height($value) {
        return $this->setProperty('height', $value);
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
