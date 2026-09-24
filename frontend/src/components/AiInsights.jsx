import { useState } from "react";
import { getAiInsights } from "../services/aiApi";

function AiInsights() {

    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGetInsights = async () => {

        setLoading(true);
        setError("");

        try {

            const data = await getAiInsights();

            setInsights(data);

        } catch (err) {

            console.error("AI request failed:", err);

            setError("Unable to generate AI insights. Please try again.");

        } finally {

            setLoading(false);
        }
    };

    return (
        <section className="ai-insights">

            <div className="ai-insights-header">

                <div>
                    <h2>AI Spending Insights</h2>

                    <p>
                        Get an AI-powered analysis of your spending patterns.
                    </p>
                </div>

                <button
                    className="ai-analyze-button"
                    onClick={handleGetInsights}
                    disabled={loading}
                >
                    {loading
                        ? "Analyzing..."
                        : "Analyze My Spending"}
                </button>

            </div>


            {error && (
                <div className="ai-error">
                    {error}
                </div>
            )}


            {loading && (
                <div className="ai-loading">

                    <div className="ai-spinner"></div>

                    <p>
                        Analyzing your spending...
                    </p>

                </div>
            )}


            {insights && !loading && (

                <div className="ai-results">

                    <div className="ai-highest-category">

                        <span className="ai-label">
                            Highest Spending Category
                        </span>

                        <h3>
                            {insights.highestCategory}
                        </h3>

                        <p>
                            ₹{insights.highestCategoryAmount}
                        </p>

                    </div>


                    <div className="ai-summary">

                        <span className="ai-label">
                            Spending Summary
                        </span>

                        <p>
                            {insights.summary}
                        </p>

                    </div>


                    <div className="ai-suggestions">

                        <span className="ai-label">
                            Practical Suggestions
                        </span>

                        <ul>

                            {insights.suggestions &&
                                insights.suggestions.map(
                                    (suggestion, index) => (

                                        <li key={index}>
                                            {suggestion}
                                        </li>

                                    )
                                )
                            }

                        </ul>

                    </div>

                </div>
            )}

        </section>
    );
}

export default AiInsights;