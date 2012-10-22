
package com.kendoui.taglib.datasource;

import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.json.Function;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SchemaTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Schema parent = (Schema)findParentWithClass(Schema.class);

        parent.setSchema(this);

//<< doEndTag

        return super.doEndTag();
    }
    
    public void setModel(ModelTag modelTag) {
        setProperty("model", modelTag.properties());
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
        return "dataSource-schema";
    }

    public Object getModel() {
        return (Object)getProperty("model");
    }

    public void setModel(Object value) {
        setProperty("model", value);
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

//<< Attributes

}
