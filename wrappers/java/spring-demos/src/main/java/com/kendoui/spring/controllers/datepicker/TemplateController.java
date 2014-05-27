package com.kendoui.spring.controllers.datepicker;

import java.util.ArrayList;
import java.util.Date;
import java.util.Calendar;
import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("datepicker-template-controller")
@RequestMapping(value="/datepicker/")
public class TemplateController {
    
    @RequestMapping(value = {"/template"}, method = RequestMethod.GET)
    public String index(Model model) {       
        model.addAttribute("dates", getDates());
        
        return "datepicker/template";
    }

    private ArrayList<Date> getDates() {
        Calendar cal = Calendar.getInstance();
        ArrayList<Date> dates = new ArrayList<Date>();
        
        int month = cal.get(Calendar.MONTH);
        int year = cal.get(Calendar.YEAR);
        cal.set(year, month, 11, 0, 0, 0);
        cal.set(Calendar.MILLISECOND, 0);
        dates.add(cal.getTime());
        
        cal.set(year, month + 1, 6, 0, 0);
        dates.add(cal.getTime());
        
        cal.set(year, month + 1, 27, 0, 0);
        dates.add(cal.getTime());
        
        cal.set(year, month - 1, 3, 0, 0);
        dates.add(cal.getTime());
        
        cal.set(year, month - 2, 22, 0, 0);
        dates.add(cal.getTime());              
        
        return dates;
    }
}