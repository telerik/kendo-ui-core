namespace Kendo.Mvc.UI
{
    using System;
    using System.Web.Mvc;
    using Kendo.Mvc.UI.Html;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;

    public class RangeSlider<T> : ViewComponentBase where T : struct, IComparable
    {
        public RangeSlider(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData)
            : base(viewContext, initializer, viewData)
        {
            Settings = new SliderTooltipSettings();
        }

        public SliderOrientation? Orientation { get; set; }

        public SliderTickPlacement? TickPlacement { get; set; }

        public T? Min { get; set; }

        public T? Max { get; set; }

        public T? SmallStep { get; set; }

        public T? LargeStep { get; set; }

        public SliderTooltipSettings Settings { get; set; }

        public T? SelectionStart { get; set; }

        public T? SelectionEnd { get; set; }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            SerializeProperties(options);

            writer.Write(Initializer.Initialize(Selector, "RangeSlider", options));

            base.WriteInitializationScript(writer);
        }

        private void SerializeProperties(IDictionary<string, object> options)
        {
            FluentDictionary.For(options)
                .Add("orientation", Orientation.ToString().ToLowerInvariant(), () => Orientation.HasValue)
                .Add("tickPlacement", TickPlacement.ToString().ToLowerInvariant(), () => TickPlacement.HasValue)
                .Add("smallStep", SmallStep, () => SmallStep.HasValue)
                .Add("largeStep", LargeStep, () => LargeStep.HasValue)
                .Add("min", Min, () => Min.HasValue)
                .Add("max", Max, () => Max.HasValue);

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

            var renderer = new RangeSliderHtmlBuilder<T>(this);

            renderer.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}