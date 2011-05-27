using System;
using System.Collections.Generic;
using System.Text;

using ArtOfTest.Common.UnitTesting;
using ArtOfTest.WebAii.Core;
using ArtOfTest.WebAii.Controls.HtmlControls;
using ArtOfTest.WebAii.Controls.HtmlControls.HtmlAsserts;
using ArtOfTest.WebAii.Design;
using ArtOfTest.WebAii.Design.Execution;
using ArtOfTest.WebAii.ObjectModel;
using ArtOfTest.WebAii.Silverlight;
using ArtOfTest.WebAii.Silverlight.UI;
using Telerik.WebAii.Controls.Html;
using Telerik.WebAii.Controls.Xaml;

namespace TestProject2.AeroViewr
{

	//
	// You can add custom execution steps by simply
	// adding a void function and decorating it with the [CodedStep] 
	// attribute to the test method. 
	// Those steps will automatically show up in the test steps on save.
	//
	// The BaseWebAiiTest exposes all key objects that you can use
	// to access the current testcase context. [i.e. ActiveBrowser, Find ..etc]
	//
	// Data driven tests can use the Data[columnIndex] or Data["columnName"] 
	// to access data for a specific data iteration.
	//
	// Example:
	//
	// [CodedStep("MyCustom Step Description")]
	// public void MyCustomStep()
	// {
	//		// Custom code goes here
	//      ActiveBrowser.NavigateTo("http://www.google.com");
	//
	//		// Or
	//		ActiveBrowser.NavigateTo(Data["url"]);
	// }
	//
		

    public class ClickInfoWindow : BaseWebAiiTest
    {
        #region [ Dynamic Pages Reference ]

        private Pages _pages;

        /// <summary>
        /// Gets the Pages object that has references
        /// to all the elements, frames or regions
        /// in this project.
        /// </summary>
		public Pages Pages
		{
			get
			{
				if (_pages == null)
				{
					_pages = new Pages(Manager.Current);
				}
				return _pages;
			}
        }

        #endregion

        //[CodedStep(@"Verify 'InnerText' 'Contains' 'technicolor dreamskies over eagle lake' on 'TechnicolorH2Tag'")]
        //public void ClickInfoWindow_CodedStep()
        //{

        //    // Verify 'InnerText' 'Contains' 'technicolor dreamskies over eagle lake' on 'TechnicolorH2Tag'
        //    Pages.AeroViewr.TechnicolorH2Tag.AssertContent().InnerText(ArtOfTest.Common.StringCompareType.Same, Pages.AeroViewr.TechnicolorSpan.InnerText.ToString());

        //}

        [CodedStep(@"Verify 'InnerText' 'Contains' 'technicolor dreamskies over eagle lake' on 'TechnicolorSpan'")]
        public void ClickInfoWindow_CodedStep1()
        {

            // Verify 'InnerText' 'Contains' 'technicolor dreamskies over eagle lake' on 'TechnicolorSpan'
            
            Pages.AeroViewr.TechnicolorH2Tag.AssertContent().InnerText(ArtOfTest.Common.StringCompareType.Contains, Pages.AeroViewr.TechnicolorSpan.InnerText);
                                    
        }



        //[CodedStep(@"@\store src attribute")]
        //public void ClickInfoWindow_CodedStep()
        //{


        //    // Verify attribute 'src' has 'Contains' value of 'http://farm6.static.flickr.com/5067/5761832100_68a98e89dd.jpg' on 'BigPhotoImage'
        //    //Pages.AeroViewr.BigPhotoImage.AssertAttribute().Value("src", ArtOfTest.Common.StringCompareType.Contains, "http://farm6.static.flickr.com/5067/5761832100_68a98e89dd.jpg");



        //    foreach (iAttribute attr in Pages.AeroViewr.BigPhotoImage.Attributes)
        //    {
        //        if (attr.Name == "src")
        //        {
        //            savedAttr = attr;
        //            break;
        //        }
        //    }





        //}
        
		// Add your test methods here...
    }
}
