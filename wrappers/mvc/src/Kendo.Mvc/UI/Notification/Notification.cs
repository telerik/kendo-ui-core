namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using System.Collections.Generic;

    using Kendo.Mvc.UI.Html;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;

    public class Notification : WidgetBase
    {
        public Notification(ViewContext viewContext, IJavaScriptInitializer initializer)
            : base(viewContext, initializer)
        {
            Position = new NotificationPositionSettings();
            Stacking = NotificationStackingSettings.Default;
            HideOnClick = true;
            Button = false;
            AllowHideAfter = 0;
            AutoHideAfter = 5000;
            Templates = new List<NotificationTemplateSettings>();
            Animation = new PopupAnimation();
            Tag = "span";
        }

        public NotificationPositionSettings Position { get; set; }

        public NotificationStackingSettings Stacking { get; set; }

        public bool HideOnClick { get; set; }

        public bool Button { get; set; }

        public int AllowHideAfter { get; set; }

        public int AutoHideAfter { get; set; }

        public string AppendTo { get; set; }

        public string Width { get; set; }

        public string Height { get; set; }

        public IList<NotificationTemplateSettings> Templates { get; set; }

        public PopupAnimation Animation { get; set; }

        public string Tag { get; set; }
        
        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);
            var positionOptions = new Dictionary<string, object>();

            if (Position.Bottom != "20")
            {
                positionOptions.Add("bottom", Position.Bottom);
            }
            if (Position.Right != "20")
            {
                positionOptions.Add("right", Position.Right);
            }
            if (Position.Top.HasValue())
            {
                positionOptions.Add("top", Position.Top);
            }
            if (Position.Left.HasValue())
            {
                positionOptions.Add("left", Position.Left);
            }
            if (!Position.Pinned)
            {
                positionOptions.Add("pinned", Position.Pinned);
            }

            if (positionOptions.Count > 0)
            {
                options.Add("position", positionOptions);
            }

            if (Stacking != NotificationStackingSettings.Default)
            {
                options["stacking"] = Stacking;
            }

            if (!HideOnClick)
            {
                options["hideOnClick"] = HideOnClick;
            }

            if (Button)
            {
                options["button"] = Button;
            }

            if (AllowHideAfter > 0)
            {
                options["allowHideAfter"] = AllowHideAfter;
            }

            if (AutoHideAfter != 5000)
            {
                options["autoHideAfter"] = AutoHideAfter;
            }

            if (AppendTo.HasValue())
            {
                options["appendTo"] = AppendTo;
            }

            if (Width.HasValue())
            {
                options["width"] = Width;
            }

            if (Height.HasValue())
            {
                options["height"] = Height;
            }

            var animation = Animation.ToJson();

            if (animation.Any())
            {
                if (animation["animation"] is bool)
                {
                    options["animation"] = false;
                }
                else
                {
                    options["animation"] = animation["animation"];
                }
            }

            if (Templates.Any())
            {
                options["templates"] = Templates.Select(t => t.Serialize());
            }

            writer.Write(Initializer.Initialize(Selector, "Notification", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var renderer = new NotificationHtmlBuilder(this);

            renderer.NotificationTag().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}