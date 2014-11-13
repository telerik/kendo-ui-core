namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;
    using System.Web.Mvc;
    using System.Web.Mvc.Html;
    using System.Text.RegularExpressions;

    public class TreeListEditableSettings<T> : JsonObject
        where T : class
    {
        public TreeListEditableSettings()
        {
            Enabled = false;

            DefaultDataItem = CreateDefaultItem;

            //>> Initialization
        
        //<< Initialization
        }

        public bool Enabled { get; set; }

        //>> Fields
        
        public string Mode { get; set; }
        
        public string Template { get; set; }

        public string TemplateId { get; set; }
        
        //<< Fields

        public string TemplateName { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Mode.HasValue())
            {
                json["mode"] = Mode;
            }
            
            if (!string.IsNullOrEmpty(TemplateId))
            {
                json["template"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('#{0}').html()",
                        TemplateId
                    )
                };
            }
            else if (!string.IsNullOrEmpty(Template))
            {
                json["template"] = Template;
            }
                
        //<< Serialization

            SerializeEditTemplate(json);
        }

        public string EditorHtml { get; set; }

        public Func<T> DefaultDataItem { get; set; }

        private T CreateDefaultItem()
        {
            return Activator.CreateInstance<T>();
        }

        private void SerializeEditTemplate(IDictionary<string, object> options)
        {
            if (Enabled && !string.IsNullOrEmpty(EditorHtml))
            {
                var html = EditorHtml.Trim()
                                .EscapeHtmlEntities()
                                .Replace("\r\n", string.Empty)
                                .Replace("jQuery(\"#", "jQuery(\"\\#");

                options["template"] = html;
            }
        }

        public void InitializeEditor(ViewContext viewContext, ViewDataDictionary viewData)
        {
            if (!Enabled)
            {
                return;
            }

            if (TemplateName.HasValue() || (!Template.HasValue() && !TemplateId.HasValue()))
            {
                var popupSlashes = new Regex("(?<=data-val-regex-pattern=\")([^\"]*)", RegexOptions.Multiline);
                var helper = new HtmlHelper<T>(viewContext, new TreeListViewDataContainer<T>(DefaultDataItem(), viewData));

                EditorHtml = helper.EditorForModel(TemplateName).ToHtmlString();

                EditorHtml = popupSlashes.Replace(EditorHtml, match =>
                {
                    return match.Groups[0].Value.Replace("\\", "\\\\");
                });
            }
        }
    }
}
