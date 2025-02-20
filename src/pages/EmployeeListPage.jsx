import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../store/employeeSlice';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import Dropdown from '../components/Dropdown';
import { useForm } from 'react-hook-form';

function EmployeeListPage() {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees.list);
    const status = useSelector((state) => state.employees.status);
    const error = useSelector((state) => state.employees.error);
    const [searchTerm, setSearchTerm] = useState('');
    const [employeesPerPage, setEmployeesPerPage] = useState(10); // Valeur initiale
    const [currentPage, setCurrentPage] = useState(1); // Page courante
    const { control } = useForm();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEmployees());
        }
    }, [dispatch, status]);

    // Filtrer les employés selon la recherche
    const filteredEmployees = employees.filter((employee) => `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()));

    // Logique pour afficher les employés par page
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    return (
        <div className="max-w-6xl mx-auto mt-6 p-4">
            <h1 className="text-2xl font-bold text-center text-[#5a6f07]">Liste des employés</h1>

            <div className="flex justify-between items-center">
                {/* Dropdown pour le nombre d'employés par page */}
                <Dropdown
                    name="employeesPerPage"
                    label="Afficher par"
                    options={[
                        { value: 10, label: '10' },
                        { value: 25, label: '25' },
                        { value: 50, label: '50' },
                        { value: 100, label: '100' },
                    ]}
                    control={control}
                    error={null}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        setEmployeesPerPage(value); // Mettre à jour la valeur de employeesPerPage
                        setCurrentPage(1); // Réinitialiser la page à 1 chaque fois que l'on change la sélection
                    }}
                />

                {/* Barre de recherche */}
                <input
                    type="text"
                    placeholder="Rechercher un employé..."
                    className="w-1/3 p-2 border rounded mt-4 focus:outline-none focus:ring-2 focus:ring-[#5a6f07]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Gestion des états (Chargement, Erreur, Données) */}
            {status === 'loading' && <p className="text-center mt-5 text-gray-500">Chargement des employés...</p>}
            {status === 'failed' && <p className="text-center mt-5 text-red-500">Erreur : {error}</p>}
            {status === 'succeeded' && (
                <>
                    {/* Affichage en tableau */}
                    <Table data={currentEmployees} />

                    {/* Pagination */}
                    <Pagination totalEmployees={filteredEmployees.length} employeesPerPage={employeesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </>
            )}
        </div>
    );
}

export default EmployeeListPage;
