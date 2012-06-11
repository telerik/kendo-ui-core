using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public class CustomValidationProductViewModel
    {
        public int ProductID { get; set; }

        [Required]
        [CustomProductNameValidation(ErrorMessage="ProductName should start with capital letter")]
        public string ProductName { get; set; }

        [DataType(DataType.Currency)]
        public decimal UnitPrice { get; set; }
    }

    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public class CustomProductNameValidationAttribute : ValidationAttribute, IClientValidatable
    {
        public override bool IsValid(object value)
        {
            var productName = (string) value;
            if (!string.IsNullOrEmpty(productName))
	        {                
		        return Regex.IsMatch(productName, "^[A-Z]");
            }
            return true;            
        }        

        public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metadata, ControllerContext context)
        {
            yield return new ModelClientValidationRule
            {
                ErrorMessage = ErrorMessage,
                ValidationType = "productnamevalidation"
            };
        }        
    }
}