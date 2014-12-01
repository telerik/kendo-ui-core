
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColumnCommandItemTextTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ColumnCommandItemTag parent = (ColumnCommandItemTag)findParentWithClass(ColumnCommandItemTag.class);


        parent.setText(this);

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
        return "grid-column-commandItem-text";
    }

    public java.lang.String getCancel() {
        return (java.lang.String)getProperty("cancel");
    }

    public void setCancel(java.lang.String value) {
        setProperty("cancel", value);
    }

    public java.lang.String getEdit() {
        return (java.lang.String)getProperty("edit");
    }

    public void setEdit(java.lang.String value) {
        setProperty("edit", value);
    }

    public java.lang.String getUpdate() {
        return (java.lang.String)getProperty("update");
    }

    public void setUpdate(java.lang.String value) {
        setProperty("update", value);
    }

//<< Attributes

}
