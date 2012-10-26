package com.kendoui.spring.controllers.calendar;

import java.util.ArrayList;
import java.util.Date;
import java.util.Calendar;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("calendar-template-controller")
@RequestMapping(value="/web/calendar/")
public class TemplateController {
    
    @RequestMapping(value = {"/template"}, method = RequestMethod.GET)
    public String index(Model model) {
        Calendar cal = Calendar.getInstance();
        ArrayList<Date> dates = new ArrayList<Date>();
        
        dates.add(cal.getTime());
        
//        cal.add(Calendar.DATE, 8);
//        dates.add(cal.getTime());
//        
//        cal.add(Calendar.DATE, 4);
//        dates.add(cal.getTime());
//        
//        cal.add(Calendar.DATE, 10);
//        dates.add(cal.getTime());
        
        model.addAttribute("dates", dates);
        
        return "web/calendar/template";
    }
}