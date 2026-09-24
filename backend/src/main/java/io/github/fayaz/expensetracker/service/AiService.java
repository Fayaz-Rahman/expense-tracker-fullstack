package io.github.fayaz.expensetracker.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import io.github.fayaz.expensetracker.dto.AiInsightResponse;
import io.github.fayaz.expensetracker.dto.ExpenseAiData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    private final Client client;
    private final ObjectMapper objectMapper;

    public AiService(
            @Value("${gemini.api.key}") String apiKey,
            ObjectMapper objectMapper
    ) {
        this.client = Client.builder()
                .apiKey(apiKey)
                .build();

        this.objectMapper = objectMapper;
    }

    public AiInsightResponse generateExpenseInsights(
            ExpenseAiData data
    ) {

        String prompt = """
                You are an expense analysis assistant.

                Analyze the following spending statistics.

                Total spent: ₹%s
                Number of expenses: %d

                Spending by category:
                %s

                Return ONLY valid JSON.

                Use exactly this structure:

                {
                  "highestCategory": "category name",
                  "highestCategoryAmount": 0.00,
                  "summary": "short spending summary",
                  "suggestions": [
                    "first practical suggestion",
                    "second practical suggestion"
                  ]
                }

                Rules:
                - highestCategory must be the category with the highest spending.
                - highestCategoryAmount must be the amount spent in that category.
                - summary must be short and based only on the provided data.
                - Provide exactly two practical suggestions.
                - Do not invent information.
                - Do not include Markdown.
                - Do not include code fences.
                - Do not provide professional financial advice.
                """.formatted(
                data.getTotalSpent(),
                data.getExpenseCount(),
                data.getCategoryBreakdown()
        );

        var response = client.models.generateContent(
                "gemini-3.5-flash-lite",
                prompt,
                null
        );

        String jsonResponse = response.text();

        System.out.println("========== GEMINI RAW RESPONSE ==========");
        System.out.println(jsonResponse);
        System.out.println("=========================================");

        try {

            return objectMapper.readValue(
                    jsonResponse,
                    AiInsightResponse.class
            );

        } catch (Exception e) {

            System.out.println(
                    "❌ Failed to parse Gemini JSON response"
            );

            e.printStackTrace();

            throw new RuntimeException(
                    "Invalid JSON response received from AI"
            );
        }
    }
}