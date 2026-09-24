package io.github.fayaz.expensetracker.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GeminiConfigTest {

    public GeminiConfigTest(
            @Value("${gemini.api.key}") String geminiApiKey) {

        if (geminiApiKey == null || geminiApiKey.isBlank()) {
            System.out.println("❌ Gemini API key was NOT loaded.");
        } else {
            System.out.println("✅ Gemini API key loaded successfully.");
        }
    }
}