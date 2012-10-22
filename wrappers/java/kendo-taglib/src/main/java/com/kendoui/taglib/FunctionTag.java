package com.kendoui.taglib;

@SuppressWarnings("serial")
public abstract class FunctionTag extends BaseTag {
    
    public String getBody() {
        return body().replaceAll("</?script[^>]*>", "").trim();
    }
}
