<?php
require_once "D:\Sites\dbcon\dbconi.php";

$rows = 999;
$init = 0;
while ($init < $rows){

    $year = date('Y');
    $month = date('m');
    $newMax = substr($init, -4);
    $ctrlNo = $year . $month . str_pad($newMax + 1, 4, "0", STR_PAD_LEFT);

    mysqli_query($dbc,"INSERT INTO db201_file.applications 
    (ctrl_no, emp_no, status, date_created) 
        VALUES ($ctrlNo, '2022070096', 'pending', NOW())");
    echo "---Success: Inserted $init / $rows ---\n";
    $init++;
    // place your query here
}

