package com.kendoui.spring.controllers.maskedtextbox;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("maskedtextbox-api-controller")
@RequestMapping(value="/maskedtextbox/")
public class ApiController {

    @RequestMapping(value = {"api"}, method = RequestMethod.GET)
    public String index() {
        return "maskedtextbox/api";
    }
}
