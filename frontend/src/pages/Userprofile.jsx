import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Userprofile.css';

function Userprofile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    phoneNumber: '',
    userId: ''
  });

  useEffect(() => {
    // Get user data from localStorage
    try {
      const storedUser = localStorage.getItem('flowerShopUser');
      console.log('Retrieved from localStorage:', storedUser);
      
      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log('Parsed user data:', user);
        
        setUserData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          country: user.country || '',
          phoneNumber: user.phoneNumber || '',
          userId: `${user.firstName?.toLowerCase() || ''}${Math.floor(Math.random() * 1000)}`
        });
      } else {
        console.log('No user data found, redirecting to login');
        // Redirect to login if no user data is found
        navigate('/login');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className='myprofile'>
        <h1>My Profile</h1>

        <div className='profile-details'>
            <div className='propic'><img src='/About/User.jpg' alt='Profile' /></div>

            <div className='profile-info'>
                
                <div className='ProName'>
                  <h1>{userData.firstName.toUpperCase()} {userData.lastName.toUpperCase()}</h1>
                  <div><button>EDIT PROFILE</button></div>
                </div>
            
                <div className='user-details'>
                    <div>
                      <h1>USER ID</h1>
                      <p>{userData.userId}</p>
                    </div>
                    <div>
                      <h1>EMAIL</h1> 
                      <p>{userData.email}</p>
                    </div>
                    <div>
                      <h1>COUNTRY</h1> 
                      <p>{userData.country}</p>
                    </div>
                    <div>
                      <h1>PHONE NUMBER</h1> 
                      <p>+94 {userData.phoneNumber}</p>
                    </div>
                </div>

                <div className='action-buttons'>
                    <button>MY ORDERS</button>
                    <button>MY COUPONS</button>
                    <button>MY PAYMENTS</button>
                </div>

            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Userprofile;
