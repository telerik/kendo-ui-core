---
title: Number Formatting
page_title: Number Formatting | Kendo UI Framework Globalization documentation
description: Use number formatting methods to convert a Number object to a human readable string using culture's specific settings.
---

# Number Formatting

The purpose of number formatting is to convert a Number object to a human readable string using culture's specific settings. [kendo.format](/api/framework/kendo#format) and [kendo.toString](/api/framework/kendo#tostring) methods support standard and custom numeric formats:

## Standard numeric formats

- *n* for number

        kendo.culture("en-US");
        kendo.toString(1234.567, "n"); //1,234.57

        kendo.toString(10.12, "n5"); //10.12000
        kendo.toString(10.12, "n0"); //10

        kendo.culture("de-DE");
        kendo.toString(1234.567, "n3"); //1.234,567

- *c* for currency

        kendo.culture("en-US");
        kendo.toString(1234.567, "c"); //$1,234.57

        kendo.culture("en-US");
        kendo.toString(1234.567, "c0"); //$1,235

        kendo.culture("de-DE");
        kendo.toString(1234.567, "c3"); //1.234,567 €

- *p* for percentage (number is multiplied by 100)

        kendo.culture("en-US");
        kendo.toString(0.222, "p"); //22.20 %

        kendo.culture("en-US");
        kendo.toString(0.222, "p0"); //22 %

        kendo.culture("de-DE");
        kendo.toString(0.22, "p3"); //22.000 %

- *e* for exponential

       kendo.toString(0.122, "e"); //1.22e-1
       kendo.toString(0.122, "e4"); //1.2200e-1

## Custom numeric formats

You can create custom numeric format string using one or more custom numeric specifiers. Custom numeric format string is any tha is not a standard numeric format.

Here is a list of the supported format specifiers:

- "0" - zero placeholder

    Replaces the zero with the corresponding digit if one is present; otherwise, zero appears in the result string - `kendo.toString(1234.5678, "00000")` -> 01235.

- "#" - digit placeholder

    Replaces the pound sign with the corresponding digit if one is present; otherwise, no digit appears in the result string - `kendo.toString(1234.5678, "#####")` -> 1235.

    **Note**: "#" specifier cannot be used to format a number as telephone number, i.e. (###)-###-####

- "." - decimal placeholder

    Determines the location of the decimal separator in the result string - `kendo.toString(0.45678, "0.00")` -> 0.46 (en-us).

- "," - group separator placeholder

    Insert localized group separator between each group - `kendo.toString(12345678, "##,#")` -> 12,345,678(en-us).

- "%" - percentage placeholder

    Multiplies a number by 100 and inserts a localized percentage symbol in the result string.

    **Note**: '%' symbol is interpreted as a format specifier in the format string. If you need to prevent this, you will need to precede the '%' symbol with a double backslash - 'kendo.toString(12, "# \\\%")' -> 12 % (en-us).

- "$" - currency placeholder

    Specifies that the number should be formatted using the currency culture settings. The "$" symbol is replaced with the localized currency symbol.

    **Note**: '$' symbol is interpreted as a format specifier in the format string. If you need to prevent this, you will need to precede the '$' symbol with a double backslash - 'kendo.toString(12, "# \\\$")' -> 12 $ (en-us).

- "e" - exponential notation

    `kendo.toString(0.45678, "e0")` -> 5e-1

- ";" - section separator

    Defines sections wih separate format strings for positive, negative, and zero numbers.

- "string"/'string' - Literal string delimiter

    Indicates that the enclosed characters should be copied to the result string.
