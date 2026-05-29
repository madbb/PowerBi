@echo off
cd /d "C:\Users\marce\Documents\Arbeit\PowerBi\PowerBI Projektordner\pbi-kurs"

echo Pushe zu GitHub...
git pull
git add .
git commit -m "update %date% %time%"
git push

echo Fertig.
pause