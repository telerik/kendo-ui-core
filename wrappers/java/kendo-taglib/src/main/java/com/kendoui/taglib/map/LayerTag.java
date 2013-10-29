
package com.kendoui.taglib.map;


import com.kendoui.taglib.BaseTag;






import com.kendoui.taglib.DataSourceTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LayerTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        LayersTag parent = (LayersTag)findParentWithClass(LayersTag.class);

        parent.addLayer(this);

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
        return "map-layer";
    }

    public void setStyle(com.kendoui.taglib.map.LayerStyleTag value) {
        setProperty("style", value);
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    public java.lang.String getCopyright() {
        return (java.lang.String)getProperty("copyright");
    }

    public void setCopyright(java.lang.String value) {
        setProperty("copyright", value);
    }

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

    public java.lang.String getUrlTemplate() {
        return (java.lang.String)getProperty("urlTemplate");
    }

    public void setUrlTemplate(java.lang.String value) {
        setProperty("urlTemplate", value);
    }

//<< Attributes

}
