import '@progress/kendo-ui/src/kendo.core.js';
import { renderAttr, renderAttrs, applyAttrs, isSafeAttributeName, sanitizeAttributeValue } from '@progress/kendo-ui/src/utils/html-attributes.js';

describe("html encode", function() {

    it("replace < with &lt;", function() {
        assert.equal(kendo.htmlEncode("<<"), "&lt;&lt;");
    });

    it("replace > with &gt;", function() {
        assert.equal(kendo.htmlEncode(">>"), "&gt;&gt;");
    });

    it("replace & with &amp;", function() {
        assert.equal(kendo.htmlEncode("&&"), "&amp;&amp;");
    });

    it('replace " with &quot;', function() {
        assert.equal(kendo.htmlEncode('""'), "&quot;&quot;");
    });

    it("replace ' with &#39;", function() {
        assert.equal(kendo.htmlEncode("''"), "&#39;&#39;");
    });
});

describe("renderAttr", function() {

    it("encodes values and omits nullish attributes", function() {
        assert.equal(renderAttr("title", `"<&'`), ' title="&quot;&lt;&amp;&#39;" ');
        assert.equal(renderAttr("title", null), "");
        assert.equal(renderAttr("title", undefined), "");
    });

    it("rejects attribute names that can break out of a tag", function() {
        assert.equal(renderAttr('title" onerror="alert(1)', "value"), "");
    });

    it("preserves configured inline event handlers and rejects srcdoc", function() {
        assert.equal(renderAttr("onclick", "alert(1)"), ' onclick="alert(1)" ');
        assert.equal(renderAttr("OnError", 'alert("<&")'), ' OnError="alert(&quot;&lt;&amp;&quot;)" ');
        assert.equal(renderAttr("srcdoc", "<script></script>"), "");
    });

    it("sanitizes url attributes", function() {
        assert.equal(renderAttr("href", "https://example.com/a b"), ' href="https://example.com/a%20b" ');
        assert.equal(renderAttr("href", "javascript:alert(1)"), ' href="#INVALIDLINK" ');
        assert.equal(renderAttr("src", "javascript:alert(1)"), ' src="#INVALIDLINK" ');
        assert.equal(renderAttr("src", "https://example.com/a.png"), ' src="https://example.com/a.png" ');
    });

    it("allows a custom value encoder", function() {
        assert.equal(renderAttr("title", "a", (value) => value + "b"), ' title="ab" ');
    });
});

describe("renderAttrs", function() {

    it("preserves configured event handlers while encoding values and omitting invalid attributes", function() {
        const result = renderAttrs({ title: "a", onclick: "alert(1)", "data-x": "<", empty: null, srcdoc: "<p></p>", "a b": "value" });

        assert.equal(result, ' title="a"  onclick="alert(1)"  data-x="&lt;" ');
    });

    it("skips attributes matched by the skip callback", function() {
        const result = renderAttrs({ title: "a", role: "b" }, (name) => name === "role");

        assert.equal(result, ' title="a" ');
    });
});

describe("applyAttrs", function() {

    it("preserves configured event handlers while sanitizing URL and markup attributes through the DOM", function() {
        const element = applyAttrs($("<a></a>"), {
            title: "<b>",
            href: "javascript:alert(1)",
            onclick: "alert(1)",
            srcdoc: "<p></p>",
            "data-null": null
        });

        assert.equal(element.attr("title"), "<b>");
        assert.equal(element.attr("href"), "#INVALIDLINK");
        assert.equal(element.attr("onclick"), "alert(1)");
        assert.isUndefined(element.attr("srcdoc"));
        assert.isUndefined(element.attr("data-null"));
    });

    it("sanitizes the resolved value of function-valued url attributes", function() {
        const hrefFn = () => "javascript:alert(1)";
        const element = applyAttrs($("<a></a>"), { href: hrefFn });

        assert.equal(element.attr("href"), "#INVALIDLINK");
    });

    it("invokes function url attribute values that resolve to safe urls", function() {
        const hrefFn = () => "https://example.com/path";
        const element = applyAttrs($("<a></a>"), { href: hrefFn });

        assert.equal(element.attr("href"), "https://example.com/path");
    });
});

describe("isSafeAttributeName", function() {

    it("accepts regular names and rejects unsafe ones", function() {
        assert.isTrue(isSafeAttributeName("data-foo"));
        assert.isTrue(isSafeAttributeName("xlink:href"));
        assert.isTrue(isSafeAttributeName("on-click"));
        assert.isTrue(isSafeAttributeName("onclick"));
        assert.isTrue(isSafeAttributeName("OnError"));
        assert.isFalse(isSafeAttributeName("srcdoc"));
        assert.isFalse(isSafeAttributeName("SRCDOC"));
        assert.isFalse(isSafeAttributeName("a b"));
        assert.isFalse(isSafeAttributeName(""));
        assert.isFalse(isSafeAttributeName(null));
    });
});

describe("sanitizeAttributeValue", function() {

    ["mailto:user@example.com", "tel:+1234567890", "sms:+1234567890", "xmpp:user@example.com", "matrix:u/user:example.com", "callto:user"].forEach(function(url) {
        it("preserves the link URL " + url, function() {
            assert.equal(sanitizeAttributeValue("href", url), url);
            assert.equal(sanitizeAttributeValue("href", url, false), url);
            assert.equal(sanitizeAttributeValue("src", url), "#INVALIDLINK");
        });
    });

    ["cid:logo@example.com", "blob:https://example.com/123", "data:image/svg+xml,%3Csvg%3E%3C/svg%3E", "data:text/html,%3Cp%3Eimage%3C/p%3E", "data:;base64,AAAA"].forEach(function(url) {
        it("preserves the image URL " + url + " only in image attributes", function() {
            assert.equal(sanitizeAttributeValue("src", url), url);
            assert.equal(sanitizeAttributeValue("src", url, false), url);
            assert.equal(sanitizeAttributeValue("href", url), "#INVALIDLINK");
            assert.equal(sanitizeAttributeValue("href", url, false), "#INVALIDLINK");
        });
    });

    it("returns the raw value for valid urls when encoding is disabled", function() {
        assert.equal(sanitizeAttributeValue("href", "https://example.com/?a=1&b=2", false), "https://example.com/?a=1&b=2");
        assert.equal(sanitizeAttributeValue("href", "javascript:alert(1)", false), "#INVALIDLINK");
        assert.equal(sanitizeAttributeValue("title", "<b>", false), "<b>");
    });

    it("encodes non-url values by default", function() {
        assert.equal(sanitizeAttributeValue("title", "<b>"), "&lt;b&gt;");
    });
});
