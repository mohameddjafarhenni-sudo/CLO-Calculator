# نظام حساب نواتج التعلم (CLO)
# Course Learning Outcomes (CLO) Calculation System

## Project Overview
A web-based Course Learning Outcomes calculation system designed for Arabic educational assessments. The system replicates Excel functionality with a modern web interface, featuring RTL support, multi-section data entry, automated calculations, and import/export capabilities.

## Features

### 1. Setup Page (Landing)
- Collects professor name, module name, and module code
- Information stored in localStorage and used for report generation
- Can be edited anytime from the main page

### 2. Students Management
- Add, edit, and delete student records
- Fields: University Code (Student ID), Name, Email, Phone Number
- **CSV/TXT Import**: Upload student data from comma-separated files
  - Format: `studentId,name,email,phone`
  - Supports both Arabic and English headers
  - Auto-skips header row

### 3. Grades Management
**Dynamic Grade Table Structure:**
- Three-tier header system:
  1. Assessment categories (e.g., اختبار فصلي 1, اختبار فصلي 2, الواجبات, الاختبار النهائي)
  2. Question numbers (س1, س2, س3, س4)
  3. Outcome codes (CLO mappings: 1.1, 1.2, 2.1, etc.)

**Grade Structure Management:**
- Add/edit/delete assessment categories
- Add/edit/delete questions within each assessment
- Edit outcome codes for each question
- Structure changes automatically update the grade table

**XLSX Import:**
- Import grades directly from Excel files
- Expected format:
  - Row 1: Assessment names (spanning multiple columns)
  - Row 2: Question numbers
  - Row 3: Outcome codes
  - Row 4+: Student data (studentId, studentName, then grades)
- Supports .xlsx and .xls formats

### 4. Syllabus Management
- Define learning outcomes and their mappings
- Manage CLO structure

### 5. Summary Cards
- Display key metrics and statistics
- Total students, assessments, etc.

## Technology Stack
- **Frontend**: React with TypeScript
- **UI Framework**: Shadcn UI + Tailwind CSS
- **Routing**: Wouter
- **State Management**: React useState hooks
- **Data Import**: xlsx library for Excel parsing
- **Forms**: React Hook Form + Zod validation
- **Styling**: Material Design inspired with custom colors
  - Primary: #1976D2
  - Secondary: #4CAF50
  - Accent: #FF9800
  - Headers: #37474F
- **Fonts**: Roboto and Open Sans with full Arabic RTL support

## Project Structure
```
client/src/
├── components/
│   ├── Header.tsx           # Main header with title
│   ├── TabNavigation.tsx    # Tab navigation between sections
│   ├── StudentsTable.tsx    # Student CRUD + CSV import
│   ├── GradesTable.tsx      # Dynamic grade table + XLSX import + structure management
│   ├── SyllabusTable.tsx    # Syllabus and CLO management
│   └── SummaryCards.tsx     # Statistics cards
├── pages/
│   ├── Setup.tsx            # Landing page for course info
│   └── Home.tsx             # Main application page
└── App.tsx                  # Root component with routing
```

## File Import Formats

### Students (CSV/TXT)
```csv
الرقم الجامعي,اسم الطالب,البريد الإلكتروني,رقم الجوال
202301001,أحمد محمد علي,ahmed@example.com,0501234567
202301002,فاطمة سعيد,fatima@example.com,0509876543
```

### Grades (XLSX)
Excel file with structure matching the current grade table:
- Row 1: Assessment names (merged cells for each assessment)
- Row 2: Question numbers (س1, س2, etc.)
- Row 3: Outcome codes (1.1, 1.2, etc.)
- Row 4+: `studentId | studentName | grade1 | grade2 | ... | gradeN`

## Development Status
- ✅ Setup/Landing page with course information
- ✅ Student management with phone numbers
- ✅ CSV import for students
- ✅ Dynamic grade table structure
- ✅ Grade structure management (add/edit/delete assessments and questions)
- ✅ XLSX import for grades
- ✅ RTL support for Arabic
- ✅ Material Design styling
- 🚧 Syllabus management (basic structure in place)
- 🚧 CLO calculations and reporting
- 🚧 Export functionality (PDF/Excel)
- 🚧 Backend implementation (currently using mock data and localStorage)

## Running the Application
```bash
npm run dev
```
The application runs on port 5000 with Express backend and Vite frontend.

## Future Enhancements
- Backend database implementation
- Advanced CLO calculations and analytics
- PDF report generation
- Excel export functionality
- User authentication
- Multi-course support
- Print-optimized layouts
