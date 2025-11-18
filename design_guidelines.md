# CLO Calculation System - Design Guidelines

## Design Approach
**System-Based Approach**: Material Design principles adapted for educational data management, inspired by Google Sheets' clarity and Canvas gradebook's academic focus. This is a utility-focused application prioritizing data clarity, efficient workflows, and RTL Arabic support.

## Core Design Elements

### Typography
**Font Families**: 
- Primary: Roboto (UI elements, tables, buttons)
- Secondary: Open Sans (body text, descriptions)
- Ensure both fonts support Arabic characters with proper RTL rendering

**Hierarchy**:
- Page Headers: Roboto Bold, 28px
- Section Headers: Roboto Medium, 20px
- Tab Labels: Roboto Medium, 16px
- Table Headers: Roboto Medium, 14px, uppercase
- Table Data: Open Sans Regular, 14px
- Button Text: Roboto Medium, 15px
- Helper Text: Open Sans Regular, 12px

### Layout System
**Spacing Primitives**: Use Tailwind units of 2, 3, 4, 6, 8, 12
- Table cell padding: p-3 (12px as specified)
- Section spacing: py-8, px-6
- Card padding: p-6
- Button padding: px-6 py-3
- Form field gaps: gap-4

**Container Strategy**:
- Main content: max-w-7xl with px-6
- Tables: Full-width within container, horizontal scroll on mobile
- Forms: max-w-4xl for data entry sections

### Color Implementation
- **Primary (#1976D2)**: Action buttons, active tab indicators, primary CTAs, links
- **Secondary (#4CAF50)**: Success states, calculation results, positive indicators, save buttons
- **Background (#FAFAFA)**: Page background, inactive tabs, table alternating rows
- **Text (#212121)**: Primary text content, table data
- **Accent (#FF9800)**: Warning states, important notices, edit mode indicators
- **Headers (#37474F)**: Table headers, section titles, navigation bar background

**Additional Colors**:
- Error/Delete: #D32F2F (red for destructive actions)
- Border: #E0E0E0 (subtle table borders)
- Hover: #1565C0 (darker blue for interactive states)

## Component Library

### Navigation & Structure
**Top Navigation Bar**:
- Background: Headers color (#37474F)
- Contains: App title (right-aligned for RTL), user info, export/print actions
- Height: h-16
- Fixed position with subtle shadow

**Tabbed Interface**:
- Three main tabs: "بيانات الطلاب" (Students), "الدرجات" (Grades), "المنهج" (Syllabus)
- Active tab: Primary color background with white text
- Inactive tabs: Light background (#FAFAFA) with text color
- Tab bar below navigation: bg-white with bottom border
- Tab padding: px-6 py-4

### Data Tables
**Table Structure**:
- White background with subtle borders (#E0E0E0)
- Header row: Headers color background (#37474F), white text, sticky positioning
- Data rows: Alternating backgrounds (white / #FAFAFA)
- Cell padding: p-3 (12px)
- RTL alignment for Arabic text
- Hoverable rows with subtle background change
- Sortable columns with arrow indicators

**Table Actions**:
- Row-level: Edit (amber), Delete (red) icon buttons on hover
- Bulk actions: Checkbox column (leftmost in RTL), action bar appears when selected

### Forms & Input
**Input Fields**:
- Border: 1px solid #E0E0E0
- Focus: Primary color border, subtle shadow
- Padding: px-4 py-3
- Background: White
- RTL text direction for Arabic content
- Labels: Above input, Roboto Medium, 14px

**Buttons**:
- Primary: Primary color background, white text, px-6 py-3
- Secondary: White background, primary border and text
- Success: Secondary color for save/confirm
- Destructive: Red background for delete
- Rounded: rounded-lg
- Hover: Slightly darker shade with subtle lift (shadow)

### Calculation Display
**Summary Cards**:
- White background with subtle shadow
- Border-left accent (4px) in appropriate color (green for success, amber for warnings)
- Padding: p-6
- Contains: Metric title, calculated value (large, bold), supporting details
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-4

**CLO Results Section**:
- Table format showing outcome achievement percentages
- Color-coded bars indicating performance levels
- Green: ≥75%, Amber: 50-74%, Red: <50%

### Export & Actions
**Action Bar** (top-right of each section):
- Export PDF: Primary button with download icon
- Print: Secondary button with print icon
- Add New: Success button with plus icon
- Spacing: gap-3

## RTL Support Requirements
- Entire layout mirrors for Arabic (flex-row-reverse)
- Table columns read right-to-left
- Form layouts flip horizontally
- Icons and buttons position appropriately
- Maintain left-to-right for numbers and calculations
- Navigation and tab order reversed

## Responsive Behavior
**Desktop (lg:)**: Full table visibility, side-by-side forms
**Tablet (md:)**: Horizontal scroll for tables, stacked form sections
**Mobile (base)**: Card-based table representation, single-column forms, sticky headers

## Images
No hero images needed. This is a data-focused productivity tool. Only icons from Material Icons library for:
- Tab icons (student, grades, document)
- Action buttons (add, edit, delete, export, print)
- Status indicators (checkmark, warning, error)

## Accessibility
- ARIA labels for all interactive elements (Arabic)
- Keyboard navigation for tables and forms
- Focus indicators matching primary color
- Screen reader support for calculation results
- High contrast ratio (4.5:1) for all text