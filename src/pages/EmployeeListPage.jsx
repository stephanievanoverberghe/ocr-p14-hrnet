import { useState, useEffect } from 'react';

function EmployeeListPage() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedEmployees);
    }, []);

    // Filtrage des employés en fonction du terme de recherche
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

            {/* Affichage Mobile: Cartes */}
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

            {/* Affichage Tablette: Liste */}
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

            {/* Affichage Desktop: Tableau */}
            <div className="mt-6 hidden lg:block overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-[#5a6f07] text-white">
                        <tr>
                            <th className="p-3 text-left">Prénom</th>
                            <th className="p-3 text-left">Nom</th>
                            <th className="p-3 text-left">Date de naissance</th>
                            <th className="p-3 text-left">Date d&apos;embauche</th>
                            <th className="p-3 text-left">Département</th>
                            <th className="p-3 text-left">Ville</th>
                            <th className="p-3 text-left">État</th>
                            <th className="p-3 text-left">Code Postal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee, index) => (
                                <tr key={index} className="border-t hover:bg-gray-100">
                                    <td className="p-3">{employee.firstName}</td>
                                    <td className="p-3">{employee.lastName}</td>
                                    <td className="p-3">{employee.dateOfBirth}</td>
                                    <td className="p-3">{employee.startDate}</td>
                                    <td className="p-3">{employee.department}</td>
                                    <td className="p-3">{employee.city}</td>
                                    <td className="p-3">{employee.state}</td>
                                    <td className="p-3">{employee.zipCode}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="p-3 text-center text-gray-500">
                                    Aucun employé trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeeListPage;
