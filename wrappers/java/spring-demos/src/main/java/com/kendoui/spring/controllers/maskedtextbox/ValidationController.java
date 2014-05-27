package com.kendoui.spring.controllers.maskedtextbox;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("maskedtextbox-validation-controller")
@RequestMapping(value="/maskedtextbox/")
public class ValidationController {

    @RequestMapping(value = {"/validation"}, method = RequestMethod.GET)
    public String index() {
        return "maskedtextbox/validation";
    }
}
