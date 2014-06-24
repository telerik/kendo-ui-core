
package com.kendoui.taglib.pivotdatasource;


@SuppressWarnings("serial")
public class TransportTag extends  com.kendoui.taglib.datasource.TransportTag  /* interfaces */ /* interfaces */ {
        
    public static String tagName() {
        return "pivotDataSource-transport";
    }

    public void setConnection(com.kendoui.taglib.pivotdatasource.TransportConnectionTag value) {
        setProperty("connection", value);
    }    

    public java.lang.Object getDiscover() {
        return (java.lang.Object)getProperty("discover");
    }

    public void setDiscover(java.lang.Object value) {
        setProperty("discover", value);
    }

}
