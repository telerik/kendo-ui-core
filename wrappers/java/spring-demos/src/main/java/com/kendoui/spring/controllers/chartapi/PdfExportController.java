package com.kendoui.spring.controllers.chartapi;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller("dataviz-api-pdf-export-controller")
@RequestMapping(value = "/chart-api/")
public class PdfExportController {
    @RequestMapping(value = { "/pdf-export" }, method = RequestMethod.GET)
    public String index() {
        return "/chart-api/pdf-export";
    }

    @RequestMapping(value = "/pdf-export/save", method = RequestMethod.POST)
    public @ResponseBody
    void save(String fileName, String base64, String contentType,
            HttpServletResponse response) throws IOException {

        response.setHeader("Content-Disposition", "attachment;filename="
                + fileName);
        response.setContentType(contentType);

        byte[] data = DatatypeConverter.parseBase64Binary(base64);

        response.setContentLength(data.length);
        response.getOutputStream().write(data);
        response.flushBuffer();
    }
}
