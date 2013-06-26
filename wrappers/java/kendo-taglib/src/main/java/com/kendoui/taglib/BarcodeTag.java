
package com.kendoui.taglib;


import com.kendoui.taglib.barcode.*;



import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class BarcodeTag extends WidgetTag /* interfaces *//* interfaces */ {

    public BarcodeTag() {
        super("Barcode");
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
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
        return "barcode";
    }

    public void setBorder(com.kendoui.taglib.barcode.BorderTag value) {
        setProperty("border", value);
    }

    public void setPadding(com.kendoui.taglib.barcode.PaddingTag value) {
        setProperty("padding", value);
    }

    public void setText(com.kendoui.taglib.barcode.TextTag value) {
        setProperty("text", value);
    }

    public String getBackground() {
        return (String)getProperty("background");
    }

    public void setBackground(String value) {
        setProperty("background", value);
    }

    public boolean getChecksum() {
        return (boolean)getProperty("checksum");
    }

    public void setChecksum(boolean value) {
        setProperty("checksum", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public float getHeight() {
        return (float)getProperty("height");
    }

    public void setHeight(float value) {
        setProperty("height", value);
    }

    public String getRenderAs() {
        return (String)getProperty("renderAs");
    }

    public void setRenderAs(String value) {
        setProperty("renderAs", value);
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

    public String getValue() {
        return (String)getProperty("value");
    }

    public void setValue(String value) {
        setProperty("value", value);
    }

    public float getWidth() {
        return (float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

//<< Attributes

}
