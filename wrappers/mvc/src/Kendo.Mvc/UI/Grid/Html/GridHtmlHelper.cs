namespace Kendo.Mvc.UI.Html
{
    using System;
    using System.Web.Mvc;
    using System.Web.Mvc.Html;
    using Extensions;
    using System.Collections.Generic;

    public class GridHtmlHelper<T> : IGridHtmlHelper
             where T : class
    {
        private readonly IGridDataKeyStore dataKeyStore;
        private readonly ViewContext viewContext;

        public GridHtmlHelper(ViewContext viewContext, IGridDataKeyStore dataKeyStore)
        {
            this.viewContext = viewContext;
            this.dataKeyStore = dataKeyStore;
        }

        private HtmlHelper<T> CreateHtmlHelper(object model)
        {
            return new HtmlHelper<T>(viewContext, new GridViewDataContainer<T>((T)model, viewContext.ViewData));
        }

        public IHtmlNode HiddenForDataKey(object dataItem)
        {
            var htmlHelper = CreateHtmlHelper(dataItem);

            var dataKeyValues = dataKeyStore.GetDataKeyValues(dataItem);
            
            var fragment = new HtmlFragment();

            using (new ClientValidationManager(viewContext))
            {
                foreach (var entry in dataKeyValues)
                {
                    var html = htmlHelper.Hidden(entry.Key, entry.Value, new {id = ""}).ToHtmlString();
                    var hidden = new LiteralNode(html);
                    hidden.AppendTo(fragment);
                }
            }
            return fragment;
        }

        public IHtmlNode EditorForModel(object dataItem, string templateName, IEnumerable<Action<IDictionary<string, object>, object>> foreignKeyData, object additionalViewData)
        {
            var html = string.Empty;

            if (foreignKeyData != null)
            {
                foreignKeyData.Each(action => action(viewContext.ViewData, dataItem));
            }

            var htmlHelper = CreateHtmlHelper(dataItem);
            if (templateName.HasValue())
            {
                html = htmlHelper.EditorForModel(templateName, additionalViewData).ToHtmlString();
            }
            else
            {
                html = htmlHelper.EditorForModel(additionalViewData).ToHtmlString();
            }
            return new LiteralNode(html);
        }

        class ClientValidationManager : IDisposable
        {
            private readonly ViewContext viewContext;
            private readonly bool clientValidation;

            public ClientValidationManager(ViewContext viewContext)
            {
                this.viewContext = viewContext;
                clientValidation = viewContext.ClientValidationEnabled;

                if (typeof(T).IsDataRow()) // needed as the metadataprovider will throw if model is DataRow
                {
                    viewContext.ClientValidationEnabled = false;
                }
            }

            public void Dispose()
            {
                viewContext.ClientValidationEnabled = clientValidation;
            }
        }
    }
}