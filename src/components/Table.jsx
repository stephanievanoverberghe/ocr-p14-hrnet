import PropTypes from 'prop-types';

function Table({ data }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#5a6f07] text-white">
                    <tr>
                        <th className="p-3 text-left">Prénom</th>
                        <th className="p-3 text-left">Nom</th>
                        <th className="p-3 text-left">Date de naissance</th>
                        <th className="p-3 text-left">Date d&aposembauche</th>
                        <th className="p-3 text-left">Département</th>
                        <th className="p-3 text-left">Ville</th>
                        <th className="p-3 text-left">État</th>
                        <th className="p-3 text-left">Code Postal</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((employee, index) => (
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
    );
}

// Définition des PropTypes
Table.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            dateOfBirth: PropTypes.string.isRequired,
            startDate: PropTypes.string.isRequired,
            department: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            state: PropTypes.string.isRequired,
            zipCode: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Table;
