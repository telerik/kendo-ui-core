package com.kendoui.taglib;

@SuppressWarnings("serial")
public abstract class FunctionTag extends BaseTag {

    protected String body;

    public FunctionTag() {
        body = "";
    }

    public void setBody(String body) {
        this.body = body.replaceAll("</?script[^>]*>", "").trim();
    }

    public String getBody() {
        return body;
    }

}
