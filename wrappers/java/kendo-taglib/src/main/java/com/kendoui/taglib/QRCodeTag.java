
package com.kendoui.taglib;


import com.kendoui.taglib.qrcode.*;



import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class QRCodeTag extends WidgetTag /* interfaces *//* interfaces */ {

    public QRCodeTag() {
        super("QRCode");
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
        return "qRCode";
    }

    public void setBorder(com.kendoui.taglib.qrcode.BorderTag value) {
        setProperty("border", value);
    }

    public String getBackground() {
        return (String)getProperty("background");
    }

    public void setBackground(String value) {
        setProperty("background", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public String getEncoding() {
        return (String)getProperty("encoding");
    }

    public void setEncoding(String value) {
        setProperty("encoding", value);
    }

    public String getErrorCorrection() {
        return (String)getProperty("errorCorrection");
    }

    public void setErrorCorrection(String value) {
        setProperty("errorCorrection", value);
    }

    public String getRenderAs() {
        return (String)getProperty("renderAs");
    }

    public void setRenderAs(String value) {
        setProperty("renderAs", value);
    }

    public Object getSize() {
        return (Object)getProperty("size");
    }

    public void setSize(Object value) {
        setProperty("size", value);
    }

    public Object getValue() {
        return (Object)getProperty("value");
    }

    public void setValue(Object value) {
        setProperty("value", value);
    }

//<< Attributes

}
