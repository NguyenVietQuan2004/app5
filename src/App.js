import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <AppProvider>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </AppProvider>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
