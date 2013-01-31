<?php

namespace Kendo\Data;

class DataSource extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Adds DataSourceAggregateItem to the DataSource.
    * @param \Kendo\Data\DataSourceAggregateItem|array,... $value one or more DataSourceAggregateItem to add.
    * @return \Kendo\Data\DataSource
    */
    public function addAggregateItem($value) {
        return $this->add('aggregate', func_get_args());
    }

    /**
    * Enables (true) or disables (false) the automatic invocation of the sync() method for each change made.
    * @param boolean $value
    * @return \Kendo\Data\DataSource
    */
    public function autoSync($value) {
        return $this->setProperty('autoSync', $value);
    }

    /**
    * Enables (true) or disables (false) batch mode.
    * @param boolean $value
    * @return \Kendo\Data\DataSource
    */
    public function batch($value) {
        return $this->setProperty('batch', $value);
    }

    /**
    * Specifies the local JavaScript object to use for the data source.
    * @param array $value
    * @return \Kendo\Data\DataSource
    */
    public function data($value) {
        return $this->setProperty('data', $value);
    }

    /**
    * Adds DataSourceFilterItem to the DataSource.
    * @param \Kendo\Data\DataSourceFilterItem|array,... $value one or more DataSourceFilterItem to add.
    * @return \Kendo\Data\DataSource
    */
    public function addFilterItem($value) {
        return $this->add('filter', func_get_args());
    }

    /**
    * Adds DataSourceGroupItem to the DataSource.
    * @param \Kendo\Data\DataSourceGroupItem|array,... $value one or more DataSourceGroupItem to add.
    * @return \Kendo\Data\DataSource
    */
    public function addGroupItem($value) {
        return $this->add('group', func_get_args());
    }

    /**
    * Sets the index of the displayed page of data.
    * @param float $value
    * @return \Kendo\Data\DataSource
    */
    public function page($value) {
        return $this->setProperty('page', $value);
    }

    /**
    * Sets the number of records which contains a given page of data.
    * @param float $value
    * @return \Kendo\Data\DataSource
    */
    public function pageSize($value) {
        return $this->setProperty('pageSize', $value);
    }

    /**
    * Set the object responsible for describing the raw data format.
    * @param \Kendo\Data\DataSourceSchema|array $value
    * @return \Kendo\Data\DataSource
    */
    public function schema($value) {
        return $this->setProperty('schema', $value);
    }

    /**
    * Determines if aggregates are calculated on the server or not. By default aggregates are calculated client-side.
    * @param boolean $value
    * @return \Kendo\Data\DataSource
    */
    public function serverAggregates($value) {
        return $this->setProperty('serverAggregates', $value);
    }

    /**
    * Determines if filtering of the data is handled on the server. By default filtering is performed client-side.By default, a filter object is sent to the server with the query string in the following form:Possible values for operator include:
    * @param boolean $value
    * @return \Kendo\Data\DataSource
    */
    public function serverFiltering($value) {
        return $this->setProperty('serverFiltering', $value);
    }

    /**
    * Determines if grouping of the data is handled on the server. By default grouping is performed client-side.By default, a group object is sent to the server with the query string in the following form:It is possible to modify these parameters by using the parameterMap function found on the transport.
    * @param boolean $value
    * @return \Kendo\Data\DataSource
    */
    public function serverGrouping($value) {
        return $this->setProperty('serverGrouping', $value);
    }

    /**
    * Determines if paging of the data is on the server. By default paging is performed client-side. If serverPaging is enabled the
total number of data items should also be returned in the response. Use the schema.total setting to customize that.The following options are sent to the server as part of the query string by default:
    * @param boolean $value
    * @return \Kendo\Data\DataSource
    */
    public function serverPaging($value) {
        return $this->setProperty('serverPaging', $value);
    }

    /**
    * Determines if sorting of the data should is handled on the server. By default sorting is performed client-side.By default, a sort object is sent to the server with the query string in the following form:It is possible to modify these parameters by using the parameterMap function found on the transport.
    * @param boolean $value
    * @return \Kendo\Data\DataSource
    */
    public function serverSorting($value) {
        return $this->setProperty('serverSorting', $value);
    }

    /**
    * Adds DataSourceSortItem to the DataSource.
    * @param \Kendo\Data\DataSourceSortItem|array,... $value one or more DataSourceSortItem to add.
    * @return \Kendo\Data\DataSource
    */
    public function addSortItem($value) {
        return $this->add('sort', func_get_args());
    }

    /**
    * Specifies the settings for loading and saving data. This can be a remote or local/in-memory data.
    * @param \Kendo\Data\DataSourceTransport|array $value
    * @return \Kendo\Data\DataSource
    */
    public function transport($value) {
        return $this->setProperty('transport', $value);
    }

    /**
    * Loads transport with preconfigured settings. Currently supports only "odata" (Requires kendo.data.odata.js to be included).
    * @param string $value
    * @return \Kendo\Data\DataSource
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * Sets the change event of the DataSource.
    * Fires when data is changed or read from the transport.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Data\DataSource
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the error event of the DataSource.
    * Fires when an error occurs during data read or sync.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Data\DataSource
    */
    public function error($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('error', $value);
    }

    /**
    * Sets the sync event of the DataSource.
    * Fires after changes are synced.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Data\DataSource
    */
    public function sync($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('sync', $value);
    }

    /**
    * Sets the requestStart event of the DataSource.
    * Fires when data request is to be made.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Data\DataSource
    */
    public function requestStart($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('requestStart', $value);
    }

    /**
    * Sets the requestEnd event of the DataSource.
    * Fires when a data request is received. Raised after a Create, Read, Update or Destroy request is performed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Data\DataSource
    */
    public function requestEnd($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('requestEnd', $value);
    }


//<< Properties
}

?>
