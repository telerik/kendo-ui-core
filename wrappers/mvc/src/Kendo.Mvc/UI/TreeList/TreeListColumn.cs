namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class TreeListColumn : JsonObject
    {
        public TreeListColumn()
        {
            //>> Initialization
        
            Command = new List<TreeListColumnCommand>();
                
            Filterable = new TreeListColumnFilterableSettings();
                
            Sortable = new TreeListColumnSortableSettings();
                
        //<< Initialization

            Attributes = new Dictionary<string, object>();
        }

        //>> Fields
        
        public IDictionary<string, object> Attributes { get; set; }
        
        public List<TreeListColumnCommand> Command
        {
            get;
            set;
        }
        
        public string Editor { get; set; }
        
        public bool? Encoded { get; set; }
        
        public bool? Expandable { get; set; }
        
        public string Field { get; set; }
        
        public string Format { get; set; }
        
        public string HeaderTemplate { get; set; }

        public string HeaderTemplateId { get; set; }
        
        public TreeListColumnSortableSettings Sortable
        {
            get;
            set;
        }
        
        public string Template { get; set; }

        public string TemplateId { get; set; }
        
        public string Title { get; set; }
        
        public string Width { get; set; }
        
        public TreeListColumnFilterableSettings Filterable
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Attributes.Any())
            {
                json["attributes"] = Attributes;
            }
            
            var command = Command.ToJson();
            if (command.Any())
            {
                json["command"] = command;
            }
            if (Editor.HasValue())
            {
                json["editor"] = Editor;
            }
            
            if (Encoded.HasValue)
            {
                json["encoded"] = Encoded;
            }
                
            if (Expandable.HasValue)
            {
                json["expandable"] = Expandable;
            }
                
            if (Field.HasValue())
            {
                json["field"] = Field;
            }
            
            if (Format.HasValue())
            {
                json["format"] = Format;
            }
            
            if (!string.IsNullOrEmpty(HeaderTemplateId))
            {
                json["headerTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('#{0}').html()",
                        HeaderTemplateId
                    )
                };
            }
            else if (!string.IsNullOrEmpty(HeaderTemplate))
            {
                json["headerTemplate"] = HeaderTemplate;
            }
                
            var sortable = Sortable.ToJson();
            if (sortable.Any())
            {
                json["sortable"] = sortable;
            } else if (Sortable.Enabled != true) {
                json["sortable"] = Sortable.Enabled;
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
                
            if (Title.HasValue())
            {
                json["title"] = Title;
            }
            
            if (Width.HasValue())
            {
                json["width"] = Width;
            }
            
            var filterable = Filterable.ToJson();
            if (filterable.Any())
            {
                json["filterable"] = filterable;
            } else if (Filterable.Enabled != true) {
                json["filterable"] = Filterable.Enabled;
            }

        //<< Serialization
        }
    }
}
