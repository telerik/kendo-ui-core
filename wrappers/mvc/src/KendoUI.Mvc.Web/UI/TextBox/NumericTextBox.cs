// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.Resources;

    public class NumericTextBox<T> : TextBoxBase<T> where T : struct
    {
        public NumericTextBox(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, ITextBoxBaseHtmlBuilderFactory<T> rendererFactory)
            : base(viewContext, clientSideObjectWriterFactory, rendererFactory)
        {
            ScriptFileNames.AddRange(new[] { "telerik.common.js", "telerik.textbox.js" });

            MinValue = ReadField()["min"];
            MaxValue = ReadField()["max"];
            IncrementStep = (T)Convert.ChangeType(1, typeof(T));
            EmptyMessage = "Enter value";

            DecimalDigits = CultureInfo.CurrentCulture.NumberFormat.NumberDecimalDigits;
            NumberGroupSize = CultureInfo.CurrentCulture.NumberFormat.NumberGroupSizes[0];
            NegativePatternIndex = CultureInfo.CurrentCulture.NumberFormat.NumberNegativePattern;
        }

        private Dictionary<string, T> ReadField()
        {
            Func<object, object, Dictionary<string, T>> GetRangeValues = (min, max) => {
                return new Dictionary<string, T>() { 
                    { "min", (T)Convert.ChangeType(min, typeof(T)) },
                    { "max", (T)Convert.ChangeType(max, typeof(T)) } 
                };
            };

            var type = typeof(T);

            if (type == typeof(int))
            {
                return GetRangeValues(int.MinValue, int.MaxValue);
            }
            else if (type == typeof(uint))
            {
                return GetRangeValues(uint.MinValue, uint.MaxValue);
            }
            else if (type == typeof(short))
            {
                return GetRangeValues(short.MinValue, short.MaxValue);
            }
            else if (type == typeof(ushort))
            {
                return GetRangeValues(ushort.MinValue, ushort.MaxValue);
            }
            else if (type == typeof(long))
            {
                return GetRangeValues(long.MinValue, long.MaxValue);
            }
            else if (type == typeof(ulong))
            {
                return GetRangeValues(ulong.MinValue, ulong.MaxValue);
            }
            else if (type == typeof(float))
            {
                return GetRangeValues(float.MinValue, float.MaxValue);
            }
            else if (type == typeof(double))
            {
                return GetRangeValues(double.MinValue, double.MaxValue);
            }
            else if (type == typeof(sbyte))
            {
                return GetRangeValues(sbyte.MinValue, sbyte.MaxValue);
            }
            else if (type == typeof(byte))
            {
                return GetRangeValues(byte.MinValue, byte.MaxValue);
            }
            else if (type == typeof(char))
            {
                return GetRangeValues(char.MinValue, char.MaxValue);
            }

            return GetRangeValues(decimal.MinValue, decimal.MaxValue);
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

            objectWriter.AppendObject("val", this.Value);
            objectWriter.AppendObject("step", this.IncrementStep);
            objectWriter.AppendObject("minValue", this.MinValue);
            objectWriter.AppendObject("maxValue", this.MaxValue);
            objectWriter.Append("digits", this.DecimalDigits);
            objectWriter.Append("separator", this.DecimalSeparator);
            objectWriter.AppendNullableString("groupSeparator", this.NumberGroupSeparator);
            objectWriter.Append("groupSize", this.NumberGroupSize);
            objectWriter.Append("negative", this.NegativePatternIndex);
            objectWriter.Append("text", this.EmptyMessage);
            objectWriter.Append("type", "numeric");

            var inputAttributes = new Dictionary<string, string>();
            this.InputHtmlAttributes.Each(x => inputAttributes.Add(x.Key, x.Value.ToString()));
            objectWriter.AppendObject("inputAttributes", inputAttributes);

            ClientEvents.SerializeTo(objectWriter);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

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

            if (NegativePatternIndex < 0 || NegativePatternIndex > 4)
            {
                throw new IndexOutOfRangeException(TextResource.PropertyShouldBeInRange.FormatWith("NegativePatternIndex", 0, 4));
            }
        }
    }
}