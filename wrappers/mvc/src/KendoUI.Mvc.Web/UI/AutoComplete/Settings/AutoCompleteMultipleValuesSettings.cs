

namespace KendoUI.Mvc.UI
{
    public class AutoCompleteMultipleValuesSettings
    {
        private const string defaultSeparator = ", ";

        public AutoCompleteMultipleValuesSettings()
        {
            Separator = defaultSeparator;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public string Separator
        {
            get;
            set;
        }

        public void SerializeTo(IClientSideObjectWriter writer)
        {
            writer.Append("multiple", Enabled, false);
            if (!Separator.Equals(defaultSeparator)) writer.Append("separator", Separator);
        }
    }
}
