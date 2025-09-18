import './assets/css/animate.css';
import './assets/css/bootstrap.min.css';
import './assets/css/icofont.min.css';
import './assets/css/swiper.min.css';
import './assets/css/style.css';
import '../src/pages/profile/Profile.css';
import 'aos/dist/aos.css';
import MainRoutes from './routes/MainRoutes';
import BackgroundMusic from './components/common/BackgroundMusic';
import CursorFollower from './components/common/CursorFollower/CursorFollower';
function App() {

  return (
      <div>
      <>
    
      <CursorFollower />
      
        <MainRoutes />
        <BackgroundMusic />
      </>
      </div>
  );
}

export default App;