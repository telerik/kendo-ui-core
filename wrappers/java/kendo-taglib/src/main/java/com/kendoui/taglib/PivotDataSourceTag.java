
package com.kendoui.taglib;


import com.kendoui.taglib.pivotdatasource.ColumnsTag;
import com.kendoui.taglib.pivotdatasource.MeasuresTag;
import com.kendoui.taglib.pivotdatasource.RowsTag;

@SuppressWarnings("serial")
public class PivotDataSourceTag extends DataSourceTag /* interfaces *//* interfaces */ {

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "pivotDataSource";
    }

    public void setColumns(ColumnsTag value) {

        setProperty("columns", value.columns());

    }

    public void setMeasures(MeasuresTag value) {

        setProperty("measures", value.measures());

    }

    public void setRows(RowsTag value) {

        setProperty("rows", value.rows());

    }

    public void setSchema(com.kendoui.taglib.pivotdatasource.SchemaTag value) {
        setProperty("schema", value);
    }

    public void setTransport(com.kendoui.taglib.pivotdatasource.TransportTag value) {
        setProperty("transport", value);
    }

//<< Attributes

}
