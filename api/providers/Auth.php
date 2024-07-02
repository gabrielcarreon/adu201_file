<?php

namespace Api\Providers;

class Auth
{
    private $empNo;
    private $accessType;
    private $csrfToken;
    public function __construct()
    {
        if(!isset($_SESSION)){
            session_start();
        }

        $dummySession = unserialize(DUMMY_SESSION);
        $this->empNo = APITEST ? $dummySession->emp_no : $_SESSION['AdUOLLMSidno2'];
        $this->accessType  = APITEST ? $dummySession->access_type : $_SESSION['201file_access'];
        $this->csrfToken = $this->setVars("csrfToken", $_SESSION['_csrf_token']);
    }
    private function setVars($var, $default)
    {
        $dummySession = unserialize(DUMMY_SESSION);
        return APITEST ? $dummySession->$var : $default;
    }
    public function getEmpNo()
    {
        return $this->empNo;
    }
    public function setAccessType($accessType)
    {
        $_SESSION['201file_access'] = $accessType;
    }
    public function getAccessType()
    {
        /*
         * user - regular users
         * hr - hr access
         * admin - itc
         */
        return $this->accessType;
    }

    public function getCSRFToken()
    {
        return $this->csrfToken;
    }
}