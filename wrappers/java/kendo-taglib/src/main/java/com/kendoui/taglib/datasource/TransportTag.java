
package com.kendoui.taglib.datasource;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.DataSourceTag;



import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class TransportTag extends BaseTag /* interfaces *//* interfaces */ {
    private static final String BATCH_PARAMETERMAP = "function(options,type){if(type===\"read\"){return JSON.stringify(options);}else{return JSON.stringify(options.models);}}";
    private static final String PARAMETERMAP = "function(options,type){return JSON.stringify(options);}";
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DataSourceTag parent = (DataSourceTag)findParentWithClass(DataSourceTag.class);


        parent.setTransport(this);

//<< doEndTag

        if (getParameterMap() == null) {
            if (parent.isSet("batch") && parent.getBatch()) {
                setParameterMap(BATCH_PARAMETERMAP);
            } else if (!parent.isValue("odata")){
                setParameterMap(PARAMETERMAP);
            }
        }
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
        return "dataSource-transport";
    }

    public void setCreate(TransportCreateTag value) {
        setProperty("create", value);
    }

    public void setDestroy(TransportDestroyTag value) {
        setProperty("destroy", value);
    }

    public void setRead(TransportReadTag value) {
        setProperty("read", value);
    }

    public void setUpdate(TransportUpdateTag value) {
        setProperty("update", value);
    }

    public void setParameterMap(ParameterMapFunctionTag value) {
        setEvent("parameterMap", value.getBody());
    }

    public String getCreate() {
        return (String)getProperty("create");
    }

    public void setCreate(String value) {
        setProperty("create", value);
    }

    public String getDestroy() {
        return (String)getProperty("destroy");
    }

    public void setDestroy(String value) {
        setProperty("destroy", value);
    }

    public String getRead() {
        return (String)getProperty("read");
    }

    public void setRead(String value) {
        setProperty("read", value);
    }

    public String getUpdate() {
        return (String)getProperty("update");
    }

    public void setUpdate(String value) {
        setProperty("update", value);
    }

    public String getParameterMap() {
        Function property = ((Function)getProperty("parameterMap"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setParameterMap(String value) {
        setProperty("parameterMap", new Function(value));
    }

//<< Attributes

}
