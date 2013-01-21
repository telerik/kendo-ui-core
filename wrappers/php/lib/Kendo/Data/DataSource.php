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

    public function setAutoSync($value) {
        $this->setProperty('autoSync', $value);

        return $this;
    }

    public function setBatch($value) {
        $this->setProperty('batch', $value);

        return $this;
    }

    public function setData($value) {
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

    public function setPage($value) {
        $this->setProperty('page', $value);

        return $this;
    }

    public function setPageSize($value) {
        $this->setProperty('pageSize', $value);

        return $this;
    }

    public function setSchema(\Kendo\Data\DataSourceSchema $value) {
        $this->setProperty('schema', $value);

        return $this;
    }

    public function setServerAggregates($value) {
        $this->setProperty('serverAggregates', $value);

        return $this;
    }

    public function setServerFiltering($value) {
        $this->setProperty('serverFiltering', $value);

        return $this;
    }

    public function setServerGrouping($value) {
        $this->setProperty('serverGrouping', $value);

        return $this;
    }

    public function setServerPaging($value) {
        $this->setProperty('serverPaging', $value);

        return $this;
    }

    public function setServerSorting($value) {
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

    public function setTransport(\Kendo\Data\DataSourceTransport $value) {
        $this->setProperty('transport', $value);

        return $this;
    }

    public function setType($value) {
        $this->setProperty('type', $value);

        return $this;
    }

    public function setChange($value) {
        $this->setProperty('change', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setError($value) {
        $this->setProperty('error', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setSync($value) {
        $this->setProperty('sync', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setRequestStart($value) {
        $this->setProperty('requestStart', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

    public function setRequestEnd($value) {
        $this->setProperty('requestEnd', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
