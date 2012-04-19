namespace KendoUI.Mvc.Infrastructure.Implementation
{
    using System.Globalization;
    
    internal class LocalizationServiceFactory : ILocalizationServiceFactory
    {
        public ILocalizationService Create(string resourceName, CultureInfo culture)
        {
            return new LocalizationService(resourceName, culture);
        }
    }
}
