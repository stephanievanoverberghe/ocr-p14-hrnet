import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Schéma de validation Yup
const employeeSchema = yup.object().shape({
    firstName: yup.string().required('Le prénom est requis'),
    lastName: yup.string().required('Le nom est requis'),
    dateOfBirth: yup
        .string()
        .transform((value) => (value === '' ? null : value))
        .nullable()
        .required('La date de naissance est requise'),
    startDate: yup
        .string()
        .transform((value) => (value === '' ? null : value))
        .nullable()
        .required("La date d'embauche est requise"),
    street: yup.string().required("L'adresse est requise"),
    city: yup.string().required('La ville est requise'),
    state: yup.string().required("L'état est requis"),
    zipCode: yup
        .string()
        .matches(/^[0-9]{5}$/, 'Code postal invalide')
        .required('Le code postal est requis'),
    department: yup.string().required('Le département est requis'),
});

function CreateEmployeePage() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(employeeSchema),
    });

    const onSubmit = (data) => {
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        employees.push(data);
        localStorage.setItem('employees', JSON.stringify(employees));
        navigate('/list');
    };

    return (
        <div className="w-full mx-2 md:max-w-lg md:mx-auto lg:max-w-xl mt-6 p-4 md:p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-lg sm:text-2xl font-bold text-center text-[#5a6f07]">Créer un employé</h1>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Champ Prénom */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Prénom</label>
                    <input {...register('firstName')} type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]" />
                    <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
                </div>

                {/* Champ Nom */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <input {...register('lastName')} type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]" />
                    <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
                </div>

                {/* Date de naissance */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
                    <input {...register('dateOfBirth')} type="date" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]" />
                    <p className="text-red-500 text-sm">{errors.dateOfBirth?.message}</p>
                </div>

                {/* Date d'embauche */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date d&apos;embauche</label>
                    <input {...register('startDate')} type="date" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]" />
                    <p className="text-red-500 text-sm">{errors.startDate?.message}</p>
                </div>

                {/* Adresse */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rue</label>
                    <input {...register('street')} type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]" />
                    <p className="text-red-500 text-sm">{errors.street?.message}</p>
                </div>

                {/* Ville */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ville</label>
                    <input {...register('city')} type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]" />
                    <p className="text-red-500 text-sm">{errors.city?.message}</p>
                </div>

                {/* État */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">État</label>
                    <input {...register('state')} type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]" />
                    <p className="text-red-500 text-sm">{errors.state?.message}</p>
                </div>

                {/* Code postal */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Code postal</label>
                    <input {...register('zipCode')} type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]" />
                    <p className="text-red-500 text-sm">{errors.zipCode?.message}</p>
                </div>

                {/* Département */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Département</label>
                    <select {...register('department')} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]">
                        <option value="Ventes">Ventes</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Ingénierie">Ingénierie</option>
                        <option value="Ressources humaines">Ressources humaines</option>
                        <option value="Juridique">Juridique</option>
                    </select>
                    <p className="text-red-500 text-sm">{errors.department?.message}</p>
                </div>

                {/* Bouton de validation */}
                <button type="submit" className="w-full bg-[#5a6f07] text-white py-2 rounded hover:bg-[#4e5d06] transition duration-300 ease-in-out">
                    Sauvegarder
                </button>
            </form>
        </div>
    );
}

export default CreateEmployeePage;
