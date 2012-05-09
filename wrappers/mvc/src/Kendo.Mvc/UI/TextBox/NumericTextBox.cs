namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html;
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using System.Web.Routing;

    public class NumericTextBox<T> : ViewComponentBase, IInputComponent<T> where T : struct
    {
        public NumericTextBox(ViewContext viewContext, ViewDataDictionary ViewData, IClientSideObjectWriterFactory clientSideObjectWriterFactory)
            : base(viewContext, clientSideObjectWriterFactory)
        {
            Spinners = true;

            InputHtmlAttributes = new RouteValueDictionary();

            ClientEvents = new NumericTextBoxClientEvents();

            Enabled = true;

            Step = (T)Convert.ChangeType(1, typeof(T));

            Format = "n";

            this.ViewData = ViewData;
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
                return InputHtmlAttributes.ContainsKey("id") ?
                       InputHtmlAttributes["id"].ToString() :
                       (!string.IsNullOrEmpty(Name) ? Name.Replace(".", HtmlHelper.IdAttributeDotReplacement) : null);
            }
        }

        internal ViewDataDictionary ViewData
        {
            get;
            set;
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

        //get it from resource files
        public string ButtonTitleUp
        {
            get;
            set;
        }

        //get it from resource files
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

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "kendoNumericTextBox", writer);

            objectWriter.Start();
            
            objectWriter.Append("format", this.Format);
            objectWriter.Append("culture", this.Culture);
            objectWriter.Append("placeholder", this.Placeholder);
            objectWriter.Append("spinners", this.Spinners);
            
            objectWriter.AppendObject("min", this.Min);
            objectWriter.AppendObject("max", this.Max);
            objectWriter.AppendObject("step", this.Step);
            objectWriter.AppendObject("decimals", this.Decimals);

            ClientEvents.SerializeTo(objectWriter);

            objectWriter.Complete();

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
#if MVC2 || MVC3
            Name = Name ?? ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(string.Empty);
#endif

            if (Min.HasValue && Max.HasValue && Nullable.Compare<T>(Min, Max) == 1)
            {
                throw new ArgumentException(TextResource.MinPropertyMustBeLessThenMaxProperty.FormatWith("Min", "Max"));
            }

            base.VerifySettings();
        }
    }
}