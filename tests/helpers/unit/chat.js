import { STYLES } from '../../../src/chat/constants';

export function createMessages(count, factory) {
    return Array.from({ length: count }, function(_value, index) {
        const message = {
            id: `message-${index + 1}`,
            text: `Message ${index + 1}`,
            authorId: index % 2 === 0 ? "user1" : "user2",
            authorName: index % 2 === 0 ? "User 1" : "User 2",
            timestamp: new Date(2024, 0, index + 1)
        };

        return Object.assign(message, factory ? factory(index) : {});
    });
}

export function createRemoteEndlessDataSource(pageSize, read, options) {
    return new kendo.data.DataSource($.extend(true, {
        transport: {
            read: read
        },
        schema: {
            data: "data",
            total: "total"
        },
        serverPaging: true,
        pageSize: pageSize
    }, options));
}

export function createRemoteRangeResponse(messages, startIndex, endIndex, totalCount) {
    const rangeLength = endIndex - startIndex;
    const data = messages.length === rangeLength ? messages : messages.slice(startIndex, endIndex);

    return {
        data: data,
        total: totalCount === undefined ? Math.max(messages.length, endIndex) : totalCount,
        startIndex: startIndex,
        endIndex: endIndex
    };
}

export function getRenderedMessageUids(chat) {
    return chat.wrapper
        .find("." + STYLES.messageListContent + " ." + STYLES.message)
        .map(function(_index, element) {
            return $(element).attr("data-uid");
        })
        .get();
}

export async function flushEndlessState() {
    await new Promise(function(resolve) {
        setTimeout(resolve, 0);
    });

    await new Promise(function(resolve) {
        requestAnimationFrame(resolve);
    });
}