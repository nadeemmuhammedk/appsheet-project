# Media Column Types

Media types handle files, images, and drawings in AppSheet applications.

## 1. Image Type

**Purpose:** Photo and image uploads

**Configuration:**
```appsheet
Type: Image
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: YES/NO
```

**Common Use Cases:**
- Product photos
- Profile pictures
- Document scans
- Signature images
- Before/after photos
- Evidence/proof images

**Features:**
- Camera capture on mobile
- Photo gallery selection
- Image compression
- Thumbnail generation
- Display in gallery/card views

**Storage:**
- Stored in cloud storage (Google Drive, Dropbox, etc.)
- Reference stored in data source
- Automatic compression for mobile

**Formula Examples:**
```appsheet
# No formulas typically (user uploads)
# But can set initial value to default image
Initial Value: "https://example.com/default-image.png"
```

**Best Practices:**
- Compress large images for performance
- Use thumbnails in list views
- Set reasonable file size limits
- Consider storage costs
- Provide clear upload instructions

---

## 2. File Type

**Purpose:** Document and file uploads

**Configuration:**
```appsheet
Type: File
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: YES/NO
```

**Common Use Cases:**
- PDF documents
- Contracts
- Invoices
- Receipts
- Reports
- Attachments
- Spreadsheets

**Supported Formats:**
- PDF
- DOC/DOCX
- XLS/XLSX
- TXT
- CSV
- And more

**Features:**
- File upload from device
- Cloud storage integration
- Download/view capability
- Multiple file types supported

**Storage:**
- Stored in cloud storage
- File URL stored in data source
- Original filename preserved

**Best Practices:**
- Specify accepted file types in instructions
- Set file size limits
- Consider storage quota
- Provide download option in views
- Use clear naming conventions

---

## 3. Drawing Type

**Purpose:** Freehand drawings and signatures

**Configuration:**
```appsheet
Type: Drawing
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: YES/NO
```

**Common Use Cases:**
- Signatures
- Sketches
- Annotations
- Diagrams
- Field notes
- Approval signatures

**Features:**
- Freehand drawing interface
- Signature capture
- Stylus support
- Touch drawing on mobile
- Saved as image

**Storage:**
- Saved as image file
- Stored in cloud storage
- PNG format typically

**Use Cases by Industry:**
```appsheet
# Field Services
- Customer signatures
- Work completion sketches
- Damage diagrams

# Retail
- Customer signatures
- Product damage notes

# Healthcare
- Patient signatures
- Consent forms
- Diagram annotations
```

---

## 4. Thumbnail Type

**Purpose:** Small preview images

**Configuration:**
```appsheet
Type: Thumbnail
SHOW: TRUE
EDITABLE: TRUE
```

**Common Use Cases:**
- Product thumbnails
- Profile picture previews
- Document previews
- Icon images

**Features:**
- Optimized for small display
- Faster loading than full images
- Used in list/table views

**Best Practices:**
- Use for list/gallery views
- Keep file sizes small
- Standard dimensions (square)
- Clear, recognizable images

---

## 5. File Management Patterns

### Single Image Upload
```appsheet
Column: ProductImage
Type: Image
REQUIRE: No
Description: Product photo
```

### Multiple Images (Related Table)
```appsheet
# Main table
Table: Products
Column: ProductID (Key)

# Images table
Table: ProductImages
Column: ImageID (Key)
Column: ProductRef (Ref → Products)
Column: Image (Type: Image)

# Virtual column in Products table
Column: Images (Virtual)
App Formula: REF_ROWS("ProductImages", "ProductRef")
```

### Document Upload
```appsheet
Column: Contract
Type: File
REQUIRE: Yes
Description: Upload signed contract (PDF)
```

### Signature Capture
```appsheet
Column: CustomerSignature
Type: Drawing
REQUIRE: Yes
Description: Customer signature for approval
```

---

## 6. Display Patterns

### Image in Card View
```appsheet
# UX > Views > Card View
Primary Image: [ProductImage]
# Shows large image in card
```

### Gallery View
```appsheet
# UX > Views > Gallery View
Image column: [Photo]
# Displays images in grid
```

### Thumbnail in Table
```appsheet
# UX > Views > Table View
Show column: [Thumbnail]
# Small image in table row
```

---

## 7. Validation Patterns

### Require Image
```appsheet
Column: Photo
Type: Image
REQUIRE: Yes
VALID_IF: ISNOTBLANK([Photo])
```

