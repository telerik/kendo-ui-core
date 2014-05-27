package com.kendoui.spring.controllers.maskedtextbox;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("maskedtextbox-rtl-controller")
@RequestMapping(value="/maskedtextbox/")
public class RightToLeftSupportController {

    @RequestMapping(value = {"/right-to-left-support"}, method = RequestMethod.GET)
    public String index() {
        return "maskedtextbox/right-to-left-support";
    }
}
