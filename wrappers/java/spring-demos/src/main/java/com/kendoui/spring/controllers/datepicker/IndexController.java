package com.kendoui.spring.controllers.datepicker;

import java.util.Calendar;
import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("datepicker-home-controller")
@RequestMapping(value="/datepicker/")
public class IndexController {
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Model model) {
        Calendar cal = Calendar.getInstance();
        cal.set(2011,10,10);
        model.addAttribute("date", cal.getTime());
        cal.set(2011,10,1);
        model.addAttribute("month", cal.getTime());
        return "datepicker/index";
    }
}