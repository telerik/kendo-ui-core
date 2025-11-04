---
title: Avatar
page_title: Configuration of Kendo UI Avatar
description: How to initialize an Avatar UI widget and configure its properties.
res_type: api
---

# kendo.ui.Avatar

Represents the Kendo UI Avatar widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### alt `String`

A text description of the Avatar image. When `type="image"` is configured this value will be used to populate the `alt` attribute of the `<img>` element.


<div class="meta-api-description">
How do I set an alt description for Kendo UI avatar images? Set or customize the alternative text description for user profile pictures or avatar images to enhance accessibility, support screen readers, improve semantic labeling, and boost SEO by defining descriptive alt attributes on rendered image elements. Enable meaningful textual representation of avatar photos, icons, or user images to assist visually impaired users and provide clear context in various assistive technologies or search indexing scenarios. Control, define, or update the alt text for image-based avatars to ensure proper accessibility compliance and descriptive annotation of profile imagery.
</div>

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            type: "image",
            image: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            alt: "John Doe"
        });
    </script>

### border `Boolean` *(default: false)*

Specifies whether the avatar should render border around its container element. Default is `false`.


<div class="meta-api-description">
How do I show or hide a border around a user's avatar image in Kendo UI for jQuery? Control the visibility of a border or frame around a user avatar image, enabling or disabling a surrounding outline to create a defined edge or highlight. Configure whether the avatar displays a visible border ring or none, toggling the outline effect to emphasize, highlight, or separate the avatar from backgrounds. Set, enable, or disable a border/frame around profile pictures, user icons, or avatar containers to customize appearance, including options for framed or borderless avatar presentation in UI components.
</div>

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "IG",
            border: true,
            fill: "outline"
        });
    </script>

### className `String`

Adds additional custom classes to the Avatar container element.


<div class="meta-api-description">
How do I add custom CSS classes to a Kendo UI avatar element? Customize or override the styling of the avatar container by adding one or multiple CSS classes, enabling developers to set custom styles, apply themes, adjust appearance, or target the avatar element for testing and DOM manipulation. This feature supports configuring and controlling the visual presentation through additional class names, making it easy to implement style tweaks, CSS overrides, and selectors for automated testing or precise customization of the root avatar element.
</div>

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "IG",
            className: "custom this"
        });
    </script>

### fillMode `String` *(default: 'solid')*

Specifies the appearance fill style of the Avatar. The available values are `"outline"`, `"solid"` (default), and `"none"`.


<div class="meta-api-description">
How do I control the appearance of an avatar in Kendo UI for jQuery? control avatar appearance by setting fill style to outline for border-only visuals, solid for a fully colored background, or none for transparent fill; customize avatar fill mode to switch between hollow, filled, or empty backgrounds, enabling different visual emphasis on profile images or icons; adjust avatar rendering fill options to change how the avatar's interior is displayed, suitable for diverse UI themes or design preferences; configure avatar background fill behavior to toggle between visible borders, solid colors, or no fill effect to match styling needs or theme integration.
</div>

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "IG",
            border: true,
            fillMode: "outline"
        });
    </script>

### icon `String`

Specifies an icon name to be used if the avatar `type` is set to `icon`. For a list of available icon names, please refer to the [Web Font Icons article](/styles-and-layout/icons-web).


<div class="meta-api-description">
How do I set an icon inside a Kendo UI avatar using its glyph, symbol, or character? Specify or set the icon glyph, symbol, or character to display inside an avatar or user icon by naming the font icon or web font icon identifier; customize or control which icon or icon font appears when using icon-based avatars, enable or configure specific font-based glyphs inside avatar placeholders, provide the icon name string or font icon reference to render symbols, pictograms, or font icons within avatar components or user profiles.
</div>

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            type: "icon",
            icon: "file-config"
        });
    </script>

### image `String`

Specifies an image URL or dataURL that would be used to populate the `src` attribute of the avatar `<img>` element.


<div class="meta-api-description">
How do I dynamically set an image URL for the Kendo UI Avatar component? Configure or bind the avatar profile picture by specifying an image URL, base64 dataURL, or inline image source to dynamically display user photos or icons within the avatar element. Enable setting or updating the avatar’s picture from remote hosts or embedded image data, controlling the image source for user profiles, account icons, or identity representations in your application interface. Support various image formats and sources by linking or assigning URLs, data strings, or encoded images to render personalized avatar visuals seamlessly.
</div>

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            type: "image",
            image: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            alt: "John Doe"
        });
    </script>

### rounded `String` *(default: 'full')*

Could be one of the predefined shapes available for the widget container: `"full"` (default), `"small"`, `"medium"`, `"large"`, or `"none"`.


