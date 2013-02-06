namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;

    public class DropDownListBase : ListBase
    {
        public DropDownListBase(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData, IUrlGenerator urlGenerator)
            : base(viewContext, initializer, viewData, urlGenerator)
        {
        }

        public string Template
        {
            get;
            set;
        }

        public string TemplateId
        {
            get;
            set;
        }

        public string Value
        {
            get;
            set;
        }

        public IDictionary<string, object> SeriailzeBaseOptions()
        {
            var options = base.SeriailzeBaseOptions();

            var idPrefix = "#";
            if (IsInClientTemplate)
            {
                idPrefix = "\\" + idPrefix;
            }

            if (!string.IsNullOrEmpty(TemplateId))
            {
                options["template"] = new ClientHandlerDescriptor { HandlerName = string.Format("$('{0}{1}').html()", idPrefix, TemplateId) };
            }
            else if (!string.IsNullOrEmpty(Template))
            {
                options["template"] = Template;
            }
          
            return options;
        }
    }
}
