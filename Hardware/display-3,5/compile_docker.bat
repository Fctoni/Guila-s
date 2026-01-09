@echo off
echo === Compilando com ESPHome via Docker ===

docker run --rm -v "%cd%:/config" -it ghcr.io/esphome/esphome compile disp_3.5.yaml

echo.
echo === Compilacao concluida ===
pause