<div class="meta-api-description">
How do I control the shape of an avatar in Kendo UI for jQuery? Adjust or configure the avatar’s shape and corner radius by controlling how rounded or squared the avatar container appears, enabling settings for fully circular, slightly rounded, moderately rounded, heavily rounded, or sharp square styles. This property lets you set or customize avatar geometry with options ranging from no rounding and different degrees of corner curves to fully round circular avatars, supporting variations in profile picture display, user interface design preferences, avatar border styling, and shape control for consistent or unique visual identity.
</div>

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "IG",
            rounded: "medium"
        });
    </script>

### size `String` *(default: 'medium')*

The Avatar allows you to set predefined sizes. The available size values are `"small"`, `"medium"` (default), `"large"`, or `"none"`.


<div class="meta-api-description">
How to set display dimensions for Kendo UI Avatar using size property? Control and configure the avatar's display dimensions by setting its scale, adjusting predefined size options such as small, medium, large, or disabling the avatar visibility with none. Enable quick, consistent avatar sizing for user profile pictures, icons, or placeholders by selecting from standard dimension presets to maintain uniform UI appearance and responsive design. Customize avatar scaling, resize the user image, and manage visual footprint within interfaces for streamlined, adaptive presentation of graphical identity elements.
</div>

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "IG",
            size: "large"
        });
    </script>

### style `Object`

Sets additional CSS styles to the Avatar container element.


<div class="meta-api-description">
How can I customize the appearance of the Kendo UI Avatar container using inline CSS styles? Control and customize the visual appearance, design, and layout by applying inline CSS styles, enabling adjustment of spacing, borders, colors, margins, padding, background, and overall formatting on the avatar container element. Configure, override, or extend default component styles to match branding, themes, user interface requirements, or unique appearance preferences, allowing flexible styling, custom layouts, and precise visual tweaks directly through CSS properties embedded in the avatar’s outer wrapper.
</div>

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "MG",
            style: {
                "background-color": "red"
            }
        });
    </script>

### text `String`

Will be used to populated Avatar content when its type is set to `text`


<div class="meta-api-description">
How do I dynamically update the text inside a Kendo UI avatar widget? Configure or update the string label displayed inside an avatar when using text-based avatars, allowing dynamic control over the visible characters or initials shown, supporting programmatic changes, data binding, and customization of the avatar’s text content for user icons, profile placeholders, or identity representation in UI components.
</div>

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "MG"
        });
    </script>


### themeColor `String` *(default: 'primary')*

The Avatar allows you to specify predefined theme colors for background of its container. The available `themeColor` values are:
    - "primary" (Default) - Applies coloring based on primary theme color.
    - "base" - Applies base theme color.
    - "secondary" - Applies coloring based on secondary theme color.
    - "tertiary" - Applies coloring based on tertiary theme color.
    - "inherit" - Applies inherited coloring value.
    - "info" - Applies coloring based on info theme color.
    - "success" - Applies coloring based on success theme color.
    - "warning" - Applies coloring based on warning theme color.
    - "error" - Applies coloring based on error theme color.
    - "dark" - Applies coloring based on dark theme color.
    - "light" - Applies coloring based on light theme color.
    - "inverse" - Applies coloring based on inverted theme color.
    - "none" - Does not apply theme color class.


<div class="meta-api-description">
How do I customize the background color of an avatar in Kendo UI? Set or customize the background color of avatar containers by selecting from a variety of predefined theme color options such as primary, base, secondary, tertiary, info, success, warning, error, dark, light, inverse, or none. Control the visual style, adjust theme CSS classes, inherit colors from parent elements, enable different intents like alerts or statuses, and configure the avatar appearance to match branding or UI themes by applying or disabling specific color themes. This includes options to inherit colors automatically, disable theme-based coloring, or emphasize semantic states, allowing developers to tailor avatar visuals flexibly through theme color settings.
</div>

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "IG",
            themeColor: "warning"
        });
    </script>

### type `String` *(default: 'text')*

Could be one of the three predefined types for the widget: `icon`, `image`, or `text` (default).


<div class="meta-api-description">
How do I change the display mode of an avatar in Kendo UI for jQuery? Configure the avatar display mode to control how user representation appears, choosing between showing an icon symbol, rendering a profile image or photo, or displaying text such as initials or characters. Enable switching between visual types like image-based avatars, icon placeholders, or textual initials for user profiles, identity badges, or UI elements that require flexible avatar content rendering. Adjust avatar rendering behavior to show graphical icons, personalized pictures, or alphanumeric initials depending on context, user data, or design preferences to customize user representation and interface appearance.
</div>

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            type: "image",
            image: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            alt: "John Doe"
        });
    </script>
