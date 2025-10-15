---
title: Configuring Orientation in Kendo UI for jQuery Form  
description: Fixing layout issues in Kendo UI for jQuery Form when switching between vertical and horizontal orientations.  
type: how-to  
page_title: Resolving Kendo UI for jQuery Form Orientation Layout Issues  
meta_title: Addressing Kendo UI for jQuery Form Layout Issues for Different Orientations  
slug: kendo-form-orientation-layout-fix  
tags: kendo ui for jquery, form, orientation, layout, css  
res_type: kb  
ticketid: 1700945
---

## Environment  

<table>  
<tbody>  
<tr>  
<td> Product </td>  
<td> Kendo UI for jQuery Form </td>  
</tr>  
<tr>  
<td> Version </td>  
<td> 2025.3.1002 </td>  
</tr>  
</tbody>  
</table>  

## Description  

I want to ensure the layout of the [Kendo UI for jQuery Form](https://docs.telerik.com/kendo-ui/controls/data-management/form/overview) displays correctly when switching between vertical and horizontal orientations. While the vertical orientation works as expected, using the horizontal orientation causes misalignment of labels and fields across rows.  

This knowledge base article also answers the following questions:  
- How to align labels and fields in Kendo UI for jQuery Form when using horizontal orientation?  
- How to fix layout issues in Kendo UI for jQuery Form with horizontal setting?  
- How to apply CSS for proper alignment in Kendo UI for jQuery Form?  

## Solution  

To resolve layout issues in the horizontal orientation of the Kendo UI for jQuery Form, apply custom CSS styles.  

1. Make the form labels have equal widths by using the following CSS:  

```css  
.k-form.k-form-horizontal .k-form-field > .k-label {      
    width: 150px !important;  
    min-width: 150px !important;  
}  
```  

2. Extend the input fields to the right end of the form by setting their max-width to 100%:  

```css  
.k-form-horizontal .k-form-field-wrap {  
    max-width: 100% !important;  
}  
```  

3. Test the solution using the provided example on Dojo: 
```dojo

    <style>
      /* Align form labels to the left in horizontal orientation */
      .k-form.k-form-horizontal .k-form-field > .k-label {
        width: 150px !important;
        min-width: 150px !important;
      }

      .k-form-horizontal .k-form-field-wrap {
        max-width: 100% !important;
      }
    </style>
    <div style="padding: 20px">
      <h2>Employee Information Form</h2>

      <div style="margin-bottom: 20px">
        <label
          for="orientationDropDown"
          style="margin-right: 10px; font-weight: bold"
          >Form Orientation:</label
        >
        <input id="orientationDropDown" style="width: 200px" />
      </div>

      <form action="" id="form"></form>
      <div id="validation-success" style="margin-top: 20px"></div>
    </div>

    <script>
      // Dummy data for ComboBox options
      var categoryData = [
        { value: 1, text: "Personal Information" },
        { value: 2, text: "Business Information" },
        { value: 3, text: "Contact Details" },
      ];

      var countryData = [
        { value: 1, text: "United States" },
        { value: 2, text: "United Kingdom" },
        { value: 3, text: "Canada" },
      ];

      var companyData = [
        { value: 1, text: "ABC Corporation" },
        { value: 2, text: "XYZ Industries" },
        { value: 3, text: "Tech Solutions Ltd" },
      ];

      var departmentData = [
        { value: 1, text: "Sales" },
        { value: 2, text: "Marketing" },
        { value: 3, text: "IT Support" },
      ];

      // Dummy helper functions
      function datesyntax(element) {
        console.log("Date syntax validation for:", element.value);
      }

      function select() {
        console.log("Select function called");
      }

      // Custom ComboBox creator functions
      function CategoryComboBox(id, container, options, customOptions) {
        $('<input id="' + id + '" />')
          .appendTo(container)
          .kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: categoryData,
            placeholder: "Select category...",
          });
      }

      function CountryComboBox(id, container, options, customOptions) {
        $('<input id="' + id + '" />')
          .appendTo(container)
          .kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: countryData,
            placeholder: "Select country...",
          });
      }

      function CompanyComboBox(id, container, options, customOptions) {
        $('<input id="' + id + '" />')
          .appendTo(container)
          .kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: companyData,
            placeholder: "Select company...",
          });
      }

      function DepartmentComboBox(id, container, options, customOptions) {
        $('<input id="' + id + '" />')
          .appendTo(container)
          .kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: departmentData,
            placeholder: "Select department...",
          });
      }

      // Initialize the orientation dropdown
      $(document).ready(function () {
        $("#orientationDropDown").kendoDropDownList({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: [
            { value: "horizontal", text: "Horizontal" },
            { value: "vertical", text: "Vertical" },
          ],
          value: "horizontal",
          change: function (e) {
            const selectedOrientation = this.value();
            const form = $("#form").data("kendoForm");

            if (form) {
              // Update form orientation using setOptions
              form.setOptions({
                orientation: selectedOrientation,
              });

              // Show feedback about the change
              $("#validation-success").html(
                `<div style='color: blue; font-weight: bold;'>Form orientation changed to: ${selectedOrientation}</div>`,
              );
            }
          },
        });

        // Initialize the form
        $("#form").kendoForm({
          orientation: "horizontal",
          layout: "grid",
          validatable: {
            validateOnBlur: false,
          },
          grid: { cols: 1, gutter: 10 },
          formData: {
            record_type: 1,
            is_active: true,
            form_type: "employee",
            employee_id: "EMP001",
            badge_number: "B12345",
            category: 1,
            country: 1,
            salary: "$75,000",
            company: 1,
            department: 1,
            start_date: new Date(),
            review_date: new Date(),
            hourly_rate: "35.50",
            annual_bonus: "5000",
            notes: "Excellent performance record",
          },
          items: [
            {
              type: "group",
              label: "Employee Information",
              layout: "grid",
              grid: { cols: 4, gutter: 10 },
              items: [
                {
                  field: "category",
                  label: "Category",
                  colSpan: 3,
                  editor: function (container, options) {
                    CategoryComboBox(
                      options.id,
                      container,
                      {},
                      {
                        required: true,
                        name: options.label,
                      },
                    );
                  },
                },
                {
                  field: "badge_number",
                  editor: "TextBox",
                  colSpan: 1,
                  label: "Badge Number",
                  editorOptions: { readonly: true },
                },

                {
                  field: "country",
                  label: "Country",
                  colSpan: 3,
                  editor: function (container, options) {
                    CountryComboBox(
                      options.id,
                      container,
                      {},
                      { required: true, name: options.label },
                    );
                  },
                },
                {
                  field: "salary",
                  label: "Annual Salary",
                  editor: "TextBox",
                  editorOptions: { readonly: true },
                },
                {
                  field: "company",
                  label: "Company",
                  colSpan: 4,
                  editor: function (container, options) {
                    CompanyComboBox(
                      options.id,
                      container,
                      {},
                      { required: true, name: options.label },
                    );
                  },
                },
                {
                  field: "department",
                  label: "Department",
                  colSpan: 4,
                  editor: function (container, options) {
                    DepartmentComboBox(
                      options.id,
                      container,
                      {},
                      {
                        required: true,
                        name: options.label,
                      },
                    );
                  },
                },
                {
                  field: "start_date",
                  label: "Start Date",
                  editor: "DatePicker",
                  editorOptions: {
                    format: "yyyy-MM-dd",
                  },
                },
                {
                  field: "review_date",
                  label: "Review Date",
                  editor: "DatePicker",
                  editorOptions: {
                    format: "yyyy-MM-dd",
                  },
                },
                {
                  field: "hourly_rate",
                  label: "Hourly Rate",
                  editor: "TextBox",
                },
                {
                  field: "annual_bonus",
                  label: "Annual Bonus",
                  editor: "TextBox",
                },
                {
                  field: "notes",
                  label: "Notes",
                  editor: "TextArea",
                  colSpan: 4,
                },
              ],
            },
          ],
          validateField: function (e) {
            $("#validation-success").html("Field validated: " + e.field);
          },
          buttonsTemplate: `
            <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onclick="submitForm()">
              <span class="k-button-text">Save</span>
            </button>
            <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="clearForm()">
              <span class="k-button-text">Clear</span>
            </button>
          `,
        });
      });

      // Form submission and clearing functions
      function submitForm() {
        var form = $("#form").data("kendoForm");
        var data = form.options.formData;
        console.log("Form data:", data);
        $("#validation-success").html(
          "<div style='color: green; font-weight: bold;'>Form successfully submitted!</div>",
        );
      }

      function clearForm() {
        var form = $("#form").data("kendoForm");
        form.clear();
        $("#validation-success").html("");
      }
    </script>
```  

The example dynamically switches the orientation of the form and applies the suggested styles for proper rendering.  

## See Also  

- [Kendo UI for jQuery Form Documentation](https://docs.telerik.com/kendo-ui/controls/data-management/form/overview)  
- [JavaScript API Reference of the Form](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/form)
