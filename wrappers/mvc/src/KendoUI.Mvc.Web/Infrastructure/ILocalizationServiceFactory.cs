using System.Globalization;

namespace KendoUI.Mvc.Infrastructure
{
    public interface ILocalizationServiceFactory
    {
        ILocalizationService Create(string resourceName, CultureInfo culture);
    }
}
