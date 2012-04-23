// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Globalization;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.Resources;

    public class PercentTextBox : TextBoxBase<double>
    {
        public PercentTextBox(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, ITextBoxBaseHtmlBuilderFactory<double> rendererFactory)
            : base(viewContext, clientSideObjectWriterFactory, rendererFactory)
        {
            ScriptFileNames.AddRange(new[] { "telerik.common.js", "telerik.textbox.js" });

            MinValue = double.MinValue;
            MaxValue = double.MaxValue;
            IncrementStep = 1;
            EmptyMessage = "Enter value";

            DecimalDigits = CultureInfo.CurrentCulture.NumberFormat.PercentDecimalDigits;
            NumberGroupSize = CultureInfo.CurrentCulture.NumberFormat.PercentGroupSizes[0];
            NegativePatternIndex = CultureInfo.CurrentCulture.NumberFormat.PercentNegativePattern;
            PositivePatternIndex = CultureInfo.CurrentCulture.NumberFormat.PercentPositivePattern;
        }

        public int DecimalDigits
        {
            get;
            set;
        }

        public string DecimalSeparator
        {
            get;
            set;
        }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "tTextBox", writer);

            objectWriter.Start();

            objectWriter.AppendObject("val", Value);
            objectWriter.Append("step", IncrementStep);
            objectWriter.AppendObject("minValue", MinValue);
            objectWriter.AppendObject("maxValue", MaxValue);
            objectWriter.Append("symbol", PercentSymbol);
            objectWriter.Append("digits", DecimalDigits);
            objectWriter.Append("separator", DecimalSeparator);
            objectWriter.AppendNullableString("groupSeparator", NumberGroupSeparator);
            objectWriter.Append("groupSize", NumberGroupSize);
            objectWriter.Append("positive", PositivePatternIndex);
            objectWriter.Append("negative", NegativePatternIndex);
            objectWriter.Append("text", EmptyMessage);
            objectWriter.Append("type", "percent");

            ClientEvents.SerializeTo(objectWriter);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        public int PositivePatternIndex { get; set; }

        public string PercentSymbol { get; set; }


        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            Guard.IsNotNull(writer, "writer");

            ITextBoxBaseHtmlBuilder renderer = rendererFactory.Create(this);

            IHtmlNode rootTag = renderer.Build("t-numerictextbox");

            rootTag.Children.Add(renderer.InputTag());

            if (Spinners)
            {
                rootTag.Children.Add(renderer.UpButtonTag());
                rootTag.Children.Add(renderer.DownButtonTag());
            }

            rootTag.WriteTo(writer);
            base.WriteHtml(writer);
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            if (PositivePatternIndex < 0 || PositivePatternIndex > 2) //currency positive patterns are 3.
            {
                throw new IndexOutOfRangeException(TextResource.PropertyShouldBeInRange.FormatWith("PositivePatternIndex", 0, 2));
            }

            if (NegativePatternIndex < 0 || NegativePatternIndex > 2) //currency negative patterns are 3.
            {
                throw new IndexOutOfRangeException(TextResource.PropertyShouldBeInRange.FormatWith("NegativePatternIndex", 0, 2));
            }
        }
    }
}