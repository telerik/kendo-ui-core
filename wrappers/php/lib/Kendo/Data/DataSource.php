<?php

namespace Kendo\Data;

class DataSource extends \Kendo\SerializableObject {
//>> Properties

    public function addAggregateItem(\Kendo\Data\DataSourceAggregateItem $value) {
        $values = $this->getProperty('aggregate');

        if ($values == null) {
            $values = array();
            $this->setProperty('aggregate', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function autoSync($value) {
        $this->setProperty('autoSync', $value);

        return $this;
    }

    public function batch($value) {
        $this->setProperty('batch', $value);

        return $this;
    }

    public function data($value) {
        $this->setProperty('data', $value);

        return $this;
    }

    public function addFilterItem(\Kendo\Data\DataSourceFilterItem $value) {
        $values = $this->getProperty('filter');

        if ($values == null) {
            $values = array();
            $this->setProperty('filter', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function addGroupItem(\Kendo\Data\DataSourceGroupItem $value) {
        $values = $this->getProperty('group');

        if ($values == null) {
            $values = array();
            $this->setProperty('group', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function page($value) {
        $this->setProperty('page', $value);

        return $this;
    }

    public function pageSize($value) {
        $this->setProperty('pageSize', $value);

        return $this;
    }

    public function schema(\Kendo\Data\DataSourceSchema $value) {
        $this->setProperty('schema', $value);

        return $this;
    }

    public function serverAggregates($value) {
        $this->setProperty('serverAggregates', $value);

        return $this;
    }

    public function serverFiltering($value) {
        $this->setProperty('serverFiltering', $value);

        return $this;
    }

    public function serverGrouping($value) {
        $this->setProperty('serverGrouping', $value);

        return $this;
    }

    public function serverPaging($value) {
        $this->setProperty('serverPaging', $value);

        return $this;
    }

    public function serverSorting($value) {
        $this->setProperty('serverSorting', $value);

        return $this;
    }

    public function addSortItem(\Kendo\Data\DataSourceSortItem $value) {
        $values = $this->getProperty('sort');

        if ($values == null) {
            $values = array();
            $this->setProperty('sort', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function transport(\Kendo\Data\DataSourceTransport $value) {
        $this->setProperty('transport', $value);

        return $this;
    }

    public function type($value) {
        $this->setProperty('type', $value);

        return $this;
    }

    public function change($value) {
        $this->setProperty('change', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function error($value) {
        $this->setProperty('error', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function sync($value) {
        $this->setProperty('sync', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function requestStart($value) {
        $this->setProperty('requestStart', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function requestEnd($value) {
        $this->setProperty('requestEnd', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
