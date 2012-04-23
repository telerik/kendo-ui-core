// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using Extensions;

    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Routing;
    using System.Collections.Generic;


    public class AutoComplete : ViewComponentBase, IDataBoundDropDown
    {
        private readonly IList<IEffect> defaultEffects = new List<IEffect> { new SlideAnimation() };

        public AutoComplete(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, IUrlGenerator urlGenerator)
            : base(viewContext, clientSideObjectWriterFactory)
        {
            ScriptFileNames.AddRange(new[] { "telerik.common.js", "telerik.list.js", "telerik.autocomplete.js" });

            UrlGenerator = urlGenerator;

            ClientEvents = new DropDownClientEvents();
            DataBinding = new AutoCompleteDataBindingConfiguration();
            DropDownHtmlAttributes = new RouteValueDictionary();
            Filtering = new AutoCompleteFilterSettings();

            Items = new List<string>();

            Multiple = new AutoCompleteMultipleValuesSettings();

            Effects = new Effects();
            defaultEffects.Each(el => Effects.Container.Add(el));
            Enabled = true;
            Encoded = true;
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

        public bool AutoFill
        {
            get;
            set;
        }

        public DropDownClientEvents ClientEvents
        {
            get;
            private set;
        }
        
        public IDictionary<string, object> DropDownHtmlAttributes
        {
            get;
            private set;
        }

        public IDropDownDataBindingConfiguration DataBinding
        {
            get;
            set;
        }

        public AutoCompleteFilterSettings Filtering //should be common for AutoComplete and for the ComboBox!!!
        {
            get;
            private set;
        }

        public AutoCompleteMultipleValuesSettings Multiple
        {
            get;
            private set;
        }

        public Effects Effects
        {
            get;
            private set;
        }

        public IList<string> Items
        { 
            get;
            private set;
        }

        public bool HighlightFirstMatch
        {
            get;
            set;
        }

        public bool Enabled 
        { 
            get; 
            set; 
        }

        public string Value
        {
            get;
            set;
        }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "tAutoComplete", writer);

            objectWriter.Start();

            objectWriter.Append("autoFill", AutoFill, false);
            objectWriter.Append("highlightFirst", HighlightFirstMatch, false);

            if (!defaultEffects.SequenceEqual(Effects.Container))
            {
                objectWriter.Serialize("effects", Effects);
            }

            ClientEvents.SerializeTo(objectWriter);
            Multiple.SerializeTo(objectWriter);

            DataBinding.Ajax.SerializeTo<AutoCompleteBindingSettings>("ajax", objectWriter, this);
            DataBinding.WebService.SerializeTo<AutoCompleteBindingSettings>("ws", objectWriter, this);

            objectWriter.Append("filter", Filtering.FilterMode == AutoCompleteFilterMode.Contains ? 2 : 1); //"contains" : "startsWith");
            objectWriter.Append("minChars", Filtering.MinimumChars, 1);

            if (Items.Any())
            {
                objectWriter.AppendCollection("data", Items);
            }

            if (DropDownHtmlAttributes.Any())
            {
                objectWriter.Append("dropDownAttr", DropDownHtmlAttributes.ToAttributeString());
            }

            objectWriter.Append("encoded", this.Encoded, true);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            new AutoCompleteHtmlBuilder(this).Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}