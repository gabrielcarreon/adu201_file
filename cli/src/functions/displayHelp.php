<?php
function displayHelp()
{
    echo "Usage: adu [options]\n";
    echo "Options:\n";
    echo "  -adu, --adu  This is a test message\n";
    echo "  -h, --help   Display this help message\n";
    echo " --controller  Creates a controller based on the option passed\n";
    echo "  --model      Creates a model based on the option passed --table is also required\n";
    echo " --truncate    Truncates tables";
}
