# File Upload Backend

## Setup Instructions

1. Clone the repository:
   git clone https://github.com/yourusername/file-upload-backend.git
   cd file-upload-backend

2. Install dependencies:
    npm install


3. Create a .env file in the root folder with your MongoDB URI:
    MONGO_URI="your_mongodb_connection_string"

4. Create an uploads folder in the root:
    mkdir uploads

5. Start the server:
    node server.js

   Server runs on http://localhost:5000.

API Documentation
1. Upload File
POST /api/files
Body: Form-data → File (file)

Response:

{
  "file_id": "uuid",
  "message": "File uploaded successfully"
}
2. Check Upload/Processing Progress
GET /api/files/{file_id}/progress

Response Example:

{
  "file_id": "uuid",
  "status": "processing",
  "progress": 50
}
When ready:

{
  "file_id": "uuid",
  "status": "ready",
  "progress": 100
}
3. Get Parsed File Content
GET /api/files/{file_id}

Response:

If processing:

{
  "message": "File upload or processing in progress. Please try again later."
}
If ready: JSON content of file.

4. List All Files
GET /api/files

Response:

[
  {
    "id": "uuid",
    "filename": "example.csv",
    "status": "ready",
    "created_at": "2025-08-20T17:45:00Z"
  }
]
5. Delete File
DELETE /api/files/{file_id}

Response:

{
  "message": "File deleted successfully"
}
