const http = require('http');
const fs = require('fs');
const path = require('path');
const { addMetadata, getAllFiles, deleteFileMetadata, renameFileMetadata } = require('./fileStore');

const uploadDir = path.join(__dirname, 'uploads');
const logFile = path.join(__dirname, 'server_activity.log');
// Pastikan folder "uploads" ada
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}



const logActivity = (action, fileName, clientIp, res) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} | Action: ${action}, File: ${fileName || 'N/A'}, IP: ${clientIp || 'Unknown'}\n`;


    fs.writeFileSync(logFile, logMessage, { flag: 'a' });
    // Tambahkan log ke file
    fs.appendFile(logFile, logMessage, (err) => {
        if (err) console.error('Failed to write to log file', err);
    });

    // Kirim log ke klien
    res.end(logMessage);
};

// Contoh penggunaan
const action = "UPLOAD";
const fileName = "example.txt";
const clientIp = "192.168.1.1";
const res = {
    end: (message) => {
        console.log('Log sent to client:', message);
    }
};

logActivity(action, fileName, clientIp, res);


const server = http.createServer((req, res) => {
    const clientIp = req.socket.remoteAddress; // Tangkap IP klien

    if (req.method === 'GET' && req.url === '/') {
        const htmlPath = path.join(__dirname, 'index.html');
        fs.readFile(htmlPath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error loading index.html');
                return;
            }
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    } else if (req.method === 'GET' && req.url === '/style.css') {
        const cssPath = path.join(__dirname, 'style.css');
        fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error loading style.css');
                return;
            }
            res.setHeader('Content-Type', 'text/css');
            res.end(data);
        });
    } else if (req.method === 'POST' && req.url === '/upload') {
        let body = [];
        req.on('data', chunk => body.push(chunk));
        req.on('end', () => {
            const fileBuffer = Buffer.concat(body);
            const fileName = 'file_' + Date.now();
            const filePath = path.join(uploadDir, fileName);

            fs.writeFile(filePath, fileBuffer, err => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Failed to upload file');
                    return;
                }

                const metadata = {
                    name: fileName,
                    size: fileBuffer.length,
                    uploadTime: new Date().toISOString()
                };
                addMetadata(metadata);

                logActivity('Upload', fileName, clientIp);
                res.statusCode = 200;
                res.end('File uploaded successfully');
            });
        });
    } else if (req.method === 'GET' && req.url === '/files') {
        const files = getAllFiles();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(files));
    } else if (req.method === 'POST' && req.url.startsWith('/delete/')) {
        const fileName = req.url.split('/').pop();
        const filePath = path.join(uploadDir, fileName);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            deleteFileMetadata(fileName);
            logActivity('Delete', fileName, clientIp);
            res.statusCode = 200;
            res.end('File deleted successfully');
        } else {
            res.statusCode = 404;
            res.end('File not found');
        }
    } else if (req.method === 'POST' && req.url.startsWith('/rename/')) {
        const fileName = req.url.split('/').pop();
        const newFileName = req.body.newName;
        const filePath = path.join(uploadDir, fileName);

        if (fs.existsSync(filePath)) {
            fs.renameSync(filePath, path.join(uploadDir, newFileName));
            renameFileMetadata(fileName, newFileName);
            logActivity('Rename', fileName, clientIp);
            res.statusCode = 200;
            res.end('File renamed successfully');
        } else {
            res.statusCode = 404;
            res.end('File not found');
        }
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});