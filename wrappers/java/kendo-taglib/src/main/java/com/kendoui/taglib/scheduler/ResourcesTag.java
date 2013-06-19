
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.SchedulerTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ResourcesTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        resources = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> resources;

    public List<Map<String, Object>> resources() {
        return resources;
    }

    public static String tagName() {
        return "scheduler-resources";
    }

    public void addResource(ResourceTag value) {
        resources.add(value.properties());
    }

//<< Attributes

}
