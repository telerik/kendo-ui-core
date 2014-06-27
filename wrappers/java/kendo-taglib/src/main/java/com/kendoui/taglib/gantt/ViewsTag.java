
package com.kendoui.taglib.gantt;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.GanttTag;


import com.kendoui.taglib.SchedulerTag;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ViewsTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag
        
        GanttTag parent = (GanttTag)findParentWithClass(GanttTag.class);

        parent.setViews(this);
        
        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        views = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> views;

    public List<Map<String, Object>> views() {
        return views;
    }

    public static String tagName() {
        return "gantt-views";
    }

    public void addView(ViewTag value) {
        views.add(value.properties());
    }

//<< Attributes

}
