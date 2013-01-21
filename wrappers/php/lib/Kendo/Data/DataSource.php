<?php

namespace Kendo\Data;

class DataSource extends \Kendo\SerializableObject {
//>> Properties

    public function addAggregateItem(\Kendo\Data\DataSourceAggregateItem $value) {
        return $this->add('aggregate', $value);
    }

    public function autoSync($value) {
        return $this->setProperty('autoSync', $value);
    }

    public function batch($value) {
        return $this->setProperty('batch', $value);
    }

    public function data($value) {
        return $this->setProperty('data', $value);
    }

    public function addFilterItem(\Kendo\Data\DataSourceFilterItem $value) {
        return $this->add('filter', $value);
    }

    public function addGroupItem(\Kendo\Data\DataSourceGroupItem $value) {
        return $this->add('group', $value);
    }

    public function page($value) {
        return $this->setProperty('page', $value);
    }

    public function pageSize($value) {
        return $this->setProperty('pageSize', $value);
    }

    public function schema(\Kendo\Data\DataSourceSchema $value) {
        return $this->setProperty('schema', $value);
    }

    public function serverAggregates($value) {
        return $this->setProperty('serverAggregates', $value);
    }

    public function serverFiltering($value) {
        return $this->setProperty('serverFiltering', $value);
    }

    public function serverGrouping($value) {
        return $this->setProperty('serverGrouping', $value);
    }

    public function serverPaging($value) {
        return $this->setProperty('serverPaging', $value);
    }

    public function serverSorting($value) {
        return $this->setProperty('serverSorting', $value);
    }

    public function addSortItem(\Kendo\Data\DataSourceSortItem $value) {
        return $this->add('sort', $value);
    }

    public function transport(\Kendo\Data\DataSourceTransport $value) {
        return $this->setProperty('transport', $value);
    }

    public function type($value) {
        return $this->setProperty('type', $value);
    }

    public function change($value) {
        return $this->setProperty('change', new \Kendo\JavaScriptFunction($value));
    }

    public function error($value) {
        return $this->setProperty('error', new \Kendo\JavaScriptFunction($value));
    }

    public function sync($value) {
        return $this->setProperty('sync', new \Kendo\JavaScriptFunction($value));
    }

    public function requestStart($value) {
        return $this->setProperty('requestStart', new \Kendo\JavaScriptFunction($value));
    }

    public function requestEnd($value) {
        return $this->setProperty('requestEnd', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
