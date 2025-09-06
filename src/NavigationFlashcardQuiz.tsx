import React, { useState, useEffect } from 'react';
import { Shuffle, RotateCcw, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';

const NavigationFlashcardQuiz = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [selectedTags, setSelectedTags] = useState('all');
  const [filteredCards, setFilteredCards] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [quizMode, setQuizMode] = useState('study'); // 'study' or 'test'

  // Load flashcards data
  useEffect(() => {
    const loadFlashcards = async () => {
      try {
        const response = await fetch('./navigation_flashcard_quiz.csv');
        const csvContent = await response.text();
        
        // Parse CSV manually to handle potential parsing issues
        const lines = csvContent.split('\n');
        const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
        
        const cards = [];
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          // Simple CSV parsing - handle quotes
          const values = [];
          let current = '';
          let inQuotes = false;
          
          for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              values.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          values.push(current.trim());
          
          if (values.length >= 3) {
            cards.push({
              front: values[0],
              back: values[1],
              tags: values[2]
            });
          }
        }
        
        setFlashcards(cards);
        
        // Extract unique tags
        const tagSet = new Set();
        cards.forEach(card => {
          if (card.tags) {
            card.tags.split(' ').forEach(tag => tagSet.add(tag));
          }
        });
        setAllTags([...tagSet].sort());
        
      } catch (error) {
        console.error('Error loading flashcards:', error);
      }
    };
    
    loadFlashcards();
  }, []);

  // Filter cards based on selected tags
  useEffect(() => {
    if (selectedTags === 'all') {
      setFilteredCards(flashcards);
    } else {
      const filtered = flashcards.filter(card => 
        card.tags && card.tags.includes(selectedTags)
      );
      setFilteredCards(filtered);
    }
    setCurrentCardIndex(0);
    setShowAnswer(false);
  }, [selectedTags, flashcards]);

  const currentCard = filteredCards[currentCardIndex];

  const nextCard = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setFilteredCards(shuffled);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const resetQuiz = () => {
    setScore({ correct: 0, incorrect: 0 });
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const markAnswer = (isCorrect) => {
    setScore(prev => ({
      ...prev,
      [isCorrect ? 'correct' : 'incorrect']: prev[isCorrect ? 'correct' : 'incorrect'] + 1
    }));
    
    // Auto-advance to next card after marking
    setTimeout(() => {
      if (currentCardIndex < filteredCards.length - 1) {
        nextCard();
      }
    }, 500);
  };

  const getScorePercentage = () => {
    const total = score.correct + score.incorrect;
    return total === 0 ? 0 : Math.round((score.correct / total) * 100);
  };

  if (!currentCard) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Practical Navigation Quiz</h1>
          <p className="text-gray-600">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">⚓ Practical Navigation Quiz</h1>
          <p className="text-gray-600">Master the fundamentals of marine navigation</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          {/* Tag Filter */}
          <select 
            value={selectedTags}
            onChange={(e) => setSelectedTags(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Topics ({flashcards.length} cards)</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)} ({flashcards.filter(c => c.tags && c.tags.includes(tag)).length})
              </option>
            ))}
          </select>

          {/* Quiz Mode Toggle */}
          <div className="flex bg-gray-100 rounded-md">
            <button
              onClick={() => setQuizMode('study')}
              className={`px-4 py-2 rounded-l-md ${quizMode === 'study' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              Study Mode
            </button>
            <button
              onClick={() => setQuizMode('test')}
              className={`px-4 py-2 rounded-r-md ${quizMode === 'test' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              Test Mode
            </button>
          </div>

          {/* Action Buttons */}
          <button
            onClick={shuffleCards}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
          >
            <Shuffle size={16} /> Shuffle
          </button>
          
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>

        {/* Progress and Score */}
        <div className="flex justify-between items-center mb-6 text-sm">
          <div className="text-gray-600">
            Card {currentCardIndex + 1} of {filteredCards.length}
          </div>
          
          {quizMode === 'test' && (
            <div className="flex gap-4 text-sm">
              <span className="text-green-600 font-semibold">✓ {score.correct}</span>
              <span className="text-red-600 font-semibold">✗ {score.incorrect}</span>
              <span className="text-blue-600 font-semibold">
                {getScorePercentage()}% correct
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentCardIndex + 1) / filteredCards.length) * 100}%` }}
          ></div>
        </div>

        {/* Flashcard */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-8 text-white mb-6 min-h-[300px] flex flex-col justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">
              {showAnswer ? "Answer:" : "Question:"}
            </h2>
            <p className="text-lg leading-relaxed">
              {showAnswer ? currentCard.back : currentCard.front}
            </p>
            
            {currentCard.tags && (
              <div className="mt-6 pt-4 border-t border-blue-400">
                <p className="text-sm text-blue-200">
                  Tags: {currentCard.tags}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Card Controls */}
        <div className="flex justify-center gap-4 mb-6">
          {quizMode === 'study' ? (
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              {showAnswer ? <EyeOff size={20} /> : <Eye size={20} />}
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
          ) : (
            // Test mode - show answer and scoring buttons
            <>
              {!showAnswer ? (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  <Eye size={20} /> Reveal Answer
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={() => markAnswer(false)}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <XCircle size={20} /> Incorrect
                  </button>
                  <button
                    onClick={() => markAnswer(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <CheckCircle size={20} /> Correct
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={previousCard}
            disabled={currentCardIndex === 0}
            className={`px-6 py-2 rounded-lg transition-colors ${
              currentCardIndex === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            ← Previous
          </button>
          
          <button
            onClick={nextCard}
            disabled={currentCardIndex === filteredCards.length - 1}
            className={`px-6 py-2 rounded-lg transition-colors ${
              currentCardIndex === filteredCards.length - 1 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next →
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
          <h3 className="font-semibold mb-2">How to use:</h3>
          <ul className="space-y-1">
            <li><strong>Study Mode:</strong> Review cards at your own pace, flip to see answers</li>
            <li><strong>Test Mode:</strong> Quiz yourself and track your score</li>
            <li><strong>Filter by Topic:</strong> Focus on specific navigation concepts</li>
            <li><strong>Shuffle:</strong> Randomize card order for better learning</li>
          </ul>
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <a 
              href="./navigation_flashcard_quiz.csv" 
              download="navigation_flashcard_quiz.csv"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 underline"
              title="Download CSV file suitable for import into Anki or other flashcard apps"
            >
              📥 Download CSV file
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationFlashcardQuiz;