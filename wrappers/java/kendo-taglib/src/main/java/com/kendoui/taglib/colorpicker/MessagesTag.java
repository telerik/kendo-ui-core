
package com.kendoui.taglib.colorpicker;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.ColorPickerTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ColorPickerTag parent = (ColorPickerTag)findParentWithClass(ColorPickerTag.class);


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
        return "colorPicker-messages";
    }

    public java.lang.String getApply() {
        return (java.lang.String)getProperty("apply");
    }

    public void setApply(java.lang.String value) {
        setProperty("apply", value);
    }

    public java.lang.String getCancel() {
        return (java.lang.String)getProperty("cancel");
    }

    public void setCancel(java.lang.String value) {
        setProperty("cancel", value);
    }

//<< Attributes

}
