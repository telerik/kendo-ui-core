namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    
    public class ListViewSettingsSerializer<T> where T : class
    {
        private readonly ListView<T> listView;        

        public ListViewSettingsSerializer(ListView<T> listView)
        {
            this.listView = listView;
        }

        public void Serialize(IDictionary<string, object> options)
        {
            options["dataSource"] = listView.DataSource.ToJson();

            var autoBind = listView.DataSource.Type != DataSourceType.Server && listView.AutoBind.GetValueOrDefault(true);

            if (!autoBind)
            {
                options["autoBind"] = autoBind;
                listView.Pageable.AutoBind = autoBind;
            }

            SerializeClientTemplate(options);

            SerializePaging(options);

            SerializeNavigatable(options);

            SerializeSelection(options);

            SerializeEditTemplate(options);
        }

        private void SerializeClientTemplate(IDictionary<string, object> options)
        {
            var idPrefix = "#";

            if (listView.IsInClientTemplate)
            {
                idPrefix = "\\" + idPrefix;
            }

            if (!string.IsNullOrEmpty(listView.ClientTemplateId))
            {
                options["template"] = new ClientHandlerDescriptor { HandlerName = string.Format("kendo.template(jQuery('{0}{1}').html())", idPrefix, listView.ClientTemplateId) };
            }
        }

        private void SerializePaging(IDictionary<string, object> options)
        {
            if (listView.Pageable.Enabled)
            {
                var paging = listView.Pageable.ToJson();
                paging.Add("pagerId", listView.Id + "_pager");
                options["pageable"] = paging;
            }
        }

        private void SerializeNavigatable(IDictionary<string, object> options)
        {
            if (listView.Navigatable)
            {
                options["navigatable"] = listView.Navigatable.ToString().ToLower();
            }
        }

        private void SerializeSelection(IDictionary<string, object> options)
        {
            if (listView.Selectable.Enabled)
            {
                options["selectable"] = listView.Selectable.Mode.ToString().ToLower();
            }
        }

        private void SerializeEditTemplate(IDictionary<string, object> options)
        {
            if (listView.Editable.Enabled && !string.IsNullOrEmpty(listView.EditorHtml))
            {                
                var html = listView.EditorHtml.Trim()
                                .EscapeHtmlEntities()
                                .Replace("\r\n", string.Empty)
                                .Replace("jQuery(\"#", "jQuery(\"\\#");

                options["editTemplate"] = html;
            }
        }       
    }
}
