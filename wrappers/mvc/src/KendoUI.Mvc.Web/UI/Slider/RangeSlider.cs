

namespace KendoUI.Mvc.UI
{
    using System;
    using System.Web.Mvc;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.UI.Html;
    using System.Web.UI;
    using KendoUI.Mvc.Resources;

    public class RangeSlider<T> : ViewComponentBase where T : struct, IComparable
    {
        private readonly IRangeSliderHtmlBuilderFactory rendererFactory;

        public RangeSlider(ViewContext viewContext, IClientSideObjectWriterFactory writerFactory, IRangeSliderHtmlBuilderFactory rendererFactory)
            : base(viewContext, writerFactory)
        {
            this.rendererFactory = rendererFactory;

            ScriptFileNames.AddRange(new[] { "telerik.common.js", "telerik.draganddrop.js", "telerik.slider.js" });

            Orientation = SliderOrientation.Horizontal;
            TickPlacement = SliderTickPlacement.Both;
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

        public SliderTooltipSettings Settings
        {
            get;
            set;
        }

        public T? SelectionStart
        {
            get;
            set;
        }

        public T? SelectionEnd
        {
            get;
            set;
        }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            var objectWriter = ClientSideObjectWriterFactory.Create(Id, "tRangeSlider", writer);

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
            objectWriter.AppendObject("smallStep", SmallStep);
            objectWriter.AppendObject("largeStep", LargeStep);
            objectWriter.AppendObject("minValue", MinValue);
            objectWriter.AppendObject("maxValue", MaxValue);
            objectWriter.Append("enabled", Enabled, true);

            Settings.SerializeTo("tooltip", objectWriter);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            if (!SelectionStart.HasValue)
            {
                SelectionStart = MinValue;
            }

            if (!SelectionEnd.HasValue)
            {
                SelectionEnd = MaxValue;
            }

            if (!LargeStep.HasValue)
            {
                LargeStep = (T)Convert.ChangeType(5, typeof(T));
                if (LargeStep.Value.CompareTo(SmallStep) < 0)
                {
                    LargeStep = SmallStep;
                }
            }

            var builder = rendererFactory.Create(new RangeSliderRenderingData
            {
                Id = Id,
                Name = Name,
                HtmlAttributes = HtmlAttributes,
                MaxValue = MaxValue,
                MinValue = MinValue,
                SmallStep = SmallStep,
                SelectionStart = this.GetValue("{0}[0]".FormatWith(Name), SelectionStart.Value),
                SelectionEnd = this.GetValue("{0}[1]".FormatWith(Name), SelectionEnd.Value),
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


            if (SelectionStart != null && SelectionEnd != null)
            {
                if (SelectionStart.Value.CompareTo(SelectionEnd.Value) > 0)
                {
                    throw new ArgumentException(TextResource.FirstPropertyShouldNotBeBiggerThenSecondProperty.FormatWith("SelectionStart", "SelectionEnd"));
                }
            }

            if (SmallStep.CompareTo(LargeStep) > 0)
            {
                throw new ArgumentException(TextResource.FirstPropertyShouldNotBeBiggerThenSecondProperty.FormatWith("SmallStep", "LargeStep"));
            }

            if (SmallStep.CompareTo((T)Convert.ChangeType(0, typeof(T))) <= 0)
            {
                throw new ArgumentException(TextResource.PropertyMustBeBiggerThenZero.FormatWith("SmallStep"));
            }
        }
    }
}