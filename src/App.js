import logo from './logo.svg';
import './App.css';
import ImageCompressor from './components/imageCompressor';

function App() {
  return (
    <>
    <div className="App">
      <header className="app-header">
        <h3>React Image Compressor</h3>
      </header>
    </div>
    <ImageCompressor/>
    </>
  );
}

export default App;
