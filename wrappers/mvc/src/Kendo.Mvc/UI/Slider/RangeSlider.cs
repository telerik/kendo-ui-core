namespace Kendo.Mvc.UI
{
    using System;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI.Html;
    using System.Web.UI;
    using Kendo.Mvc.Resources;

    public class RangeSlider<T> : ViewComponentBase where T : struct, IComparable
    {
        private readonly IRangeSliderHtmlBuilderFactory rendererFactory;

        public RangeSlider(ViewContext viewContext, IClientSideObjectWriterFactory writerFactory, IRangeSliderHtmlBuilderFactory rendererFactory)
            : base(viewContext, writerFactory)
        {
            this.rendererFactory = rendererFactory;

            Orientation = SliderOrientation.Horizontal;
            TickPlacement = SliderTickPlacement.Both;
            Min = (T)Convert.ChangeType(0, typeof(T));
            Max = (T)Convert.ChangeType(10, typeof(T));
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

        public T Min
        {
            get;
            set;
        }

        public T Max
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
            var objectWriter = ClientSideObjectWriterFactory.Create(Id, "kendoRangeSlider", writer);

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
            objectWriter.AppendObject("min", Min);
            objectWriter.AppendObject("max", Max);
            objectWriter.Append("enabled", Enabled, true);

            Settings.SerializeTo("tooltip", objectWriter);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            if (!SelectionStart.HasValue)
            {
                SelectionStart = Min;
            }

            if (!SelectionEnd.HasValue)
            {
                SelectionEnd = Max;
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
                Max = Max,
                Min = Min,
                SmallStep = SmallStep,
                SelectionStart = this.GetValue("{0}[0]".FormatWith(Name), SelectionStart.Value),
                SelectionEnd = this.GetValue("{0}[1]".FormatWith(Name), SelectionEnd.Value),
                Enabled = Enabled
            });

            builder.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}