// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Extensions;
    using System.Web.UI;
    using Telerik.Web.Mvc.UI.Html;
    using Telerik.Web.Mvc.Resources;

    public class Slider<T> : ViewComponentBase, IInputComponent<T> where T : struct, IComparable
    {
        private readonly ISliderHtmlBuilderFactory rendererFactory;

        public Slider(ViewContext viewContext, IClientSideObjectWriterFactory writerFactory, ISliderHtmlBuilderFactory rendererFactory)
            : base(viewContext, writerFactory)
        {
            this.rendererFactory = rendererFactory;

            ScriptFileNames.AddRange(new[] { "telerik.common.js", "telerik.draganddrop.js", "telerik.slider.js" });

            Orientation = SliderOrientation.Horizontal;
            TickPlacement = SliderTickPlacement.Both;
            ShowButtons = true;
            IncreaseButtonTitle = "Increase";
            DecreaseButtonTitle = "Decrease";
            MinValue = (T)Convert.ChangeType(0, typeof(T));
            MaxValue = (T)Convert.ChangeType(10, typeof(T));
            SmallStep = (T)Convert.ChangeType(1, typeof(T));
            ClientEvents = new SliderBaseClientEvents();
            Enabled = true;

            Settings = new SliderTooltipSettings();
        }

        public SliderOrientation Orientation
        {
            get;
            set;
        }

        public SliderTickPlacement TickPlacement
        {
            get;
            set;
        }

        public T MinValue
        {
            get;
            set;
        }

        public T MaxValue
        {
            get;
            set;
        }

        public T SmallStep
        {
            get;
            set;
        }

        public T? LargeStep
        {
            get;
            set;
        }

        public SliderBaseClientEvents ClientEvents
        {
            get;
            private set;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public T? Value
        {
            get;
            set;
        }

        public SliderTooltipSettings Settings
        {
            get;
            set;
        }

        public bool? ShowButtons
        {
            get;
            set;
        }

        public string IncreaseButtonTitle
        {
            get;
            set;
        }

        public string DecreaseButtonTitle
        {
            get;
            set;
        }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            var objectWriter = ClientSideObjectWriterFactory.Create(Id, "tSlider", writer);

            objectWriter.Start();

            SerializeProperties(objectWriter);

            ClientEvents.SerializeTo(objectWriter);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        private void SerializeProperties(IClientSideObjectWriter objectWriter)
        {
            objectWriter.Append("orientation", Orientation, SliderOrientation.Horizontal);
            objectWriter.Append("tickPlacement", TickPlacement, SliderTickPlacement.Both);
            objectWriter.Append("increaseButtonTitle", IncreaseButtonTitle);
            objectWriter.Append("decreaseButtonTitle", DecreaseButtonTitle);
            objectWriter.AppendObject("showButtons", ShowButtons);
            objectWriter.AppendObject("enabled", Enabled);
            objectWriter.AppendObject("smallStep", SmallStep);
            objectWriter.AppendObject("largeStep", LargeStep);
            objectWriter.AppendObject("minValue", MinValue);
            objectWriter.AppendObject("maxValue", MaxValue);

            Settings.SerializeTo("tooltip", objectWriter);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            Func<object, T?> converter = val =>
            {
                return ((T)Convert.ChangeType(val, typeof(T)));
            };

            string value = this.GetAttemptedValue();
            if (value == null)
            {
                T? result = this.GetValue(converter);

                if (!result.HasValue)
                {
                    result = MinValue;
                }

                value = "{0}".FormatWith(result);
            }

            if (!LargeStep.HasValue)
            {
                LargeStep = (T)Convert.ChangeType(5, typeof(T));
                if (LargeStep.Value.CompareTo(SmallStep) < 0)
                {
                    LargeStep = SmallStep;
                }
            }

            var builder = rendererFactory.Create(new SliderRenderingData
            {
                Id = Id,
                Name = Name,
                HtmlAttributes = HtmlAttributes,
                MaxValue = MaxValue,
                MinValue = MinValue,
                SmallStep = SmallStep,
                Value = value,
                Enabled = Enabled
            });

            builder.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            if (MinValue.CompareTo(MaxValue) >= 0)
            {
                throw new ArgumentException(TextResource.MinPropertyMustBeLessThenMaxProperty.FormatWith("Min", "Max"));
            }

            if (SmallStep.CompareTo((T)Convert.ChangeType(0, typeof(T))) <= 0)
            {
                throw new ArgumentException(TextResource.PropertyMustBeBiggerThenZero.FormatWith("SmallStep"));
            }

            if (SmallStep.CompareTo(LargeStep) > 0)
            {
                throw new ArgumentException(TextResource.FirstPropertyShouldNotBeBiggerThenSecondProperty.FormatWith("SmallStep", "LargeStep"));
            }
        }
    }
}