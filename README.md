# Product Comments Control

This project contains a Power Apps Component Framework (PCF) control for capturing and editing product comments in a rich text editor.

## Overview

The control is bound to a `commentsHtml` field and stores the formatted HTML content back into the Dataverse/Power Apps value. It is designed for scenarios where users need to enter richer product feedback, including formatted text, lists, or other HTML-based content.

## Key files

- `ControlManifest.Input.xml` - PCF manifest for the control definition and bound properties
- `index.ts` - main React control implementation
- `RichTextEditor.tsx` - rich text editor component used by the control
- `generated/ManifestTypes.d.ts` - generated manifest types for strongly typed PCF parameters

## Features

- Rich text editing for product comments
- Bound HTML output property
- Supports disabled/stale state handling in the PCF lifecycle
- Works with Dataverse/Power Apps field bindings through the PCF manifest

## Control property

The manifest includes a bound property named `commentsHtml`:

- Type: `Multiple`
- Usage: `bound`
- Purpose: stores formatted product comments as HTML

## Notes

This control is intended for Power Platform solutions using PCF and can be packaged and deployed to a Canvas or Model-Driven app once the surrounding solution/project build setup is in place.

## Typical usage

1. Add the control to a form or app surface.
2. Bind it to a field or property that accepts HTML/multiline text.
3. Enter formatted comments.
4. Save the app/form and the formatted HTML is written back through the PCF output binding.

## License

This project is provided as a sample/implementation for learning and customization.
