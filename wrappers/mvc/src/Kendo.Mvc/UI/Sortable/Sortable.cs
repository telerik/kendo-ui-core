namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using System.Web;
    using System.Text.RegularExpressions; 

    public class Sortable : WidgetBase
    {
        public Sortable(ViewContext viewContext, IJavaScriptInitializer javaScriptInitializer, ViewDataDictionary viewData)
            : base(viewContext, javaScriptInitializer, viewData)
        {
            CursorOffset = new SortableCursorOffset();
            HintHandler = new ClientHandlerDescriptor();
            PlaceholderHandler = new ClientHandlerDescriptor();
        }

        public SortableAxis Axis { get; set; }
        public string Filter { get; set; }
        public string Disabled { get; set; }
        public string Handler { get; set; }
        public string ContainerSelector { get; set; }
        public string ConnectWith { get; set; }
        public SortableCursorOffset CursorOffset { get; set; }
        public bool HoldToDrag { get; set; }
        public string Hint { get; set; }
        public ClientHandlerDescriptor HintHandler { get; set; }
        public string Placeholder { get; set; }
        public ClientHandlerDescriptor PlaceholderHandler { get; set; }

        private string container;

        public string Container 
        {
            get
            {
                return container;
            }
            set
            {
                Name = container = value;
            }
        }

        private string Encode(string value)
        {
            value = Regex.Replace(value, "(%20)*%23%3D(%20)*", "#=", RegexOptions.IgnoreCase);
            value = Regex.Replace(value, "(%20)*%23(%20)*", "#", RegexOptions.IgnoreCase);
            value = Regex.Replace(value, "(%20)*%24%7B(%20)*", "${", RegexOptions.IgnoreCase);
            value = Regex.Replace(value, "(%20)*%7D(%20)*", "}", RegexOptions.IgnoreCase);

            return value;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = ToJson();
            writer.Write(Initializer.InitializeFor(SanitizeSelector(Container), "Sortable", options));

            base.WriteInitializationScript(writer);
        }

        public virtual IDictionary<string, object> ToJson()
        {
            var options = new Dictionary<string, object>(Events);

            if (Filter.HasValue())
            {
                options["filter"] = SanitizeSelector(Filter);
            }

            if (Disabled.HasValue())
            {
                options["disabled"] = SanitizeSelector(Disabled);
            }

            if (Handler.HasValue())
            {
                options["handler"] = SanitizeSelector(Handler);
            }

            if (ContainerSelector.HasValue())
            {
                options["container"] = SanitizeSelector(ContainerSelector);
            }

            if (ConnectWith.HasValue())
            {
                options["connectWith"] = SanitizeSelector(ConnectWith);
            }

            if (HoldToDrag)
            {
                options["holdToDrag"] = true;
            }

            if (Axis != SortableAxis.None)
            {
                options["axis"] = Enum.GetName(typeof(SortableAxis), Axis).ToLowerInvariant();
            }

            if (CursorOffset.Left != int.MinValue || CursorOffset.Top != int.MinValue)
            {
                var topLeft = new Dictionary<string, int>();

                if (CursorOffset.Top != int.MinValue)
                {
                    topLeft.Add("top", CursorOffset.Top);
                }

                if (CursorOffset.Left != int.MinValue)
                {
                    topLeft.Add("left", CursorOffset.Left);
                }

                options.Add("cursorOffset", topLeft);
            }

            if (HintHandler.HasValue())
            {
                options["hint"] = HintHandler;
            } 
            else if (Hint.HasValue())
            {
                options["hint"] = Hint;
            }

            if (PlaceholderHandler.HasValue())
            {
                options["placeholder"] = PlaceholderHandler;
            }
            else if (Placeholder.HasValue())
            {
                options["placeholder"] = Placeholder;
            }

            return options;
        }

        public override void VerifySettings()
        {
            if (string.IsNullOrEmpty(Container))
            {
                throw new InvalidOperationException(Resources.Exceptions.TooltipContainerShouldBeSet);
            }

            this.ThrowIfClassIsPresent("k-" + GetType().GetTypeName().ToLowerInvariant() + "-rtl", Exceptions.Rtl);
        }

        private string SanitizeSelector(string selector)
        {
            if (string.IsNullOrWhiteSpace(selector))
            {
                return string.Empty;
            }

            if (!IsInClientTemplate)
            {
                return selector;
            }

            StringBuilder builder = new StringBuilder(selector.Length);
            int startSharpIndex = selector.IndexOf("#=");
            int endSharpIndex = selector.LastIndexOf("#");

            if (endSharpIndex > startSharpIndex && startSharpIndex > -1)
            {
                builder.Append(selector.Substring(0, startSharpIndex).Replace("#", "\\#"));
                builder.Append(selector.Substring(startSharpIndex, endSharpIndex - startSharpIndex + 1));
                builder.Append(selector.Substring(endSharpIndex + 1).Replace("#", "\\#"));
            }
            else
            {
                builder.Append(selector.Replace("#", "\\#"));
            }

            return builder.ToString();
        }
        
    }
}