<?php

namespace Kendo\Data;

class PivotDataSourceSchema extends \Kendo\Data\DataSourceSchema {
    public function cube(\Kendo\Data\PivotDataSourceSchemaCube $value) {
        return $this->setProperty('cube', $value);
    }
//>> Properties

    /**
    * The field from the server response which contains the columns and rows axes data. Can be set to a function which is called to
return the columns and rows axes data for the response.
    * @param \Kendo\JavaScriptFunction|string $value
    * @return \Kendo\Data\PivotDataSourceSchema
    */
    public function axes($value) {
        return $this->setProperty('axes', $value);
    }

    /**
    * The field from the server response which contains the list of catalogs available on the server. Can be set to a function which is called to
return the catalogs schema information for the response. It is executed during the schema discover.
    * @param \Kendo\JavaScriptFunction|string $value
    * @return \Kendo\Data\PivotDataSourceSchema
    */
    public function catalogs($value) {
        return $this->setProperty('catalogs', $value);
    }

    /**
    * The field from the server response which contains the list of cubes available in the catalog. Can be set to a function which is called to
return the cubes schema information for the response. It is executed during the schema discover.
    * @param \Kendo\JavaScriptFunction|string $value
    * @return \Kendo\Data\PivotDataSourceSchema
    */
    public function cubes($value) {
        return $this->setProperty('cubes', $value);
    }

    /**
    * The field from the server response which contains the cells data. Can be set to a function which is called to
return the cells data for the response.
    * @param \Kendo\JavaScriptFunction|string $value
    * @return \Kendo\Data\PivotDataSourceSchema
    */
    public function data($value) {
        return $this->setProperty('data', $value);
    }

    /**
    * The field from the server response which contains the dimensions schema information. Can be set to a function which is called to
return the dimensions schema information for the response. It is executed during the schema discover.
    * @param \Kendo\JavaScriptFunction|string $value
    * @return \Kendo\Data\PivotDataSourceSchema
    */
    public function dimensions($value) {
        return $this->setProperty('dimensions', $value);
    }

    /**
    * The field from the server response which contains the hierarchies schema information. Can be set to a function which is called to
return the hierarchies schema information for the response. It is executed during the schema discover requests.
    * @param \Kendo\JavaScriptFunction|string $value
    * @return \Kendo\Data\PivotDataSourceSchema
    */
    public function hierarchies($value) {
        return $this->setProperty('hierarchies', $value);
    }

    /**
    * The field from the server response which contains the levels schema information. Can be set to a function which is called to
return the levels schema information for the response. It is executed during the schema discover.
    * @param \Kendo\JavaScriptFunction|string $value
    * @return \Kendo\Data\PivotDataSourceSchema
    */
    public function levels($value) {
        return $this->setProperty('levels', $value);
    }

    /**
    * The field from the server response which contains the measures schema information. Can be set to a function which is called to
return the measures schema information for the response. It is executed during the schema discover.
    * @param \Kendo\JavaScriptFunction|string $value
    * @return \Kendo\Data\PivotDataSourceSchema
    */
    public function measures($value) {
        return $this->setProperty('measures', $value);
    }

//<< Properties
}

?>
