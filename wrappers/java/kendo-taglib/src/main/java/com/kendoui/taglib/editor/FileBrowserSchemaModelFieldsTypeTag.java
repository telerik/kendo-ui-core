
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.json.Function;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FileBrowserSchemaModelFieldsTypeTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        FileBrowserSchemaModelFieldsTag parent = (FileBrowserSchemaModelFieldsTag)findParentWithClass(FileBrowserSchemaModelFieldsTag.class);


        parent.setType(this);

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
        return "editor-fileBrowser-schema-model-fields-type";
    }

    public void setParse(FileBrowserSchemaModelFieldsTypeParseFunctionTag value) {
        setEvent("parse", value.getBody());
    }

    public java.lang.String getField() {
        return (java.lang.String)getProperty("field");
    }

    public void setField(java.lang.String value) {
        setProperty("field", value);
    }

    public String getParse() {
        Function property = ((Function)getProperty("parse"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setParse(String value) {
        setProperty("parse", new Function(value));
    }

//<< Attributes

}
