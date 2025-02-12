import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-[#5a6f07] text-white p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link to="/">HRnet</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/" className="hover:underline">
                                Créer un employé
                            </Link>
                        </li>
                        <li>
                            <Link to="/list" className="hover:underline">
                                Liste des employés
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
