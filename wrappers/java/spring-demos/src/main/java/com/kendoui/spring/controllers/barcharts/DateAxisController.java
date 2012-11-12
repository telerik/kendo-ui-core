package com.kendoui.spring.controllers.barcharts;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-bar_charts-date_axis-controller")
@RequestMapping(value="/dataviz/bar-charts/")
public class DateAxisController {
    @RequestMapping(value = "/date-axis", method = RequestMethod.GET)
    public String index(Model model) throws ParseException {
        List<Date> result = new ArrayList<Date>();
        DateFormat formatter = new SimpleDateFormat("yyyy/mm/dd");
        
        result.add(formatter.parse("2011/12/30"));
        result.add(formatter.parse("2011/12/31"));
        result.add(formatter.parse("2012/01/01"));
        result.add(formatter.parse("2012/01/02"));
        result.add(formatter.parse("2012/01/03"));
        
        model.addAttribute("years", result);
        
        return "/dataviz/bar-charts/date-axis";
    }
}
