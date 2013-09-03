
package com.kendoui.taglib.sparkline;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ValueAxisItemNotesDataItemTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ValueAxisItemNotesDataTag parent = (ValueAxisItemNotesDataTag)findParentWithClass(ValueAxisItemNotesDataTag.class);

        parent.addDataItem(this);

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
        return "sparkline-valueAxisItem-notes-dataItem";
    }

    public void setIcon(com.kendoui.taglib.sparkline.ValueAxisItemNotesDataItemIconTag value) {
        setProperty("icon", value);
    }

    public void setLabel(com.kendoui.taglib.sparkline.ValueAxisItemNotesDataItemLabelTag value) {
        setProperty("label", value);
    }

    public void setLine(com.kendoui.taglib.sparkline.ValueAxisItemNotesDataItemLineTag value) {
        setProperty("line", value);
    }

    public java.lang.String getPosition() {
        return (java.lang.String)getProperty("position");
    }

    public void setPosition(java.lang.String value) {
        setProperty("position", value);
    }

    public java.lang.Object getValue() {
        return (java.lang.Object)getProperty("value");
    }

    public void setValue(java.lang.Object value) {
        setProperty("value", value);
    }

//<< Attributes

}
