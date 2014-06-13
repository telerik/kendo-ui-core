package com.kendoui.spring.controllers.waterfallcharts;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.CashFlowData;
import com.kendoui.spring.models.ChartDataRepository;
import com.kendoui.spring.models.ElectricityProduction;
import com.kendoui.spring.models.PriceData;

@Controller("dataviz-waterfall_charts_remote_data-controller")
@RequestMapping(value="/waterfall-charts/")
public class RemoteDataBindingController {
    @RequestMapping(value = "/remote-data-binding", method = RequestMethod.GET)
    public String index() {
        return "/waterfall-charts/remote-data-binding";
    }
    
    @RequestMapping(value = "/remote-data-binding/read", method = RequestMethod.POST)
    public @ResponseBody List<PriceData> read() {
        List<PriceData> data = new ArrayList<PriceData>();
        data.add(new PriceData("List", 100));
        data.add(new PriceData("List\nDiscount", -5));
        data.add(new PriceData("Invoice", "total"));
        data.add(new PriceData("Invoice\nDiscount", -6));
        data.add(new PriceData("Rebates", -3));
        data.add(new PriceData("Errors", -1.1));
        data.add(new PriceData("Pocket\nPrice", "total"));
        data.add(new PriceData("Cost", -57.1));
        data.add(new PriceData("Handling", -0.5));
        data.add(new PriceData("Pocket\nMargin", "total"));
        
        return data;
    }
}
