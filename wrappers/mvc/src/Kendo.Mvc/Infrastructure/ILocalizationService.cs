namespace Kendo.Mvc.Infrastructure
{
    using System.Collections.Generic;

    public interface ILocalizationService
    {
        string One(string key);

        IDictionary<string, string> All();

        bool IsDefault 
        { 
            get; 
        }
    }
}