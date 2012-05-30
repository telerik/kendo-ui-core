using System;
using System.Web.Mvc;
using System.Globalization;

namespace Kendo.Mvc.UI
{
    public static class InputComponentExtensions
    {
        public static T? GetValue<T>(this IInputComponent<T> instance, Func<object, T?> converter) where T : struct
        {
            T? value = null;

            object valueFromViewData = instance.ViewData.Eval(instance.Name);

            if (instance.Value != null)
            {
                value = instance.Value;
            }
            else if (valueFromViewData != null)
            {
                value = converter(valueFromViewData);
            }

            instance.Value = value;

            return value;
        }

        public static string GetAttemptedValue<T>(this IInputComponent<T> instance) where T: struct
        {
            ModelState state;
            if (instance.ViewData.ModelState.TryGetValue(instance.Name, out state) && state.Value != null) 
            {
                instance.Value = null;
                return state.Value.ConvertTo(typeof(string), null) as string;
            }

            return null;
        }
    }
}