package com.kendoui.spring.controllers.gantt;

import java.util.Locale;

import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller("gantt-pdf-export-controller")
@RequestMapping(value="/gantt/")
public class PdfExportController {
    @RequestMapping(value = {"/pdf-export"}, method = RequestMethod.GET)
    public String index(Locale locale, Model model) {        
        return "gantt/pdf-export";
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