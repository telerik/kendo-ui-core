namespace KendoUI.Mvc.UI
{
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.UI.Html;
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using System.Web.Routing;

    public class NumericTextBox<T> : ViewComponentBase, IInputComponent<T> where T : struct
    {
        public NumericTextBox(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory)
            : base(viewContext, clientSideObjectWriterFactory)
        {
           //Spinners = true;

            InputHtmlAttributes = new RouteValueDictionary();

            //ClientEvents = new TextBoxBaseClientEvents();

            Enabled = true;

            //ScriptFileNames.AddRange(new[] { "telerik.common.js", "telerik.textbox.js" });

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
                return InputHtmlAttributes.ContainsKey("id") ?
                       InputHtmlAttributes["id"].ToString() :
                       (!string.IsNullOrEmpty(Name) ? Name.Replace(".", HtmlHelper.IdAttributeDotReplacement) : null);
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

        public string Format
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

        //public TextBoxBaseClientEvents ClientEvents
        //{
        //    get;
        //    private set;
        //}

        public bool Enabled
        {
            get;
            set;
        }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "kendoNumericTextBox", writer);

            objectWriter.Start();

            objectWriter.AppendObject("value", this.Value);
            objectWriter.AppendObject("step", this.Step);
            objectWriter.Append("placeholder", this.Placeholder);

            //ClientEvents.SerializeTo(objectWriter);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            Guard.IsNotNull(writer, "writer");

            NumericTextBoxHtmlBuilder<T> renderer = new NumericTextBoxHtmlBuilder<T>(this);

            renderer.Build().WriteTo(writer);
            base.WriteHtml(writer);
        }
    }
}