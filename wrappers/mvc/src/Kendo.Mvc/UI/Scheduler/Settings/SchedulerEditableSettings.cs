namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Text.RegularExpressions;
    using System.Web.Mvc;
    using System.Web.Mvc.Html;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;
    using System.Data;

    public class SchedulerEditableSettings<T> : SchedulerEditableSettingsBase
        where T : class
    {
        private const string DefaultConfirmation = "Are you sure you want to delete this event?";

        public SchedulerEditableSettings()
            :base()
        {
            DisplayDeleteConfirmation = true;

            Confirmation = Messages.Scheduler_Confirmation;

            DefaultDataItem = CreateDefaultItem;

            Resize = true;
        }

        public string Template { get; set; }

        public string TemplateId { get; set; }

        public string Confirmation { get; set; }

        public bool Resize { get; set; }

        public bool DisplayDeleteConfirmation { get; set; }

        public string TemplateName
        {
            get;
            set;
        }

        protected string EditorHtml
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);

            if (!string.IsNullOrEmpty(Template))
            {
                json["template"] = Template;
            }

            if (!string.IsNullOrEmpty(TemplateId))
            {
                var idPrefix = "#";

                json["template"] = new ClientHandlerDescriptor { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, TemplateId) };    
            }

            SerializeEditTemplate(json);

            if (!DisplayDeleteConfirmation)
            {
                json["confirmation"] = false;
            }
            else if (!string.IsNullOrEmpty(Confirmation) && Confirmation != DefaultConfirmation)
            {
                json["confirmation"] = Confirmation;
            }

            if (!Resize)
            {
                json["resize"] = false;
            }
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
            if (Enabled && TemplateName.HasValue())
            {
                var popupSlashes = new Regex("(?<=data-val-regex-pattern=\")([^\"]*)", RegexOptions.Multiline);
                var helper = new HtmlHelper<T>(viewContext, new SchedulerViewDataContainer<T>(DefaultDataItem(), viewData));

                
                EditorHtml = helper.EditorForModel(TemplateName).ToHtmlString();
                //}
                //else
                //{
                //    EditorHtml = helper.EditorForModel().ToHtmlString();
                //}

                EditorHtml = popupSlashes.Replace(EditorHtml, match =>
                {
                    return match.Groups[0].Value.Replace("\\", "\\\\");
                });
            }
        }

        public Func<T> DefaultDataItem
        {
            get;
            set;
        }

        private T CreateDefaultItem()
        {          
            return Activator.CreateInstance<T>();
        }
    }
}
