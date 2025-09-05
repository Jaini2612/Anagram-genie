import React, { useState } from "react";
import { AnagramCheck } from "@/entities/AnagramCheck";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Sparkles, RotateCcw, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AnagramChecker() {
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const normalizeString = (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .split('')
      .sort()
      .join('');
  };

  const checkAnagram = async () => {
    // Reset states
    setError("");
    setResult(null);

    // Validate inputs
    if (!word1.trim() || !word2.trim()) {
      setError("Please enter both words or phrases");
      return;
    }

    if (word1.trim() === word2.trim()) {
      setError("Please enter different words or phrases");
      return;
    }

    setIsLoading(true);

    try {
      // Normalize both strings
      const normalizedWord1 = normalizeString(word1.trim());
      const normalizedWord2 = normalizeString(word2.trim());
      
      // Check if they're anagrams
      const isAnagram = normalizedWord1 === normalizedWord2;
      
      // Create friendly message
      const message = isAnagram 
        ? "Correct, this is an anagram 😁"
        : "Sorry, this is not an anagram 😢";

      // Save to database
      const checkData = {
        word1: word1.trim(),
        word2: word2.trim(),
        is_anagram: isAnagram,
        message: message,
        normalized_word1: normalizedWord1,
        normalized_word2: normalizedWord2
      };

      await AnagramCheck.create(checkData);

      // Set result
      setResult({
        isAnagram,
        message,
        word1: word1.trim(),
        word2: word2.trim()
      });

    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Error checking anagram:", error);
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setWord1("");
    setWord2("");
    setResult(null);
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnagram();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Anagram Checker
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600"
        >
          Discover if two words or phrases are magical anagrams! ✨
        </motion.p>
      </div>

      {/* Main Checker Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-gray-900">
              Enter Your Words
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  First word or phrase
                </label>
                <Input
                  value={word1}
                  onChange={(e) => setWord1(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., Listen"
                  className="text-lg h-12"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Second word or phrase
                </label>
                <Input
                  value={word2}
                  onChange={(e) => setWord2(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., Silent"
                  className="text-lg h-12"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={checkAnagram}
                disabled={isLoading || !word1.trim() || !word2.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Checking...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Check Anagram
                  </>
                )}
              </Button>
              <Button
                onClick={resetForm}
                variant="outline"
                className="px-6 py-3 text-lg"
                disabled={isLoading}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Result Card */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <Card className={`${
              result.isAnagram 
                ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200" 
                : "bg-gradient-to-r from-red-50 to-pink-50 border-red-200"
            } shadow-xl`}>
              <CardContent className="py-8 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  result.isAnagram 
                    ? "bg-green-100" 
                    : "bg-red-100"
                }`}>
                  {result.isAnagram ? (
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-600" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {result.message}
                </h3>
                <div className="flex items-center justify-center gap-4 text-lg text-gray-600">
                  <span className="font-medium">"{result.word1}"</span>
                  <span>↔️</span>
                  <span className="font-medium">"{result.word2}"</span>
                </div>
                {result.isAnagram && (
                  <p className="text-sm text-green-600 mt-4">
                    Both words use the same letters! 🎉
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fun Examples */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Try These Fun Examples!
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { word1: "Listen", word2: "Silent" },
            { word1: "Astronomer", word2: "Moon starer" },
            { word1: "Eleven plus two", word2: "Twelve plus one" }
          ].map((example, index) => (
            <Card 
              key={index}
              className="bg-white/60 border-purple-100 hover:bg-white/80 transition-all duration-200 cursor-pointer"
              onClick={() => {
                setWord1(example.word1);
                setWord2(example.word2);
                setResult(null);
                setError("");
              }}
            >
              <CardContent className="py-4">
                <div className="text-sm text-gray-600">
                  <div className="font-medium">"{example.word1}"</div>
                  <div className="text-purple-500">↕️</div>
                  <div className="font-medium">"{example.word2}"</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}