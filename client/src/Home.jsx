import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Inventory Management System</h1>

      <div className="buttonContainer">
        <Button onClick={() => navigate('/login')}>Login</Button>
        <Button onClick={() => navigate('/user_inventory')}>My Inventory</Button>
        <Button onClick={() => navigate('/inventory')}>
          View Inventory without logging in
        </Button>
      </div>
    </>
  );
}

export default Home;