
package com.kendoui.taglib.pivotconfigurator;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.PivotConfiguratorTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        PivotConfiguratorTag parent = (PivotConfiguratorTag)findParentWithClass(PivotConfiguratorTag.class);


        parent.setMessages(this);

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
        return "pivotConfigurator-messages";
    }

    public java.lang.String getColumns() {
        return (java.lang.String)getProperty("columns");
    }

    public void setColumns(java.lang.String value) {
        setProperty("columns", value);
    }

    public java.lang.String getColumnsLabel() {
        return (java.lang.String)getProperty("columnsLabel");
    }

    public void setColumnsLabel(java.lang.String value) {
        setProperty("columnsLabel", value);
    }

    public java.lang.String getFieldsLabel() {
        return (java.lang.String)getProperty("fieldsLabel");
    }

    public void setFieldsLabel(java.lang.String value) {
        setProperty("fieldsLabel", value);
    }

    public java.lang.String getMeasures() {
        return (java.lang.String)getProperty("measures");
    }

    public void setMeasures(java.lang.String value) {
        setProperty("measures", value);
    }

    public java.lang.String getMeasuresLabel() {
        return (java.lang.String)getProperty("measuresLabel");
    }

    public void setMeasuresLabel(java.lang.String value) {
        setProperty("measuresLabel", value);
    }

    public java.lang.String getRows() {
        return (java.lang.String)getProperty("rows");
    }

    public void setRows(java.lang.String value) {
        setProperty("rows", value);
    }

    public java.lang.String getRowsLabel() {
        return (java.lang.String)getProperty("rowsLabel");
    }

    public void setRowsLabel(java.lang.String value) {
        setProperty("rowsLabel", value);
    }

//<< Attributes

}
