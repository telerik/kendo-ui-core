namespace KendoUI.Mvc.UI
{
    using System;
    using System.Globalization;

    public class ToggleEffect : IEffect
    {
        public string Name
        {
            get
            {
                return "toggle";
            }
        }

        public string Serialize()
        {
            return String.Format(CultureInfo.CurrentCulture, "{{name:'{0}'}}", Name);
        }
    }
}