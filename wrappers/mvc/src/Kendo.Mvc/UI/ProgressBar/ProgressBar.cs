namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Html;

    public class ProgressBar : WidgetBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ProgressBar" /> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="initializer">The javascript initializer.</param>
        public ProgressBar(ViewContext viewContext, IJavaScriptInitializer initializer)
            : base(viewContext, initializer)
        {
            Enable = true;
            Reverse = false;
            ShowStatus = true;

            Animation = new ProgressBarAnimation();
        }

        /// <summary>
        /// Defines the ProgressBar animation
        /// </summary>
        public ProgressBarAnimation Animation
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the number of chunks when the type of the Progressbar is set to "chunk"
        /// </summary>
        public int? ChunkCount
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether the component is enabled
        /// </summary>
        /// <value>
        /// true if the component should be enabled, false otherwise; the default is true.
        /// </value>
        public bool Enable
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the maximum value of the ProgressBar
        /// </summary>
        public int? Max
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the minimum value of the ProgressBar
        /// </summary>
        public int? Min
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the orientation of the ProgressBar
        /// </summary>
        public ProgressBarOrientation? Orientation
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies if the progress direction should be reversed
        /// </summary>
        public bool Reverse
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies if the progress status should be displayed
        /// </summary>
        public bool ShowStatus
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the current value of the ProgressBar 
        /// </summary>
        public int? Value
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the type of the ProgressBar
        /// </summary>
        public ProgressBarType? Type
        {
            get;
            set;
        }

        /// <summary>
        /// Writes the initialization script
        /// </summary>
        /// <param name="writer">The writer object.</param>
        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>();

            var animation = Animation.ToJson();

            if (animation.Keys.Any())
            {
                options.Add("animation", animation["animation"]);
            }

            if (ChunkCount.HasValue)
            {
                options.Add("chunkCount", ChunkCount.Value);
            }

            if (!Enable)
            {
                options.Add("enable", Enable);
            }

            if (Max.HasValue)
            {
                options.Add("max", Max.Value);
            }

            if (Min.HasValue)
            {
                options.Add("min", Min.Value);
            }

            if (Orientation.HasValue)
            {
                options.Add("orientation", Orientation.ToString().ToLowerInvariant());
            }

            if (Reverse)
            {
                options.Add("reverse", Reverse);
            }

            if (!ShowStatus)
            {
                options.Add("showStatus", ShowStatus);
            }

            if (Type.HasValue)
            {
                options.Add("type", Type.ToString().ToLowerInvariant());
            }

            if (Value.HasValue)
            {
                options.Add("value", Value);
            }

            writer.Write(Initializer.Initialize(Selector, "ProgressBar", options));

 	        base.WriteInitializationScript(writer);
        }

        /// <summary>
        /// Writes the ProgressBar HTML.
        /// </summary>
        /// <param name="writer">The writer object.</param>
        protected override void WriteHtml(HtmlTextWriter writer)
        {
            new ProgressBarHtmlBuilder(this)
                    .Build()
                    .WriteTo(writer);

 	         base.WriteHtml(writer);
        }
    }
}
