# AutoComplete Component in React + TypeScript

## Project Overview
This project is a production-ready AutoComplete component developed in React with TypeScript. The component provides a responsive user experience by offering relevant suggestions as the user types. It includes asynchronous data fetching with API integration and highlights matches in the suggestions list. The component is built with an emphasis on accessibility and handles various edge cases for a seamless user experience.

### Features
- **TypeScript Support**: Ensures type safety with properly defined interfaces.
- **Asynchronous Data Fetching**: Integrates with The Movie Database (TMDB) API to fetch movie suggestions.
- **Highlighting Matches**: Highlights matching portions of text in the suggestions list.
- **Keyboard Navigation**: Supports Arrow keys, Enter, and Escape for improved accessibility.
- **Functional Components and Hooks**: Built using React hooks and functional components.
- **Accessibility**: ARIA roles and properties are used for better accessibility support.
- **Loading Indicator**: Displays a loading indicator when fetching data.
- **Error Handling**: Displays an error message if fetching data fails.

## Installation

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn

### Steps to Run

1. **Clone the Repository**
   ```sh
   git clone <repository_url>
   cd autocomplete-component
   ```

2. **Install Dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Run the Application**
   ```sh
   npm start
   # or
   yarn start
   ```

   The app will be available on `http://localhost:3000`.

## Usage
To use the component, you can import and add it to your application like this:

```tsx
import React from 'react';
import AutoComplete from './components/AutoComplete';

const App: React.FC = () => {
  return (
    <div>
      <h1>AutoComplete Component Demo</h1>
      <AutoComplete />
    </div>
  );
};

export default App;
```

## Notes
- **No External Libraries**: Built only with React and TypeScript without third-party libraries for the autocomplete logic.
- **API Integration**: Uses The Movie Database (TMDB) API to fetch movie suggestions dynamically. An API key is required for running this application.
- **CSS**: Basic but modern working CSS is implemented to provide a better user experience.
