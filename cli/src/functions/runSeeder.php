<?php
function runSeeder($seeder)
{
   if(@!include (CLIROOT."\cli\src\seeders\\".$seeder."Seeder.php")){
       echo "---Error: ".$seeder."Seeder does not exists---\n";
   }
}
