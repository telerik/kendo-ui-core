
package com.kendoui.taglib.pivotdatasource;


import com.kendoui.taglib.PivotDataSourceTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SchemaTag extends  com.kendoui.taglib.datasource.SchemaTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        PivotDataSourceTag parent = (PivotDataSourceTag)findParentWithClass(PivotDataSourceTag.class);


        parent.setSchema(this);

//<< doEndTag

        return super.doEndTag();
    }

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
        return "pivotDataSource-schema";
    }

    public void setAxes(SchemaAxesFunctionTag value) {
        setEvent("axes", value.getBody());
    }

    public void setCatalogs(SchemaCatalogsFunctionTag value) {
        setEvent("catalogs", value.getBody());
    }

    public void setCubes(SchemaCubesFunctionTag value) {
        setEvent("cubes", value.getBody());
    }

    public void setData(SchemaDataFunctionTag value) {
        setEvent("data", value.getBody());
    }

    public void setDimensions(SchemaDimensionsFunctionTag value) {
        setEvent("dimensions", value.getBody());
    }

    public void setHierarchies(SchemaHierarchiesFunctionTag value) {
        setEvent("hierarchies", value.getBody());
    }

    public void setLevels(SchemaLevelsFunctionTag value) {
        setEvent("levels", value.getBody());
    }

    public void setMeasures(SchemaMeasuresFunctionTag value) {
        setEvent("measures", value.getBody());
    }

    public java.lang.String getAxes() {
        return (java.lang.String)getProperty("axes");
    }

    public void setAxes(java.lang.String value) {
        setProperty("axes", value);
    }

    public java.lang.String getCatalogs() {
        return (java.lang.String)getProperty("catalogs");
    }

    public void setCatalogs(java.lang.String value) {
        setProperty("catalogs", value);
    }

    public java.lang.String getCubes() {
        return (java.lang.String)getProperty("cubes");
    }

    public void setCubes(java.lang.String value) {
        setProperty("cubes", value);
    }

    public java.lang.String getData() {
        return (java.lang.String)getProperty("data");
    }

    public void setData(java.lang.String value) {
        setProperty("data", value);
    }

    public java.lang.String getDimensions() {
        return (java.lang.String)getProperty("dimensions");
    }

    public void setDimensions(java.lang.String value) {
        setProperty("dimensions", value);
    }

    public java.lang.String getHierarchies() {
        return (java.lang.String)getProperty("hierarchies");
    }

    public void setHierarchies(java.lang.String value) {
        setProperty("hierarchies", value);
    }

    public java.lang.String getLevels() {
        return (java.lang.String)getProperty("levels");
    }

    public void setLevels(java.lang.String value) {
        setProperty("levels", value);
    }

    public java.lang.String getMeasures() {
        return (java.lang.String)getProperty("measures");
    }

    public void setMeasures(java.lang.String value) {
        setProperty("measures", value);
    }

//<< Attributes

}
