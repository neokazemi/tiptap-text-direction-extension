import { Extension } from '@tiptap/core';

const TextDirection = Extension.create({
    name: 'textDirection',
    addOptions() {
        return {
            types: ['heading', 'paragraph'],
            directions: ['ltr', 'rtl', 'auto'],
            defaultDirection: 'auto',
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    dir: {
                        default: this.options.defaultDirection,
                        parseHTML: element => ({
                            dir: element.attributes.dir ? element.attributes.dir.value : this.options.defaultDirection,
                        }),
                        renderHTML: attributes => {
                            if (attributes.dir === this.options.defaultDirection) {
                                return {}
                            }

                            return { dir: attributes.dir }
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setTextDirection: (direction) => ({ commands }) => {
                if (!this.options.directions.includes(direction)) {
                    return false
                }
                return this.options.types.every(type => commands.updateAttributes(type, { dir: direction }))
            },
            unsetTextDirection: () => ({ commands }) => {
                return this.options.types.every(type => commands.resetAttributes(type, 'dir'))
            },
        }
    },
});

export default TextDirection;
export { TextDirection };
