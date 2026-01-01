"use client";

import { useState } from "react";
import { Film, Search } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import MovieRecommendations from "@/components/MovieRecommendations";

interface Movie {
  title: string;
  year?: string;
  genre?: string;
  description: string;
  whyRecommend: string;
}

export default function Home() {
  const [preferences, setPreferences] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!preferences.trim()) {
      setError("Please enter your movie preferences");
      return;
    }

    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preferences: preferences.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate recommendations");
      }

      const data = await response.json();
      setMovies(data.movies || []);
    } catch (err: any) {
      setError(err.message || "An error occurred while generating recommendations");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey && !loading) {
      handleGenerate();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Film className="w-10 h-10 text-blue-500 glow-text" />
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 glow-text">
            Movie R AI
          </h1>
        </div>
        <p className="text-center text-gray-400 text-lg">
          Get personalized movie recommendations based on your preferences
        </p>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Input Section */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <textarea
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Describe your movie preferences... (e.g., 'I love sci-fi movies with complex plots like Inception, or psychological thrillers like Shutter Island')"
              className="w-full pl-14 pr-4 py-4 text-lg glassmorphic rounded-2xl border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-white placeholder-gray-500 transition-all resize-none min-h-[120px]"
              disabled={loading}
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-500">Press Ctrl+Enter to submit</p>
              <button
                onClick={handleGenerate}
                disabled={loading || !preferences.trim()}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "Finding Movies..." : "Get Recommendations"}
              </button>
            </div>
          </div>
          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        </div>

        {/* Results Section */}
        {loading && <LoadingAnimation />}

        {movies.length > 0 && !loading && (
          <div className="mt-12">
            <MovieRecommendations movies={movies} />
          </div>
        )}
      </div>
    </main>
  );
}
