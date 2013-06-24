
package com.kendoui.taglib.barcode;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.BarcodeTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class TextTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        BarcodeTag parent = (BarcodeTag)findParentWithClass(BarcodeTag.class);


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
        return "barcode-text";
    }

    public void setMargin(com.kendoui.taglib.barcode.TextMarginTag value) {
        setProperty("margin", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public String getFont() {
        return (String)getProperty("font");
    }

    public void setFont(String value) {
        setProperty("font", value);
    }

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

//<< Attributes

}
