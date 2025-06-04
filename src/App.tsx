import './index.css'
import BlogPage from './pages/BlogPage';
import FormPage from './pages/FormPage';
import './styles/animations.css';

function App(): JSX.Element {
  return (
    <div>
      <BlogPage />
      <FormPage />
    </div>
  );
}

export default App;