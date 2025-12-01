# PhotoshopLite Frontend

React-based frontend for the PhotoshopLite image and video editing platform.

## Technologies Used

- **React 17** - UI library
- **Redux** - State management
- **Axios** - HTTP client
- **React Router** - Navigation (if needed)

## Project Structure

```
src/
├── api/              # API client and endpoints
├── components/       # React components
│   ├── ImageEditor/  # Image editing interface
│   ├── VideoEditor/  # Video editing interface
│   ├── FilterPanels/ # Filter control panels
│   └── HistoryPanel/ # Undo/Redo history
├── store/            # Redux store, actions, reducers
├── utils/            # Utility functions
├── App.js            # Main application component
└── index.js          # Application entry point
```

## Installation

```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm start
```
Runs on http://localhost:3000

### Build for Production
```bash
npm run build
```

### Running Tests
```bash
npm test
```

## Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Features

### Image Editor
- Upload and preview images
- Apply filters (brightness, contrast, blur, edge detection)
- Morphological operations (Canny edge, Harris corner)
- ML features (face detection, PCA, SIFT)
- Undo/Redo functionality
- Download edited images

### Video Editor
- Upload and preview videos
- Apply video filters
- Trim and merge clips
- Add text overlays
- Download edited videos

## API Integration

All API calls are centralized in `src/api/index.js`. The API client automatically handles:
- Authentication tokens
- Error handling
- Request/response interceptors

## State Management

Redux is used for global state management:
- `imageReducer` - Image editing state
- `videoReducer` - Video editing state
- `userReducer` - User authentication state
- `historyReducer` - Undo/Redo history

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
