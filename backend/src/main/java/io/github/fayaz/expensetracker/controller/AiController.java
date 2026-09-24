package io.github.fayaz.expensetracker.controller;

import io.github.fayaz.expensetracker.dto.AiInsightResponse;
import io.github.fayaz.expensetracker.dto.ExpenseAiData;
import io.github.fayaz.expensetracker.model.Expense;
import io.github.fayaz.expensetracker.repository.ExpenseRepository;
import io.github.fayaz.expensetracker.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;
    private final ExpenseRepository expenseRepository;

    public AiController(
            AiService aiService,
            ExpenseRepository expenseRepository
    ) {
        this.aiService = aiService;
        this.expenseRepository = expenseRepository;
    }

    @PostMapping("/insights")
    public ResponseEntity<?> generateInsights(
            Authentication authentication
    ) {

        System.out.println("========== AI REQUEST START ==========");

        if (authentication == null) {

            System.out.println(
                    "❌ Authentication is NULL"
            );

            return ResponseEntity
                    .status(401)
                    .body("Authentication is missing");
        }

        String email = authentication.getName();

        System.out.println(
                "✅ Authenticated user: " + email
        );

        List<Expense> expenses =
                expenseRepository.findByUserEmail(email);

        System.out.println(
                "✅ Expenses found: " + expenses.size()
        );

        if (expenses.isEmpty()) {

            return ResponseEntity.ok(
                    "Add some expenses first so AI can analyze your spending."
            );
        }

        BigDecimal totalSpent = expenses.stream()
                .map(Expense::getAmount)
                .reduce(
                        BigDecimal.ZERO,
                        BigDecimal::add
                );

        Map<String, BigDecimal> categoryBreakdown =
                new LinkedHashMap<>();

        for (Expense expense : expenses) {

            String category = expense.getCategory();

            categoryBreakdown.merge(
                    category,
                    expense.getAmount(),
                    BigDecimal::add
            );
        }

        ExpenseAiData aiData =
                new ExpenseAiData(
                        totalSpent,
                        expenses.size(),
                        categoryBreakdown
                );

        System.out.println(
                "➡️ Sending expense data to Gemini..."
        );

        try {

            AiInsightResponse insights =
                    aiService.generateExpenseInsights(aiData);

            System.out.println(
                    "✅ Structured AI response received"
            );

            System.out.println(
                    "========== AI REQUEST END =========="
            );

            return ResponseEntity.ok(insights);

        } catch (Exception e) {

            System.out.println(
                    "❌ AI ERROR: " + e.getMessage()
            );

            e.printStackTrace();

            return ResponseEntity
                    .status(500)
                    .body("AI service error. Check backend console.");
        }
    }
}