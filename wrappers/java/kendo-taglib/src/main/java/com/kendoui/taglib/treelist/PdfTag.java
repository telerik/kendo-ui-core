
package com.kendoui.taglib.treelist;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.TreeListTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PdfTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TreeListTag parent = (TreeListTag)findParentWithClass(TreeListTag.class);


        parent.setPdf(this);

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
        return "treeList-pdf";
    }

    public void setMargin(com.kendoui.taglib.treelist.PdfMarginTag value) {
        setProperty("margin", value);
    }

    public java.lang.String getAuthor() {
        return (java.lang.String)getProperty("author");
    }

    public void setAuthor(java.lang.String value) {
        setProperty("author", value);
    }

    public java.lang.String getCreator() {
        return (java.lang.String)getProperty("creator");
    }

    public void setCreator(java.lang.String value) {
        setProperty("creator", value);
    }

    public java.util.Date getDate() {
        return (java.util.Date)getProperty("date");
    }

    public void setDate(java.util.Date value) {
        setProperty("date", value);
    }

    public java.lang.String getFileName() {
        return (java.lang.String)getProperty("fileName");
    }

    public void setFileName(java.lang.String value) {
        setProperty("fileName", value);
    }

    public boolean getForceProxy() {
        return (boolean)getProperty("forceProxy");
    }

    public void setForceProxy(boolean value) {
        setProperty("forceProxy", value);
    }

    public java.lang.String getKeywords() {
        return (java.lang.String)getProperty("keywords");
    }

    public void setKeywords(java.lang.String value) {
        setProperty("keywords", value);
    }

    public boolean getLandscape() {
        return (boolean)getProperty("landscape");
    }

    public void setLandscape(boolean value) {
        setProperty("landscape", value);
    }

    public java.lang.Object getPaperSize() {
        return (java.lang.Object)getProperty("paperSize");
    }

    public void setPaperSize(java.lang.Object value) {
        setProperty("paperSize", value);
    }

    public java.lang.String getProxyURL() {
        return (java.lang.String)getProperty("proxyURL");
    }

    public void setProxyURL(java.lang.String value) {
        setProperty("proxyURL", value);
    }

    public java.lang.String getSubject() {
        return (java.lang.String)getProperty("subject");
    }

    public void setSubject(java.lang.String value) {
        setProperty("subject", value);
    }

    public java.lang.String getTitle() {
        return (java.lang.String)getProperty("title");
    }

    public void setTitle(java.lang.String value) {
        setProperty("title", value);
    }

//<< Attributes

}
