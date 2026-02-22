const defaultCommands = [
                    {
                        id: "rewrite",
                        text: "Rewrite",
                        icon: "arrow-rotate-cw",
                        prompt: (selection) => `Rewrite the selected text while preserving its original meaning and intent.

                                Selected Text:
                                ${selection}`
                    },
                    {
                        id: "fix-spelling",
                        text: "Fix spelling",
                        icon: "spell-checker",
                        prompt: (selection) => `Correct any spelling, grammar, or punctuation mistakes in the selected text while preserving its original meaning and intent.

                                Selected Text:
                                ${selection}`
                    },
                    {
                        id: "change-tone",
                        text: "Change tone",
                        icon: "tell-a-friend",
                        items: [
                            {
                                id: "change-tone-neutral",
                                text: "Neutral",
                                prompt: (selection) => `Adjust the tone of the following text to be more neutral while preserving its original meaning and intent.

                                        Selected Text:
                                        ${selection}`
                            },
                            {
                                id: "change-tone-friendly",
                                text: "Friendly",
                                prompt: (selection) => `Adjust the tone of the following text to be more friendly while preserving its original meaning and intent.

                                        Selected Text:
                                        ${selection}`
                            },
                            {
                                id: "change-tone-casual",
                                text: "Casual",
                                prompt: (selection) => `Adjust the tone of the following text to be more casual while preserving its original meaning and intent.

                                        Selected Text:
                                        ${selection}`
                            },
                            {
                                id: "change-tone-formal",
                                text: "Formal",
                                prompt: (selection) => `Adjust the tone of the following text to be more formal while preserving its original meaning and intent.

                                        Selected Text:
                                        ${selection}`
                            }
                        ]
                    },
                    {
                        id: "adjust-length",
                        text: "Adjust length",
                        icon: "col-resize",
                        items: [
                            {
                                id: "adjust-length-shorten",
                                text: "Shorten",
                                prompt: (selection) => `Shorten the following text while preserving its original meaning and intent.

                                        Selected Text:
                                        ${selection}`
                            },
                            {
                                id: "adjust-length-lengthen",
                                text: "Lengthen",
                                prompt: (selection) => `Lengthen the following text while preserving its original meaning and intent.

                                        Selected Text:
                                        ${selection}`
                            }
                        ]
                    }
];

export {
    defaultCommands
};