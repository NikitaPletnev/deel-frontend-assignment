import React, { useState, useEffect, ChangeEvent } from 'react';
import '../style/AutoComplete.css';
import { getMovies } from '../helpers/getMovies';

interface Suggestion {
    id: number;
    name: string;
}

const AutoComplete: React.FC<{ suggestions?: Suggestion[] }> = ({ suggestions }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        if (inputValue) {
            setLoading(true);
            setError(null);
            const filterData = async () => {
                try {
                    let mockSuggestions: Suggestion[] = suggestions || [];
                    if (!suggestions) {
                        const response = await getMovies();
                        const movies = await response.json();
                        mockSuggestions = movies.results.map((movie: any) => ({ id: movie.id, name: movie.title }));
                    }
                    
                    const results = mockSuggestions.filter((suggestion) =>
                        suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
                    );
                    setFilteredSuggestions(results);
                    setDropdownVisible(true);
                } catch (err) {
                    setError('Failed to fetch suggestions. Please try again later.');
                } finally {
                    setLoading(false);
                }
            };
            
            filterData();
        } else {
            setFilteredSuggestions([]);
            setDropdownVisible(false);
        }
    }, [inputValue, suggestions]);
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setHighlightIndex(-1);
    };
    
    const handleSuggestionClick = (suggestion: Suggestion) => {
        setInputValue(suggestion.name);
        setDropdownVisible(false);
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'ArrowDown':
                if (highlightIndex < filteredSuggestions.length - 1) {
                    setHighlightIndex((prev) => prev + 1);
                }
                break;
            case 'ArrowUp':
                if (highlightIndex > 0) {
                    setHighlightIndex((prev) => prev - 1);
                }
                break;
            case 'Enter':
                if (highlightIndex >= 0) {
                    handleSuggestionClick(filteredSuggestions[highlightIndex]);
                }
                break;
            case 'Escape':
                setDropdownVisible(false);
                break;
        }
    };
    
    const highlightMatch = (text: string, match: string) => {
        const startIndex = text.toLowerCase().indexOf(match.toLowerCase());
        if (startIndex === -1) return text;
        const endIndex = startIndex + match.length;
        return (
            <>
                {text.substring(0, startIndex)}
                <strong>{text.substring(startIndex, endIndex)}</strong>
                {text.substring(endIndex)}
            </>
        );
    };
    
    const handleInputFocus = () => {
        if (filteredSuggestions.length > 0) {
            setDropdownVisible(true);
        }
    };
    
    const handleInputBlur = () => {
        setTimeout(() => setDropdownVisible(false), 200);
    };
    
    return (
        <div className="autocomplete">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="Start typing..."
                className="autocomplete-input"
                aria-autocomplete="list"
                aria-controls="suggestions-list"
            />
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            {isDropdownVisible && filteredSuggestions.length > 0 && (
                <ul id="suggestions-list" className="suggestions-list" role="listbox">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={suggestion.id}
                            className={index === highlightIndex ? 'highlighted' : ''}
                            onClick={() => handleSuggestionClick(suggestion)}
                            role="option"
                            aria-selected={index === highlightIndex}
                        >
                            {highlightMatch(suggestion.name, inputValue)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;

// In this component, I have taken care of edge cases such as:
// 1. Handling input blur by closing the dropdown after a timeout to allow clicking on suggestions.
// 2. Highlighting the matching portion of suggestions.
// 3. Handling keyboard events like Arrow keys, Enter, and Escape for a better user experience.
// 4. Using async to simulate real-world API calls.
// 5. Added error handling for failed API calls.
// 6. Added a loading indicator while fetching data.
// 7. Handling edge cases such as empty input, navigation via keyboard, ensuring dropdown visibility control, and providing a fallback message in case of failure.
