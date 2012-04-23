

namespace KendoUI.Mvc.UI
{
    using System;
    using System.Globalization;

    public class ZoomAnimation : IEffect, IAnimation
    {
        public ZoomAnimation()
        {
            OpenDuration = (int) AnimationDuration.Fast;
            CloseDuration = (int) AnimationDuration.Fast;
        }

        public string Name
        {
            get
            {
                return "zoom";
            }
        }

        public int OpenDuration
        {
            get;
            set;
        }

        public int CloseDuration
        {
            get;
            set;
        }

        public string Serialize()
        {
            return String.Format(CultureInfo.CurrentCulture, "{{name:'{0}'}}", Name);
        }
    }
}