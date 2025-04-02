import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Inventory Management System</h1>

      <div className="buttonContainer">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/inventory')}>
          View Inventory without logging in
        </button>
      </div>
    </>
  );
}

export default Home;