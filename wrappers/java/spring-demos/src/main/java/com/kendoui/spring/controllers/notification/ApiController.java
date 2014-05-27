package com.kendoui.spring.controllers.notification;
    
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("notification-api-controller")
@RequestMapping(value="/notification/")
public class ApiController {
    
    @RequestMapping(value = {"/", "/api"}, method = RequestMethod.GET)
    public String index() {       
        return "notification/api";
    }    
}