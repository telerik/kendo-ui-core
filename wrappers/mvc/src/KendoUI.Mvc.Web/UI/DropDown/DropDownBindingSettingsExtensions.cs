namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;

    public static class DropDownBindingSettingsExtensions
    {
        public static void SerializeTo(this IDropDownBindingSettings instance, string key, IClientSideObjectWriter writer, IDataBoundDropDown component)
        {
            if (instance.Enabled)
            {
                var url = new Dictionary<string, string>();

                if (instance.Select.HasValue())
                {
                    url["selectUrl"] = component.UrlGenerator.Generate(component.ViewContext.RequestContext, instance.Select);
                }

                writer.AppendObject(key, url);
            }
        }

        public static void SerializeTo<TSettings>(this IDropDownBindingSettings instance, string key, IClientSideObjectWriter writer, IDataBoundDropDown component)
            where TSettings : AutoCompleteBindingSettings
        {
            if (instance.Enabled)
            {
                var url = new Dictionary<string, string>();

                if (instance.Select.HasValue())
                {
                    url["selectUrl"] = component.UrlGenerator.Generate(component.ViewContext.RequestContext, instance.Select);
                }

                writer.AppendObject(key, url);
                writer.Append("cache", (instance as TSettings).Cache, true);
                writer.Append("delay", (instance as TSettings).Delay, 200);
            }
        }
    }
}
