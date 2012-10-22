
package com.kendoui.taglib.datasource;

import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.json.Function;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class TransportTag extends BaseTag /* interfaces */implements Create, Destroy, Read, Update/* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Transport parent = (Transport)findParentWithClass(Transport.class);

        parent.setTransport(this);

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
        return "dataSource-transport";
    }

    @Override
    public void setCreate(CreateTag value) {
        setProperty("create", value.properties());
    }

    @Override
    public void setDestroy(DestroyTag value) {
        setProperty("destroy", value.properties());
    }

    @Override
    public void setRead(ReadTag value) {
        setProperty("read", value.properties());
    }

    @Override
    public void setUpdate(UpdateTag value) {
        setProperty("update", value.properties());
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

//<< Attributes

}
