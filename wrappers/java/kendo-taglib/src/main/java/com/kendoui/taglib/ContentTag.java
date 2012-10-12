package com.kendoui.taglib;

@SuppressWarnings("serial")
public class ContentTag extends BaseTag {
    @Override
    public int doStartTag() {
        return EVAL_BODY_INCLUDE;
    }
}
