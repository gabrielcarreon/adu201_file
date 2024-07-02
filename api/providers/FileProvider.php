<?php

namespace Api\Providers;

class FileProvider
{
    private static $allowedMIMEType = array(
        'image/png',
        'image/jpeg',
        'image/jpg',
        'application/pdf');

    private static $mime_map = array(
        'application/epub+zip' => 'epub',
        'application/java-archive' => 'jar',
        'application/javascript' => 'js',
        'application/json' => 'json',
        'application/msword' => 'doc',
        'application/octet-stream' => 'bin',
        'application/ogg' => 'ogx',
        'application/pdf' => 'pdf',
        'application/rtf' => 'rtf',
        'application/vnd.amazon.ebook' => 'azw',
        'application/vnd.apple.installer+xml' => 'mpkg',
        'application/vnd.mozilla.xul+xml' => 'xul',
        'application/vnd.ms-excel' => 'xls',
        'application/vnd.ms-fontobject' => 'eot',
        'application/vnd.ms-powerpoint' => 'ppt',
        'application/vnd.oasis.opendocument.presentation' => 'odp',
        'application/vnd.oasis.opendocument.spreadsheet' => 'ods',
        'application/vnd.oasis.opendocument.text' => 'odt',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation' => 'pptx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => 'xlsx',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
        'application/vnd.rar' => 'rar',
        'application/vnd.visio' => 'vsd',
        'application/x-7z-compressed' => '7z',
        'application/x-abiword' => 'abw',
        'application/x-bzip' => 'bz',
        'application/x-bzip2' => 'bz2',
        'application/x-csh' => 'csh',
        'application/x-freearc' => 'arc',
        'application/x-sh' => 'sh',
        'application/x-shockwave-flash' => 'swf',
        'application/x-tar' => 'tar',
        'application/xhtml+xml' => 'xhtml',
        'application/xml' => 'xml',
        'application/zip' => 'zip',
        'audio/aac' => 'aac',
        'audio/midi' => 'mid',
        'audio/mpeg' => 'mp3',
        'audio/ogg' => 'oga',
        'audio/opus' => 'opus',
        'audio/wav' => 'wav',
        'audio/webm' => 'weba',
        'audio/x-ms-wma' => 'wma',
        'audio/x-wav' => 'wav',
        'font/otf' => 'otf',
        'font/ttf' => 'ttf',
        'font/woff' => 'woff',
        'font/woff2' => 'woff2',
        'image/bmp' => 'bmp',
        'image/gif' => 'gif',
        'image/jpg' => 'jpg',
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/svg+xml' => 'svg',
        'image/tiff' => 'tiff',
        'image/webp' => 'webp',
        'image/x-icon' => 'ico',
        'text/calendar' => 'ics',
        'text/css' => 'css',
        'text/csv' => 'csv',
        'text/html' => 'html',
        'text/plain' => 'txt',
        'text/richtext' => 'rtx',
        'text/sgml' => 'sgml',
        'text/xml' => 'xml',
        'video/3gpp' => '3gp',
        'video/3gpp2' => '3g2',
        'video/h264' => 'h264',
        'video/mp4' => 'mp4',
        'video/mpeg' => 'mpeg',
        'video/ogg' => 'ogv',
        'video/quicktime' => 'mov',
        'video/webm' => 'webm',
        'video/x-msvideo' => 'avi',
        'video/x-ms-wmv' => 'wmv',
    );
    public static function handleFile($file, $allowedMIMEType, $path)
    {
        $cwd = getcwd();

        // Set allowed MIME types if provided
        if (count($allowedMIMEType) > 0) {
            self::$allowedMIMEType = $allowedMIMEType;
        }

        // Validate file type
        self::validateFileType($file, $allowedMIMEType);
        $ext = "." . self::mime2ext($file['type']);
        // Change directory to the file path
        chdir(FILE_PATH);

        // Create the directory if it doesn't exist
        if (!file_exists($path)) {
            mkdir($path, 0777, true); // Ensure recursive creation and correct permissions
        }

        chdir($path);


        // Encode filename
        $filenameEncoded = md5($file['name']);
        $filename = $file['name'];

        // Get file extension from MIME type


        // Move the uploaded file to the target directory
        $targetFilePath = $filenameEncoded . $ext;
        if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
            chdir($cwd);
            return $targetFilePath; // Return the path of the uploaded file
        } else {
            chdir($cwd);
            return false; // Return false if the file upload failed
        }
    }

    // Utility function to convert MIME type to file extension
    private static function mime2ext($mime)
    {
        return isset(self::$mime_map[$mime]) ? self::$mime_map[$mime] : "unknown";
    }
    public static function validateFileType($file, $allowedMIMEType)
    {
        $allowedType = count($allowedMIMEType) > 0 ? $allowedMIMEType : self::$allowedMIMEType;
        if (!in_array($file['type'], $allowedType)) {
            response(array("errors" => array("$file[name] file type is invalid.")), 400);
        }
        if($file['size'] > MAX_FILE_SIZE) {
            response(array("errors" => array("$file[name] size is too large")), 400);
        }
    }

    public static function repackFile($requestFiles, $inputFiles)
    {
        $uploadedFiles = array();
        foreach ($requestFiles as $file){
            foreach ($file['name'] as $index1 => $entries){
                foreach ($entries['attachment'] as $index2 => $entry) {
                    $reCreateFile = array(
                        "name" => $file['name'][$index1]['attachment'][$index2],
                        "type" => $file['type'][$index1]['attachment'][$index2],
                        "size" => $file['size'][$index1]['attachment'][$index2],
                        "tmp_name" => $file['tmp_name'][$index1]['attachment'][$index2],
                        "error" => $file['error'][$index1]['attachment'][$index2],
                        "attachment_id" => $inputFiles[$index1]['attachment_id']
                    );
                    FileProvider::validateFileType(
                        $reCreateFile,
                        array(
                            'image/png',
                            'image/jpeg',
                            'image/jpg',
                            'application/pdf')
                    );
                    $uploadedFiles[] = $reCreateFile;
                }
            }

        }
        return $uploadedFiles;
    }

    public static function getFile($encFileName, $ctrlNo, $filename)
    {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.$filename.'"');
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: ' . filesize(FILE_PATH."/$ctrlNo/$encFileName")); //Absolute URL
        ob_clean();
        flush();
        readfile(FILE_PATH."/$ctrlNo/$encFileName"); //Absolute URL
        exit();
    }
}
