namespace Kendo.Mvc.UI
{
    using System;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using System.Web.UI;
    using Kendo.Mvc.UI.Html;
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;

    public class Slider<T> : ViewComponentBase, IInputComponent<T> where T : struct, IComparable
    {
        private readonly ISliderHtmlBuilderFactory rendererFactory;

        public Slider(ViewContext viewContext, IJavaScriptInitializer initializer, ISliderHtmlBuilderFactory rendererFactory)
            : base(viewContext, initializer)
        {
            this.rendererFactory = rendererFactory;

            Orientation = SliderOrientation.Horizontal;
            TickPlacement = SliderTickPlacement.Both;
            ShowButtons = true;
            IncreaseButtonTitle = "Increase";
            DecreaseButtonTitle = "Decrease";
            Min = (T)Convert.ChangeType(0, typeof(T));
            Max = (T)Convert.ChangeType(10, typeof(T));
            SmallStep = (T)Convert.ChangeType(1, typeof(T));
            Enabled = true;

            Settings = new SliderTooltipSettings();
        }

        public SliderOrientation Orientation { get; set; }

        public SliderTickPlacement TickPlacement { get; set; }

        public T Min { get; set; }

        public T Max { get; set; }

        public T SmallStep { get; set; }

        public T? LargeStep { get; set; }

        public bool Enabled { get; set; }

        public T? Value { get; set; }

        public SliderTooltipSettings Settings { get; set; }

        public bool? ShowButtons { get; set; }

        public string IncreaseButtonTitle { get; set; }

        public string DecreaseButtonTitle { get; set; }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            SerializeProperties(options);

            writer.Write(Initializer.Initialize(Id, "Slider", options));

            base.WriteInitializationScript(writer);
        }

        private void SerializeProperties(IDictionary<string, object> options)
        {
            FluentDictionary.For(options)
                .Add("orientation", Orientation, SliderOrientation.Horizontal)
                .Add("tickPlacement", TickPlacement, SliderTickPlacement.Both)
                .Add("increaseButtonTitle", IncreaseButtonTitle, "Increase")
                .Add("decreaseButtonTitle", DecreaseButtonTitle, "Decrease")
                .Add("showButtons", ShowButtons, () => ShowButtons.HasValue)
                .Add("enabled", Enabled, true)
                .Add("smallStep", SmallStep)
                .Add("largeStep", LargeStep)
                .Add("min", Min)
                .Add("max", Max);

            Settings.SerializeTo("tooltip", options);
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
                    result = Min;
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
                MaxValue = Max,
                MinValue = Min,
                SmallStep = SmallStep,
                Value = value,
                Enabled = Enabled
            });

            builder.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}