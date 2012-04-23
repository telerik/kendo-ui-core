

namespace KendoUI.Mvc.UI
{
    using System;

    [Flags]
    public enum GridPagerStyles
    {
		/// <summary>The pager will display only a status message</summary>
		Status = 0,

        /// <summary>The pager will display first/previous/next/last links</summary>
        NextPrevious = 0x01,
        
        /// <summary>The pager will display page numbers as link buttons.</summary>
        Numeric = 0x02,
        
        /// <summary>The pager will display an input field and the total number of pages.</summary>
        PageInput = 0x04,

        /// <summary>The pager will display a dropdown and the total number of pages.</summary>
        PageSizeDropDown = 1 << 4,

        /// <summary>(first) (previous) (page numbers) (next) (last)</summary>
        NextPreviousAndNumeric = NextPrevious | Numeric,
        
        /// <summary>(first) (previous) (page input field) (next) (last)</summary>
        NextPreviousAndInput = NextPrevious | PageInput,

        /// <summary>(first) (previous) (page size drop down) (next) (last)</summary>
        NextPreviousAndDropDown = NextPrevious | PageSizeDropDown
    }
}