using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

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

namespace KendoDemosTests.UIWidgets.Menu.BasicUsage
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
		

    public class OpenClose : BaseWebAiiTest
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

        




        [CodedStep(@"Wait for ExistsNot 'SubItem4Span'")]
        public void OpenClose_CodedStep2()
        {

            // Wait for ExistsNot 'ViewCodeLink0'
            
            Pages.BasicUsage2.Get<ArtOfTest.WebAii.Controls.HtmlControls.HtmlAnchor>(new ArtOfTest.WebAii.Core.HtmlFindExpression("id=menu", "|", "TagName=li", "class=t-item t-state-default t-first", "|", "TagName=div", "style=~visible"), false, 0).Wait.ForExistsNot(10000);
            
        }

        [CodedStep(@"@\Wait for Exists 'FirstItemSpan'")]
        public void OpenClose_CodedStep1()
        {


            // Wait for Exists 'FirstItemSpan'
            Pages.BasicUsage2.Div.Wait.ForExists(10000);



        }






        //[CodedStep(@"@\Wait for ExistsNot 'ExampleDiv0'")]
        //public void OpenClose_CodedStep2()
        //{


        //    // Wait for ExistsNot 'ExampleDiv0'
        //    Pages.BasicUsage2.Get<ArtOfTest.WebAii.Controls.HtmlControls.HtmlDiv>(new ArtOfTest.WebAii.Core.HtmlFindExpression("id=menu", "|TagName=li", "class=t-item t-state-default t-first", "|TagName=div", "style=~visible"), false, 0).Wait.ForExistsNot(10000);



        //}

        //[CodedStep(@"@\Wait for ExistsNot 'ExampleDiv0'")]
        //public void OpenClose_CodedStep2()
        //{


        //    // Wait for ExistsNot 'ExampleDiv0'
        //    Pages.BasicUsage2.Get<ArtOfTest.WebAii.Controls.HtmlControls.HtmlDiv>(new ArtOfTest.WebAii.Core.HtmlFindExpression("id=menu", "|TagName=li", "class=t-item t-state-default t-first", "|TagName=div", "style=~visible"), false, 0).Wait.ForExistsNot(10000);



        //}



        //[CodedStep(@"Verify element 'TemplatedItemSpan' 'is not' visible.")]
        //public void OpenClose_CodedStep2()
        //{

        //    // Verify element 'TemplatedItemSpan' 'is not' visible.
        //    HtmlSpan SubItem4Span = Pages.BasicUsage2.SubItem4Span;
        //    SubItem4Span.Wait.ForExists(10000);
        //    Assert.IsFalse(SubItem4Span.IsVisible());

        //}

        //[CodedStep(@"Wait for ExistsNot 'FirstItemSpan'")]
        //public void OpenClose_CodedStep()
        //{

        //    // Wait for ExistsNot 'FirstItemSpan'
        //    Pages.BasicUsage2.Get<ArtOfTest.WebAii.Controls.HtmlControls.HtmlSpan>(new ArtOfTest.WebAii.Core.HtmlFindExpression("tagname=span", "TextContent=First Item"), false, 0).Wait.ForExistsNot(10000);

        //}

        //[CodedStep(@"@\Wait for Exists 'FirstItemSpan'")]
        //public void OpenClose_CodedStep()
        //{


        //    // Wait for Exists 'FirstItemSpan'
        //    Pages.BasicUsage2.Div.Refresh();
        //    Pages.BasicUsage2.Div.Wait.ForExistsNot(10000);



        //}

        //[CodedStep(@"Verify element 'SubItem4Span' 'is' visible.")]
        //public void OpenClose_CodedStep()
        //{

        //    // Verify element 'FirstItemSpan' 'is' visible.
        //    HtmlSpan SubItem4Span = Pages.BasicUsage2.SubItem4Span;
        //    SubItem4Span.Wait.ForExists(10000);
        //    Assert.IsTrue(SubItem4Span.IsVisible());

        //}

        //[CodedStep(@"Wait for element 'ExampleDiv' 'is' visible.")]
        //public void OpenClose_CodedStep2()
        //{

        //    // Wait for element 'ExampleDiv' 'is' visible.
        //    Pages.BasicUsage2.SubItem4Span.Wait.ForVisible();

        //}

        //[CodedStep(@"Verify element 'ExampleDiv' 'is' visible.")]
        //public void OpenClose_CodedStep1()
        //{

        //    // Verify element 'ExampleDiv' 'is' visible.
        //    HtmlDiv Div = Pages.BasicUsage2.Div;
        //    Div.Wait.ForExists(10000);
        //    Assert.IsTrue(Div.IsVisible());

        //}



        //[CodedStep(@"Verify element 'ExampleDiv' 'is' visible.")]
        //public void OpenClose_CodedStep1()
        //{

        //    // Verify element 'ExampleDiv' 'is' visible.
        //    HtmlDiv ExampleDiv = Pages.BasicUsage2.ListItem;
        //    ExampleDiv.Wait.ForExists(10000);
        //    Assert.IsTrue(ExampleDiv.IsVisible());

        //}

//        [CodedStep(@"Invoke 'OnMouseOver' event on 'FirstItemSpan'")]
//        public void OpenClose_CodedStep()
//        {

//// Invoke 'OnMouseOver' event on 'FirstItemSpan'
//Pages.BasicUsage2.FirstItemSpan.InvokeEvent(ArtOfTest.WebAii.Core.ScriptEventType.OnMouseOver);

//        }
        
		// Add your test methods here...
    }
}
