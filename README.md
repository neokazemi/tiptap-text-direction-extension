# tiptap-text-direction-extension
Creator: [neokazemi](https://github.com/neokazemi)

## Introduction
Adds text direction (not alignment) to [Tiptap](https://tiptap.dev).

## License
tiptap is open sourced software licensed under the [MIT license](https://github.com/ueberdosis/tiptap/blob/main/LICENSE.md).

## Installation

    npm install --save tiptap-text-direction-extension

## Usage

    import TextDirection from 'tiptap-text-direction-extension';
    import { Editor } from '@tiptap/vue-2'
    .
    .
    .
    let editor = new Editor({
        extensions: [
          TextDirection
        ],
      })
    }
    

    // This is an example function that sets the paragraph direction to ltr
    function ltr() {
        editor.commands.setTextDirection('ltr') //arguments: 'ltr'|'rtl'|'auto'
    }
    
