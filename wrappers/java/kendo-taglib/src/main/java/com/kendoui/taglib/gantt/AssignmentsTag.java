
package com.kendoui.taglib.gantt;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.GanttTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AssignmentsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        GanttTag parent = (GanttTag)findParentWithClass(GanttTag.class);


        parent.setAssignments(this);

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
        return "gantt-assignments";
    }

    public java.lang.String getDataResourceIdField() {
        return (java.lang.String)getProperty("dataResourceIdField");
    }

    public void setDataResourceIdField(java.lang.String value) {
        setProperty("dataResourceIdField", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public java.lang.String getDataTaskIdField() {
        return (java.lang.String)getProperty("dataTaskIdField");
    }

    public void setDataTaskIdField(java.lang.String value) {
        setProperty("dataTaskIdField", value);
    }

    public java.lang.String getDataValueField() {
        return (java.lang.String)getProperty("dataValueField");
    }

    public void setDataValueField(java.lang.String value) {
        setProperty("dataValueField", value);
    }

//<< Attributes

}
