package com.kendoui.spring.controllers.maskedtextbox;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("maskedtextbox-rtl-controller")
@RequestMapping(value="/web/maskedtextbox/")
public class RtlController {

    @RequestMapping(value = {"/rtl"}, method = RequestMethod.GET)
    public String index() {
        return "web/maskedtextbox/rtl";
    }
}
