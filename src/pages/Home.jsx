import WedoNavbar from '../components/WedoNavbar';
import weDoLogo from '../assets/logo.svg';
import Cards from '../components/Cards';
import TopNavBar from '../components/TopNavBar';

const Home = ()=>{

return(

<>
    <TopNavBar/>
    <img src={weDoLogo} className="logo react" alt="React logo" />
      
    <WedoNavbar />
</>
  
);



};



export default Home;