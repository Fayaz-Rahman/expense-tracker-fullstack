import { useEffect, useState } from "react";
import useAuth from "../context/useAuth";
import { getCategories, createCategory } from "../services/categoryApi";

function Categories() {
    const { token } = useAuth();

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadCategories() {
            try {
                const data = await getCategories(token);

                if (!cancelled) {
                    setCategories(data);
                    setLoading(false);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || "Failed to load categories.");
                    setLoading(false);
                }
            }
        }

        loadCategories();

        return () => {
            cancelled = true;
        };
    }, [token]);

    async function handleSubmit(event) {
        event.preventDefault();

        const trimmedName = categoryName.trim();

        if (!trimmedName) {
            setError("Category name is required.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            const newCategory = await createCategory(token, trimmedName);

            setCategories((current) =>
                [...current, newCategory].sort((a, b) =>
                    a.name.localeCompare(b.name)
                )
            );

            setCategoryName("");
        } catch (err) {
            setError(err.message || "Failed to create category.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1>Categories</h1>
                    <p>Manage the categories used for your expenses.</p>
                </div>
            </div>

            <div className="category-layout">
                <section className="form-card">
                    <h2>Add Category</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="categoryName">
                                Category Name
                            </label>

                            <input
                                id="categoryName"
                                type="text"
                                value={categoryName}
                                onChange={(event) =>
                                    setCategoryName(event.target.value)
                                }
                                placeholder="e.g. Food"
                                maxLength={100}
                            />
                        </div>

                        {error && (
                            <div className="form-error">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={saving}
                        >
                            {saving ? "Adding..." : "Add Category"}
                        </button>
                    </form>
                </section>

                <section className="list-card">
                    <div className="list-card-header">
                        <h2>Your Categories</h2>
                        <span>{categories.length}</span>
                    </div>

                    {loading ? (
                        <p className="empty-state">Loading categories...</p>
                    ) : categories.length === 0 ? (
                        <p className="empty-state">
                            No categories yet. Add your first category.
                        </p>
                    ) : (
                        <div className="category-list">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="category-item"
                                >
                                    <span>{category.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Categories;