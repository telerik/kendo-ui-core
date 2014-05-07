package com.kendoui.spring.controllers.timepicker;

import java.util.Calendar;
import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("timepicker-rangeselection-controller")
@RequestMapping(value="/timepicker/")
public class RangeSelectionController {
    
    @RequestMapping(value = {"/rangeselection"}, method = RequestMethod.GET)
    public String index(Model model) {
        
        model.addAttribute("startValue", time(8, 0));
        model.addAttribute("startMin", time(8, 0));
        model.addAttribute("startMax", time(18, 0));
        
        model.addAttribute("endValue", time(8, 30));
        model.addAttribute("endMin", time(8, 0));
        model.addAttribute("endMax", time(7, 30));
        
        return "timepicker/rangeselection";
    }
    
    private Date time(int hours, int minutes) {
        Calendar cal = Calendar.getInstance();
        
        cal.set(Calendar.HOUR_OF_DAY, hours);
        cal.set(Calendar.MINUTE, minutes);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        
        return cal.getTime();
    }
}