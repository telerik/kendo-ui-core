namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;
    using System.Web.Mvc;
    using System.Text.RegularExpressions;
    using System.Web.Mvc.Html;

    public class DiagramEditableSettings<TShapeModel, TConnectionModel> : JsonObject
        where TShapeModel : class
        where TConnectionModel : class
    {
        public DiagramEditableSettings()
        {
            //>> Initialization
        
            Resize = new DiagramEditableResizeSettings();
                
            Rotate = new DiagramEditableRotateSettings();
                
        //<< Initialization

            DefaultShapeDataItem = CreateShapeDefaultItem;
            DefaultConnectionDataItem = CreateConnectionDefaultItem;
        }

        //>> Fields
        
        public DiagramEditableResizeSettings Resize
        {
            get;
            set;
        }
        
        public DiagramEditableRotateSettings Rotate
        {
            get;
            set;
        }
        
        //<< Fields

        public string ShapeTemplateName
        {
            get;
            set;
        }

        public string ConnectionTemplateName
        {
            get;
            set;
        }

        protected string ShapeEditorHtml
        {
            get;
            set;
        }

        protected string ConnectionEditorHtml
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
        //<< Serialization

            if (Resize != null)
            {
                var resize = Resize.ToJson();
                if (resize.Any())
                {
                    json["resize"] = resize;
                }
            }
            else
            {
                json["resize"] = false;
            }

            if (Rotate != null)
            {
                var rotate = Rotate.ToJson();
                if (rotate.Any())
                {
                    json["rotate"] = rotate;
                }
            }
            else
            {
                json["rotate"] = false;
            }
        }

        private void SerializeEditTemplate(IDictionary<string, object> options)
        {
            SerializeShapeEditTemplate(options);
            SerializeConnectionEditTemplate(options);
        }

        private void SerializeShapeEditTemplate(IDictionary<string, object> options)
        {
            if (!string.IsNullOrEmpty(ShapeEditorHtml))
            {
                var html = ShapeEditorHtml.Trim()
                                .EscapeHtmlEntities()
                                .Replace("\r\n", string.Empty)
                                .Replace("jQuery(\"#", "jQuery(\"\\#");

                options["shapeTemplate"] = html;
            }
        }

        private void SerializeConnectionEditTemplate(IDictionary<string, object> options)
        {
            if (!string.IsNullOrEmpty(ConnectionEditorHtml))
            {
                var html = ConnectionEditorHtml.Trim()
                                .EscapeHtmlEntities()
                                .Replace("\r\n", string.Empty)
                                .Replace("jQuery(\"#", "jQuery(\"\\#");

                options["connectionTemplate"] = html;
            }
        }

        public void InitializeEditor(ViewContext viewContext, ViewDataDictionary viewData)
        {
            InitializeShapeEditor(viewContext, viewData);
            InitializeConnectionEditor(viewContext, viewData);
        }

        private void InitializeShapeEditor(ViewContext viewContext, ViewDataDictionary viewData) 
        {
            if (ShapeEditorHtml.HasValue())
            {
                var popupSlashes = new Regex("(?<=data-val-regex-pattern=\")([^\"]*)", RegexOptions.Multiline);
                var helper = new HtmlHelper<TShapeModel>(viewContext, new DiagramViewDataContainer<TShapeModel>(DefaultShapeDataItem(), viewData));

                ShapeEditorHtml = helper.EditorForModel(ShapeEditorHtml).ToHtmlString();

                ShapeEditorHtml = popupSlashes.Replace(ShapeEditorHtml, match =>
                {
                    return match.Groups[0].Value.Replace("\\", "\\\\");
                });
            }
        }

        public Func<TShapeModel> DefaultShapeDataItem
        {
            get;
            set;
        }

        private TShapeModel CreateShapeDefaultItem()
        {
            return Activator.CreateInstance<TShapeModel>();
        }

        private void InitializeConnectionEditor(ViewContext viewContext, ViewDataDictionary viewData) 
        {
            if (ConnectionTemplateName.HasValue())
            {
                var popupSlashes = new Regex("(?<=data-val-regex-pattern=\")([^\"]*)", RegexOptions.Multiline);
                var helper = new HtmlHelper<TConnectionModel>(viewContext, new DiagramViewDataContainer<TConnectionModel>(DefaultConnectionDataItem(), viewData));

                ConnectionEditorHtml = helper.EditorForModel(ConnectionTemplateName).ToHtmlString();

                ConnectionEditorHtml = popupSlashes.Replace(ConnectionEditorHtml, match =>
                {
                    return match.Groups[0].Value.Replace("\\", "\\\\");
                });
            }
        }

        public Func<TConnectionModel> DefaultConnectionDataItem
        {
            get;
            set;
        }

        private TConnectionModel CreateConnectionDefaultItem()
        {
            return Activator.CreateInstance<TConnectionModel>();
        }
    }
}
