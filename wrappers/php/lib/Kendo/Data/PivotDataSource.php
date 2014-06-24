<?php

namespace Kendo\Data;

class PivotDataSource extends \Kendo\Data\DataSource {
//>> Properties

    /**
    * Adds PivotDataSourceColumn to the PivotDataSource.
    * @param \Kendo\Data\PivotDataSourceColumn|array,... $value one or more PivotDataSourceColumn to add.
    * @return \Kendo\Data\PivotDataSource
    */
    public function addColumn($value) {
        return $this->add('columns', func_get_args());
    }

    /**
    * Adds PivotDataSourceMeasure to the PivotDataSource.
    * @param \Kendo\Data\PivotDataSourceMeasure|array,... $value one or more PivotDataSourceMeasure to add.
    * @return \Kendo\Data\PivotDataSource
    */
    public function addMeasure($value) {
        return $this->add('measures', func_get_args());
    }

    /**
    * Adds PivotDataSourceRow to the PivotDataSource.
    * @param \Kendo\Data\PivotDataSourceRow|array,... $value one or more PivotDataSourceRow to add.
    * @return \Kendo\Data\PivotDataSource
    */
    public function addRow($value) {
        return $this->add('rows', func_get_args());
    }

    /**
    * The configuration used to load data items and discover schema information.
    * @param \Kendo\Data\PivotDataSourceTransport|array $value
    * @return \Kendo\Data\PivotDataSource
    */
    public function transport($value) {
        return $this->setProperty('transport', $value);
    }

    /**
    * The schema configuration of the PivotDataSource.
    * @param \Kendo\Data\PivotDataSourceSchema|array $value
    * @return \Kendo\Data\PivotDataSource
    */
    public function schema($value) {
        return $this->setProperty('schema', $value);
    }


//<< Properties
}

?>
