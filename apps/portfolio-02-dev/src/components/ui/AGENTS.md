# components/ui/ — UI Primitives

## OVERVIEW

shadcn/ui-style component library (20 files). Accessible, variant-driven primitives. Radix-based.

## COMPONENT MAP

| Component        | Base                    | Variants                                                      | Pattern               |
| ---------------- | ----------------------- | ------------------------------------------------------------- | --------------------- |
| Button           | `buttonVariants` (cva)  | default, destructive, outline, secondary, ghost, link + sizes | named export          |
| Card             | div                     | header, content, footer, title, description, action           | named export (7 sub)  |
| Accordion        | @radix-ui/accordion     | —                                                             | named export (4 sub)  |
| AlertDialog      | @radix-ui/alert-dialog  | overlay, content, header, footer                              | named export (8 sub)  |
| Avatar           | @radix-ui/avatar        | fallback                                                      | named export (3 sub)  |
| Badge            | `badgeVariants` (cva)   | default, secondary, destructive, outline                      | named export          |
| DropdownMenu     | @radix-ui/dropdown-menu | item, checkbox, radio, sub                                    | named export (12 sub) |
| Select           | @radix-ui/select        | group, item, label, separator                                 | named export (8 sub)  |
| Input            | native input            | file                                                          | named export          |
| Textarea         | native textarea         | —                                                             | named export          |
| Field            | fieldset wrapper        | horizontal, vertical                                          | named export (4 sub)  |
| InputGroup       | button + addon          | —                                                             | named export (3 sub)  |
| Combobox         | cmdk                    | —                                                             | named export (6 sub)  |
| Separator        | @radix-ui/separator     | —                                                             | named export          |
| Toggle           | native toggle           | —                                                             | default export        |
| Dock             | CSS dock                | —                                                             | default export        |
| LinesPatternCard | decorative card         | card + cardBody                                               | named export          |
| Empty            | empty state             | —                                                             | named export (5 sub)  |
| NotFoundComp     | 404 fallback            | —                                                             | named export          |
| NotFoundContent  | 404 content             | —                                                             | named export          |
| ScrollToTop      | scroll button           | —                                                             | default export        |
| BgGredient       | bg gradient             | —                                                             | named export          |
| ClipPathLinks    | animated links          | —                                                             | named export          |

## CONVENTIONS

- Named exports preferred (default only for standalone widgets)
- `cn()` from `@/lib/utils` + `cva` for variants
- Radix primitives for accessibility (dialog, dropdown, select, accordion, avatar)
- Tailwind CSS 4 classes only (no inline styles)
