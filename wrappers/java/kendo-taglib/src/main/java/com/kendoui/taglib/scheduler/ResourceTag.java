
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.DataSourceTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ResourceTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
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

    public String getDataColorField() {
        return (String)getProperty("dataColorField");
    }

    public void setDataColorField(String value) {
        setProperty("dataColorField", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public String getDataTextField() {
        return (String)getProperty("dataTextField");
    }

    public void setDataTextField(String value) {
        setProperty("dataTextField", value);
    }

    public String getDataValueField() {
        return (String)getProperty("dataValueField");
    }

    public void setDataValueField(String value) {
        setProperty("dataValueField", value);
    }

    public String getField() {
        return (String)getProperty("field");
    }

    public void setField(String value) {
        setProperty("field", value);
    }

    public boolean getMultiple() {
        return (boolean)getProperty("multiple");
    }

    public void setMultiple(boolean value) {
        setProperty("multiple", value);
    }

    public String getTitle() {
        return (String)getProperty("title");
    }

    public void setTitle(String value) {
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
