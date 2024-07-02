<?php

function truncate()
{
    require_once "/api/env.php";
    require_once "D:\Sites\dbcon\dbconi.php";

    foreach (unserialize(TEMP_TABLES) as $table){
        mysqli_query($dbc,"TRUNCATE TABLE $table");
        echo "--- Success: Truncated table $table ---\n";
    }
}