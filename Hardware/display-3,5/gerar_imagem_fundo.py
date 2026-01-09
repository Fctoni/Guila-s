#!/usr/bin/env python3
"""
Script para gerar imagem de fundo 480x320 para display ESPHome
Tema: Galáxia escura com estrelas
"""

from PIL import Image, ImageDraw, ImageFilter
import random
import math

def criar_gradiente_radial(img, draw, center, radius, color_start, color_end):
    """Cria um gradiente radial na imagem"""
    for r in range(radius, 0, -1):
        # Interpolar cores
        ratio = 1 - (r / radius)
        r_val = int(color_start[0] + (color_end[0] - color_start[0]) * ratio)
        g_val = int(color_start[1] + (color_end[1] - color_start[1]) * ratio)
        b_val = int(color_start[2] + (color_end[2] - color_start[2]) * ratio)
        
        color = (r_val, g_val, b_val)
        draw.ellipse([center[0]-r, center[1]-r, center[0]+r, center[1]+r], 
                     fill=color, outline=color)

def adicionar_estrelas(draw, num_estrelas):
    """Adiciona estrelas brilhantes aleatórias"""
    for _ in range(num_estrelas):
        x = random.randint(0, 479)
        y = random.randint(0, 319)
        size = random.choice([1, 1, 1, 2, 2, 3])  # Mais estrelas pequenas
        brightness = random.randint(180, 255)
        color = (brightness, brightness, brightness)
        
        # Estrela principal
        draw.ellipse([x-size, y-size, x+size, y+size], fill=color)
        
        # Adicionar "brilho" nas estrelas maiores
        if size >= 2 and random.random() > 0.7:
            draw.line([(x-size-2, y), (x+size+2, y)], fill=color, width=1)
            draw.line([(x, y-size-2), (x, y+size+2)], fill=color, width=1)

def adicionar_nebulosa(img, draw):
    """Adiciona efeito de nebulosa sutil"""
    # Criar camadas de nebulosa
    for _ in range(3):
        x = random.randint(0, 480)
        y = random.randint(0, 320)
        radius = random.randint(40, 100)
        
        # Cores azul/roxo escuras para nebulosa
        color_r = random.randint(10, 40)
        color_g = random.randint(0, 30)
        color_b = random.randint(50, 100)
        
        # Desenhar círculo nebuloso
        for r in range(radius, 0, -5):
            alpha = int(15 * (r / radius))  # Transparência
            color = (
                min(255, color_r + alpha),
                min(255, color_g + alpha),
                min(255, color_b + alpha)
            )
            draw.ellipse([x-r, y-r, x+r, y+r], fill=color, outline=None)

def criar_imagem_galaxia():
    """Função principal para criar a imagem"""
    print("🌌 Criando imagem de fundo do display...")
    
    # Criar imagem base preta
    img = Image.new('RGB', (480, 320), color='#000000')
    draw = ImageDraw.Draw(img)
    
    # 1. Adicionar gradiente de fundo (preto → azul escuro)
    print("  ✓ Adicionando gradiente de fundo...")
    for y in range(320):
        # Gradiente vertical
        blue_value = int((y / 320) * 35)
        red_value = int((y / 320) * 5)
        color = (red_value, 0, blue_value)
        draw.line([(0, y), (480, y)], fill=color)
    
    # 2. Adicionar nebulosas sutis
    print("  ✓ Adicionando nebulosas...")
    adicionar_nebulosa(img, draw)
    
    # Aplicar blur leve para suavizar nebulosas
    img = img.filter(ImageFilter.GaussianBlur(radius=2))
    draw = ImageDraw.Draw(img)
    
    # 3. Adicionar estrelas brilhantes
    print("  ✓ Adicionando estrelas...")
    adicionar_estrelas(draw, 150)
    
    # 4. Adicionar algumas estrelas maiores (principais)
    print("  ✓ Adicionando estrelas principais...")
    for _ in range(15):
        x = random.randint(0, 479)
        y = random.randint(0, 319)
        size = random.randint(2, 4)
        brightness = 255
        color = (brightness, brightness, brightness)
        
        # Estrela com cruz brilhante
        draw.ellipse([x-size, y-size, x+size, y+size], fill=color)
        draw.line([(x-size-3, y), (x+size+3, y)], fill=color, width=1)
        draw.line([(x, y-size-3), (x, y+size+3)], fill=color, width=1)
    
    # 5. Adicionar via láctea sutil (faixa diagonal)
    print("  ✓ Adicionando via láctea...")
    for i in range(0, 480, 2):
        y = int(160 + math.sin(i / 50) * 40)
        height = random.randint(20, 40)
        brightness = random.randint(10, 25)
        color = (brightness, brightness, brightness + 10)
        draw.line([(i, y - height // 2), (i, y + height // 2)], fill=color, width=2)
    
    # Aplicar blur final muito leve
    img = img.filter(ImageFilter.GaussianBlur(radius=0.5))
    
    # 6. Salvar imagem
    output_path = 'images/dashboard_480x320.jpg'
    img.save(output_path, 'JPEG', quality=90, optimize=True)
    print(f"  ✓ Imagem salva em: {output_path}")
    
    # Informações sobre o arquivo
    import os
    file_size = os.path.getsize(output_path)
    print(f"\n✅ Imagem criada com sucesso!")
    print(f"   📐 Dimensões: 480x320 pixels")
    print(f"   💾 Tamanho: {file_size / 1024:.1f} KB")
    print(f"   📁 Localização: {output_path}")
    
    return img

if __name__ == "__main__":
    try:
        criar_imagem_galaxia()
        print("\n🎉 Pronto! A imagem está pronta para usar no ESPHome.")
    except ImportError:
        print("❌ ERRO: Biblioteca PIL (Pillow) não encontrada!")
        print("   Instale com: pip install Pillow")
    except Exception as e:
        print(f"❌ ERRO ao criar imagem: {e}")