### Conditional Requirement
```appsheet
Column: ProofImage
Type: Image
VALID_IF: IF([RequiresProof] = TRUE, ISNOTBLANK([ProofImage]), TRUE)
```

### Signature Required
```appsheet
Column: Signature
Type: Drawing
REQUIRE: Yes
VALID_IF: ISNOTBLANK([Signature]) - "Signature required for approval"
```

---

## 8. Storage Configuration

### Cloud Storage Options
- **Google Drive:** Default for Google Sheets apps
- **Dropbox:** Alternative cloud storage
- **Box:** Enterprise storage option
- **OneDrive:** Microsoft integration

### Storage Location
```appsheet
# Set in: Settings > Storage
# Folder structure: /AppSheet/Data/[App Name]/[Table Name]/
# Files named by row key + timestamp
```

### Storage Best Practices
- Monitor storage quota
- Regularly clean up deleted records
- Compress images before upload
- Set file size limits
- Use appropriate cloud storage tier

---

## 9. Common Use Cases

### Product Catalog
```appsheet
Table: Products
Column: ProductID (Key)
Column: ProductName
Column: ProductImage (Image)
Column: ProductImages (Virtual): REF_ROWS("ProductImages", "ProductRef")

Table: ProductImages
Column: ImageID (Key)
Column: ProductRef (Ref → Products)
Column: Image (Image)
Column: Caption (Text)
```

### Document Management
```appsheet
Table: Documents
Column: DocumentID (Key)
Column: DocumentName
Column: DocumentType (Enum: PDF, Word, Excel)
Column: File (File)
Column: UploadedBy (Email)
Column: UploadedDate (Date)
```

### Inspection/Audit App
```appsheet
Table: Inspections
Column: InspectionID (Key)
Column: InspectorName
Column: Photo1 (Image)
Column: Photo2 (Image)
Column: Photo3 (Image)
Column: InspectorSignature (Drawing)
Column: Notes (LongText)
```

### Service Request
```appsheet
Table: ServiceRequests
Column: RequestID (Key)
Column: IssuePh oto (Image)
Column: CompletionPhoto (Image)
Column: CustomerSignature (Drawing)
Column: TechnicianSignature (Drawing)
```

---

## 10. Best Practices

### Image Optimization
- Compress large images (AppSheet does this automatically)
- Use thumbnails for list views
- Limit image dimensions if possible
- Consider mobile data usage

### File Organization
- Use clear file naming
- Organize by table/category
- Regular cleanup of unused files
- Monitor storage limits

### User Experience
- Provide clear upload instructions
- Show file type requirements
- Indicate file size limits
- Allow file preview/download
- Enable camera capture for mobile

### Security
- Control who can upload (EDITABLE IF)
- Control who can view (SHOW IF)
- Use row-level security
- Consider sensitive data handling

### Performance
- Lazy-load images in views
- Use thumbnails in tables
- Limit number of images per record
- Compress before upload

---

## 11. Troubleshooting

### Images Not Displaying
- Check cloud storage permissions
- Verify file uploaded successfully
- Check image URL is valid
- Ensure file is supported format

### Upload Failures
- Check file size limits
- Verify cloud storage quota
- Check network connection
- Verify supported file type

### Performance Issues
- Reduce image sizes
- Use thumbnails in lists
- Limit images per view
- Check network speed

---

## 12. Advanced Patterns

### Conditional Image Display
```appsheet
Column: DisplayImage
Type: Image (Virtual)
App Formula: IF([HasImage], [ProductImage], "https://example.com/placeholder.png")
```

### Image Count
```appsheet
Column: ImageCount
Type: Number (Virtual)
App Formula: COUNT(SELECT(REF_ROWS("ProductImages", "ProductRef"), ISNOTBLANK([Image])))
```

### Multiple Signature Workflow
```appsheet
Table: Approvals
Column: EmployeeSignature (Drawing)
Column: ManagerSignature (Drawing)
Column: DirectorSignature (Drawing)

Column: AllSignaturesComplete
Type: Yes/No (Virtual)
App Formula: AND(
  ISNOTBLANK([EmployeeSignature]),
  ISNOTBLANK([ManagerSignature]),
  ISNOTBLANK([DirectorSignature])
)
```

---

**Related Documentation:**
- [Column Properties](../column-properties/COLUMN_PROPERTIES_OVERVIEW.md)
- [Validation Properties](../column-properties/VALIDATION_PROPERTIES.md)
- [Gallery View](../../views-interface/gallery/GALLERY_VIEW.md)
