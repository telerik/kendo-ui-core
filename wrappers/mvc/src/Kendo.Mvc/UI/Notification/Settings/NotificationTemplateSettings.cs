using System;
using System.Collections.Generic;
using Kendo.Mvc.Infrastructure;
namespace Kendo.Mvc.UI
{
    public class NotificationTemplateSettings
    {
        public NotificationTemplateSettings()
        {

        }

        public string Type { get; set; }
        public string ClientTemplateID { get; set; }
        public string ClientTemplate { get; set; }

        internal IDictionary<string, object> Serialize()
        {
            if (string.IsNullOrEmpty(Type))
            {
                throw new InvalidOperationException("Template Type cannot be null or an empty string.");
            }

            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("type", Type)
                .Add("templateId", ClientTemplateID, "")
                .Add("template", ClientTemplate, "");

            return result;
        }
    }
}