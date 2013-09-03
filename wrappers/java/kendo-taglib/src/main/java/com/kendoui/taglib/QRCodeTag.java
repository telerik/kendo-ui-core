
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

    public java.lang.String getBackground() {
        return (java.lang.String)getProperty("background");
    }

    public void setBackground(java.lang.String value) {
        setProperty("background", value);
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public java.lang.String getEncoding() {
        return (java.lang.String)getProperty("encoding");
    }

    public void setEncoding(java.lang.String value) {
        setProperty("encoding", value);
    }

    public java.lang.String getErrorCorrection() {
        return (java.lang.String)getProperty("errorCorrection");
    }

    public void setErrorCorrection(java.lang.String value) {
        setProperty("errorCorrection", value);
    }

    public java.lang.String getRenderAs() {
        return (java.lang.String)getProperty("renderAs");
    }

    public void setRenderAs(java.lang.String value) {
        setProperty("renderAs", value);
    }

    public java.lang.Object getSize() {
        return (java.lang.Object)getProperty("size");
    }

    public void setSize(java.lang.Object value) {
        setProperty("size", value);
    }

    public java.lang.Object getValue() {
        return (java.lang.Object)getProperty("value");
    }

    public void setValue(java.lang.Object value) {
        setProperty("value", value);
    }

//<< Attributes

}
