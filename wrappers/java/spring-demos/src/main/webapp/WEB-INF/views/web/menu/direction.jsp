<%@page import="java.util.ArrayList"%>
<%@page import="com.kendoui.spring.models.DropDownListItem"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<form method="post">
    <div class="configuration k-widget k-header">
        <span class="configHead">Direction Settings</span>
        <ul class="options">
            <li>
                <label for="direction">direction:</label>
                <kendo:dropDownList name="direction" value="${direction}">
                    <kendo:dataSource data="${directions}"></kendo:dataSource>
                </kendo:dropDownList>
            </li>
        </ul>
        <button class="k-button">Apply</button>
    </div>
</form>

<kendo:menu name="menu" direction="${direction}">
    <kendo:menu-items>
        <kendo:menu-item text="Mens">
            <kendo:menu-items>
                <kendo:menu-item text="Footwear">
                    <kendo:menu-items>
                        <kendo:menu-item text="Leisure Trainers"></kendo:menu-item>
                        <kendo:menu-item text="Running Shoes"></kendo:menu-item>
                        <kendo:menu-item text="Outdoor Footwear"></kendo:menu-item>
                        <kendo:menu-item text="Sandals/Flip Flops"></kendo:menu-item>
                        <kendo:menu-item text="Footwear Accessories"></kendo:menu-item>
                    </kendo:menu-items>
                </kendo:menu-item>
                <kendo:menu-item text="Leisure Clothing">
                    <kendo:menu-items>
                        <kendo:menu-item text="T-Shirts"></kendo:menu-item>
                        <kendo:menu-item text="Hoodies & Sweatshirts"></kendo:menu-item>
                        <kendo:menu-item text="Jackets"></kendo:menu-item>
                        <kendo:menu-item text="Pants"></kendo:menu-item>
                        <kendo:menu-item text="Shorts"></kendo:menu-item>
                    </kendo:menu-items>
                </kendo:menu-item>               
                <kendo:menu-item text="Sports Clothing">
                    <kendo:menu-items>
                        <kendo:menu-item text="Football"></kendo:menu-item>
                        <kendo:menu-item text="Basketball"></kendo:menu-item>
                        <kendo:menu-item text="Golf"></kendo:menu-item>
                        <kendo:menu-item text="Tennis"></kendo:menu-item>
                        <kendo:menu-item text="Swimwear"></kendo:menu-item>
                    </kendo:menu-items>
                </kendo:menu-item>
                <kendo:menu-item text="Accessories"></kendo:menu-item>
            </kendo:menu-items>        
        </kendo:menu-item>
        <kendo:menu-item text="Womens">
            <kendo:menu-items>
                <kendo:menu-item text="Footwear">
                    <kendo:menu-items>
                        <kendo:menu-item text="Leisure Trainers"></kendo:menu-item>
                        <kendo:menu-item text="Running Shoes"></kendo:menu-item>
                        <kendo:menu-item text="Outdoor Footwear"></kendo:menu-item>
                        <kendo:menu-item text="Sandals/Flip Flops"></kendo:menu-item>
                        <kendo:menu-item text="Footwear Accessories"></kendo:menu-item>
                    </kendo:menu-items>
                </kendo:menu-item>
                <kendo:menu-item text="Leisure Clothing">
                    <kendo:menu-items>
                        <kendo:menu-item text="T-Shirts"></kendo:menu-item>
                        <kendo:menu-item text="Jackets"></kendo:menu-item>
                    </kendo:menu-items>
                </kendo:menu-item>               
                <kendo:menu-item text="Sports Clothing">
                    <kendo:menu-items>
                        <kendo:menu-item text="Basketball"></kendo:menu-item>
                        <kendo:menu-item text="Golf"></kendo:menu-item>
                        <kendo:menu-item text="Tennis"></kendo:menu-item>
                        <kendo:menu-item text="Swimwear"></kendo:menu-item>
                    </kendo:menu-items>
                </kendo:menu-item>
                <kendo:menu-item text="Accessories"></kendo:menu-item>
            </kendo:menu-items>  
        </kendo:menu-item>
        <kendo:menu-item text="Boys">
            <kendo:menu-items>
                <kendo:menu-item text="Footwear">
                    <kendo:menu-items>
                        <kendo:menu-item text="Leisure Trainers"></kendo:menu-item>
                        <kendo:menu-item text="Running Shoes"></kendo:menu-item>
                        <kendo:menu-item text="Outdoor Footwear"></kendo:menu-item>
                        <kendo:menu-item text="Sandals/Flip Flops"></kendo:menu-item>
                        <kendo:menu-item text="Footwear Accessories"></kendo:menu-item>
                    </kendo:menu-items>
                </kendo:menu-item>
                <kendo:menu-item text="Leisure Clothing">
                    <kendo:menu-items>
                        <kendo:menu-item text="T-Shirts"></kendo:menu-item>
                        <kendo:menu-item text="Hoodies & Sweatshirts"></kendo:menu-item>
                        <kendo:menu-item text="Jackets"></kendo:menu-item>
                        <kendo:menu-item text="Pants"></kendo:menu-item>
                        <kendo:menu-item text="Shorts"></kendo:menu-item>
                    </kendo:menu-items>
                </kendo:menu-item>               
                <kendo:menu-item text="Sports Clothing">
                    <kendo:menu-items>
                        <kendo:menu-item text="Football"></kendo:menu-item>
                        <kendo:menu-item text="Basketball"></kendo:menu-item>
                        <kendo:menu-item text="Golf"></kendo:menu-item>
                        <kendo:menu-item text="Tennis"></kendo:menu-item>
                        <kendo:menu-item text="Swimwear"></kendo:menu-item>
                    </kendo:menu-items>
                </kendo:menu-item>
                <kendo:menu-item text="Accessories"></kendo:menu-item>
            </kendo:menu-items>  
        </kendo:menu-item>
        <kendo:menu-item text="Girls">
            <kendo:menu-items>
                <kendo:menu-item text="Footwear">
                    <kendo:menu-items>
                        <kendo:menu-item text="Leisure Trainers"></kendo:menu-item>
                        <kendo:menu-item text="Running Shoes"></kendo:menu-item>
                        <kendo:menu-item text="Outdoor Footwear"></kendo:menu-item>
                        <kendo:menu-item text="Sandals/Flip Flops"></kendo:menu-item>
                        <kendo:menu-item text="Footwear Accessories"></kendo:menu-item>
                    </kendo:menu-items>
                </kendo:menu-item>
                <kendo:menu-item text="Leisure Clothing">
                    <kendo:menu-items>
                        <kendo:menu-item text="T-Shirts"></kendo:menu-item>
                        <kendo:menu-item text="Hoodies & Sweatshirts"></kendo:menu-item>
                        <kendo:menu-item text="Jackets"></kendo:menu-item>
                        <kendo:menu-item text="Pants"></kendo:menu-item>
                        <kendo:menu-item text="Shorts"></kendo:menu-item>
                    </kendo:menu-items>
                </kendo:menu-item>               
                <kendo:menu-item text="Sports Clothing">
                    <kendo:menu-items>
                        <kendo:menu-item text="Basketball"></kendo:menu-item>
                        <kendo:menu-item text="Tennis"></kendo:menu-item>
                        <kendo:menu-item text="Swimwear"></kendo:menu-item>
                    </kendo:menu-items>
                </kendo:menu-item>
                <kendo:menu-item text="Accessories"></kendo:menu-item>
            </kendo:menu-items>  
        </kendo:menu-item>
        <kendo:menu-item text="Footwear">
            <kendo:menu-items>
                <kendo:menu-item text="Mens"></kendo:menu-item>
                <kendo:menu-item text="Womens"></kendo:menu-item>
                <kendo:menu-item text="Juniors"></kendo:menu-item>
                <kendo:menu-item text="Childrens"></kendo:menu-item>
            </kendo:menu-items>
        </kendo:menu-item>
    </kendo:menu-items>
</kendo:menu>
<style>
    #menu
    {
        margin-right: 220px;
    }
</style>
<demo:footer />