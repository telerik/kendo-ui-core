namespace Kendo.Mvc.UI
{
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Routing;
    using System.Collections.Generic;

    using Extensions;

    public class ComboBox : ViewComponentBase, IDropDown, IComboBoxRenderable
    {
        private bool hasItems = false;
        private readonly IList<IEffect> defaultEffects = new List<IEffect> { new SlideAnimation() };

        public ComboBox(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, IUrlGenerator urlGenerator)
            : base(viewContext, clientSideObjectWriterFactory)
        {
            UrlGenerator = urlGenerator;

            ClientEvents = new DropDownClientEvents();
            DataBinding = new AutoCompleteDataBindingConfiguration();
            DropDownHtmlAttributes = new RouteValueDictionary();
            HiddenInputHtmlAttributes = new RouteValueDictionary();
            InputHtmlAttributes = new RouteValueDictionary();

            Effects = new Effects();
            defaultEffects.Each(el => Effects.Container.Add(el));

            Filtering = new ComboBoxFilterSettings();

            Items = new List<DropDownItem>();
            SelectedIndex = -1;
            Enabled = true;
            Encoded = true;
            OpenOnFocus = false;
            IgnoreCase = true;

        }

        /// <summary>
        /// Gets the id.
        /// </summary>
        /// <value>The id.</value>
        public new string Id
        {
            get
            {
                // Return from htmlattributes if user has specified
                // otherwise build it from name
                return HiddenInputHtmlAttributes.ContainsKey("id") ?
                       HiddenInputHtmlAttributes["id"].ToString() :
                       (!string.IsNullOrEmpty(Name) ? Name.Replace(".", HtmlHelper.IdAttributeDotReplacement) : null);
            }
        }

        public string CascadeTo
        {
            get;
            set;
        }

        public bool AutoFill
        {
            get;
            set;
        }

        public bool IgnoreCase
        {
            get;
            set;
        }

        public bool Encoded
        {
            get;
            set;
        }

        public IUrlGenerator UrlGenerator
        {
            get;
            set;
        }

        public DropDownClientEvents ClientEvents
        {
            get;
            private set;
        }

        public IDropDownDataBindingConfiguration DataBinding
        {
            get;
            private set;
        }

        public IDictionary<string, object> DropDownHtmlAttributes
        {
            get;
            private set;
        }

        public IDictionary<string, object> HiddenInputHtmlAttributes
        {
            get;
            private set;
        }

        public IDictionary<string, object> InputHtmlAttributes
        {
            get;
            private set;
        }

        public Effects Effects
        {
            get;
            set;
        }

        public ComboBoxFilterSettings Filtering
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the items of the ComboBox.
        /// </summary>
        public IList<DropDownItem> Items
        {
            get;
            private set;
        }

        public bool HighlightFirstMatch
        {
            get;
            set;
        }

        public int SelectedIndex 
        { 
            get; 
            set; 
        }
        
        public string Value
        { 
            get; 
            set; 
        }

        public bool Enabled 
        { 
            get; 
            set; 
        }

        public bool OpenOnFocus
        {
            get;
            set;
        }

        public string Placeholder
        {
            get;
            set;
        }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "tComboBox", writer);

            objectWriter.Start();

            objectWriter.Append("autoFill", AutoFill, true);
            objectWriter.Append("ignoreCase", IgnoreCase, true);
            objectWriter.Append("highlightFirst", HighlightFirstMatch, true);
            objectWriter.Append("placeholder", this.Placeholder);
            objectWriter.Append("cascadeTo", this.CascadeTo);

            if (!defaultEffects.SequenceEqual(Effects.Container))
            {
                objectWriter.Serialize("effects", Effects);
            }

            ClientEvents.SerializeTo(objectWriter);

            DataBinding.Ajax.SerializeTo<AutoCompleteBindingSettings>("ajax", objectWriter, this);
            DataBinding.WebService.SerializeTo<AutoCompleteBindingSettings>("ws", objectWriter, this);

            if (Filtering.Enabled)
            {
                objectWriter.Append("filter", (int)Filtering.FilterMode);
                objectWriter.Append("minChars", Filtering.MinimumChars, 0);
            }

            if (hasItems)
            {
                objectWriter.AppendCollection("data", Items);
            }
            else
            {
                objectWriter.Append("selectedValue", this.GetValue<string>(Value));
            }

            objectWriter.Append("index", SelectedIndex, -1);

            if (DropDownHtmlAttributes.Any())
            {
                objectWriter.Append("dropDownAttr", DropDownHtmlAttributes.ToAttributeString());
            }

            objectWriter.Append("encoded", this.Encoded, true);
            objectWriter.Append("enabled", this.Enabled, true);
            objectWriter.Append("openOnFocus", this.OpenOnFocus, false);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            hasItems = Items.Any();
            this.AddPlaceholderItem();
            if (hasItems)
            {
                this.SyncSelectedIndex();
            }

            IDropDownHtmlBuilder builder = new ComboBoxHtmlBuilder(this);

            builder.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}