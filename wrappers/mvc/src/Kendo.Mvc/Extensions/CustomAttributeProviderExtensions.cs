namespace Kendo.Mvc.Extensions
{
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Reflection;

    public static class CustomAttributeProviderExtensions
    {
        public static string GetDisplayName(this ICustomAttributeProvider member)
        {
            return member.GetCustomAttributes(typeof(DisplayNameAttribute), false)
                         .OfType<DisplayNameAttribute>()
                         .Select(attribute => attribute.DisplayName)
                         .LastOrDefault();
        }

        public static string GetFormat(this ICustomAttributeProvider member)
        {
            return member.GetCustomAttributes(typeof(DisplayFormatAttribute), false)
                         .OfType<DisplayFormatAttribute>()
                         .Select(attribute => attribute.DataFormatString)
                         .LastOrDefault();
        }
    }
}