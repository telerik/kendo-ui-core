package com.kendoui.spring.controllers.datetimepicker;

import java.util.Calendar;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("datetimepicker-rangeselection-controller")
@RequestMapping(value="/datetimepicker/")
public class RangeSelectionController {
    
    @RequestMapping(value = {"/rangeselection"}, method = RequestMethod.GET)
    public String index(Model model) {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        
        model.addAttribute("today", cal.getTime());
        
        return "datetimepicker/rangeselection";
    }
}