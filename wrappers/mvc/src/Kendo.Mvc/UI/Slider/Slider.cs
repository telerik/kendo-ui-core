namespace Kendo.Mvc.UI
{
    using System;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using System.Web.UI;
    using Kendo.Mvc.UI.Html;
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;

    public class Slider<T> : WidgetBase, IInputComponent<T> where T : struct, IComparable
    {
        public Slider(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData)
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

        public T? Value { get; set; }

        public SliderTooltipSettings Settings { get; set; }

        public bool? ShowButtons { get; set; }

        public string IncreaseButtonTitle { get; set; }

        public string DecreaseButtonTitle { get; set; }

        public string DragHandleTitle { get; set; }
        
        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            SerializeProperties(options);

            writer.Write(Initializer.Initialize(Selector, "Slider", options));

            base.WriteInitializationScript(writer);
        }

        private void SerializeProperties(IDictionary<string, object> options)
        {
            FluentDictionary.For(options)
                .Add("orientation", Orientation.ToString().ToLowerInvariant(), () => Orientation.HasValue)
                .Add("tickPlacement", TickPlacement.ToString().ToLowerInvariant(), () => TickPlacement.HasValue)
                .Add("dragHandleTitle", DragHandleTitle, () => DragHandleTitle.HasValue())
                .Add("increaseButtonTitle", IncreaseButtonTitle, () => IncreaseButtonTitle.HasValue())
                .Add("decreaseButtonTitle", DecreaseButtonTitle, () => DecreaseButtonTitle.HasValue())
                .Add("showButtons", ShowButtons, () => ShowButtons.HasValue)
                .Add("smallStep", SmallStep, () => SmallStep.HasValue)
                .Add("largeStep", LargeStep, () => LargeStep.HasValue)
                .Add("min", Min, () => Min.HasValue)
                .Add("max", Max, () => Max.HasValue);

            Settings.SerializeTo("tooltip", options);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var renderer = new SliderHtmlBuilder<T>(this);

            renderer.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}