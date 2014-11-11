
package com.kendoui.taglib.gantt;


import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.DataBoundWidget;

import com.kendoui.taglib.DataSourceTag;

import com.kendoui.taglib.GanttTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ResourcesTag extends  BaseTag implements DataBoundWidget /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        GanttTag parent = (GanttTag)findParentWithClass(GanttTag.class);


        parent.setResources(this);

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
        return "gantt-resources";
    }

    public java.lang.String getDataColorField() {
        return (java.lang.String)getProperty("dataColorField");
    }

    public void setDataColorField(java.lang.String value) {
        setProperty("dataColorField", value);
    }

    public java.lang.String getDataFormatField() {
        return (java.lang.String)getProperty("dataFormatField");
    }

    public void setDataFormatField(java.lang.String value) {
        setProperty("dataFormatField", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public java.lang.String getDataTextField() {
        return (java.lang.String)getProperty("dataTextField");
    }

    public void setDataTextField(java.lang.String value) {
        setProperty("dataTextField", value);
    }

    public java.lang.String getField() {
        return (java.lang.String)getProperty("field");
    }

    public void setField(java.lang.String value) {
        setProperty("field", value);
    }

//<< Attributes

}
