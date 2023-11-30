import Container from 'react-bootstrap/Container';
import { UnsplashLayout } from './components/UnsplashLayout';

function App() {
  return (
    <>
      <Container className='mt-5 container-full'>
        <UnsplashLayout />
      </Container>
      <footer className='pb-3 d-flex justify-content-center'>
        Created by <a href='https://github.com/andres326'>@andres326</a> -
        devchallenges.io
      </footer>
    </>
  );
}

export default App;
