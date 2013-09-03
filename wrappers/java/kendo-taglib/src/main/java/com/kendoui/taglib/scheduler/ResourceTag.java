
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.DataBoundWidget;
import com.kendoui.taglib.DataSourceTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ResourceTag extends  BaseTag implements DataBoundWidget /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ResourcesTag parent = (ResourcesTag)findParentWithClass(ResourcesTag.class);

        parent.addResource(this);

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
        return "scheduler-resource";
    }

    public java.lang.String getDataColorField() {
        return (java.lang.String)getProperty("dataColorField");
    }

    public void setDataColorField(java.lang.String value) {
        setProperty("dataColorField", value);
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

    public java.lang.String getDataValueField() {
        return (java.lang.String)getProperty("dataValueField");
    }

    public void setDataValueField(java.lang.String value) {
        setProperty("dataValueField", value);
    }

    public java.lang.String getField() {
        return (java.lang.String)getProperty("field");
    }

    public void setField(java.lang.String value) {
        setProperty("field", value);
    }

    public boolean getMultiple() {
        return (boolean)getProperty("multiple");
    }

    public void setMultiple(boolean value) {
        setProperty("multiple", value);
    }

    public java.lang.String getName() {
        return (java.lang.String)getProperty("name");
    }

    public void setName(java.lang.String value) {
        setProperty("name", value);
    }

    public java.lang.String getTitle() {
        return (java.lang.String)getProperty("title");
    }

    public void setTitle(java.lang.String value) {
        setProperty("title", value);
    }

    public boolean getValuePrimitive() {
        return (boolean)getProperty("valuePrimitive");
    }

    public void setValuePrimitive(boolean value) {
        setProperty("valuePrimitive", value);
    }

//<< Attributes

}
