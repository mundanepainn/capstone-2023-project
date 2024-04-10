import WedoNavbar from '../components/WedoNavbar';
import weDoLogo from '../assets/newlogo.svg';
import Cards from '../components/Cards';
import TopNavBar from '../components/TopNavBar';

const Home = ()=>{
    const requestNotificationPermission = async () => {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          // User granted permission
        }
      };
      requestNotificationPermission()
return(

<>
    <TopNavBar/>
    <img src={weDoLogo} className="logo react" alt="React logo" />
      
    <WedoNavbar />
</>
  
);



};



export default Home;