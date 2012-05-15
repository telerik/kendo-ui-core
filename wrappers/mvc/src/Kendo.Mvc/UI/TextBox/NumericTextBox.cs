namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Routing;
    using System.Web.Script.Serialization;

    public class NumericTextBox<T> : ViewComponentBase, IInputComponent<T> where T : struct
    {
        public NumericTextBox(ViewContext viewContext, ViewDataDictionary viewData)
            : base(viewContext, null, viewData)
        {
            Spinners = true;

            InputHtmlAttributes = new RouteValueDictionary();

            ClientEvents = new NumericTextBoxClientEvents();

            Enabled = true;

            Step = (T)Convert.ChangeType(1, typeof(T));

            Format = "n";
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
                return TagBuilder.CreateSanitizedId(InputHtmlAttributes.ContainsKey("id") ? InputHtmlAttributes["id"].ToString() : Name);
            }
        }

        public IDictionary<string, object> InputHtmlAttributes
        {
            get;
            private set;
        }

        public T? Value
        {
            get;
            set;
        }

        public T Step
        {
            get;
            set;
        }

        public T? Min
        {
            get;
            set;
        }

        public T? Max
        {
            get;
            set;
        }

        public int? Decimals
        {
            get;
            set;
        }

        public string Format
        {
            get;
            set;
        }

        public string Culture
        {
            get;
            set;
        }

        public string Placeholder
        {
            get;
            set;
        }

        public bool Spinners
        {
            get;
            set;
        }

        public string ButtonTitleUp
        {
            get;
            set;
        }

        public string ButtonTitleDown
        {
            get;
            set;
        }

        public NumericTextBoxClientEvents ClientEvents
        {
            get;
            private set;
        }

        public bool Enabled
        {
            get;
            set;
        }

        protected void Serialize(IDictionary<string, object> json)
        {
            json["format"] = this.Format;
            json["culture"] = this.Culture;
            json["placeholder"] = this.Placeholder;
            json["spinners"] = this.Spinners;

            json["min"] = this.Min;
            json["max"] = this.Max;
            json["step"] = this.Step;
            json["decimals"] = this.Decimals;

            ClientEvents.SerializeTo(json);
        }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            var json = new Dictionary<string, object>();
            Serialize(json);

            //Escape meta characters: http://api.jquery.com/category/selectors/
            var selector = @";&,.+*~':""!^$[]()|/".ToCharArray().Aggregate(Id, (current, chr) => current.Replace(chr.ToString(), @"\\" + chr));

            json["test"] = new Dictionary<string, object>();

            writer.Write("jQuery(document).ready(function(){{jQuery('#{0}').kendoNumericTextBox(".FormatWith(selector));
            writer.Write(json.ToJson());
            writer.Write(");});");

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            Guard.IsNotNull(writer, "writer");

            VerifySettings();

            NumericTextBoxHtmlBuilder<T> renderer = new NumericTextBoxHtmlBuilder<T>(this);

            renderer.Build().WriteTo(writer);
            base.WriteHtml(writer);
        }

        public override void VerifySettings()
        {
            Name = Name ?? ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(string.Empty);

            if (Min.HasValue && Max.HasValue && Nullable.Compare<T>(Min, Max) == 1)
            {
                throw new ArgumentException(TextResource.MinPropertyMustBeLessThenMaxProperty.FormatWith("Min", "Max"));
            }

            base.VerifySettings();
        }
    }
}