using System.Globalization;

namespace Kendo.Mvc.Infrastructure
{
    public interface ILocalizationServiceFactory
    {
        ILocalizationService Create(string resourceName, CultureInfo culture);
    }
}
