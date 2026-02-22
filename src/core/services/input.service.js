/**
 * Input Service Implementation
 * Provides utilities for input element manipulation.
 
 */
export class InputService {
    constructor($, supportService) {
        this.$ = $;
        this.supportService = supportService;
    }
    /**
     * Get or set the caret (text cursor) position in an input element.
     */
    caret(element, start, end) {
        let rangeElement;
        const isPosition = start !== undefined;
        if (end === undefined) {
            end = start;
        }
        // Unwrap jQuery element
        if (element[0]) {
            element = element[0];
        }
        const inputElement = element;
        if (isPosition && inputElement.disabled) {
            return [];
        }
        try {
            if (inputElement.selectionStart !== undefined) {
                if (isPosition) {
                    inputElement.focus();
                    const mobile = this.supportService.mobileOS;
                    if (mobile && (mobile.wp || mobile.android)) {
                        // Without the timeout the caret is at the end of the input
                        setTimeout(() => {
                            inputElement.setSelectionRange(start, end);
                        }, 0);
                    }
                    else {
                        inputElement.setSelectionRange(start, end);
                    }
                    return [start, end];
                }
                else {
                    return [inputElement.selectionStart, inputElement.selectionEnd];
                }
            }
            else if (document.selection) {
                // Legacy IE support
                if (this.$(inputElement).is(":visible")) {
                    inputElement.focus();
                }
                rangeElement = inputElement.createTextRange();
                if (isPosition) {
                    rangeElement.collapse(true);
                    rangeElement.moveStart("character", start);
                    rangeElement.moveEnd("character", end - start);
                    rangeElement.select();
                    return [start, end];
                }
                else {
                    const rangeDuplicated = rangeElement.duplicate();
                    let selectionStart;
                    let selectionEnd;
                    rangeElement.moveToBookmark(document.selection.createRange().getBookmark());
                    rangeDuplicated.setEndPoint("EndToStart", rangeElement);
                    selectionStart = rangeDuplicated.text.length;
                    selectionEnd = selectionStart + rangeElement.text.length;
                    return [selectionStart, selectionEnd];
                }
            }
        }
        catch (e) {
            // Element is not focused or it is not in the DOM
            return [];
        }
        return [];
    }
    /**
     * Get anti-forgery (CSRF) tokens from the page.
     */
    antiForgeryTokens() {
        const tokens = {};
        const $ = this.$;
        const csrfToken = $("meta[name=csrf-token],meta[name=_csrf]").attr("content");
        const csrfParam = $("meta[name=csrf-param],meta[name=_csrf_header]").attr("content");
        $("input[name^='__RequestVerificationToken']").each(function () {
            tokens[this.name] = this.value;
        });
        if (csrfParam !== undefined && csrfToken !== undefined) {
            tokens[csrfParam] = csrfToken;
        }
        return tokens;
    }
}
