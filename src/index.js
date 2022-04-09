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
                        parseHTML: element => {
                            if (element.attributes.dir) {
                                return element.attributes.dir.value
                            } else {
                                return this.options.defaultDirection
                            }
                        },
                        renderHTML: attributes => {
                            let dir = this.options.defaultDirection
                            if (typeof attributes.dir === 'string') {
                                dir = attributes.dir
                            } else if (typeof attributes.dir === 'object' && typeof attributes.dir.value === 'string') {
                                dir = attributes.dir.value
                            }

                            if (dir === this.options.defaultDirection) {
                                return { dir: 'auto' }
                            }

                            return { dir: dir }
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
