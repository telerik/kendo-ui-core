
package com.kendoui.taglib;


import com.kendoui.taglib.pivotconfigurator.*;



import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PivotConfiguratorTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public PivotConfiguratorTag() {
        super("PivotConfigurator");
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
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
        return "pivotConfigurator";
    }

    public void setMessages(com.kendoui.taglib.pivotconfigurator.MessagesTag value) {
        setProperty("messages", value);
    }

    public void setSortable(com.kendoui.taglib.pivotconfigurator.SortableTag value) {
        setProperty("sortable", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public boolean getFilterable() {
        return (boolean)getProperty("filterable");
    }

    public void setFilterable(boolean value) {
        setProperty("filterable", value);
    }

    public java.lang.Object getHeight() {
        return (java.lang.Object)getProperty("height");
    }

    public void setHeight(java.lang.Object value) {
        setProperty("height", value);
    }

    public boolean getSortable() {
        return (boolean)getProperty("sortable");
    }

    public void setSortable(boolean value) {
        setProperty("sortable", value);
    }

//<< Attributes

}
