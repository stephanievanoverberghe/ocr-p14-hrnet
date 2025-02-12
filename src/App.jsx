import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <div className="flex flex-col min-h-screen justify-between">
            <Header />
            <main className="flex flex-col items-center">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;
