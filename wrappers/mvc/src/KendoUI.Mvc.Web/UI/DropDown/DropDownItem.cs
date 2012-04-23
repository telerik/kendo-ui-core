

namespace KendoUI.Mvc.UI
{    
    using System.Web.Script.Serialization;

    /// <summary>
    /// Represent item in the DropDownList/ComboBox items.
    /// </summary>
    public class DropDownItem
    {
        public string Text { get; set; }
        public string Value { get; set; }
        [ScriptIgnore]
        public bool Selected { get; set; }
    }
}
