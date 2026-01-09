/**
 * UEDX48480040E-WB-A Test - Main
 * 
 * Display: 4" 480x480 Square Touch Display
 * Purpose: Thermostat prototype for heated floor
 * Framework: Arduino + LVGL
 * 
 * Test Phases:
 * - Phase 1: Basic display test (colors, touch)
 * - Phase 2: LVGL interface test
 * - Phase 3: DS18B20 sensor integration
 * - Phase 4: Relay control
 * - Phase 5: Home Assistant API integration
 */

#include <Arduino.h>
#include <ESP_Panel_Library.h>
#include <lvgl.h>

// ============================================
// WiFi Configuration (change these!)
// ============================================
const char* WIFI_SSID = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// ============================================
// Pin Definitions
// ============================================
// Display pins are handled by ESP_Panel_Library
// Additional pins for thermostat functionality:
#define PIN_DS18B20         4   // Temperature sensor (to be defined)
#define PIN_RELAY           5   // Relay control (to be defined)
#define PIN_LED_STATUS      42  // RGB LED (onboard)

// ============================================
// Global Objects
// ============================================
ESP_Panel *panel = nullptr;

// ============================================
// LVGL Display Buffer
// ============================================
static const uint32_t screenWidth = 480;
static const uint32_t screenHeight = 480;
static lv_disp_draw_buf_t draw_buf;
static lv_color_t *disp_draw_buf1;
static lv_color_t *disp_draw_buf2;
static lv_disp_drv_t disp_drv;

// ============================================
// LVGL Callbacks
// ============================================
void my_disp_flush(lv_disp_drv_t *disp, const lv_area_t *area, lv_color_t *color_p) {
    uint32_t w = (area->x2 - area->x1 + 1);
    uint32_t h = (area->y2 - area->y1 + 1);

    panel->getLcd()->drawBitmap(area->x1, area->y1, w, h, (uint16_t *)color_p);
    lv_disp_flush_ready(disp);
}

void my_touch_read(lv_indev_drv_t *indev_driver, lv_indev_data_t *data) {
    uint16_t touchX, touchY;
    bool touched = panel->getTouch()->getPoint(&touchX, &touchY, 1);

    if (touched) {
        data->state = LV_INDEV_STATE_PR;
        data->point.x = touchX;
        data->point.y = touchY;
    } else {
        data->state = LV_INDEV_STATE_REL;
    }
}

// ============================================
// Test UI - Phase 1: Basic Display
// ============================================
void create_test_ui() {
    // Create a simple test screen
    lv_obj_t *scr = lv_scr_act();
    lv_obj_set_style_bg_color(scr, lv_color_hex(0x1a1a1a), 0);

    // Title label
    lv_obj_t *label_title = lv_label_create(scr);
    lv_label_set_text(label_title, "TESTE TERMOSTATO");
    lv_obj_set_style_text_color(label_title, lv_color_hex(0xFFFFFF), 0);
    lv_obj_set_style_text_font(label_title, &lv_font_montserrat_28, 0);
    lv_obj_align(label_title, LV_ALIGN_TOP_MID, 0, 20);

    // Temperature display
    lv_obj_t *label_temp = lv_label_create(scr);
    lv_label_set_text(label_temp, "22.5°C");
    lv_obj_set_style_text_color(label_temp, lv_color_hex(0x00FF00), 0);
    lv_obj_set_style_text_font(label_temp, &lv_font_montserrat_48, 0);
    lv_obj_align(label_temp, LV_ALIGN_CENTER, 0, -40);

    // Status label
    lv_obj_t *label_status = lv_label_create(scr);
    lv_label_set_text(label_status, "Display OK - Touch OK");
    lv_obj_set_style_text_color(label_status, lv_color_hex(0xFFFFFF), 0);
    lv_obj_align(label_status, LV_ALIGN_BOTTOM_MID, 0, -20);

    // Test button
    lv_obj_t *btn = lv_btn_create(scr);
    lv_obj_align(btn, LV_ALIGN_CENTER, 0, 80);
    lv_obj_set_size(btn, 200, 60);
    
    lv_obj_t *label_btn = lv_label_create(btn);
    lv_label_set_text(label_btn, "Teste Touch");
    lv_obj_center(label_btn);
}

// ============================================
// Setup
// ============================================
void setup() {
    Serial.begin(115200);
    Serial.println("\n\n=================================");
    Serial.println("UEDX48480040E-WB-A Test");
    Serial.println("Thermostat Prototype");
    Serial.println("=================================\n");

    // Initialize panel
    Serial.println("Initializing display panel...");
    panel = new ESP_Panel();
    panel->init();
    panel->begin();
    
    Serial.println("Display initialized!");
    Serial.printf("- Resolution: %dx%d\n", screenWidth, screenHeight);
    Serial.printf("- Touch: %s\n", panel->getTouch() ? "Available" : "Not available");

    // Initialize LVGL
    Serial.println("\nInitializing LVGL...");
    lv_init();

    // Allocate display buffers
    uint32_t buffer_size = screenWidth * screenHeight / 10;
    disp_draw_buf1 = (lv_color_t *)heap_caps_malloc(buffer_size * sizeof(lv_color_t), MALLOC_CAP_INTERNAL | MALLOC_CAP_8BIT);
    disp_draw_buf2 = (lv_color_t *)heap_caps_malloc(buffer_size * sizeof(lv_color_t), MALLOC_CAP_INTERNAL | MALLOC_CAP_8BIT);
    
    if (!disp_draw_buf1 || !disp_draw_buf2) {
        Serial.println("ERROR: Failed to allocate display buffers!");
        while(1);
    }

    lv_disp_draw_buf_init(&draw_buf, disp_draw_buf1, disp_draw_buf2, buffer_size);

    // Initialize display driver
    lv_disp_drv_init(&disp_drv);
    disp_drv.hor_res = screenWidth;
    disp_drv.ver_res = screenHeight;
    disp_drv.flush_cb = my_disp_flush;
    disp_drv.draw_buf = &draw_buf;
    lv_disp_drv_register(&disp_drv);

    // Initialize touch driver
    if (panel->getTouch()) {
        static lv_indev_drv_t indev_drv;
        lv_indev_drv_init(&indev_drv);
        indev_drv.type = LV_INDEV_TYPE_POINTER;
        indev_drv.read_cb = my_touch_read;
        lv_indev_drv_register(&indev_drv);
        Serial.println("Touch driver registered!");
    }

    // Create test UI
    Serial.println("\nCreating test UI...");
    create_test_ui();
    Serial.println("UI created!");

    // WiFi connection (optional for Phase 1)
    Serial.println("\n=================================");
    Serial.println("Phase 1: Basic Display Test");
    Serial.println("- Display should show test UI");
    Serial.println("- Touch button to verify input");
    Serial.println("=================================\n");

    Serial.println("Setup complete!");
}

// ============================================
// Loop
// ============================================
void loop() {
    // Update LVGL
    lv_timer_handler();
    delay(5);

    // Additional loop tasks will be added in later phases:
    // - Phase 2: DS18B20 reading
    // - Phase 3: Relay control
    // - Phase 4: Home Assistant integration
}

