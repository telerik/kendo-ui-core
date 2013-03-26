namespace Kendo.Mvc.Extensions
{
    using System.Web.Mvc;
    using System.Collections.Generic;
    using System.Linq;
    using Kendo.Mvc.Resources;

    public static class ModelStateExtensions
    {
        public static object ToDataSourceResult(this ModelStateDictionary modelState)
        {
            if (!modelState.IsValid)
            {
                return new { Errors = modelState.SerializeErrors() };
            }
            return new object();
        }

        public static object SerializeErrors(this ModelStateDictionary modelState)
        {
            return modelState.Where(entry => entry.Value.Errors.Any())
                             .ToDictionary(entry => entry.Key, entry => SerializeModelState(entry.Value));
        }

        private static Dictionary<string, object> SerializeModelState(ModelState modelState)
        {
            var result = new Dictionary<string, object>();
            result["errors"] = modelState.Errors
                                         .Select(error => GetErrorMessage(error, modelState))
                                         .ToArray();
            return result;
        }

        private static string GetErrorMessage(ModelError error, ModelState modelState)
        {
            if (!error.ErrorMessage.HasValue())
            {
                if (modelState.Value == null)
                {
                    return error.ErrorMessage;
                }

                return Exceptions.ValueNotValidForProperty.FormatWith(modelState.Value.AttemptedValue);
            }

            return error.ErrorMessage;
        }
    }
}
