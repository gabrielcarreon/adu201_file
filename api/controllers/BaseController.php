<?php

namespace Api\Controllers;

require_once '/../php/functions/common.php';
require_once '/../models/User.php';


use Api\Models\User;

class BaseController
{
    private static $redirect = "https://live.adamson.edu.ph";
    public function __construct()
    {
    }
    public static function setTimeZone()
    {
        date_default_timezone_set('Asia/Manila');
    }

    protected static function logout()
    {
        $redirect = self::$redirect;
        exit("<script>window.location.replace('$redirect');</script>");
    }

    public static function setLogs($action, $logs = null)
    {
        $userlvl = $_SESSION['AdUOLLMSuserlvl'];
        $idno = $userlvl == 3 ? $_SESSION['AdUOLLMSidno'] : $_SESSION['AdUOLLMSidno2'];
        $userAgent = BaseController::getuagent();
        $ipAddress = BaseController::getIPAddress();
        $model = new LogsModel;
        $model->idno = $idno;
        $model->user_agent = $userAgent;
        $model->ip_address = $ipAddress;
        $model->action = $action;
        $model->transaction_number = $logs;
        $model->create();
        unset($model);
        // $idno, $userAgent, $ipAddress, $action);
    }
    protected function getuagent()
    {
        return isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : null;
    }
    protected function getIPAddress()
    {
        //ip is from shared internet  
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        }
        //ip is from proxy  
        elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        }
        //ip from remote address  
        else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }
    protected static function setEmailNotif($emailadd, $subject, $content)
    {
        self::checkAuth();
        $model = new EmailModel;
        $model->emailadd = $emailadd;
        $model->subject = $subject;
        $model->content = $content;
        $model->from_name = "Adamson University - SERR";
        if ($model->create()) {
            unset($model);
            return true;
        }
        unset($model);
        return false;
    }
}
