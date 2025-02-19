import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../store/employeeSlice';
import Table from '../components/Table';

function EmployeeListPage() {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees.list);
    const status = useSelector((state) => state.employees.status);
    const error = useSelector((state) => state.employees.error);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEmployees());
        }
    }, [dispatch, status]);

    // Filtrer les employés selon la recherche
    const filteredEmployees = employees.filter((employee) => `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="max-w-6xl mx-auto mt-6 p-4">
            <h1 className="text-2xl font-bold text-center text-[#5a6f07]">Liste des employés</h1>

            {/* Barre de recherche */}
            <input
                type="text"
                placeholder="Rechercher un employé..."
                className="w-full p-2 border rounded mt-4 focus:outline-none focus:ring-2 focus:ring-[#5a6f07]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Gestion des états (Chargement, Erreur, Données) */}
            {status === 'loading' && <p className="text-center mt-5 text-gray-500">Chargement des employés...</p>}
            {status === 'failed' && <p className="text-center mt-5 text-red-500">Erreur : {error}</p>}
            {status === 'succeeded' && (
                <>
                    {/* MOBILE : Affichage en cartes */}
                    <div className="mt-4 md:hidden">
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee, index) => (
                                <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
                                    <p className="font-bold text-[#5a6f07]">
                                        {employee.firstName} {employee.lastName}
                                    </p>
                                    <p className="text-gray-600">📅 Naissance : {employee.dateOfBirth}</p>
                                    <p className="text-gray-600">📆 Embauche : {employee.startDate}</p>
                                    <p className="text-gray-600">🏢 {employee.department}</p>
                                    <p className="text-gray-600">
                                        📍 {employee.city}, {employee.state} ({employee.zipCode})
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 mt-4">Aucun employé trouvé.</p>
                        )}
                    </div>

                    {/* TABLETTE : Affichage en liste */}
                    <div className="mt-6 hidden md:block lg:hidden">
                        {filteredEmployees.length > 0 ? (
                            <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
                                {filteredEmployees.map((employee, index) => (
                                    <li key={index} className="p-4 hover:bg-gray-100">
                                        <p className="text-lg font-semibold text-[#5a6f07]">
                                            {employee.firstName} {employee.lastName}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            📅 {employee.dateOfBirth} | 📆 {employee.startDate} | 🏢 {employee.department}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            📍 {employee.city}, {employee.state} ({employee.zipCode})
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-500 mt-4">Aucun employé trouvé.</p>
                        )}
                    </div>

                    {/* DESKTOP : Affichage en tableau */}
                    <Table data={filteredEmployees} />
                </>
            )}
        </div>
    );
}

export default EmployeeListPage;
