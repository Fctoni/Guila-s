#!/bin/bash
# Deploy Script - Projeto Guilas
# Deploy de firmware ESP32s e configs Home Assistant

# ============================================
# GUIA PARA IA FUTURA
# ============================================
# Este script facilita o deploy de atualizações
# 
# Uso: ./deploy.sh [tipo] [dispositivo]
# Exemplos:
#   ./deploy.sh esphome esp-painel-terreo
#   ./deploy.sh esphome all
#   ./deploy.sh ha-config
#
# ============================================

echo "======================================"
echo "Deploy Guilas - $(date '+%Y-%m-%d %H:%M:%S')"
echo "======================================"

TIPO=$1
DISPOSITIVO=$2

# ======================================
# DEPLOY ESPHOME
# ======================================
if [ "$TIPO" == "esphome" ]; then
    if [ "$DISPOSITIVO" == "all" ]; then
        echo "Deploying all ESPHome devices..."
        
        # Deploy todos painéis
        for config in Firmware/ESP32-Paineis/*/config.yaml; do
            echo "Deploying $(dirname $config)..."
            esphome run $config
        done
        
        # Deploy todos sensores
        for config in Firmware/ESP32-Sensores/*/config.yaml; do
            echo "Deploying $(dirname $config)..."
            esphome run $config
        done
        
        # Deploy todos painéis touch
        for config in Firmware/ESP32-Paineis-Touch/*/config.yaml; do
            echo "Deploying $(dirname $config)..."
            esphome run $config
        done
        
    else
        echo "Deploying $DISPOSITIVO..."
        esphome run Firmware/**/$DISPOSITIVO/config.yaml
    fi
    
# ======================================
# DEPLOY HOME ASSISTANT CONFIG
# ======================================
elif [ "$TIPO" == "ha-config" ]; then
    echo "Atualizando configurações Home Assistant..."
    
    # Verificar config
    echo "1. Verificando configuração..."
    ha core check
    
    if [ $? -eq 0 ]; then
        echo "✓ Config válida"
        
        # Reiniciar HA
        echo "2. Reiniciando Home Assistant..."
        ha core restart
        
        echo "✓ Home Assistant reiniciado"
    else
        echo "✗ ERRO na configuração! Deploy cancelado."
        exit 1
    fi
    
# ======================================
# AJUDA
# ======================================
else
    echo "Uso: ./deploy.sh [tipo] [dispositivo]"
    echo ""
    echo "Tipos:"
    echo "  esphome [dispositivo|all]  - Deploy firmware ESP32"
    echo "  ha-config                   - Deploy configs Home Assistant"
    echo ""
    echo "Exemplos:"
    echo "  ./deploy.sh esphome esp-painel-terreo"
    echo "  ./deploy.sh esphome all"
    echo "  ./deploy.sh ha-config"
fi

echo "======================================"
echo "Deploy concluído"
echo "======================================"

