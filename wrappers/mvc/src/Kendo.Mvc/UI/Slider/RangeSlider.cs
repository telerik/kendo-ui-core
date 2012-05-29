namespace Kendo.Mvc.UI
{
    using System;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI.Html;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;

    public class RangeSlider<T> : ViewComponentBase where T : struct, IComparable
    {
        private readonly IRangeSliderHtmlBuilderFactory rendererFactory;

        public RangeSlider(ViewContext viewContext, IJavaScriptInitializer initializer, IRangeSliderHtmlBuilderFactory rendererFactory)
            : base(viewContext, initializer)
        {
            this.rendererFactory = rendererFactory;

            Orientation = SliderOrientation.Horizontal;
            TickPlacement = SliderTickPlacement.Both;
            Min = (T)Convert.ChangeType(0, typeof(T));
            Max = (T)Convert.ChangeType(10, typeof(T));
            SmallStep = (T)Convert.ChangeType(1, typeof(T));
            ClientEvents = new Dictionary<string, object>();
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

        public IDictionary<string, object> ClientEvents
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
            var options = new Dictionary<string, object>(ClientEvents);

            SerializeProperties(options);

            writer.Write(Initializer.Initialize(Id, "RangeSlider", options));

            base.WriteInitializationScript(writer);
        }

        private void SerializeProperties(IDictionary<string, object> options)
        {
            FluentDictionary.For(options)
                .Add("orientation", Orientation, SliderOrientation.Horizontal)
                .Add("tickPlacement", TickPlacement, SliderTickPlacement.Both)
                .Add("smallStep", SmallStep)
                .Add("largeStep", LargeStep)
                .Add("min", Min)
                .Add("max", Max)
                .Add("enabled", Enabled, true);

            Settings.SerializeTo("tooltip", options);
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