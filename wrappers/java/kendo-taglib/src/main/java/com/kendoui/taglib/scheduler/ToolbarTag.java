package com.kendoui.taglib.scheduler;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.SchedulerTag;

@SuppressWarnings("serial")
public class ToolbarTag extends BaseTag /* interfaces *//* interfaces */{

    @Override
    public int doEndTag() throws JspException {
        // >> doEndTag
        // << doEndTag
        SchedulerTag parent = (SchedulerTag) findParentWithClass(SchedulerTag.class);

        parent.setToolbar(this);

        return super.doEndTag();
    }

    @Override
    public void initialize() {
        // >> initialize

        toolbar = new ArrayList<Map<String, Object>>();

        // << initialize

        super.initialize();
    }

    @Override
    public void destroy() {
        // >> destroy
        // << destroy

        super.destroy();
    }

    // >> Attributes

    private List<Map<String, Object>> toolbar;

    public List<Map<String, Object>> toolbar() {
        return toolbar;
    }

    public static String tagName() {
        return "scheduler-toolbar";
    }

    public void addToolbarItem(ToolbarItemTag value) {
        toolbar.add(value.properties());
    }

    // << Attributes

}
